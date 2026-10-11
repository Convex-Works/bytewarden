// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { Jsonify } from "type-fest";

import { MasterPasswordPolicyOptions } from "@bytewarden/common/admin-console/models/domain/master-password-policy-options";
import { AuthenticationType } from "@bytewarden/common/auth/enums/authentication-type";
import { TokenTwoFactorRequest } from "@bytewarden/common/auth/models/request/identity-token/token-two-factor.request";
import { PasswordPreloginData } from "@bytewarden/common/auth/password-prelogin";
import { WebAuthnLoginAssertionResponseRequest } from "@bytewarden/common/auth/services/webauthn-login/request/webauthn-login-assertion-response.request";
import { UserKey } from "@bytewarden/common/types/key";
// eslint-disable-next-line no-restricted-imports
import { SymmetricCryptoKey } from "@bytewarden/legacy-crypto";

export class PasswordLoginCredentials {
  readonly type = AuthenticationType.Password;

  constructor(
    public email: string,
    public masterPassword: string,
    public twoFactor?: TokenTwoFactorRequest,
    public masterPasswordPoliciesFromOrgInvite?: MasterPasswordPolicyOptions,

    /** Prefetched prelogin data. If provided, skips the prelogin API call during login. */
    public preFetchedPreloginData?: PasswordPreloginData,
  ) {}
}

export class SsoLoginCredentials {
  readonly type = AuthenticationType.Sso;

  constructor(
    public code: string,
    public codeVerifier: string,
    public redirectUrl: string,
    public orgId: string,
    /**
     * Optional email address for SSO login.
     * Used for looking up 2FA token on clients that support remembering 2FA token.
     */
    public email?: string,
    public twoFactor?: TokenTwoFactorRequest,
  ) {}
}

export class UserApiLoginCredentials {
  readonly type = AuthenticationType.UserApiKey;

  constructor(
    public clientId: string,
    public clientSecret: string,
  ) {}
}

export class AuthRequestLoginCredentials {
  readonly type = AuthenticationType.AuthRequest;

  constructor(
    public email: string,
    public accessCode: string,
    public authRequestId: string,
    public decryptedUserKey: UserKey | null,
    public twoFactor?: TokenTwoFactorRequest,
  ) {}

  static fromJSON(json: Jsonify<AuthRequestLoginCredentials>) {
    return Object.assign(
      new AuthRequestLoginCredentials(
        json.email,
        json.accessCode,
        json.authRequestId,
        null,
        json.twoFactor
          ? new TokenTwoFactorRequest(
              json.twoFactor.provider,
              json.twoFactor.token,
              json.twoFactor.remember,
            )
          : json.twoFactor,
      ),
      {
        decryptedUserKey: SymmetricCryptoKey.fromJSON(json.decryptedUserKey) as UserKey,
      },
    );
  }
}

export class WebAuthnLoginCredentials {
  readonly type = AuthenticationType.WebAuthn;

  constructor(
    public token: string,
    public deviceResponse: WebAuthnLoginAssertionResponseRequest,
    public prfKey?: SymmetricCryptoKey,
  ) {}

  static fromJSON(json: Jsonify<WebAuthnLoginCredentials>) {
    return new WebAuthnLoginCredentials(
      json.token,
      Object.assign(
        Object.create(WebAuthnLoginAssertionResponseRequest.prototype),
        json.deviceResponse,
      ),
      SymmetricCryptoKey.fromJSON(json.prfKey),
    );
  }
}
