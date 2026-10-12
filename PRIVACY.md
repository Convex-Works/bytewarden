# Bytewarden privacy policy

_Last updated: October 12, 2026_

Bytewarden is an open-source browser extension maintained by Convex Works. This policy explains what the extension does with your data. The source code is public at https://github.com/Convex-Works/bytewarden, so you can check every statement below.

## Summary

- Convex Works doesn't run a Bytewarden server and doesn't receive, store, or sell your data.
- Your vault is encrypted on your device before it leaves the extension. Only you hold the key.
- The extension talks to the server you enter at login, and to a few third-party services only when you use the features that need them.

## The server you choose

To log in, you enter the address of a Bitwarden-compatible server, such as one you host yourself. The extension sends that server what it needs to run your account:

- Your email address and a hash derived from your master password, used to authenticate you. Your master password itself never leaves your device.
- Your vault, encrypted on your device. The server can't read its contents.
- Device and app information used to manage your sessions, such as device type and app version.
- Website domains for which the extension requests icons, if website icons are turned on.

That server's operator, not Convex Works, controls and is responsible for the data stored there. Review their privacy policy.

## Data that stays on your device

Bytewarden reads the login, card, and identity forms on the pages you visit so it can offer and perform autofill. It reads the current tab's address to suggest matching logins. It processes this information locally and doesn't send page content or your browsing history to Convex Works or to your server.

Settings and your encrypted vault are cached in the browser's extension storage on your device.

## Third-party services you can choose to use

- **Exposed password checks.** When you check a password against known breaches, the extension sends the first five characters of the password's SHA-1 hash to the Have I Been Pwned API (`api.pwnedpasswords.com`). The full password and its full hash are never sent.
- **Email alias services.** If you set up a forwarding service in the generator (such as SimpleLogin, addy.io, Firefox Relay, DuckDuckGo, Fastmail, or Forward Email), the extension sends the API key you entered to that service to create aliases.
- **Phishing blocklists.** When phishing detection is on, the extension downloads public lists of known phishing sites and checks sites against them on your device. The sites you visit aren't sent anywhere.

## What we don't do

- No analytics, advertising, or tracking.
- No selling or sharing of your data.
- No use of your data for anything unrelated to the extension's single purpose of managing and filling your credentials.

## Contact

Questions or concerns: open an issue at https://github.com/Convex-Works/bytewarden/issues.
