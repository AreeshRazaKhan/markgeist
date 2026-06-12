/**
 * QA harness for The Oz Cast social post creatives.
 * Re-runnable: `node social-posts/qa.js` from the repo root (or from social-posts/).
 * Resolves Playwright from the repo's playwright-skill install, falling back to
 * any locally resolvable copy.
 */
const path = require('path')
const fs = require('fs')

const SKILL_DIR = path.resolve(__dirname, '..', '.claude', 'skills', 'playwright-skill')
const { chromium } = require(require.resolve('playwright', { paths: [SKILL_DIR, __dirname] }))

const POSTS_DIR = __dirname
const CRITICAL = ['.headline', '.subhead', '.body', '.cta']
const TEXT_CLASSES = [...CRITICAL, '.eyebrow', '.caption']
// Story safe zone on the 1080x1920 authoring grid is y 250..1670, which maps to
// 141..939 in 608x1080 output space (x 0.5625).
const SAFE_TOP = 140
const SAFE_BOTTOM = 940

const files = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => /^(feed|story)-\d{2}\.html$/.test(f))
  .sort()

const sizeFor = (file) =>
  file.startsWith('feed') ? { w: 1080, h: 1080 } : { w: 608, h: 1080 }

const checkPage = async (page, file, w, h) => {
  const errors = []

  await page.setViewportSize({ width: w, height: h })
  await page.goto('file://' + path.join(POSTS_DIR, file), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(120)

  // 1. No scrollable overflow
  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth,
    sh: document.documentElement.scrollHeight,
    bw: document.body.scrollWidth,
    bh: document.body.scrollHeight,
    iw: window.innerWidth,
    ih: window.innerHeight
  }))
  if (overflow.sw > overflow.iw + 1 || overflow.bw > overflow.iw + 1) {
    errors.push(`horizontal overflow ${Math.max(overflow.sw, overflow.bw)} > ${overflow.iw}`)
  }
  if (overflow.sh > overflow.ih + 1 || overflow.bh > overflow.ih + 1) {
    errors.push(`vertical overflow ${Math.max(overflow.sh, overflow.bh)} > ${overflow.ih}`)
  }

  // 2. Post locked to exactly (0,0,w,h) at export viewport
  const post = await page.evaluate(() => {
    const r = document.querySelector('.post').getBoundingClientRect()
    return { x: r.x, y: r.y, w: r.width, h: r.height }
  })
  const near = (a, b) => Math.abs(a - b) <= 1
  if (!near(post.x, 0) || !near(post.y, 0) || !near(post.w, w) || !near(post.h, h)) {
    errors.push(
      `post rect (${post.x.toFixed(1)},${post.y.toFixed(1)},${post.w.toFixed(1)},` +
        `${post.h.toFixed(1)}) != (0,0,${w},${h})`
    )
  }

  // 3. Text elements: no clipping, fully inside the canvas, story safe zone
  const textIssues = await page.evaluate(
    ({ classes, critical, isStory, safeTop, safeBottom, W, H }) => {
      const out = []
      classes.forEach((sel) => {
        document.querySelectorAll(sel).forEach((el, i) => {
          const id = `${sel}[${i}]`
          if (el.clientWidth === 0) return // inline element — geometry not meaningful
          if (el.scrollWidth > el.clientWidth + 2) {
            out.push(`${id} clipped horizontally (${el.scrollWidth} > ${el.clientWidth})`)
          }
          if (el.scrollHeight > el.clientHeight + 2) {
            out.push(`${id} clipped vertically (${el.scrollHeight} > ${el.clientHeight})`)
          }
          const r = el.getBoundingClientRect()
          if (r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1) {
            out.push(
              `${id} outside canvas (${r.left.toFixed(0)},${r.top.toFixed(0)},` +
                `${r.right.toFixed(0)},${r.bottom.toFixed(0)})`
            )
          }
          if (isStory && critical.includes(sel)) {
            if (r.top < safeTop || r.bottom > safeBottom) {
              out.push(
                `${id} outside story safe zone (top ${r.top.toFixed(0)}, ` +
                  `bottom ${r.bottom.toFixed(0)}, allowed ${safeTop}..${safeBottom})`
              )
            }
          }
        })
      })
      return out
    },
    {
      classes: TEXT_CLASSES,
      critical: CRITICAL,
      isStory: file.startsWith('story'),
      safeTop: SAFE_TOP,
      safeBottom: SAFE_BOTTOM,
      W: w,
      H: h
    }
  )
  errors.push(...textIssues)

  // 4. No pairwise overlap between critical text boxes
  const overlaps = await page.evaluate((critical) => {
    const out = []
    const els = []
    critical.forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => {
        if (el.clientWidth > 0) els.push({ sel, el })
      })
    )
    for (let a = 0; a < els.length; a++) {
      for (let b = a + 1; b < els.length; b++) {
        const A = els[a].el
        const B = els[b].el
        if (A.contains(B) || B.contains(A)) continue
        const ra = A.getBoundingClientRect()
        const rb = B.getBoundingClientRect()
        const ix = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left)
        const iy = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top)
        if (ix > 4 && iy > 4) {
          out.push(`${els[a].sel} overlaps ${els[b].sel} (${ix.toFixed(0)}x${iy.toFixed(0)}px)`)
        }
      }
    }
    return out
  }, CRITICAL)
  errors.push(...overlaps)

  // 5. Font check — only families actually used on the page must be loaded
  const fontIssues = await page.evaluate(() => {
    const out = []
    const used = new Map()
    document.querySelectorAll('body *').forEach((el) => {
      const hasText = Array.from(el.childNodes).some(
        (n) => n.nodeType === 3 && n.textContent.trim().length
      )
      if (!hasText) return
      const cs = getComputedStyle(el)
      const fam = cs.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '')
      if (['monospace', 'sans-serif', 'serif', 'system-ui'].includes(fam)) return
      if (!used.has(fam)) used.set(fam, cs.fontWeight)
    })
    used.forEach((weight, fam) => {
      if (!document.fonts.check(`${weight} 16px "${fam}"`) &&
          !document.fonts.check(`16px "${fam}"`)) {
        out.push(`font not loaded: ${fam} (weight ${weight})`)
      }
    })
    return out
  })
  errors.push(...fontIssues)

  // 6. Responsive view — fully visible, centered, scaled to fit
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.waitForTimeout(120)
  const resp = await page.evaluate(() => {
    const r = document.querySelector('.post').getBoundingClientRect()
    return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, w: r.width, h: r.height }
  })
  const expScale = Math.min(1440 / w, 900 / h, 1)
  if (
    resp.left < -0.5 || resp.top < -0.5 ||
    resp.right > 1440.5 || resp.bottom > 900.5
  ) {
    errors.push(`post cut off at 1440x900 (${resp.left.toFixed(1)},${resp.top.toFixed(1)},` +
      `${resp.right.toFixed(1)},${resp.bottom.toFixed(1)})`)
  }
  if (Math.abs(resp.left - (1440 - resp.w) / 2) > 2 ||
      Math.abs(resp.top - (900 - resp.h) / 2) > 2) {
    errors.push(`post not centered at 1440x900 (left ${resp.left.toFixed(1)}, top ${resp.top.toFixed(1)})`)
  }
  if (Math.abs(resp.w - w * expScale) > 2 || Math.abs(resp.h - h * expScale) > 2) {
    errors.push(`post not scaled to fit at 1440x900 (${resp.w.toFixed(1)}x${resp.h.toFixed(1)},` +
      ` expected ${(w * expScale).toFixed(1)}x${(h * expScale).toFixed(1)})`)
  }

  return errors
}

const main = async () => {
  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage()
  const results = []

  for (const file of files) {
    const { w, h } = sizeFor(file)
    let errors
    try {
      errors = await checkPage(page, file, w, h)
    } catch (err) {
      errors = [`harness error: ${err.message}`]
    }
    results.push({ file, errors })
    const mark = errors.length ? 'FAIL' : 'PASS'
    console.log(`${mark}  ${file}${errors.length ? '\n      - ' + errors.join('\n      - ') : ''}`)
  }

  await browser.close()

  const passed = results.filter((r) => !r.errors.length).length
  console.log('\n┌──────────────┬────────┐')
  console.log('│ file         │ result │')
  console.log('├──────────────┼────────┤')
  results.forEach((r) => {
    console.log(`│ ${r.file.padEnd(12)} │ ${(r.errors.length ? 'FAIL' : 'PASS').padEnd(6)} │`)
  })
  console.log('└──────────────┴────────┘')
  console.log(`${passed}/${results.length} passed`)
  process.exit(passed === results.length ? 0 : 1)
}

main().catch((err) => {
  console.error('[qa]:', err)
  process.exit(1)
})
