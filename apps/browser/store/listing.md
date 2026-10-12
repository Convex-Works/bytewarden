# Chrome Web Store listing

Field-by-field copy for the developer console. The summary comes from the manifest (`extDesc` in `src/_locales/en/messages.json`), so it changes only when a new package is uploaded.

## Store listing

**Name** (from the manifest): Bytewarden Password Manager

**Summary** (from the manifest, 108 of 132 characters):

> Open-source password manager for the server you choose. Save, generate, and autofill passwords and passkeys.

**Description:**

```text
Bytewarden is an open-source password manager for the server you choose. Enter your server's address to log in, and keep your passwords, passkeys, cards, and notes in an end-to-end encrypted vault.

WHY BYTEWARDEN
• Your server, your data: connect to a Bitwarden-compatible server you host or trust. No account with us, no data on our servers.
• End-to-end encrypted: your vault is encrypted on your device before it syncs. Your master password never leaves it.
• Open source: every line is public under GPLv3 at github.com/Convex-Works/bytewarden.

FEATURES
• Autofill logins, cards, and identities from the page or the toolbar
• Passkeys: save them to your vault and sign in without a password
• Password and passphrase generator, with email alias services
• Organize items with folders, favorites, and search
• Single sign-on, two-step login, and log in with device
• Keyboard shortcuts, a light and dark theme, and a pop-out window

Bytewarden is an independent fork of Bitwarden's open-source browser extension, maintained by Convex Works. It isn't affiliated with or endorsed by Bitwarden Inc.
```

**Category:** Privacy & Security

**Language:** English

### Graphic assets (in `screenshots/`)

| Slot               | File                         | Size       |
| ------------------ | ---------------------------- | ---------- |
| Store icon         | `icons/chrome-icon128.png`   | 128 × 128  |
| Screenshot 1       | `01-vault.png`               | 1280 × 800 |
| Screenshot 2       | `02-your-server.png`         | 1280 × 800 |
| Screenshot 3       | `03-autofill.png`            | 1280 × 800 |
| Screenshot 4       | `04-passkeys.png`            | 1280 × 800 |
| Screenshot 5       | `05-open-source.png`         | 1280 × 800 |
| Small promo tile   | `promo-small-440x280.png`    | 440 × 280  |
| Marquee promo tile | `promo-marquee-1400x560.png` | 1400 × 560 |

### Additional fields

- **Official URL:** none
- **Homepage URL:** https://github.com/Convex-Works/bytewarden
- **Support URL:** https://github.com/Convex-Works/bytewarden/issues
- **Mature content:** No

## Privacy practices

**Single purpose:**

> Bytewarden stores the user's passwords, passkeys, and other credentials in an encrypted vault synced with a server the user chooses, and fills them into websites.

**Permission justifications:**

| Permission                                    | Justification                                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `activeTab`                                   | Reads the current tab when the user opens the extension, to suggest and fill matching logins.                |
| `alarms`                                      | Schedules vault sync, the vault timeout that locks the vault, and clearing the clipboard.                    |
| `clipboardRead`                               | Reads the clipboard only to confirm and clear a copied password after the user's chosen delay.               |
| `clipboardWrite`                              | Copies usernames, passwords, and verification codes at the user's request.                                   |
| `contextMenus`                                | Adds right-click menu items to autofill and generate passwords.                                              |
| `idle`                                        | Locks the vault when the system is idle or locked, if the user turns that on.                                |
| `notifications`                               | Shows system notifications, such as login requests to approve from another device.                           |
| `offscreen`                                   | Uses an offscreen document for clipboard access and other DOM tasks the Manifest V3 service worker can't do. |
| `scripting`                                   | Injects the autofill scripts into pages to detect forms and fill credentials.                                |
| `sidePanel`                                   | Lets the user open the vault in the browser's side panel.                                                    |
| `storage`                                     | Stores settings and the encrypted vault cache on the device.                                                 |
| `tabs`                                        | Matches the active tab's address to saved logins and updates the toolbar badge with the number of matches.   |
| `unlimitedStorage`                            | Large vaults and attachments can exceed the default storage quota.                                           |
| `webNavigation`                               | Detects page and frame loads so autofill works in every frame, including single-page apps.                   |
| `webRequest`                                  | Detects submitted login forms to offer to save or update a login.                                            |
| `webRequestAuthProvider`                      | Fills HTTP basic authentication prompts with saved credentials.                                              |
| Host permission (`http://*/*`, `https://*/*`) | Autofill has to work on any website the user has a login for, and the user's server can be at any address.   |
| Optional `nativeMessaging`                    | Asked for only when the user turns on unlocking with the desktop app's biometrics.                           |
| Optional `privacy`                            | Asked for only when the user chooses to turn off the browser's built-in password manager.                    |

**Remote code:** No, I am not using remote code. (All JavaScript and the WebAssembly SDK are bundled in the package.)

**Data usage.** Data is sent only to the server the user enters, encrypted where it contains vault content. Convex Works receives none of it. Disclose:

- [x] Personally identifiable information: the email address used to log in
- [x] Authentication information: a master password hash, and login credentials stored in the encrypted vault
- [x] Website content: login forms are read locally to autofill them

Leave the others unchecked: health, financial and payment information (cards are stored only inside the encrypted vault), personal communications, location, web history, and user activity.

Certify all three statements:

- [x] I do not sell or transfer user data to third parties, outside of the approved use cases
- [x] I do not use or transfer user data for purposes that are unrelated to my item's single purpose
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes

**Privacy policy URL:** https://github.com/Convex-Works/bytewarden/blob/main/PRIVACY.md (the link works once `PRIVACY.md` is pushed to `main`)
