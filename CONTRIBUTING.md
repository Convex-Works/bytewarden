# Contributing to Bytewarden

Start with the build instructions in [README.md](README.md). Keep changes compatible with the GPL-only browser build and preserve upstream copyright notices.

Before opening a pull request, run:

```sh
npm run test:types
npm test -- --selectProjects browser --runInBand
npm run lint
npm run build
```

Use the [Bytewarden issue tracker](https://github.com/Convex-Works/bytewarden/issues) for bugs and feature proposals. Report vulnerabilities through the process in [SECURITY.md](SECURITY.md).

The [upstream contributor documentation](https://contributing.bitwarden.com/getting-started/clients/browser/) describes the architecture inherited from Bitwarden; this fork's build and branding instructions take precedence.
