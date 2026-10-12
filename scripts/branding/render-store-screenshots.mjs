// Renders branding/store/slides.html into Chrome Web Store screenshots and promo tiles.
// Needs a Chromium-based browser; set BROWSER to its executable if it isn't found.
import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { extname, join, normalize } from "node:path";

const outputs = [
  ["slide-1", "01-vault.png"],
  ["slide-2", "02-your-server.png"],
  ["slide-3", "03-autofill.png"],
  ["slide-4", "04-passkeys.png"],
  ["slide-5", "05-open-source.png"],
  ["tile-small", "promo-small-440x280.png"],
  ["tile-marquee", "promo-marquee-1400x560.png"],
];
const outDir = "apps/browser/store/screenshots";

const browser =
  process.env.BROWSER ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    "/usr/bin/chromium",
    "/usr/bin/google-chrome",
  ].find(existsSync);
if (!browser) {
  throw new Error("No Chromium-based browser found. Set BROWSER to its executable path.");
}

const types = {
  ".html": "text/html",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
const server = createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).slice(1);
  if (path.startsWith("..") || !existsSync(path)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
  res.end(readFileSync(path));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const pageUrl = `http://127.0.0.1:${server.address().port}/branding/store/slides.html`;

const profile = mkdtempSync(join(tmpdir(), "bytewarden-store-"));
const chrome = spawn(browser, [
  "--headless=new",
  "--remote-debugging-port=0",
  `--user-data-dir=${profile}`,
  "--hide-scrollbars",
  "--no-first-run",
  "about:blank",
]);
const devtools = await new Promise((resolve, reject) => {
  chrome.stderr.on("data", (data) => {
    const match = String(data).match(/DevTools listening on (ws:\/\/\S+)/);
    if (match) {
      resolve(match[1]);
    }
  });
  chrome.on("exit", () => reject(new Error("The browser exited before DevTools was ready.")));
});

const socket = new WebSocket(devtools);
await new Promise((resolve) => (socket.onopen = resolve));
let nextId = 0;
const pending = new Map();
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  pending.get(message.id)?.(message);
};
const send = (method, params = {}, sessionId) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    socket.send(JSON.stringify({ id, method, params, sessionId }));
  });

const { result: target } = await send("Target.createTarget", { url: "about:blank" });
const {
  result: { sessionId },
} = await send("Target.attachToTarget", { targetId: target.targetId, flatten: true });
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: 1400, height: 800, deviceScaleFactor: 1, mobile: false },
  sessionId,
);
await send("Page.enable", {}, sessionId);
await send("Page.navigate", { url: pageUrl }, sessionId);
await send(
  "Runtime.evaluate",
  {
    expression:
      "new Promise((r) => (document.readyState === 'complete' ? r() : addEventListener('load', r))).then(() => document.fonts.ready)",
    awaitPromise: true,
  },
  sessionId,
);

mkdirSync(outDir, { recursive: true });
for (const [id, file] of outputs) {
  const {
    result: { result },
  } = await send(
    "Runtime.evaluate",
    {
      expression: `(() => { const b = document.getElementById("${id}").getBoundingClientRect(); return { x: b.x + scrollX, y: b.y + scrollY, width: b.width, height: b.height }; })()`,
      returnByValue: true,
    },
    sessionId,
  );
  const shot = await send(
    "Page.captureScreenshot",
    { format: "png", clip: { ...result.value, scale: 1 }, captureBeyondViewport: true },
    sessionId,
  );
  writeFileSync(join(outDir, file), Buffer.from(shot.result.data, "base64"));
  console.log(`${file} ${result.value.width}×${result.value.height}`);
}

socket.close();
const exited = new Promise((resolve) => chrome.once("exit", resolve));
chrome.kill();
await exited;
server.close();
rmSync(profile, { recursive: true, force: true, maxRetries: 5 });
