import DomElementVisibilityService from "../services/dom-element-visibility.service";
import { DomQueryService } from "../services/dom-query.service";
import { setupAutofillInitDisconnectAction } from "../utils";

import AutofillInit from "./autofill-init";

(function (windowContext) {
  if (!windowContext.bytewardenAutofillInit) {
    const domQueryService = new DomQueryService();
    const domElementVisibilityService = new DomElementVisibilityService();
    windowContext.bytewardenAutofillInit = new AutofillInit(
      domQueryService,
      domElementVisibilityService,
    );
    setupAutofillInitDisconnectAction(windowContext);

    windowContext.bytewardenAutofillInit.init();
  }
})(window);
