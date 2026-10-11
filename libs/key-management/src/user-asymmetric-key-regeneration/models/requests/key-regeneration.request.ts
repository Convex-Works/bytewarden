// eslint-disable-next-line no-restricted-imports
import { EncString } from "@bytewarden/legacy-crypto";

export class KeyRegenerationRequest {
  userPublicKey: string;
  userKeyEncryptedUserPrivateKey: EncString;

  constructor(userPublicKey: string, userKeyEncryptedUserPrivateKey: EncString) {
    this.userPublicKey = userPublicKey;
    this.userKeyEncryptedUserPrivateKey = userKeyEncryptedUserPrivateKey;
  }
}
