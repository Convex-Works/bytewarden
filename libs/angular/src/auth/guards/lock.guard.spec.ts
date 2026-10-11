import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MockProxy, mock } from "jest-mock-extended";
import { BehaviorSubject, of } from "rxjs";

import { Account, AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { AuthService } from "@bytewarden/common/auth/abstractions/auth.service";
import { UserVerificationService } from "@bytewarden/common/auth/abstractions/user-verification/user-verification.service.abstraction";
import { AuthenticationStatus } from "@bytewarden/common/auth/enums/authentication-status";
import { ClientType } from "@bytewarden/common/enums";
import { DeviceTrustServiceAbstraction } from "@bytewarden/common/key-management/device-trust/abstractions/device-trust.service.abstraction";
import { KeyConnectorService } from "@bytewarden/common/key-management/key-connector/abstractions/key-connector.service";
import { KeyConnectorDomainConfirmation } from "@bytewarden/common/key-management/key-connector/models/key-connector-domain-confirmation";
import { VaultTimeoutSettingsService } from "@bytewarden/common/key-management/vault-timeout";
import { MessagingService } from "@bytewarden/common/platform/abstractions/messaging.service";
import { PlatformUtilsService } from "@bytewarden/common/platform/abstractions/platform-utils.service";
import { mockAccountInfoWith } from "@bytewarden/common/spec";
import { UserId } from "@bytewarden/common/types/guid";
import { KeyService } from "@bytewarden/key-management";

import { EmptyComponent } from "../../platform/guard/feature-flag.guard.spec";

import { lockGuard } from "./lock.guard";

interface SetupParams {
  authStatus: AuthenticationStatus;
  canLock?: boolean;
  clientType?: ClientType;
  everHadUserKey?: boolean;
  supportsDeviceTrust?: boolean;
  hasMasterPassword?: boolean;
}

describe("lockGuard", () => {
  const keyConnectorService = mock<KeyConnectorService>();

  const setup = (setupParams: SetupParams) => {
    const authService: MockProxy<AuthService> = mock<AuthService>();
    authService.authStatusFor$.mockReturnValue(of(setupParams.authStatus));

    const vaultTimeoutSettingsService: MockProxy<VaultTimeoutSettingsService> =
      mock<VaultTimeoutSettingsService>();
    vaultTimeoutSettingsService.canLock.mockResolvedValue(setupParams.canLock ?? true);

    const keyService: MockProxy<KeyService> = mock<KeyService>();
    keyService.everHadUserKey$.mockReturnValue(of(setupParams.everHadUserKey ?? true));

    const platformUtilService: MockProxy<PlatformUtilsService> = mock<PlatformUtilsService>();
    platformUtilService.getClientType.mockReturnValue(setupParams.clientType ?? ClientType.Web);

    const messagingService: MockProxy<MessagingService> = mock<MessagingService>();

    const deviceTrustService: MockProxy<DeviceTrustServiceAbstraction> =
      mock<DeviceTrustServiceAbstraction>();
    deviceTrustService.supportsDeviceTrust$ = of(setupParams.supportsDeviceTrust ?? false);

    const userVerificationService: MockProxy<UserVerificationService> =
      mock<UserVerificationService>();
    userVerificationService.hasMasterPassword.mockResolvedValue(
      setupParams.hasMasterPassword ?? true,
    );

    keyConnectorService.requiresDomainConfirmation$.mockReturnValue(of(null));

    const accountService: MockProxy<AccountService> = mock<AccountService>();
    const activeAccountSubject = new BehaviorSubject<Account | null>(null);
    accountService.activeAccount$ = activeAccountSubject;
    activeAccountSubject.next({
      id: "test-id" as UserId,
      ...mockAccountInfoWith({
        name: "Test User 1",
        email: "test@email.com",
      }),
    });

    const testBed = TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "", component: EmptyComponent },
          { path: "lock", component: EmptyComponent, canActivate: [lockGuard()] },
          { path: "non-lock-route", component: EmptyComponent },
          { path: "confirm-key-connector-domain", component: EmptyComponent },
        ]),
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: MessagingService, useValue: messagingService },
        { provide: AccountService, useValue: accountService },
        { provide: VaultTimeoutSettingsService, useValue: vaultTimeoutSettingsService },
        { provide: KeyService, useValue: keyService },
        { provide: PlatformUtilsService, useValue: platformUtilService },
        { provide: DeviceTrustServiceAbstraction, useValue: deviceTrustService },
        { provide: UserVerificationService, useValue: userVerificationService },
        { provide: KeyConnectorService, useValue: keyConnectorService },
      ],
    });

    return {
      router: testBed.inject(Router),
      messagingService,
    };
  };

  it("should be created", () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
    });
    expect(router).toBeTruthy();
  });

  it("should redirect to the root route when the user is Unlocked", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Unlocked,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/");
  });

  it("should redirect to the root route when the user is LoggedOut", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.LoggedOut,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/");
  });

  it("should allow navigation to the lock route when the user is Locked and they can lock", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: true,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/lock");
  });

  it("should allow navigation to the lock route when the user is locked, they can lock, and device trust is not supported", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: true,
      supportsDeviceTrust: false,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/lock");
  });

  it("should not allow navigation to the lock route when canLock is false", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: false,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/");
  });

  it("should allow navigation to the lock route when device trust is supported, the user has a MP, and the user is coming from the login-initiated page", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: true,
      clientType: ClientType.Web,
      everHadUserKey: false,
      supportsDeviceTrust: true,
      hasMasterPassword: true,
    });

    await router.navigate(["lock"], { queryParams: { from: "login-initiated" } });
    expect(router.url).toBe("/lock?from=login-initiated");
  });

  it("should allow navigation to the lock route when TDE is disabled, the user doesn't have a MP, and the user has had a user key", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: true,
      supportsDeviceTrust: false,
      hasMasterPassword: false,
      everHadUserKey: true,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/lock");
  });

  it("should not allow navigation to the lock route when device trust is supported and the user has not ever had a user key", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: true,
      clientType: ClientType.Web,
      everHadUserKey: false,
      supportsDeviceTrust: true,
      hasMasterPassword: false,
    });

    await router.navigate(["lock"]);
    expect(router.url).toBe("/");
  });

  it("should redirect to the confirm-key-connector-domain route when the auth status is locked, can't lock and requires key connector domain confirmation", async () => {
    const { router } = setup({
      authStatus: AuthenticationStatus.Locked,
      canLock: false,
    });
    keyConnectorService.requiresDomainConfirmation$.mockReturnValue(
      of({
        keyConnectorUrl: "https://example.com",
      } as KeyConnectorDomainConfirmation),
    );

    await router.navigate(["lock"]);
    expect(router.url).toBe("/confirm-key-connector-domain");
  });
});
