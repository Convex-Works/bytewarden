import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";

import { Resvg } from "@resvg/resvg-js";

const ink = "#0B0C0C";
const edge = "#262A28";
const paper = "#F4F6F5";
const muted = "#6F7873";
const red = "#FF3A5E";
const blue = "#3D7DFF";

const images = "apps/browser/src/images";
const svgModules = "libs/assets/src/svg/svgs";

const read = (path) => readFileSync(path, "utf8");
const png = (path) => `data:image/png;base64,${readFileSync(path).toString("base64")}`;
const num = (value) => String(Number(Number(value).toFixed(2)));

function render(svg, width) {
  return new Resvg(svg, { fitTo: { mode: "width", value: width } }).render().asPng();
}

// The logo is the kit's 48 px toolbar art as vectors: a notched ink tile with two strands of
// lit stripes. Each entry is [colour, x, y, height]; the second strand repeats 15 units right.
const stripeColors = {
  lime: "#B1E0A1",
  aqua: "#5EFDE6",
  pink: "#FFB8FF",
  rose: "#FFACBC",
  cream: "#E9FFD4",
  cyan: "#7CFFFF",
};
const stripes = [
  ["lime", 9, 6, 12],
  ["aqua", 12, 6, 12],
  ["pink", 15, 18, 9],
  ["rose", 18, 18, 9],
  ["cream", 12, 27, 15],
  ["cyan", 15, 27, 15],
];
const logo = `<path fill="${ink}" d="M3 0h42v3h3v42h-3v3H3v-3H0V3h3z"/>${stripes
  .map(
    ([color, x, y, height]) =>
      `<path fill="${stripeColors[color]}" d="M${x} ${y}h2v${height}h-2zM${x + 15} ${y}h2v${height}h-2z"/>`,
  )
  .join("")}`;
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">${logo}</svg>`;

const wordmarkSource = read("branding/wordmark.svg");
const wordmarkWidth = Number(wordmarkSource.match(/viewBox="0 0 ([\d.]+)/)[1]);
const wordmarkPath = (id) => wordmarkSource.match(new RegExp(`id="${id}"[^>]*d="([^"]+)"`))[1];
const byte = wordmarkPath("byte");
const warden = wordmarkPath("warden");

// Lockup: 64-unit tile, 16-unit gap, then the Doto wordmark at 40 units with its baseline at y=45.
const wordmarkScale = 0.4;
const lockupWidth = Math.ceil(80 + wordmarkWidth * wordmarkScale);
function lockup(wardenFill, { beta = false, background = false } = {}) {
  const width = lockupWidth + (beta ? 44 : 0);
  const paint = wardenFill.startsWith("#") ? `fill="${wardenFill}"` : `class="${wardenFill}"`;
  const backdrop = background
    ? `<rect x="-32" y="-32" width="${width + 64}" height="128" rx="24" fill="${ink}"/>`
    : "";
  const viewBox = background ? `-32 -32 ${width + 64} 128` : `0 0 ${width} 64`;
  const label = beta
    ? `<text x="${lockupWidth + 6}" y="45" ${paint} font-family="'JetBrains Mono', ui-monospace, monospace" font-size="13" font-weight="700">beta</text>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}">${backdrop}<g transform="scale(${num(64 / 48)})">${logo}</g><g transform="translate(80 ${num(45 - 69.5 * wordmarkScale)}) scale(${wordmarkScale})"><path fill="${muted}" d="${byte}"/><path ${paint} d="${warden}"/></g>${label}</svg>`;
}

const glyph = read("branding/mark-mono.svg").match(/ d="([^"]+)"/)[1];

// Minimal decoder for the kit's 8-bit RGBA, non-interlaced PNGs.
function decodePng(path) {
  const file = readFileSync(path);
  let offset = 8;
  let width = 0;
  const chunks = [];
  while (offset < file.length) {
    const length = file.readUInt32BE(offset);
    const type = file.toString("ascii", offset + 4, offset + 8);
    const data = file.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      if (data[8] !== 8 || data[9] !== 6 || data[12] !== 0) {
        throw new Error(`${path} must be an 8-bit RGBA, non-interlaced PNG`);
      }
    }
    if (type === "IDAT") {
      chunks.push(data);
    }
    offset += 12 + length;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * 4;
  const pixels = Buffer.alloc(stride * (raw.length / (stride + 1)));
  for (let y = 0; y * (stride + 1) < raw.length; y++) {
    const filter = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const value = raw[y * (stride + 1) + 1 + x];
      const left = x >= 4 ? pixels[y * stride + x - 4] : 0;
      const up = y > 0 ? pixels[(y - 1) * stride + x] : 0;
      const upLeft = x >= 4 && y > 0 ? pixels[(y - 1) * stride + x - 4] : 0;
      const paeth = () => {
        const p = left + up - upLeft;
        const [a, b, c] = [Math.abs(p - left), Math.abs(p - up), Math.abs(p - upLeft)];
        return a <= b && a <= c ? left : b <= c ? up : upLeft;
      };
      const predictor = [0, left, up, (left + up) >> 1, filter === 4 ? paeth() : 0][filter];
      pixels[y * stride + x] = (value + predictor) & 0xff;
    }
  }
  return { width, pixels };
}

