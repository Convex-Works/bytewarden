// eslint-disable-next-line no-restricted-imports
import { SignedSecurityState } from "@bytewarden/legacy-crypto";

export class SecurityStateRequest {
  constructor(
    readonly securityState: SignedSecurityState,
    readonly securityVersion: number,
  ) {}
}
