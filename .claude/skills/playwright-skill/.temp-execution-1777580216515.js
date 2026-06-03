const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000'
const OUT_DIR = '/tmp/markgeist-responsive'

const VIEWPORTS = [
  { name: '1023', width: 1023, height: 800 },
  { name: '960', width: 960, height: 800 },
  { name: '900', width: 900, height: 800 },
  { name: '850', width: 850, height: 800 },
  { name: '820', width: 820, height: 800 },
  { name: '800', width: 800, height: 800 },
  { name: '768', width: 768, height: 800 }
]

const SECTIONS = [
  { id: '#transmission', label: 'hero' },
  { id: '#subscribe', label: 'subscribe' },
  { id: '#latest-episode', label: 'latest-episode' },
  { id: '#operator', label: 'about-oz' },
  { id: '#mission-logs', label: 'mission-logs' },
  { id: '#the-field', label: 'the-field-slider' },
  { id: '#intel-feed', label: 'intel-feed' },
  { id: '#newsletter', label: 'newsletter' }
]

const ensureDir = (p) => {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

;(async () => {
  ensureDir(OUT_DIR)
  const browser = await chromium.launch({ headless: false, slowMo: 30 })
  const context = await browser.newContext({ deviceScaleFactor: 1 })
  const page = await context.newPage()

  const issues = []

  // Surface console + page errors to our log
  page.on('console', (msg) => {
    if (msg.type() === 'error') issues.push({ kind: 'console.error', text: msg.text() })
  })
  page.on('pageerror', (err) => issues.push({ kind: 'pageerror', text: err.message }))

  for (const vp of VIEWPORTS) {
    console.log(`\n=== VIEWPORT ${vp.name}px (${vp.width}x${vp.height}) ===`)
    await page.setViewportSize({ width: vp.width, height: vp.height })
    await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(600)

    // Full-page screenshot
    const fullPath = path.join(OUT_DIR, `${vp.name}-full.png`)
    await page.screenshot({ path: fullPath, fullPage: true })
    console.log(`  full -> ${fullPath}`)

    // Detect horizontal overflow
    const overflow = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth
      const scrollW = document.documentElement.scrollWidth
      const offenders = []
      if (scrollW > docW + 1) {
        document.querySelectorAll('*').forEach((el) => {
          const r = el.getBoundingClientRect()
          if (r.right > docW + 1 || r.left < -1) {
            const s = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''}`
            offenders.push({ sel: s, left: Math.round(r.left), right: Math.round(r.right) })
          }
        })
      }
      return { docW, scrollW, overflowPx: scrollW - docW, offenders: offenders.slice(0, 8) }
    })
    if (overflow.overflowPx > 1) {
      console.log(`  ⚠ horizontal overflow: ${overflow.overflowPx}px`)
      issues.push({ vp: vp.name, kind: 'horizontal-overflow', ...overflow })
    }

    // Walk sections, screenshot each in viewport
    for (const sec of SECTIONS) {
      const exists = await page.locator(sec.id).count()
      if (!exists) {
        issues.push({ vp: vp.name, kind: 'missing-section', sec: sec.id })
        continue
      }
      try {
        await page.locator(sec.id).scrollIntoViewIfNeeded({ timeout: 5000 })
      } catch (e) {
        issues.push({ vp: vp.name, kind: 'scroll-fail', sec: sec.id, err: e.message })
        continue
      }
      await page.waitForTimeout(450)
      const out = path.join(OUT_DIR, `${vp.name}-${sec.label}.png`)
      await page.screenshot({ path: out, fullPage: false })
      console.log(`  ${sec.label.padEnd(20)} -> ${out}`)
    }

    // Spend an extra moment on the rip+slider sequence to capture mid-state
    await page.evaluate(() => {
      const el = document.querySelector('#the-field')
      if (!el) return
      const r = el.getBoundingClientRect()
      window.scrollBy({ top: r.top - 250, behavior: 'instant' })
    })
    await page.waitForTimeout(700)
    await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}-rip-mid.png`) })

    // Nav: open mobile menu if visible
    const menuBtn = page.locator('button[aria-label*="menu" i], button[aria-controls*="menu" i], button.lg\\:hidden').first()
    if (await menuBtn.count()) {
      try {
        await menuBtn.click({ timeout: 1500 })
        await page.waitForTimeout(300)
        await page.screenshot({ path: path.join(OUT_DIR, `${vp.name}-nav-open.png`) })
        await page.keyboard.press('Escape')
      } catch (_) {
        // ignore — not all viewports show a hamburger
      }
    }
  }

  // Write a JSON report
  const report = { target: TARGET_URL, viewports: VIEWPORTS.map((v) => v.name), issues }
  fs.writeFileSync(path.join(OUT_DIR, 'report.json'), JSON.stringify(report, null, 2))

  console.log(`\n=== SUMMARY ===`)
  console.log(`Issues: ${issues.length}`)
  for (const i of issues.slice(0, 30)) console.log(`  -`, JSON.stringify(i))

  await browser.close()
})().catch((e) => {
  console.error('FATAL:', e)
  process.exit(1)
})
