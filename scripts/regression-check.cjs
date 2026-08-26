const { chromium } = require("playwright");

const BASE_URL = "http://localhost:3000";
const NAVIGATION_TIMEOUT_MS = 60000;
const ALLOWED_CONSOLE_PATTERNS = [
  /ERR_NETWORK_ACCESS_DENIED/,
  /ERR_FAILED/,
  /Failed to load resource/,
  /Largest Contentful Paint/,
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function isAllowedConsoleMessage(message) {
  const text = message.text();
  return ALLOWED_CONSOLE_PATTERNS.some((pattern) => pattern.test(text));
}

async function collectPageSignals(page) {
  const consoleProblems = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (
      (message.type() === "error" || message.type() === "warning") &&
      !isAllowedConsoleMessage(message)
    ) {
      consoleProblems.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  return { consoleProblems, pageErrors };
}

async function waitForHydration(page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForTimeout(800);
}

async function verifySections(page, label) {
  const ids = ["main", "about", "experience", "projects", "contact"];
  for (const id of ids) {
    const visible = await page.locator(`#${id}`).isVisible();
    assert(visible, `${label}: #${id} is not visible`);
  }
}

async function verifyNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  assert(
    overflow.scrollWidth <= overflow.clientWidth + 1,
    `${label}: horizontal overflow (${overflow.scrollWidth} > ${overflow.clientWidth})`
  );
}

async function verifyCanvas(page, label) {
  await page.waitForFunction(() => {
    const hero = document.querySelector("#main");
    const canvas = document.querySelector("canvas");
    if (!hero || !canvas) return false;
    const rect = hero.getBoundingClientRect();
    return (
      Math.abs(canvas.width - rect.width) <= 1 &&
      Math.abs(canvas.height - rect.height) <= 1
    );
  }, null, { timeout: 10000 });
  await page.waitForTimeout(500);
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector("#main");
    const canvas = document.querySelector("canvas");
    if (!hero || !canvas) return null;
    const heroRect = hero.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    const sample = ctx.getImageData(
      Math.max(0, Math.floor(canvas.width / 2) - 10),
      Math.max(0, Math.floor(canvas.height / 2) - 10),
      20,
      20
    ).data;
    let litPixels = 0;
    for (let i = 0; i < sample.length; i += 4) {
      if (sample[i] || sample[i + 1] || sample[i + 2]) litPixels += 1;
    }
    return {
      heroWidth: heroRect.width,
      heroHeight: heroRect.height,
      canvasCssWidth: canvasRect.width,
      canvasCssHeight: canvasRect.height,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      litPixels,
    };
  });

  assert(metrics, `${label}: missing hero canvas`);
  assert(
    Math.abs(metrics.canvasCssWidth - metrics.heroWidth) <= 1 &&
      Math.abs(metrics.canvasCssHeight - metrics.heroHeight) <= 1,
    `${label}: canvas CSS box does not fill hero (${JSON.stringify(metrics)})`
  );
  assert(
    Math.abs(metrics.canvasWidth - metrics.heroWidth) <= 1 &&
      Math.abs(metrics.canvasHeight - metrics.heroHeight) <= 1,
    `${label}: canvas drawing buffer does not match hero (${JSON.stringify(metrics)})`
  );
  assert(metrics.litPixels > 0, `${label}: canvas pixel sample stayed blank`);
}

async function verifyThemeToggle(page, label) {
  const toggle = page.locator("button[aria-label^='Switch to']").first();
  await toggle.waitFor({ state: "visible" });

  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload();
  await waitForHydration(page);

  const initialLabel = await toggle.getAttribute("aria-label");
  await toggle.click();
  await page.waitForTimeout(250);
  const afterClick = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
    label: document.querySelector("button[aria-label^='Switch to']")?.getAttribute("aria-label"),
  }));
  assert(
    afterClick.stored === (afterClick.isDark ? "dark" : "light"),
    `${label}: theme toggle did not persist the applied theme`
  );
  assert(
    afterClick.label !== initialLabel,
    `${label}: theme toggle aria-label did not change after click`
  );

  await page.reload();
  await waitForHydration(page);
  const afterReload = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
  }));
  assert(
    afterReload.stored === afterClick.stored &&
      afterReload.isDark === afterClick.isDark,
    `${label}: persisted theme did not survive reload`
  );
}

