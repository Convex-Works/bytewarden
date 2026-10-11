import { AutofillOverlayPort } from "../../../enums/autofill-overlay.enum";

import { AutofillInlineMenuIframeElement } from "./autofill-inline-menu-iframe-element";

export class AutofillInlineMenuButtonIframe extends AutofillInlineMenuIframeElement {
  constructor(element: HTMLElement) {
    super(
      element,
      AutofillOverlayPort.Button,
      {
        background: "transparent",
        border: "none",
        colorScheme: "auto",
      },
      chrome.i18n.getMessage("bytewardenOverlayButton"),
      chrome.i18n.getMessage("bytewardenOverlayMenuAvailable"),
    );
  }
}
