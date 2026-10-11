# Bytewarden browser extension

The Bytewarden extension uses Angular and the WebExtension API.

From the repository root:

```sh
npm ci
npm run build
```

Load `apps/browser/build` as an unpacked Chromium extension. Run `npm run build:firefox` for Firefox, and load `apps/browser/build/manifest.json` through `about:debugging`.

See the [main README](../../README.md) for licensing, upstream provenance, branding, and validation commands.