async function verifyProjectImageModal(page, label) {
  await page.locator("[class*='project_image'] img").first().evaluate((image) => image.click());
  const modal = page.locator("[class*='top_layer']").first();
  await modal.waitFor({ state: "visible" });
  const geometry = await modal.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
    };
  });
  assert(
    Math.abs((geometry.left + geometry.right) / 2 - geometry.viewportWidth / 2) <= 1,
    `${label}: project image modal is not horizontally centered`
  );
  assert(
    Math.abs((geometry.top + geometry.bottom) / 2 - geometry.viewportHeight / 2) <= 1,
    `${label}: project image modal is not vertically centered`
  );

  await page.locator("[class*='bottom_layer']").first().evaluate((backdrop) => backdrop.click());
  await modal.waitFor({ state: "hidden" });
}

async function verifyContactNotice(page, label) {
  await page.locator("#contact button, #contact input[type='submit']").last().evaluate((button) => button.click());
  const notice = page.getByText("Please fill out all the fields");
  await notice.waitFor({ state: "visible", timeout: 3000 });
  assert(await notice.isVisible(), `${label}: contact validation notice did not appear`);
}

async function runScenario(browser, scenario) {
  const context = await browser.newContext({
    viewport: scenario.viewport,
    isMobile: scenario.mobile,
    hasTouch: scenario.mobile,
    colorScheme: scenario.colorScheme,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const signals = await collectPageSignals(page);
  const label = `${scenario.name} ${scenario.colorScheme}`;

  console.log(`start ${label}`);
  await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: NAVIGATION_TIMEOUT_MS,
  });
  await waitForHydration(page);
  console.log(`loaded ${label}`);
  await verifySections(page, label);
  await verifyNoHorizontalOverflow(page, label);
  await verifyCanvas(page, label);
  console.log(`layout ${label}`);
  await verifyThemeToggle(page, label);
  console.log(`theme ${label}`);
  await verifyProjectImageModal(page, label);
  console.log(`modal ${label}`);
  await verifyContactNotice(page, label);
  console.log(`contact ${label}`);

  assert(signals.pageErrors.length === 0, `${label}: page errors ${signals.pageErrors.join(" | ")}`);
  assert(
    signals.consoleProblems.length === 0,
    `${label}: console problems ${signals.consoleProblems.join(" | ")}`
  );

  await context.close();
  console.log(`pass ${label}`);
  return label;
}

async function verifySystemPreference(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  console.log("start system preference dark");
  await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: NAVIGATION_TIMEOUT_MS,
  });
  await waitForHydration(page);
  await page.waitForFunction(
    () =>
      document
        .querySelector("button[aria-label^='Switch to']")
        ?.getAttribute("aria-label") === "Switch to light mode",
    null,
    { timeout: 10000 }
  );
  const state = await page.evaluate(() => ({
    stored: localStorage.getItem("theme"),
    isDark: document.documentElement.classList.contains("dark"),
    label: document.querySelector("button[aria-label^='Switch to']")?.getAttribute("aria-label"),
  }));
  assert(state.stored === null, "system preference check unexpectedly had stored theme");
  assert(state.isDark, "system preference dark mode did not apply root .dark");
  assert(
    state.label === "Switch to light mode",
    `system preference dark mode did not sync toggle label (${JSON.stringify(state)})`
  );
  await context.close();
  console.log("pass system preference dark");
  return "system preference dark";
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  if (process.argv.includes("--system-only")) {
    try {
      const passed = [await verifySystemPreference(browser)];
      console.log(JSON.stringify({ passed }, null, 2));
    } finally {
      await browser.close();
    }
    return;
  }

  const scenarios = [
    { name: "desktop", viewport: { width: 1440, height: 900 }, mobile: false, colorScheme: "light" },
    { name: "desktop", viewport: { width: 1440, height: 900 }, mobile: false, colorScheme: "dark" },
    { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true, colorScheme: "light" },
    { name: "mobile", viewport: { width: 390, height: 844 }, mobile: true, colorScheme: "dark" },
  ];

  try {
    const passed = [];
    for (const scenario of scenarios) {
      passed.push(await runScenario(browser, scenario));
    }
    passed.push(await verifySystemPreference(browser));
    console.log(JSON.stringify({ passed }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
