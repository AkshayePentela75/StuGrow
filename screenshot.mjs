// Usage: node screenshot.mjs <url> [label] [--width=1440] [--height=900] [--full] [--scroll=px] [--reduced] [--click=css-selector]
// Saves to "./temporary screenshots/screenshot-N[-label].png" (auto-incremented).
import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const [k, v] = a.slice(2).split("=");
    return [k, v ?? true];
  }),
);
const [url = "http://localhost:3000", label] = args.filter((a) => !a.startsWith("--"));

const CHROME =
  process.env.CHROME_PATH ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(
    (p) => fs.existsSync(p),
  );

const dir = path.resolve("temporary screenshots");
fs.mkdirSync(dir, { recursive: true });
const n =
  fs
    .readdirSync(dir)
    .map((f) => Number(/^screenshot-(\d+)/.exec(f)?.[1] ?? 0))
    .reduce((a, b) => Math.max(a, b), 0) + 1;
const file = path.join(dir, `screenshot-${n}${label ? `-${label}` : ""}.png`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: Number(flags.width ?? 1440), height: Number(flags.height ?? 900), deviceScaleFactor: 1 });
if (flags.reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

// Scroll through the page so in-view animations fire, then return.
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 400) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
});
await new Promise((r) => setTimeout(r, 2200));
await page.evaluate((y) => window.scrollTo(0, y), Number(flags.scroll ?? 0));
await new Promise((r) => setTimeout(r, 600));

if (flags.click) {
  await page.click(String(flags.click));
  await new Promise((r) => setTimeout(r, 900));
}
await page.screenshot({ path: file, fullPage: Boolean(flags.full) });
await browser.close();
console.log(file);
