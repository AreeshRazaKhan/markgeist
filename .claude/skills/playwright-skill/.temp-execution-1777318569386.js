const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({ headless: false })
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await context.newPage()

  const consoleMsgs = []
  const pageErrors = []
  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      consoleMsgs.push(`[${msg.type()}] ${msg.text()}`)
    }
  })
  page.on('pageerror', (err) => pageErrors.push(err.message))
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().endsWith('favicon.ico')) {
      consoleMsgs.push(`[${res.status()}] ${res.url()}`)
    }
  })

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 })
  await page.waitForTimeout(2500)

  // overall layout sanity
  const layout = await page.evaluate(() => {
    const errors = []
    // 1. Horizontal overflow?
    if (document.documentElement.scrollWidth > window.innerWidth + 4) {
      errors.push(`HORIZONTAL_OVERFLOW: scrollWidth=${document.documentElement.scrollWidth} viewport=${window.innerWidth}`)
    }
    // 2. Body height?
    errors.push(`PAGE_HEIGHT=${document.body.scrollHeight}`)

    // 3. Top nav visible? Ticker visible?
    const nav = document.querySelector('nav')
    const ticker = document.querySelector('[class*="bg-signal"]')
    if (nav) errors.push(`NAV: top=${nav.getBoundingClientRect().top}, h=${nav.offsetHeight}`)

    // 4. Are any sections with content positioned off-screen?
    const sections = ['hero', 'episodes', 'host', 'topics', 'tune', 'contact']
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) {
        errors.push(`MISSING_SECTION: #${id}`)
        return
      }
      const r = el.getBoundingClientRect()
      errors.push(`#${id}: y=${Math.round(r.top + window.scrollY)} h=${Math.round(r.height)}`)
    })

    // 5. Hero title text?
    const h1 = document.querySelector('section#hero h1')
    if (h1) errors.push(`H1_TEXT="${h1.textContent.replace(/\s+/g, ' ').trim()}"`)

    // 6. Cursor armed? Are inputs uncliccable?
    const html = document.documentElement
    errors.push(`HTML_CLASSES="${html.className}"`)

    // 7. Any element with mix-blend-difference covering text?
    const mbd = document.querySelectorAll('.mix-blend-difference')
    errors.push(`MIX_BLEND_COUNT=${mbd.length}`)

    // 8. Any pointer-events:none on a button/link?
    const linksWithNone = Array.from(document.querySelectorAll('a, button')).filter((el) =>
      getComputedStyle(el).pointerEvents === 'none'
    )
    if (linksWithNone.length) errors.push(`POINTER_NONE_INTERACTIVES=${linksWithNone.length}`)

    // 9. Field Report form fields work?
    const inputs = document.querySelectorAll('section#contact input')
    errors.push(`CONTACT_INPUTS=${inputs.length}`)

    // 10. Footer clocks?
    const clockEls = Array.from(document.querySelectorAll('footer span')).map((s) => s.textContent).filter((t) => /\d{2}:\d{2}:\d{2}/.test(t))
    errors.push(`CLOCKS=${clockEls.length}`)

    return errors
  })

  console.log('--- LAYOUT REPORT ---')
  layout.forEach((l) => console.log(l))

  // try to click the TUNE IN button and see if cursor hides things
  try {
    const tuneBtn = await page.$('a[href="#tune"]')
    if (tuneBtn) {
      await tuneBtn.scrollIntoViewIfNeeded()
      await tuneBtn.click()
      await page.waitForTimeout(800)
      console.log('TUNE IN click: ok')
    }
  } catch (e) {
    console.log('TUNE IN click error:', e.message)
  }

  // scroll to bottom + back top
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(1500)

  console.log('--- CONSOLE ---')
  if (!consoleMsgs.length) console.log('(clean)')
  consoleMsgs.forEach((m) => console.log(m))
  console.log('--- PAGE ERRORS ---')
  if (!pageErrors.length) console.log('(clean)')
  pageErrors.forEach((e) => console.log(e))

  await browser.close()
})()
