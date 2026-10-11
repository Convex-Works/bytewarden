import { VaultMessages } from "@bytewarden/common/vault/enums/vault-messages.enum";

(function (globalContext) {
  globalContext.postMessage({ command: VaultMessages.HasBwInstalled });
})(window);
