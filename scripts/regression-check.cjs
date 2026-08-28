const { chromium } = require("playwright");

const BASE_URL = "http://localhost:3000";
const NAVIGATION_TIMEOUT_MS = 60000;
const ALLOWED_CONSOLE_PATTERNS = [
  /ERR_NETWORK_ACCESS_DENIED/,
  /ERR_FAILED/,
  /Failed to load resource/,
  /Largest Contentful Paint/,
  /Unrecognized feature: 'web-share'/,
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
  await page.waitForFunction(
    () => document.documentElement.dataset.themeReady === "true",
    null,
    { timeout: 30000 }
  );
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
  await page.evaluate(() => localStorage.removeItem("theme"));
  await page.reload({ waitUntil: "domcontentloaded", timeout: NAVIGATION_TIMEOUT_MS });
  await waitForHydration(page);

  const toggle = page.locator("button[aria-label^='Switch to']").first();
  await toggle.waitFor({ state: "visible" });
  const initialLabel = await toggle.getAttribute("aria-label");
  await toggle.evaluate((button) => button.click());
  await page.waitForTimeout(250);
  const afterClick = await page.evaluate(() => ({
    isDark: document.documentElement.classList.contains("dark"),
    stored: localStorage.getItem("theme"),
    label: document.querySelector("button[aria-label^='Switch to']")?.getAttribute("aria-label"),
  }));
  assert(
    afterClick.stored === (afterClick.isDark ? "dark" : "light"),
    `${label}: theme toggle did not persist the applied theme (${JSON.stringify(afterClick)})`
  );
  assert(
    afterClick.label !== initialLabel,
    `${label}: theme toggle aria-label did not change after click`
  );

  await page.reload({ waitUntil: "domcontentloaded", timeout: NAVIGATION_TIMEOUT_MS });
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

async function verifyAccessibilityBasics(page, label) {
  const landmarks = await page.evaluate(() => ({
    skipHref: document.querySelector(".skip-link")?.getAttribute("href"),
    mainCount: document.querySelectorAll("main#content").length,
    headerCount: document.querySelectorAll("header").length,
    navLabels: Array.from(document.querySelectorAll("nav")).map((nav) =>
      nav.getAttribute("aria-label")
    ),
    unnamedButtons: Array.from(document.querySelectorAll("button")).filter((button) => {
      const text = button.textContent?.trim();
      return !text && !button.getAttribute("aria-label");
    }).length,
    imagesWithoutAlt: Array.from(document.querySelectorAll("img")).filter(
      (img) => !img.hasAttribute("alt")
    ).length,
  }));

  assert(landmarks.skipHref === "#content", `${label}: skip link does not target main content`);
  assert(landmarks.mainCount === 1, `${label}: expected one main#content landmark`);
  assert(landmarks.headerCount === 1, `${label}: expected one header landmark`);
  assert(
    landmarks.navLabels.every(Boolean),
    `${label}: every nav landmark needs an aria-label (${JSON.stringify(landmarks.navLabels)})`
  );
  assert(landmarks.unnamedButtons === 0, `${label}: found unnamed icon-only buttons`);
  assert(landmarks.imagesWithoutAlt === 0, `${label}: found images without alt attributes`);

  await page.keyboard.press("Home");
  await page.keyboard.press("Tab");
  await page.waitForTimeout(500);
  const skipFocus = await page.evaluate(() => {
    const active = document.activeElement;
    if (!active?.classList.contains("skip-link")) return null;
    const styles = getComputedStyle(active);
    const rect = active.getBoundingClientRect();
    return {
      outlineStyle: styles.outlineStyle,
      outlineWidth: styles.outlineWidth,
      top: rect.top,
      bottom: rect.bottom,
      viewportHeight: window.innerHeight,
    };
  });
  assert(skipFocus, `${label}: skip link is not first in keyboard order`);
  assert(
    skipFocus.bottom > 0 && skipFocus.top < skipFocus.viewportHeight,
    `${label}: focused skip link is not visible (${JSON.stringify(skipFocus)})`
  );
  assert(
    skipFocus.outlineStyle !== "none" && skipFocus.outlineWidth !== "0px",
    `${label}: focused skip link has no visible outline`
  );

  const namedInteractive = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a, button")).map((element) => ({
      tag: element.tagName,
      text: element.textContent?.trim() || "",
      label: element.getAttribute("aria-label") || "",
      href: element.getAttribute("href") || "",
    }))
  );
  const unnamedInteractive = namedInteractive.filter(
    (element) => !element.text && !element.label && !element.href.startsWith("#")
  );
  assert(
    unnamedInteractive.length === 0,
    `${label}: found unnamed interactive controls ${JSON.stringify(unnamedInteractive)}`
  );
}