// Vector copy of the hand-drawn 16px toolbar art, for places that draw the icon inline.
function pixelIcon() {
  const { width, pixels } = decodePng("branding/toolbar/icon16.png");
  let lit = "";
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      const [r, g, b] = pixels.subarray((y * width + x) * 4);
      if (r + g + b > 240) {
        const hex = [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
        lit += `<path fill="#${hex}" d="M${x} ${y}h1v1h-1z"/>`;
      }
    }
  }
  return `<rect x=".5" y=".5" width="15" height="15" rx="3.5" fill="${ink}" stroke="${edge}"/>${lit}`;
}

// Toolbar states are drawn on a 16-unit pixel grid so badges stay crisp.
const lock = ["01110", "10001", "11111", "11011", "11111"];
function pixels(rows, color, x, y, unit) {
  return rows
    .flatMap((row, j) =>
      [...row].map((cell, i) =>
        cell === "1"
          ? `<rect x="${x + i * unit}" y="${y + j * unit}" width="${unit}" height="${unit}" fill="${color}"/>`
          : "",
      ),
    )
    .join("");
}

function badge(kind, box) {
  const unit = Math.max(1, Math.round(box.size / 16));
  const right = box.x + box.size;
  const bottom = box.y + box.size;
  if (kind === "locked") {
    const x = right - 7 * unit;
    const y = bottom - 7 * unit;
    return `<rect x="${x}" y="${y}" width="${7 * unit}" height="${7 * unit}" rx="${1.5 * unit}" fill="${ink}"/>${pixels(lock, paper, x + unit, y + unit, unit)}`;
  }
  const size = kind === "beta" ? 5 : 6;
  const x = right - size * unit;
  const y = kind === "beta" ? box.y : bottom - size * unit;
  return `<rect x="${x}" y="${y}" width="${size * unit}" height="${size * unit}" rx="${unit}" fill="${ink}"/><rect x="${x + unit}" y="${y + unit}" width="${(size - 2) * unit}" height="${(size - 2) * unit}" fill="${kind === "beta" ? blue : red}"/>`;
}

// Kit art per size: the source PNG, where it sits, and the tile it belongs to.
const toolbarArt = {
  16: { source: 16, offset: [0, 0], scale: 1 },
  19: { source: 16, offset: [2, 1], scale: 1 },
  32: { source: 32, offset: [0, 0], scale: 1 },
  38: { source: 32, offset: [3, 3], scale: 1 },
  48: { source: 48, offset: [0, 0], scale: 1 },
  96: { source: 48, offset: [0, 0], scale: 2 },
  // Store guidance: 96 px of artwork with 16 px of transparent padding.
  128: { vector: true, offset: [16, 16], scale: 2, tile: { x: 16, y: 16, size: 96 } },
};

