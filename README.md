<p align="center"><img src="branding/lockup.svg" alt="Bytewarden" width="360" /></p>

# Bytewarden

Bytewarden is an independent GPLv3 fork of Bitwarden's open-source browser extension.

## Develop and build

Use the Node version in `.nvmrc` and npm 11.

```sh
npm ci
npm run build
```

Load `apps/browser/build` as an unpacked extension in Chrome or another Chromium browser. For Firefox, run `npm run build:firefox`, then load `apps/browser/build/manifest.json` through `about:debugging`.

```sh
npm run test:types
npm test -- --selectProjects browser --runInBand
npm run dist
```

The Chrome distribution archive is written to `apps/browser/dist/dist-chrome.zip`. Existing Bitwarden and compatible self-hosted server endpoints remain supported; select the server on the login screen. This repository contains the browser extension and its shared libraries, without commercial modules. Desktop biometric and shared-unlock features require a native host configured to allow Bytewarden’s new extension ID; the stock Bitwarden host allows its own extension IDs.

## Source and license

Upstream checkpoint: [`browser-v2026.9.3`](https://github.com/bitwarden/clients/releases/tag/browser-v2026.9.3), commit `8246ae9c9a484a0a69f8b27203034555fb872523`.

See `LICENSE_GPL.txt` and `NOTICE.txt`. Bytewarden uses only the GPL SDK package, `@bitwarden/sdk-internal`. The restricted commercial code and its dependency are excluded.

Bytewarden is independently maintained and is not affiliated with or endorsed by Bitwarden Inc.