function luminance([red, green, blue]) {
  const [r, g, b] = [red, green, blue].map((value) => {
    const channel = value / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}

async function verifyColorContrast(page, label) {
  const samples = await page.evaluate(() => {
    const parseRgb = (value) => {
      const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/);
      if (!match) return null;
      const alpha = match[4] === undefined ? 1 : Number(match[4]);
      if (alpha === 0) return null;
      return [Number(match[1]), Number(match[2]), Number(match[3])];
    };

    const backgroundFor = (element) => {
      let current = element;
      while (current) {
        const color = parseRgb(getComputedStyle(current).backgroundColor);
        if (color) return color;
        current = current.parentElement;
      }
      return [255, 255, 255];
    };

    const selectors = [
      "#main h1",
      "#about h1",
      "#about p",
      "#experience h1",
      "#experience article",
      "#projects h1",
      "#projects article",
      "#projects button",
      "#projects a",
      "#contact a",
      "nav a",
    ];

    return selectors.flatMap((selector) =>
      Array.from(document.querySelectorAll(selector)).map((element) => ({
        selector,
        text: element.textContent?.trim().slice(0, 80),
        color: parseRgb(getComputedStyle(element).color),
        background: backgroundFor(element),
        fontSize: parseFloat(getComputedStyle(element).fontSize),
      }))
    );
  });

  for (const sample of samples) {
    if (!sample.color || !sample.background || !sample.text) continue;
    const required = sample.fontSize >= 24 ? 3 : 4.5;
    const ratio = contrastRatio(sample.color, sample.background);
    assert(
      ratio >= required,
      `${label}: low contrast ${ratio.toFixed(2)} for ${sample.selector} "${sample.text}"`
    );
  }
}

async function verifyProjectImageModal(page, label) {
  await page.getByTestId("project-image-button").first().evaluate((button) => button.click());
  const modal = page.getByTestId("image-modal-content").first();
  await modal.waitFor({ state: "visible" });
  const modalA11y = await page.evaluate(() => ({
    role: document.querySelector("[data-testid='image-modal-content']")?.getAttribute("role"),
    ariaModal: document
      .querySelector("[data-testid='image-modal-content']")
      ?.getAttribute("aria-modal"),
    activeLabel: document.activeElement?.getAttribute("aria-label"),
  }));
  assert(modalA11y.role === "dialog", `${label}: image modal is missing dialog role`);
  assert(modalA11y.ariaModal === "true", `${label}: image modal is not aria-modal`);
  assert(
    modalA11y.activeLabel?.startsWith("Close "),
    `${label}: image modal did not focus its close button`
  );
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

  await page.keyboard.press("Escape");
  await modal.waitFor({ state: "hidden" });

  await page.getByTestId("project-image-button").first().evaluate((button) => button.click());
  await modal.waitFor({ state: "visible" });
  await page.getByTestId("image-modal-backdrop").first().evaluate((backdrop) => backdrop.click());
  await modal.waitFor({ state: "hidden" });
}

async function verifyProjectVideoModal(page, label) {
  await page.getByRole("button", { name: "Video" }).first().evaluate((button) => button.click());
  const dialog = page.locator("[role='dialog'][aria-modal='true']").first();
  await dialog.waitFor({ state: "visible" });
  const state = await page.evaluate(() => ({
    labelledBy: document.querySelector("[role='dialog']")?.getAttribute("aria-labelledby"),
    activeLabel: document.activeElement?.getAttribute("aria-label"),
    iframeTitle: document.querySelector("[role='dialog'] iframe")?.getAttribute("title"),
  }));
  assert(state.labelledBy, `${label}: video modal is missing aria-labelledby`);
  assert(
    state.activeLabel?.startsWith("Close "),
    `${label}: video modal did not focus its close button`
  );
  assert(state.iframeTitle?.endsWith(" video"), `${label}: video iframe is missing a title`);

  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "hidden" });
}

async function verifyContactSection(page, label) {
  const contact = page.locator("#contact");
  await contact.waitFor({ state: "visible" });
  const hasFooterLinks = await contact.locator("footer a").count();
  assert(hasFooterLinks > 0, `${label}: blank contact section is missing footer links`);
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
  await verifyAccessibilityBasics(page, label);
  await verifyColorContrast(page, label);
  await verifyCanvas(page, label);
  console.log(`layout ${label}`);
  await verifyThemeToggle(page, label);
  console.log(`theme ${label}`);
  await verifyProjectImageModal(page, label);
  await verifyProjectVideoModal(page, label);
  console.log(`modals ${label}`);
  await verifyContactSection(page, label);
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