function toolbarIcon(
  size,
  { signedOut = false, locked = false, beta = false, berry = false } = {},
) {
  const art = toolbarArt[size];
  const box = art.tile ?? { x: 0, y: 0, size };
  const drawn = art.vector ? size : art.source * art.scale;
  const [dx, dy] = art.offset;
  // Larger canvases reuse smaller kit art on a full tile; clip the art's own edge so it blends in.
  const padded = drawn !== size;
  const backing = padded
    ? `<rect x=".5" y=".5" width="${size - 1}" height="${size - 1}" rx="${num(size * 0.1)}" fill="${ink}" stroke="${edge}"/>`
    : "";
  const clip = padded
    ? `<clipPath id="art"><rect x="${dx + 2}" y="${dy + 2}" width="${drawn - 4}" height="${drawn - 4}"/></clipPath>`
    : "";
  const dim = signedOut
    ? '<filter id="dim" color-interpolation-filters="sRGB"><feColorMatrix values=".12 .4 .04 0 .02 .12 .4 .04 0 .02 .12 .4 .04 0 .02 0 0 0 1 0"/></filter>'
    : "";
  const dimmed = signedOut ? ' filter="url(#dim)"' : "";
  const artwork = art.vector
    ? `<g transform="translate(${dx} ${dy}) scale(${art.scale})"${dimmed}>${logo}</g>`
    : `<image href="${png(`branding/toolbar/icon${art.source}.png`)}" x="${dx}" y="${dy}" width="${drawn}" height="${drawn}" image-rendering="optimizeSpeed"${padded ? ' clip-path="url(#art)"' : ""}${dimmed}/>`;
  const badges = [locked && "locked", berry && "berry", beta && "beta"].filter(Boolean);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><defs>${clip}${dim}</defs>${backing}${artwork}${badges.map((kind) => badge(kind, box)).join("")}</svg>`;
}

// Safari toolbar icons are template images: only the alpha channel is used.
function safariIcon(size, locked) {
  const unit = size / 18;
  const gap = locked
    ? `<rect x="${10 * unit}" y="${10 * unit}" width="${8 * unit}" height="${8 * unit}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><mask id="gap"><rect width="${size}" height="${size}" fill="#fff"/>${gap}</mask><path mask="url(#gap)" transform="translate(${unit} ${unit}) scale(${unit})" d="${glyph}"/>${locked ? pixels(lock, "#000", 12 * unit, 12 * unit, unit) : ""}</svg>`;
}

const appIcon = (size) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 48 48">${logo}</svg>`;

for (const name of readdirSync(images)) {
  const match = name.match(/^icon(\d+)(.*)\.png$/);
  if (!match) {
    continue;
  }
  const [, size, suffix] = match;
  if (suffix.includes("_safari")) {
    const scale = name.includes("@2x") ? 2 : 1;
    writeFileSync(
      join(images, name),
      render(safariIcon(Number(size) * scale, suffix.includes("_locked")), Number(size) * scale),
    );
    continue;
  }
  writeFileSync(
    join(images, name),
    render(
      toolbarIcon(Number(size), {
        signedOut: suffix.includes("_gray"),
        locked: suffix.includes("_locked"),
        beta: suffix.includes("_beta"),
      }),
      Number(size),
    ),
  );
}
for (const size of [19, 38]) {
  writeFileSync(join(images, `berry${size}.png`), render(toolbarIcon(size, { berry: true }), size));
}
// Chrome and Firefox draw the action at 16 and 32 px; ship exact-size states so the art is never resampled.
for (const size of [16, 32]) {
  for (const [suffix, state] of [
    ["_locked", { locked: true }],
    ["_locked_beta", { locked: true, beta: true }],
  ]) {
    writeFileSync(join(images, `icon${size}${suffix}.png`), render(toolbarIcon(size, state), size));
  }
  writeFileSync(join(images, `berry${size}.png`), render(toolbarIcon(size, { berry: true }), size));
}

writeFileSync("apps/browser/store/icons/chrome-icon128.png", render(toolbarIcon(128), 128));
for (const [path, size] of [
  ["apps/browser/store/icons/icon64.png", 64],
  ["apps/browser/store/icons/windows-icon300.png", 300],
  ["apps/browser/store/windows/Assets/icon_44.png", 44],
  ["apps/browser/store/windows/Assets/icon_50.png", 50],
  ["apps/browser/store/windows/Assets/icon_150.png", 150],
]) {
  writeFileSync(path, render(appIcon(size), size));
}
for (const size of [16, 32, 128]) {
  const path = `apps/browser/src/safari/desktop/Assets.xcassets/AppIcon.appiconset/icon${size}.png`;
  writeFileSync(path, render(toolbarIcon(size), size));
}
writeFileSync("libs/components/src/favicon.ico", render(toolbarIcon(32), 32));

writeFileSync("apps/browser/src/popup/images/logo-dark@2x.png", render(lockup(ink), 640));
writeFileSync("apps/browser/src/popup/images/logo-white@2x.png", render(lockup(paper), 640));

writeFileSync("branding/icon.svg", `${icon}\n`);
writeFileSync("branding/lockup.svg", `${lockup(paper, { background: true })}\n`);

// Theme-independent mark colours resolve through CSS variables in the app (see tw-theme.css).
const markVariables = {
  [ink]: "tile",
  [muted]: "byte",
  ...Object.fromEntries(Object.entries(stripeColors).map(([name, hex]) => [hex, name])),
};
const themed = (content) =>
  content.replace(
    /(fill|stroke)="(#[0-9a-f]{6})"/gi,
    (match, attribute, hex) =>
      `${attribute}="var(--color-mark-${markVariables[hex.toUpperCase()]})"`,
  );
const svgModule = (name, content) =>
  `import { svg } from "../svg";\n\nexport const ${name} = svg\`\n  ${themed(content)}\n\`;\n`;
const sized = (content, size) => content.replace("<svg ", `<svg width="${size}" height="${size}" `);
for (const [file, name, content] of [
  ["bytewarden-logo.icon.ts", "BytewardenLogo", lockup("tw-fill-marketing-logo")],
  [
    "bytewarden-logo-beta.icon.ts",
    "BytewardenLogoBeta",
    lockup("tw-fill-marketing-logo", { beta: true }),
  ],
  ["side-nav-logo.ts", "SideNavLogo", lockup("tw-fill-fg-nav")],
  ["side-nav-logo-beta.ts", "SideNavLogoBeta", lockup("tw-fill-fg-nav", { beta: true })],
  ["bytewarden-icon.ts", "BytewardenIcon", sized(icon, 20)],
  ["import-bytewarden.icon.ts", "ImportBytewardenIcon", sized(icon, 24)],
  [
    "shield.ts",
    "BytewardenShield",
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="tw-fill-fg-nav" d="${glyph}"/></svg>`,
  ],
]) {
  writeFileSync(join(svgModules, file), svgModule(name, content));
}
writeFileSync(
  "libs/assets/src/material-icons/bytewarden-shield.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${glyph}"/></svg>\n`,
);

// Inline autofill button: the toolbar art as vectors, plus a locked variant.
const inlineIcons = "apps/browser/src/autofill/utils/svg-icons.ts";
const inlineLogo = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">${pixelIcon()}</svg>`;
const inlineLockedLogo = inlineLogo.replace(
  "</svg>",
  `${badge("locked", { x: 0, y: 0, size: 16 })}</svg>`,
);
writeFileSync(
  inlineIcons,
  read(inlineIcons)
    .replace(/export const logoIcon =\n  '[^']*';/, `export const logoIcon =\n  '${inlineLogo}';`)
    .replace(
      /export const logoLockedIcon =\n  '[^']*';/,
      `export const logoLockedIcon =\n  '${inlineLockedLogo}';`,
    ),
);

console.log("Generated Bytewarden toolbar, store, Safari, popup, and in-app logo assets.");
