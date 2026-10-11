// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { APP_INITIALIZER, ErrorHandler, Injector, LOCALE_ID, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import {
  CollectionEncryptionService,
  CollectionService,
  DefaultCollectionEncryptionService,
  DefaultCollectionService,
  DefaultOrganizationUserApiService,
  DefaultOrganizationUserService,
  OrganizationUserApiService,
  OrganizationUserService,
} from "@bytewarden/admin-console/common";
// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import {
  DefaultLoginComponentService,
  DefaultLoginDecryptionOptionsService,
  DefaultNewDeviceVerificationComponentService,
  DefaultRegistrationFinishService,
  DefaultTwoFactorAuthComponentService,
  DefaultTwoFactorAuthWebAuthnComponentService,
  LoginComponentService,
  LoginDecryptionOptionsService,
  NewDeviceVerificationComponentService,
  RegistrationFinishService as RegistrationFinishServiceAbstraction,
  TwoFactorAuthComponentService,
  TwoFactorAuthWebAuthnComponentService,
} from "@bytewarden/auth/angular";
// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import {
  AuthRequestApiServiceAbstraction,
  AuthRequestService,
  AuthRequestServiceAbstraction,
  DefaultAuthRequestApiService,
  DefaultLoginSuccessHandlerService,
  DefaultLogoutService,
  InternalUserDecryptionOptionsServiceAbstraction,
  LoginEmailService,
  LoginEmailServiceAbstraction,
  LoginStrategyCacheService,
  DefaultLoginStrategyCacheService,
  LoginStrategyService,
  LoginStrategyServiceAbstraction,
  LoginStrategySessionTimeoutService,
  DefaultLoginStrategySessionTimeoutService,
  LoginSuccessHandlerService,
  LogoutReason,
  LogoutService,
  UserDecryptionOptionsService,
  UserDecryptionOptionsServiceAbstraction,
} from "@bytewarden/auth/common";
import {
  AutomaticUserConfirmationService,
  DefaultAutomaticUserConfirmationService,
} from "@bytewarden/auto-confirm";
import {
  AutomationCapability,
  AutomationDriver,
  FeatureFlagsCapability,
  LockCapability,
  LoggingCapability,
  StateCapability,
} from "@bytewarden/automation-driver";
import { ApiService as ApiServiceAbstraction } from "@bytewarden/common/abstractions/api.service";
import { AuditService as AuditServiceAbstraction } from "@bytewarden/common/abstractions/audit.service";
import { OrganizationApiServiceAbstraction } from "@bytewarden/common/admin-console/abstractions/organization/organization-api.service.abstraction";
import {
  InternalOrganizationServiceAbstraction,
  OrganizationService as OrganizationServiceAbstraction,
} from "@bytewarden/common/admin-console/abstractions/organization/organization.service.abstraction";
import { OrgDomainApiServiceAbstraction } from "@bytewarden/common/admin-console/abstractions/organization-domain/org-domain-api.service.abstraction";
import {
  OrgDomainInternalServiceAbstraction,
  OrgDomainServiceAbstraction,
} from "@bytewarden/common/admin-console/abstractions/organization-domain/org-domain.service.abstraction";
import { OrganizationManagementPreferencesService } from "@bytewarden/common/admin-console/abstractions/organization-management-preferences/organization-management-preferences.service";
import { InternalNewPolicyService } from "@bytewarden/common/admin-console/abstractions/policy/new-policy.service";
import { PolicyApiServiceAbstraction } from "@bytewarden/common/admin-console/abstractions/policy/policy-api.service.abstraction";
import {
  InternalPolicyService,
  PolicyService as PolicyServiceAbstraction,
} from "@bytewarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { ProviderApiServiceAbstraction } from "@bytewarden/common/admin-console/abstractions/provider/provider-api.service.abstraction";
import { ProviderService as ProviderServiceAbstraction } from "@bytewarden/common/admin-console/abstractions/provider.service";
import { DefaultOrganizationService } from "@bytewarden/common/admin-console/services/organization/default-organization.service";
import { OrganizationApiService } from "@bytewarden/common/admin-console/services/organization/organization-api.service";
import { OrgDomainApiService } from "@bytewarden/common/admin-console/services/organization-domain/org-domain-api.service";
import { OrgDomainService } from "@bytewarden/common/admin-console/services/organization-domain/org-domain.service";
import { DefaultOrganizationManagementPreferencesService } from "@bytewarden/common/admin-console/services/organization-management-preferences/default-organization-management-preferences.service";
import { DefaultNewPolicyService } from "@bytewarden/common/admin-console/services/policy/default-new-policy.service";
import { DefaultPolicyService } from "@bytewarden/common/admin-console/services/policy/default-policy.service";
import { PolicyApiService } from "@bytewarden/common/admin-console/services/policy/policy-api.service";
import { ProviderApiService } from "@bytewarden/common/admin-console/services/provider/provider-api.service";
import { ProviderService } from "@bytewarden/common/admin-console/services/provider.service";
import { AccountApiService as AccountApiServiceAbstraction } from "@bytewarden/common/auth/abstractions/account-api.service";
import {
  AccountService,
  AccountService as AccountServiceAbstraction,
  InternalAccountService,
} from "@bytewarden/common/auth/abstractions/account.service";
import { AnonymousHubService as AnonymousHubServiceAbstraction } from "@bytewarden/common/auth/abstractions/anonymous-hub.service";
import { AuthRequestAnsweringService } from "@bytewarden/common/auth/abstractions/auth-request-answering/auth-request-answering.service.abstraction";
import { AuthService as AuthServiceAbstraction } from "@bytewarden/common/auth/abstractions/auth.service";
import { AvatarService as AvatarServiceAbstraction } from "@bytewarden/common/auth/abstractions/avatar.service";
import { DevicesServiceAbstraction } from "@bytewarden/common/auth/abstractions/devices/devices.service.abstraction";
import { DevicesApiServiceAbstraction } from "@bytewarden/common/auth/abstractions/devices-api.service.abstraction";
import { MasterPasswordApiService as MasterPasswordApiServiceAbstraction } from "@bytewarden/common/auth/abstractions/master-password-api.service.abstraction";
import { PasswordResetEnrollmentServiceAbstraction } from "@bytewarden/common/auth/abstractions/password-reset-enrollment.service.abstraction";
import { SsoLoginServiceAbstraction } from "@bytewarden/common/auth/abstractions/sso-login.service.abstraction";
import { TokenService as TokenServiceAbstraction } from "@bytewarden/common/auth/abstractions/token.service";
import { UserVerificationApiServiceAbstraction } from "@bytewarden/common/auth/abstractions/user-verification/user-verification-api.service.abstraction";
import { UserVerificationService as UserVerificationServiceAbstraction } from "@bytewarden/common/auth/abstractions/user-verification/user-verification.service.abstraction";
import { WebAuthnLoginApiServiceAbstraction } from "@bytewarden/common/auth/abstractions/webauthn/webauthn-login-api.service.abstraction";
import { WebAuthnLoginPrfKeyServiceAbstraction } from "@bytewarden/common/auth/abstractions/webauthn/webauthn-login-prf-key.service.abstraction";
import { WebAuthnLoginServiceAbstraction } from "@bytewarden/common/auth/abstractions/webauthn/webauthn-login.service.abstraction";
import {
  DeepLinkRedirectService,
  NoopDeepLinkRedirectService,
} from "@bytewarden/common/auth/deep-link-redirect";
import {
  NoopOrganizationInviteService,
  OrganizationInviteService,
} from "@bytewarden/common/auth/organization-invite";
import {
  DefaultPasswordPreloginService,
  PasswordPreloginApiService,
  PasswordPreloginService,
} from "@bytewarden/common/auth/password-prelogin";
import { DefaultSendTokenService, SendTokenService } from "@bytewarden/common/auth/send-access";
import { AccountApiServiceImplementation } from "@bytewarden/common/auth/services/account-api.service";
import { AccountServiceImplementation } from "@bytewarden/common/auth/services/account.service";
import { AnonymousHubService } from "@bytewarden/common/auth/services/anonymous-hub.service";
import { DefaultAuthRequestAnsweringService } from "@bytewarden/common/auth/services/auth-request-answering/default-auth-request-answering.service";
import { PendingAuthRequestsStateService } from "@bytewarden/common/auth/services/auth-request-answering/pending-auth-requests.state";
import { AuthService } from "@bytewarden/common/auth/services/auth.service";
import { AvatarService } from "@bytewarden/common/auth/services/avatar.service";
import { DefaultActiveUserAccessor } from "@bytewarden/common/auth/services/default-active-user.accessor";
import { DevicesServiceImplementation } from "@bytewarden/common/auth/services/devices/devices.service.implementation";
import { DevicesApiServiceImplementation } from "@bytewarden/common/auth/services/devices-api.service.implementation";
import { MasterPasswordApiService } from "@bytewarden/common/auth/services/master-password/master-password-api.service.implementation";
import { PasswordResetEnrollmentServiceImplementation } from "@bytewarden/common/auth/services/password-reset-enrollment.service.implementation";
import { SsoLoginService } from "@bytewarden/common/auth/services/sso-login/sso-login.service";
import { TokenService } from "@bytewarden/common/auth/services/token.service";
import { UserVerificationApiService } from "@bytewarden/common/auth/services/user-verification/user-verification-api.service";
import { UserVerificationService } from "@bytewarden/common/auth/services/user-verification/user-verification.service";
import { WebAuthnLoginApiService } from "@bytewarden/common/auth/services/webauthn-login/webauthn-login-api.service";
import { WebAuthnLoginPrfKeyService } from "@bytewarden/common/auth/services/webauthn-login/webauthn-login-prf-key.service";
import { WebAuthnLoginService } from "@bytewarden/common/auth/services/webauthn-login/webauthn-login.service";
import {
  DefaultTwoFactorApiService,
  DefaultTwoFactorService,
  TwoFactorApiService,
  TwoFactorService,
} from "@bytewarden/common/auth/two-factor";
import {
  AutofillSettingsService,
  AutofillSettingsServiceAbstraction,
} from "@bytewarden/common/autofill/services/autofill-settings.service";
import {
  BadgeSettingsService,
  BadgeSettingsServiceAbstraction,
} from "@bytewarden/common/autofill/services/badge-settings.service";
import {
  DefaultDomainSettingsService,
  DomainSettingsService,
} from "@bytewarden/common/autofill/services/domain-settings.service";
import {
  BillingApiServiceAbstraction,
  OrganizationBillingServiceAbstraction,
} from "@bytewarden/common/billing/abstractions";
import { AccountBillingApiServiceAbstraction } from "@bytewarden/common/billing/abstractions/account/account-billing-api.service.abstraction";
import { BillingAccountProfileStateService } from "@bytewarden/common/billing/abstractions/account/billing-account-profile-state.service";
import { PremiumCheckoutPendingService } from "@bytewarden/common/billing/abstractions/account/premium-checkout-pending.service";
import { OrganizationMetadataServiceAbstraction } from "@bytewarden/common/billing/abstractions/organization-metadata.service.abstraction";
import { OrganizationBillingApiServiceAbstraction } from "@bytewarden/common/billing/abstractions/organizations/organization-billing-api.service.abstraction";
import { OrganizationSponsorshipApiServiceAbstraction } from "@bytewarden/common/billing/abstractions/organizations/organization-sponsorship-api.service.abstraction";
import { SubscriptionPricingServiceAbstraction } from "@bytewarden/common/billing/abstractions/subscription-pricing.service.abstraction";
import { AccountBillingApiService } from "@bytewarden/common/billing/services/account/account-billing-api.service";
import { DefaultBillingAccountProfileStateService } from "@bytewarden/common/billing/services/account/billing-account-profile-state.service";
import { DefaultPremiumCheckoutPendingService } from "@bytewarden/common/billing/services/account/default-premium-checkout-pending.service";
import { BillingApiService } from "@bytewarden/common/billing/services/billing-api.service";
import { OrganizationBillingApiService } from "@bytewarden/common/billing/services/organization/organization-billing-api.service";
import { DefaultOrganizationMetadataService } from "@bytewarden/common/billing/services/organization/organization-metadata.service";
import { OrganizationSponsorshipApiService } from "@bytewarden/common/billing/services/organization/organization-sponsorship-api.service";
import { OrganizationBillingService } from "@bytewarden/common/billing/services/organization-billing.service";
import { DefaultSubscriptionPricingService } from "@bytewarden/common/billing/services/subscription-pricing.service";
import {
  EventUploadService as EventUploadServiceAbstraction,
  EventCollectionService as EventCollectionServiceAbstraction,
} from "@bytewarden/common/dirt/event-logs";
import { EventCollectionService } from "@bytewarden/common/dirt/event-logs/services/event-collection.service";
import { EventLogApiService } from "@bytewarden/common/dirt/event-logs/services/event-log-api.service";
import { EventUploadService } from "@bytewarden/common/dirt/event-logs/services/event-upload.service";
import { PasskeyDirectoryApiService } from "@bytewarden/common/dirt/services/abstractions/passkey-directory-api.service";
import { DefaultPasskeyDirectoryApiService } from "@bytewarden/common/dirt/services/default-passkey-directory-api.service";
import { HibpApiService } from "@bytewarden/common/dirt/services/hibp-api.service";
import { AccountCryptographicStateService } from "@bytewarden/common/key-management/account-cryptography/account-cryptographic-state.service";
import { DefaultAccountCryptographicStateService } from "@bytewarden/common/key-management/account-cryptography/default-account-cryptographic-state.service";
import { DeviceTrustServiceAbstraction } from "@bytewarden/common/key-management/device-trust/abstractions/device-trust.service.abstraction";
import { DeviceTrustService } from "@bytewarden/common/key-management/device-trust/services/device-trust.service.implementation";
import { DefaultEncryptedMigrator } from "@bytewarden/common/key-management/encrypted-migrator/default-encrypted-migrator";
import { EncryptedMigrator } from "@bytewarden/common/key-management/encrypted-migrator/encrypted-migrator.abstraction";
import { KeyConnectorApiService } from "@bytewarden/common/key-management/key-connector/abstractions/key-connector-api.service";
import { KeyConnectorService as KeyConnectorServiceAbstraction } from "@bytewarden/common/key-management/key-connector/abstractions/key-connector.service";
import { DefaultKeyConnectorApiService } from "@bytewarden/common/key-management/key-connector/services/default-key-connector-api.service";
import { KeyConnectorService } from "@bytewarden/common/key-management/key-connector/services/key-connector.service";
import { KeyApiService } from "@bytewarden/common/key-management/keys/services/abstractions/key-api-service.abstraction";
import { RotateableKeySetService } from "@bytewarden/common/key-management/keys/services/abstractions/rotateable-key-set.service";
import { DefaultKeyApiService } from "@bytewarden/common/key-management/keys/services/default-key-api-service.service";
import { DefaultRotateableKeySetService } from "@bytewarden/common/key-management/keys/services/default-rotateable-key-set.service";
import { MasterPasswordUnlockService } from "@bytewarden/common/key-management/master-password/abstractions/master-password-unlock.service";
import {
  InternalMasterPasswordServiceAbstraction,
  MasterPasswordServiceAbstraction,
} from "@bytewarden/common/key-management/master-password/abstractions/master-password.service.abstraction";
import { DefaultMasterPasswordUnlockService } from "@bytewarden/common/key-management/master-password/services/default-master-password-unlock.service";
import { MasterPasswordService } from "@bytewarden/common/key-management/master-password/services/master-password.service";
import { PinServiceAbstraction } from "@bytewarden/common/key-management/pin/pin.service.abstraction";
import { PinService } from "@bytewarden/common/key-management/pin/pin.service.implementation";
import { ProcessReloadServiceAbstraction } from "@bytewarden/common/key-management/process-reload";
import { SecurityStateService } from "@bytewarden/common/key-management/security-state/abstractions/security-state.service";
import { DefaultSecurityStateService } from "@bytewarden/common/key-management/security-state/services/security-state.service";
import {
  DefaultSendPasswordService,
  SendPasswordService,
} from "@bytewarden/common/key-management/sends";
import { SessionTimeoutTypeService } from "@bytewarden/common/key-management/session-timeout";
import { V2UpgradeTokenStateService } from "@bytewarden/common/key-management/upgrade-token/abstractions/v2-upgrade-token-state.service.abstraction";
import { DefaultV2UpgradeTokenStateService } from "@bytewarden/common/key-management/upgrade-token/services/default-v2-upgrade-token-state.service";
import {
  DefaultVaultTimeoutService,
  DefaultVaultTimeoutSettingsService,
  VaultTimeoutService,
  VaultTimeoutSettingsService,
} from "@bytewarden/common/key-management/vault-timeout";
import { AppIdService as AppIdServiceAbstraction } from "@bytewarden/common/platform/abstractions/app-id.service";
import { AvailableRegionsService } from "@bytewarden/common/platform/abstractions/available-regions.service";
import { BroadcasterService } from "@bytewarden/common/platform/abstractions/broadcaster.service";
import { ConfigApiServiceAbstraction } from "@bytewarden/common/platform/abstractions/config/config-api.service.abstraction";
import { ConfigService } from "@bytewarden/common/platform/abstractions/config/config.service";
import {
  EnvironmentService,
  RegionConfig,
} from "@bytewarden/common/platform/abstractions/environment.service";
import { FileUploadService as FileUploadServiceAbstraction } from "@bytewarden/common/platform/abstractions/file-upload/file-upload.service";
import { GovModeService } from "@bytewarden/common/platform/abstractions/gov-mode.service";
import { I18nService as I18nServiceAbstraction } from "@bytewarden/common/platform/abstractions/i18n.service";
import { LogService } from "@bytewarden/common/platform/abstractions/log.service";
import { MessagingService as MessagingServiceAbstraction } from "@bytewarden/common/platform/abstractions/messaging.service";
import { PlatformUtilsService as PlatformUtilsServiceAbstraction } from "@bytewarden/common/platform/abstractions/platform-utils.service";
import { RegisterSdkService } from "@bytewarden/common/platform/abstractions/sdk/register-sdk.service";
import { SdkClientFactory } from "@bytewarden/common/platform/abstractions/sdk/sdk-client-factory";
import { SdkLoadService } from "@bytewarden/common/platform/abstractions/sdk/sdk-load.service";
import { SdkService } from "@bytewarden/common/platform/abstractions/sdk/sdk.service";
import { StateService as StateServiceAbstraction } from "@bytewarden/common/platform/abstractions/state.service";
import { AbstractStorageService } from "@bytewarden/common/platform/abstractions/storage.service";
import { SystemService } from "@bytewarden/common/platform/abstractions/system.service";
import { ValidationService as ValidationServiceAbstraction } from "@bytewarden/common/platform/abstractions/validation.service";
import { ActionsService } from "@bytewarden/common/platform/actions";
import { UnsupportedActionsService } from "@bytewarden/common/platform/actions/unsupported-actions.service";
import { Message, MessageListener, MessageSender } from "@bytewarden/common/platform/messaging";
// eslint-disable-next-line no-restricted-imports -- Used for dependency injection
import { SubjectMessageSender } from "@bytewarden/common/platform/messaging/internal";
import { devFlagEnabled, devFlagValue } from "@bytewarden/common/platform/misc/flags";
import { ServerNotificationsService } from "@bytewarden/common/platform/server-notifications";
// eslint-disable-next-line no-restricted-imports -- Needed for service creation
import {
  DefaultServerNotificationsService,
  NoopServerNotificationsService,
  SignalRConnectionService,
  UnsupportedWebPushConnectionService,
  WebPushConnectionService,
  WebPushNotificationsApiService,
} from "@bytewarden/common/platform/server-notifications/internal";
import { AppIdService } from "@bytewarden/common/platform/services/app-id.service";
import { ConfigApiService } from "@bytewarden/common/platform/services/config/config-api.service";
import { DefaultConfigService } from "@bytewarden/common/platform/services/config/default-config.service";
import { ConsoleLogService } from "@bytewarden/common/platform/services/console-log.service";
import { DefaultAvailableRegionsService } from "@bytewarden/common/platform/services/default-available-regions.service";
import { DefaultBroadcasterService } from "@bytewarden/common/platform/services/default-broadcaster.service";
import { DefaultEnvironmentService } from "@bytewarden/common/platform/services/default-environment.service";
import { DefaultGovModeService } from "@bytewarden/common/platform/services/default-gov-mode.service";
import { DefaultServerSettingsService } from "@bytewarden/common/platform/services/default-server-settings.service";
import { FileUploadService } from "@bytewarden/common/platform/services/file-upload/file-upload.service";
import { MigrationBuilderService } from "@bytewarden/common/platform/services/migration-builder.service";
import { MigrationRunner } from "@bytewarden/common/platform/services/migration-runner";
import { DefaultSdkService } from "@bytewarden/common/platform/services/sdk/default-sdk.service";
import { DefaultRegisterSdkService } from "@bytewarden/common/platform/services/sdk/register-sdk.service";
import { StorageServiceProvider } from "@bytewarden/common/platform/services/storage-service.provider";
import { ValidationService } from "@bytewarden/common/platform/services/validation.service";
import { SyncService } from "@bytewarden/common/platform/sync";
// eslint-disable-next-line no-restricted-imports -- Needed for DI
import { DefaultSyncService } from "@bytewarden/common/platform/sync/internal";
import { SystemNotificationsService } from "@bytewarden/common/platform/system-notifications";
import { UnsupportedSystemNotificationsService } from "@bytewarden/common/platform/system-notifications/unsupported-system-notifications.service";
import {
  DefaultThemeStateService,
  ThemeStateService,
} from "@bytewarden/common/platform/theming/theme-state.service";
import { ApiService } from "@bytewarden/common/services/api.service";
import { AuditService } from "@bytewarden/common/services/audit.service";
import {
  PasswordStrengthService,
  PasswordStrengthServiceAbstraction,
} from "@bytewarden/common/tools/password-strength";
import { SendApiServiceSelector } from "@bytewarden/common/tools/send/services/send-api-service.selector";
import { SendApiService } from "@bytewarden/common/tools/send/services/send-api.service";
import { SendApiService as SendApiServiceAbstraction } from "@bytewarden/common/tools/send/services/send-api.service.abstraction";
import { SendDecryptionService } from "@bytewarden/common/tools/send/services/send-decryption.service";
import { SendSdkApiService } from "@bytewarden/common/tools/send/services/send-sdk-api.service";
import { SendStateProvider as SendStateProvider } from "@bytewarden/common/tools/send/services/send-state.provider";
import { SendStateProvider as SendStateProviderAbstraction } from "@bytewarden/common/tools/send/services/send-state.provider.abstraction";
import { SendService } from "@bytewarden/common/tools/send/services/send.service";
import {
  InternalSendService,
  SendService as SendServiceAbstraction,
} from "@bytewarden/common/tools/send/services/send.service.abstraction";
import { ChangeLoginPasswordService } from "@bytewarden/common/vault/abstractions/change-login-password.service";
import { CipherArchiveService } from "@bytewarden/common/vault/abstractions/cipher-archive.service";
import { CipherEncryptionService } from "@bytewarden/common/vault/abstractions/cipher-encryption.service";
import { CipherRiskService } from "@bytewarden/common/vault/abstractions/cipher-risk.service";
import { CipherSdkService } from "@bytewarden/common/vault/abstractions/cipher-sdk.service";
import { CipherService as CipherServiceAbstraction } from "@bytewarden/common/vault/abstractions/cipher.service";
import { CipherFileUploadService as CipherFileUploadServiceAbstraction } from "@bytewarden/common/vault/abstractions/file-upload/cipher-file-upload.service";
import { FolderApiServiceAbstraction } from "@bytewarden/common/vault/abstractions/folder/folder-api.service.abstraction";
import {
  FolderService as FolderServiceAbstraction,
  InternalFolderService,
} from "@bytewarden/common/vault/abstractions/folder/folder.service.abstraction";
import { SearchService as SearchServiceAbstraction } from "@bytewarden/common/vault/abstractions/search.service";
import { TotpService as TotpServiceAbstraction } from "@bytewarden/common/vault/abstractions/totp.service";
import { VaultSettingsService as VaultSettingsServiceAbstraction } from "@bytewarden/common/vault/abstractions/vault-settings/vault-settings.service";
import {
  DefaultEndUserNotificationService,
  EndUserNotificationService,
} from "@bytewarden/common/vault/notifications";
import {
  CipherAuthorizationService,
  DefaultCipherAuthorizationService,
} from "@bytewarden/common/vault/services/cipher-authorization.service";
import { DefaultCipherSdkService } from "@bytewarden/common/vault/services/cipher-sdk.service";
import { CipherService } from "@bytewarden/common/vault/services/cipher.service";
import { DefaultChangeLoginPasswordService } from "@bytewarden/common/vault/services/default-change-login-password.service";
import { DefaultCipherArchiveService } from "@bytewarden/common/vault/services/default-cipher-archive.service";
import { DefaultCipherEncryptionService } from "@bytewarden/common/vault/services/default-cipher-encryption.service";
import { DefaultCipherRiskService } from "@bytewarden/common/vault/services/default-cipher-risk.service";
import { CipherFileUploadService } from "@bytewarden/common/vault/services/file-upload/cipher-file-upload.service";
import { FolderApiService } from "@bytewarden/common/vault/services/folder/folder-api.service";
import { FolderService } from "@bytewarden/common/vault/services/folder/folder.service";
import { RestrictedItemTypesService } from "@bytewarden/common/vault/services/restricted-item-types.service";
import { SearchService } from "@bytewarden/common/vault/services/search.service";
import { TotpService } from "@bytewarden/common/vault/services/totp.service";
import { VaultSettingsService } from "@bytewarden/common/vault/services/vault-settings/vault-settings.service";
import { DefaultTaskService, TaskService } from "@bytewarden/common/vault/tasks";
import {
  AnonLayoutWrapperDataService,
  DefaultAnonLayoutWrapperDataService,
  DialogService,
  ToastService,
} from "@bytewarden/components";
import {
  GeneratorHistoryService,
  LocalGeneratorHistoryService,
} from "@bytewarden/generator-history";
import {
  legacyPasswordGenerationServiceFactory,
  legacyUsernameGenerationServiceFactory,
  PasswordGenerationServiceAbstraction,
  UsernameGenerationServiceAbstraction,
} from "@bytewarden/generator-legacy";
import {
  BiometricsService,
  BiometricStateService,
  DefaultBiometricStateService,
  DefaultKdfConfigService,
  DefaultKeyService,
  DefaultUserAsymmetricKeysRegenerationService,
  KdfConfigService,
  KeyService,
  UserAsymmetricKeysRegenerationService,
} from "@bytewarden/key-management";
// eslint-disable-next-line no-restricted-imports
import {
  CryptoFunctionService as CryptoFunctionServiceAbstraction,
  DefaultKeyGenerationService,
  DefaultLegacyCompatKeyService,
  EncryptService,
  EncryptServiceImplementation,
  KeyGenerationService,
  LegacyCompatKeyService,
  WebCryptoFunctionService,
} from "@bytewarden/legacy-crypto";
import { FlightRecorderService } from "@bytewarden/logging-angular";
import {
  DefaultManagedSettingsService,
  DevManagedSettingsService,
  ManagedSettingsService,
} from "@bytewarden/managed-settings";
import {
  DefaultOrganizationInviteLinkApiService,
  DefaultOrganizationInviteLinkService,
  OrganizationInviteLinkApiService,
  OrganizationInviteLinkService,
} from "@bytewarden/organization-invite-link";
import { DefaultTaskSchedulerService, TaskSchedulerService } from "@bytewarden/scheduling";
import {
  ActiveUserStateProvider,
  DerivedStateProvider,
  GlobalStateProvider,
  SingleUserStateProvider,
  StateEventRegistrarService,
  StateEventRunnerService,
  StateProvider,
} from "@bytewarden/state";
import {
  ActiveUserAccessor,
  DefaultActiveUserStateProvider,
  DefaultDerivedStateProvider,
  DefaultGlobalStateProvider,
  DefaultSingleUserStateProvider,
  DefaultStateEventRegistrarService,
  DefaultStateEventRunnerService,
  DefaultStateProvider,
  DefaultStateService,
} from "@bytewarden/state-internal";
import { SafeInjectionToken } from "@bytewarden/ui-common";
import {
  AutoUnlockService,
  DefaultAutoUnlockService,
  DefaultLockService,
  LockService,
  DefaultUnlockService,
  UnlockService,
} from "@bytewarden/unlock";
import {
  UserCryptoDialogService,
  UserKeyRotationService,
  UserKeyRotationServiceAbstraction,
} from "@bytewarden/user-crypto-management";
// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import { PasswordRepromptService } from "@bytewarden/vault";
import {
  DefaultVaultExportApiService,
  IndividualVaultExportService,
  IndividualVaultExportServiceAbstraction,
  OrganizationVaultExportService,
  OrganizationVaultExportServiceAbstraction,
  VaultExportApiService,
  VaultExportService,
  VaultExportServiceAbstraction,
} from "@bytewarden/vault-export-core";

import { AccountDeletionService } from "../auth/account-deletion/account-deletion.service";
import { DefaultDeviceManagementComponentService } from "../auth/device-management/default-device-management-component.service";
import { DeviceManagementComponentServiceAbstraction } from "../auth/device-management/device-management-component.service.abstraction";
import {
  ChangePasswordService,
  DefaultChangePasswordService,
} from "../auth/password-management/change-password";
import { DefaultSetInitialPasswordService } from "../auth/password-management/set-initial-password/default-set-initial-password.service.implementation";
import { SetInitialPasswordService } from "../auth/password-management/set-initial-password/set-initial-password.service.abstraction";
import { DeviceTrustToastService as DeviceTrustToastServiceAbstraction } from "../auth/services/device-trust-toast.service.abstraction";
import { DeviceTrustToastService } from "../auth/services/device-trust-toast.service.implementation";
import { NoopPremiumInterestStateService } from "../billing/services/premium-interest/noop-premium-interest-state.service";
import { PremiumInterestStateService } from "../billing/services/premium-interest/premium-interest-state.service.abstraction";
import { DefaultEncryptedMigrationsSchedulerService } from "../key-management/encrypted-migration/encrypted-migrations-scheduler.service";
import { EncryptedMigrationsSchedulerService } from "../key-management/encrypted-migration/encrypted-migrations-scheduler.service.abstraction";
import { FormValidationErrorsService as FormValidationErrorsServiceAbstraction } from "../platform/abstractions/form-validation-errors.service";
import { DocumentLangSetter } from "../platform/i18n";
import { FormValidationErrorsService } from "../platform/services/form-validation-errors.service";
import { LoggingErrorHandler } from "../platform/services/logging-error-handler";
import { AngularThemingService } from "../platform/services/theming/angular-theming.service";
import { AbstractThemingService } from "../platform/services/theming/theming.service.abstraction";
import { safeProvider, SafeProvider } from "../platform/utils/safe-provider";
import { ViewCacheService } from "../platform/view-cache";
// eslint-disable-next-line no-restricted-imports -- Needed for DI
import { NoopViewCacheService } from "../platform/view-cache/internal";

import {
  CLIENT_TYPE,
  DEFAULT_VAULT_TIMEOUT,
  DOCUMENT,
  ENV_ADDITIONAL_REGIONS,
  HTTP_OPERATIONS,
  INTRAPROCESS_MESSAGING_SUBJECT,
  LOCALES_DIRECTORY,
  LOG_MAC_FAILURES,
  LOGOUT_CALLBACK,
  OBSERVABLE_DISK_STORAGE,
  OBSERVABLE_MEMORY_STORAGE,
  REFRESH_ACCESS_TOKEN_ERROR_CALLBACK,
  SECURE_STORAGE,
  SUPPORTS_SECURE_STORAGE,
  SYSTEM_LANGUAGE,
  SYSTEM_THEME_OBSERVABLE,
  WINDOW,
} from "./injection-tokens";
import { ModalService } from "./modal.service";

/**
 * Provider definitions used in the ngModule.
 * Add your provider definition here using the safeProvider function as a wrapper. This will give you type safety.
 * If you need help please ask for it, do NOT change the type of this array.
 */
const safeProviders: SafeProvider[] = [
  safeProvider(ModalService),
  safeProvider(PasswordRepromptService),
  safeProvider({ provide: WINDOW, useValue: window }),
  safeProvider({ provide: DOCUMENT, useValue: document }),
  safeProvider({
    provide: LOCALE_ID as SafeInjectionToken<string>,
    useFactory: (i18nService: I18nServiceAbstraction) => i18nService.translationLocale,
    deps: [I18nServiceAbstraction],
  }),
  safeProvider({
    provide: SUPPORTS_SECURE_STORAGE,
    useFactory: (platformUtilsService: PlatformUtilsServiceAbstraction) =>
      platformUtilsService.supportsSecureStorage(),
    deps: [PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: LOCALES_DIRECTORY,
    useValue: "./locales",
  }),
  safeProvider({
    provide: SYSTEM_LANGUAGE,
    useFactory: (window: Window) => window.navigator.language,
    deps: [WINDOW],
  }),
  // TODO: PM-21212 - Deprecate LogoutCallback in favor of LogoutService
  safeProvider({
    provide: LOGOUT_CALLBACK,
    useFactory:
      (messagingService: MessagingServiceAbstraction) =>
      async (logoutReason: LogoutReason, userId?: string) => {
        return Promise.resolve(
          messagingService.send("logout", { logoutReason: logoutReason, userId: userId }),
        );
      },
    deps: [MessagingServiceAbstraction],
  }),
  safeProvider({
    provide: LOG_MAC_FAILURES,
    useValue: true,
  }),
  safeProvider({
    provide: SYSTEM_THEME_OBSERVABLE,
    useFactory: (window: Window) => AngularThemingService.createSystemThemeFromWindow(window),
    deps: [WINDOW],
  }),
  safeProvider({
    provide: ThemeStateService,
    useClass: DefaultThemeStateService,
    deps: [GlobalStateProvider],
  }),
  safeProvider({
    provide: AbstractThemingService,
    useClass: AngularThemingService,
    deps: [ThemeStateService, SYSTEM_THEME_OBSERVABLE],
  }),
  safeProvider({
    provide: AppIdServiceAbstraction,
    useClass: AppIdService,
    deps: [OBSERVABLE_DISK_STORAGE, LogService],
  }),
  safeProvider({
    provide: AuditServiceAbstraction,
    useClass: AuditService,
    deps: [CryptoFunctionServiceAbstraction, ApiServiceAbstraction, HibpApiService],
  }),
  safeProvider({
    provide: HibpApiService,
    useClass: HibpApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: PasskeyDirectoryApiService,
    useClass: DefaultPasskeyDirectoryApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: EventLogApiService,
    useClass: EventLogApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: AuthServiceAbstraction,
    useClass: AuthService,
    deps: [
      AccountServiceAbstraction,
      MessagingServiceAbstraction,
      KeyService,
      ApiServiceAbstraction,
      StateServiceAbstraction,
      TokenServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: EncryptedMigrator,
    useClass: DefaultEncryptedMigrator,
    deps: [
      KdfConfigService,
      LogService,
      ConfigService,
      InternalMasterPasswordServiceAbstraction,
      SyncService,
      KeyService,
      BiometricsService,
      BiometricStateService,
      PlatformUtilsServiceAbstraction,
      UserKeyRotationServiceAbstraction,
      CipherServiceAbstraction,
      SdkService,
      StateProvider,
    ],
  }),
  safeProvider({
    provide: LoginStrategyCacheService,
    useClass: DefaultLoginStrategyCacheService,
    deps: [GlobalStateProvider],
  }),
  safeProvider({
    provide: LoginStrategySessionTimeoutService,
    useClass: DefaultLoginStrategySessionTimeoutService,
    deps: [
      TaskSchedulerService,
      LoginStrategyCacheService,
      LogService,
      MessageSender,
      MessageListener,
    ],
  }),
  safeProvider({
    provide: LoginStrategyServiceAbstraction,
    useClass: LoginStrategyService,
    deps: [
      AccountServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      KeyService,
      ApiServiceAbstraction,
      TokenServiceAbstraction,
      AppIdServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      MessagingServiceAbstraction,
      LogService,
      KeyConnectorServiceAbstraction,
      EnvironmentService,
      StateServiceAbstraction,
      TwoFactorService,
      I18nServiceAbstraction,
      EncryptService,
      PasswordStrengthServiceAbstraction,
      PolicyServiceAbstraction,
      DeviceTrustServiceAbstraction,
      AuthRequestServiceAbstraction,
      InternalUserDecryptionOptionsServiceAbstraction,
      GlobalStateProvider,
      BillingAccountProfileStateService,
      VaultTimeoutSettingsService,
      KdfConfigService,
      ConfigService,
      AccountCryptographicStateService,
      PasswordPreloginService,
      UnlockService,
      LoginStrategyCacheService,
      LoginStrategySessionTimeoutService,
      LegacyCompatKeyService,
    ],
  }),
  safeProvider({
    provide: FileUploadServiceAbstraction,
    useClass: FileUploadService,
    deps: [LogService, ApiServiceAbstraction, ConfigService],
  }),
  safeProvider({
    provide: CipherFileUploadServiceAbstraction,
    useClass: CipherFileUploadService,
    deps: [ApiServiceAbstraction, FileUploadServiceAbstraction, ConfigService, CipherSdkService],
  }),
  safeProvider({
    provide: DomainSettingsService,
    useClass: DefaultDomainSettingsService,
    deps: [
      StateProvider,
      PolicyServiceAbstraction,
      AccountService,
      ConfigService,
      EnvironmentService,
      AuthServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: CipherSdkService,
    useClass: DefaultCipherSdkService,
    deps: [SdkService, LogService],
  }),
  safeProvider({
    provide: UserKeyRotationServiceAbstraction,
    useClass: UserKeyRotationService,
    deps: [SdkService, LogService, UserCryptoDialogService],
  }),
  safeProvider({
    provide: CipherServiceAbstraction,
    useFactory: (
      keyService: KeyService,
      legacyCompatKeyService: LegacyCompatKeyService,
      domainSettingsService: DomainSettingsService,
      apiService: ApiServiceAbstraction,
      i18nService: I18nServiceAbstraction,
      autofillSettingsService: AutofillSettingsServiceAbstraction,
      encryptService: EncryptService,
      fileUploadService: CipherFileUploadServiceAbstraction,
      configService: ConfigService,
      stateProvider: StateProvider,
      accountService: AccountServiceAbstraction,
      logService: LogService,
      cipherEncryptionService: CipherEncryptionService,
      messagingService: MessagingServiceAbstraction,
      cipherSdkService: CipherSdkService,
    ) =>
      new CipherService(
        keyService,
        legacyCompatKeyService,
        domainSettingsService,
        apiService,
        i18nService,
        autofillSettingsService,
        encryptService,
        fileUploadService,
        configService,
        stateProvider,
        accountService,
        logService,
        cipherEncryptionService,
        messagingService,
        cipherSdkService,
      ),
    deps: [
      KeyService,
      LegacyCompatKeyService,
      DomainSettingsService,
      ApiServiceAbstraction,
      I18nServiceAbstraction,
      AutofillSettingsServiceAbstraction,
      EncryptService,
      CipherFileUploadServiceAbstraction,
      ConfigService,
      StateProvider,
      AccountServiceAbstraction,
      LogService,
      CipherEncryptionService,
      MessagingServiceAbstraction,
      CipherSdkService,
    ],
  }),
  safeProvider({
    provide: CipherRiskService,
    useClass: DefaultCipherRiskService,
    deps: [SdkService, CipherServiceAbstraction],
  }),
  safeProvider({
    provide: InternalFolderService,
    useClass: FolderService,
    deps: [
      KeyService,
      EncryptService,
      I18nServiceAbstraction,
      CipherServiceAbstraction,
      StateProvider,
    ],
  }),
  safeProvider({
    provide: FolderServiceAbstraction,
    useExisting: InternalFolderService,
  }),
  safeProvider({
    provide: FolderApiServiceAbstraction,
    useClass: FolderApiService,
    deps: [InternalFolderService, ApiServiceAbstraction],
  }),
  safeProvider({
    provide: AccountApiServiceAbstraction,
    useClass: AccountApiServiceImplementation,
    deps: [
      ApiServiceAbstraction,
      UserVerificationServiceAbstraction,
      LogService,
      InternalAccountService,
      EnvironmentService,
    ],
  }),
  safeProvider({
    provide: InternalAccountService,
    useClass: AccountServiceImplementation,
    deps: [MessagingServiceAbstraction, LogService, GlobalStateProvider, SingleUserStateProvider],
  }),
  safeProvider({
    provide: AccountServiceAbstraction,
    useExisting: InternalAccountService,
  }),
  safeProvider({
    provide: AvatarServiceAbstraction,
    useClass: AvatarService,
    deps: [ApiServiceAbstraction, StateProvider],
  }),
  safeProvider({
    provide: LogService,
    useFactory: () => new ConsoleLogService(process.env.NODE_ENV === "development"),
    deps: [],
  }),
  safeProvider({
    provide: CollectionEncryptionService,
    useClass: DefaultCollectionEncryptionService,
    deps: [SdkService, LogService],
  }),
  safeProvider({
    provide: CollectionService,
    useClass: DefaultCollectionService,
    deps: [
      KeyService,
      EncryptService,
      I18nServiceAbstraction,
      StateProvider,
      CollectionEncryptionService,
    ],
  }),
  safeProvider({
    provide: ENV_ADDITIONAL_REGIONS,
    useValue: process.env.ADDITIONAL_REGIONS as unknown as RegionConfig[],
  }),
  safeProvider({
    provide: EnvironmentService,
    useClass: DefaultEnvironmentService,
    deps: [StateProvider, AccountServiceAbstraction, ENV_ADDITIONAL_REGIONS],
  }),
  safeProvider({
    provide: AvailableRegionsService,
    useClass: DefaultAvailableRegionsService,
    deps: [EnvironmentService, ConfigService],
  }),
  safeProvider({
    provide: GovModeService,
    useClass: DefaultGovModeService,
    deps: [EnvironmentService],
  }),
  safeProvider({
    provide: InternalUserDecryptionOptionsServiceAbstraction,
    useClass: UserDecryptionOptionsService,
    deps: [SingleUserStateProvider],
  }),
  safeProvider({
    provide: UserDecryptionOptionsServiceAbstraction,
    useExisting: InternalUserDecryptionOptionsServiceAbstraction,
  }),
  safeProvider({
    provide: TotpServiceAbstraction,
    useClass: TotpService,
    deps: [SdkService],
  }),
  safeProvider({
    provide: TokenServiceAbstraction,
    useClass: TokenService,
    deps: [
      SingleUserStateProvider,
      GlobalStateProvider,
      SUPPORTS_SECURE_STORAGE,
      SECURE_STORAGE,
      EncryptService,
      LogService,
      LOGOUT_CALLBACK,
    ],
  }),
  safeProvider({
    provide: KeyGenerationService,
    useClass: DefaultKeyGenerationService,
    deps: [CryptoFunctionServiceAbstraction],
  }),
  safeProvider({
    provide: KeyService,
    useClass: DefaultKeyService,
    deps: [
      CryptoFunctionServiceAbstraction,
      EncryptService,
      PlatformUtilsServiceAbstraction,
      LogService,
      StateServiceAbstraction,
      StateProvider,
      AccountCryptographicStateService,
      BiometricsService,
    ],
  }),
  safeProvider({
    provide: LegacyCompatKeyService,
    useClass: DefaultLegacyCompatKeyService,
    deps: [
      InternalMasterPasswordServiceAbstraction,
      KeyGenerationService,
      CryptoFunctionServiceAbstraction,
      EncryptService,
      LogService,
      AccountServiceAbstraction,
      KdfConfigService,
      KeyService,
    ],
  }),
  safeProvider({
    provide: SecurityStateService,
    useClass: DefaultSecurityStateService,
    deps: [AccountCryptographicStateService],
  }),
  safeProvider({
    provide: RestrictedItemTypesService,
    useClass: RestrictedItemTypesService,
    deps: [AccountService, OrganizationServiceAbstraction, PolicyServiceAbstraction],
  }),
  safeProvider({
    provide: PasswordStrengthServiceAbstraction,
    useClass: PasswordStrengthService,
    deps: [],
  }),
  safeProvider({
    provide: PasswordGenerationServiceAbstraction,
    useFactory: legacyPasswordGenerationServiceFactory,
    deps: [PolicyServiceAbstraction, AccountServiceAbstraction, StateProvider, SdkService],
  }),
  safeProvider({
    provide: GeneratorHistoryService,
    useClass: LocalGeneratorHistoryService,
    deps: [StateProvider, SdkService],
  }),
  safeProvider({
    provide: UsernameGenerationServiceAbstraction,
    useFactory: legacyUsernameGenerationServiceFactory,
    deps: [
      ApiServiceAbstraction,
      I18nServiceAbstraction,
      KeyService,
      SdkService,
      PolicyServiceAbstraction,
      AccountServiceAbstraction,
      StateProvider,
    ],
  }),
  safeProvider({
    provide: REFRESH_ACCESS_TOKEN_ERROR_CALLBACK,
    useFactory: (toastService: ToastService, i18nService: I18nServiceAbstraction) => () => {
      toastService.showToast({
        variant: "error",
        title: i18nService.t("errorRefreshingAccessToken"),
        message: i18nService.t("errorRefreshingAccessTokenDesc"),
      });
    },
    deps: [ToastService, I18nServiceAbstraction],
  }),
  safeProvider({
    provide: HTTP_OPERATIONS,
    useValue: { createRequest: (url, request) => new Request(url, request) },
  }),
  safeProvider({
    provide: ApiServiceAbstraction,
    useClass: ApiService,
    deps: [
      TokenServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      EnvironmentService,
      AppIdServiceAbstraction,
      REFRESH_ACCESS_TOKEN_ERROR_CALLBACK,
      LogService,
      LOGOUT_CALLBACK,
      VaultTimeoutSettingsService,
      AccountService,
      HTTP_OPERATIONS,
    ],
  }),
  safeProvider({
    provide: SendServiceAbstraction,
    useExisting: InternalSendService,
  }),
  safeProvider({
    provide: SendDecryptionService,
    useClass: SendDecryptionService,
    deps: [SdkService, ConfigService, LegacyCompatKeyService],
  }),
  safeProvider({
    provide: InternalSendService,
    useClass: SendService,
    deps: [
      AccountServiceAbstraction,
      KeyService,
      I18nServiceAbstraction,
      KeyGenerationService,
      SendStateProviderAbstraction,
      EncryptService,
      ConfigService,
      SdkService,
      SendDecryptionService,
    ],
  }),
  safeProvider({
    provide: SendStateProviderAbstraction,
    useClass: SendStateProvider,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: SendApiService,
    useClass: SendApiService,
    deps: [ApiServiceAbstraction, FileUploadServiceAbstraction, InternalSendService, LogService],
  }),
  safeProvider({
    provide: SendSdkApiService,
    useClass: SendSdkApiService,
    deps: [
      SdkService,
      SendApiService,
      InternalSendService,
      AccountServiceAbstraction,
      LogService,
      SendDecryptionService,
    ],
  }),
  safeProvider({
    provide: SendApiServiceAbstraction,
    useClass: SendApiServiceSelector,
    deps: [ConfigService, SendApiService, SendSdkApiService],
  }),
  safeProvider({
    provide: KeyApiService,
    useClass: DefaultKeyApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: SyncService,
    useClass: DefaultSyncService,
    deps: [
      InternalMasterPasswordServiceAbstraction,
      AccountServiceAbstraction,
      ApiServiceAbstraction,
      DomainSettingsService,
      InternalFolderService,
      CipherServiceAbstraction,
      KeyService,
      CollectionService,
      MessagingServiceAbstraction,
      InternalPolicyService,
      InternalNewPolicyService,
      InternalSendService,
      LogService,
      KeyConnectorServiceAbstraction,
      ProviderServiceAbstraction,
      FolderApiServiceAbstraction,
      InternalOrganizationServiceAbstraction,
      SendApiServiceAbstraction,
      InternalUserDecryptionOptionsServiceAbstraction,
      AvatarServiceAbstraction,
      LOGOUT_CALLBACK,
      BillingAccountProfileStateService,
      TokenServiceAbstraction,
      AuthServiceAbstraction,
      StateProvider,
      ConfigService,
      SdkService,
    ],
  }),
  safeProvider({
    provide: AccountCryptographicStateService,
    useClass: DefaultAccountCryptographicStateService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: UnlockService,
    useClass: DefaultUnlockService,
    deps: [
      RegisterSdkService,
      AccountCryptographicStateService,
      KdfConfigService,
      AccountServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      StateProvider,
      LogService,
      BiometricsService,
      BiometricStateService,
      V2UpgradeTokenStateService,
      AutoUnlockService,
    ],
  }),
  safeProvider({
    provide: AutoUnlockService,
    useClass: DefaultAutoUnlockService,
    deps: [
      KeyService,
      StateServiceAbstraction,
      StateProvider,
      PlatformUtilsServiceAbstraction,
      LogService,
    ],
  }),
  safeProvider({
    provide: BroadcasterService,
    useClass: DefaultBroadcasterService,
    deps: [MessageListener],
  }),
  safeProvider({
    provide: VaultTimeoutSettingsService,
    useClass: DefaultVaultTimeoutSettingsService,
    deps: [
      AccountServiceAbstraction,
      UserDecryptionOptionsServiceAbstraction,
      AutoUnlockService,
      TokenServiceAbstraction,
      PolicyServiceAbstraction,
      BiometricStateService,
      StateProvider,
      LogService,
      DEFAULT_VAULT_TIMEOUT,
      SessionTimeoutTypeService,
    ],
  }),
  safeProvider({
    provide: DefaultVaultTimeoutService,
    useClass: DefaultVaultTimeoutService,
    deps: [
      AccountServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      AuthServiceAbstraction,
      VaultTimeoutSettingsService,
      TaskSchedulerService,
      LogService,
      LockService,
      LogoutService,
    ],
  }),
  safeProvider({
    provide: VaultTimeoutService,
    useExisting: DefaultVaultTimeoutService,
  }),
  safeProvider({
    provide: SsoLoginServiceAbstraction,
    useClass: SsoLoginService,
    deps: [StateProvider, LogService, PolicyServiceAbstraction, EnvironmentService],
  }),
  safeProvider({
    provide: StateServiceAbstraction,
    useClass: DefaultStateService,
    deps: [AbstractStorageService, SECURE_STORAGE, ActiveUserAccessor],
  }),
  safeProvider({
    provide: IndividualVaultExportServiceAbstraction,
    useClass: IndividualVaultExportService,
    deps: [
      FolderServiceAbstraction,
      CipherServiceAbstraction,
      KeyGenerationService,
      KeyService,
      EncryptService,
      KdfConfigService,
      ApiServiceAbstraction,
      RestrictedItemTypesService,
      LogService,
    ],
  }),
  safeProvider({
    provide: VaultExportApiService,
    useClass: DefaultVaultExportApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationVaultExportServiceAbstraction,
    useClass: OrganizationVaultExportService,
    deps: [
      CipherServiceAbstraction,
      VaultExportApiService,
      KeyGenerationService,
      KeyService,
      EncryptService,
      CollectionService,
      KdfConfigService,
      RestrictedItemTypesService,
    ],
  }),
  safeProvider({
    provide: VaultExportServiceAbstraction,
    useClass: VaultExportService,
    deps: [
      IndividualVaultExportServiceAbstraction,
      OrganizationVaultExportServiceAbstraction,
      AccountServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: SearchServiceAbstraction,
    useClass: SearchService,
    deps: [LogService, I18nServiceAbstraction],
  }),
  safeProvider({
    provide: WebPushNotificationsApiService,
    useClass: WebPushNotificationsApiService,
    deps: [ApiServiceAbstraction, AppIdServiceAbstraction],
  }),
  safeProvider({
    provide: SignalRConnectionService,
    useClass: SignalRConnectionService,
    deps: [ApiServiceAbstraction, LogService, PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: WebPushConnectionService,
    useClass: UnsupportedWebPushConnectionService,
    deps: [],
  }),
  safeProvider({
    provide: ActionsService,
    useClass: UnsupportedActionsService,
    deps: [],
  }),
  safeProvider({
    provide: ActionsService,
    useClass: UnsupportedActionsService,
    deps: [],
  }),
  safeProvider({
    provide: SystemNotificationsService,
    useClass: UnsupportedSystemNotificationsService,
    deps: [],
  }),
  safeProvider({
    provide: PendingAuthRequestsStateService,
    useClass: PendingAuthRequestsStateService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: AuthRequestAnsweringService,
    useClass: DefaultAuthRequestAnsweringService,
    deps: [
      AccountServiceAbstraction,
      AuthServiceAbstraction,
      MasterPasswordServiceAbstraction,
      MessagingServiceAbstraction,
      PendingAuthRequestsStateService,
    ],
  }),
  safeProvider({
    provide: AutomaticUserConfirmationService,
    useClass: DefaultAutomaticUserConfirmationService,
    deps: [
      ApiServiceAbstraction,
      OrganizationUserService,
      StateProvider,
      InternalOrganizationServiceAbstraction,
      OrganizationUserApiService,
      InternalPolicyService,
      AuthServiceAbstraction,
      AccountServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: ServerNotificationsService,
    useClass: devFlagEnabled("noopNotifications")
      ? NoopServerNotificationsService
      : DefaultServerNotificationsService,
    deps: [
      LogService,
      SyncService,
      AppIdServiceAbstraction,
      EnvironmentService,
      LOGOUT_CALLBACK,
      MessagingServiceAbstraction,
      AccountServiceAbstraction,
      SignalRConnectionService,
      AuthServiceAbstraction,
      WebPushConnectionService,
      AuthRequestAnsweringService,
      ConfigService,
      AutomaticUserConfirmationService,
      BillingAccountProfileStateService,
    ],
  }),
  safeProvider({
    provide: CryptoFunctionServiceAbstraction,
    useClass: WebCryptoFunctionService,
    deps: [WINDOW],
  }),
  safeProvider({
    provide: EncryptService,
    useClass: EncryptServiceImplementation,
    deps: [CryptoFunctionServiceAbstraction, LogService, LOG_MAC_FAILURES],
  }),
  safeProvider({
    provide: EventUploadServiceAbstraction,
    useClass: EventUploadService,
    deps: [
      ApiServiceAbstraction,
      StateProvider,
      LogService,
      AuthServiceAbstraction,
      TaskSchedulerService,
    ],
  }),
  safeProvider({
    provide: EventCollectionServiceAbstraction,
    useClass: EventCollectionService,
    deps: [
      CipherServiceAbstraction,
      StateProvider,
      OrganizationServiceAbstraction,
      EventUploadServiceAbstraction,
      AuthServiceAbstraction,
      AccountServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: InternalPolicyService,
    useFactory: (
      stateProvider: StateProvider,
      organizationService: OrganizationServiceAbstraction,
      accountService: AccountServiceAbstraction,
      newPolicyService: InternalNewPolicyService,
      injector: Injector,
    ) =>
      new DefaultPolicyService(
        stateProvider,
        organizationService,
        accountService,
        newPolicyService,
        () => injector.get(SdkService),
      ),
    deps: [
      StateProvider,
      OrganizationServiceAbstraction,
      AccountServiceAbstraction,
      InternalNewPolicyService,
      Injector,
    ],
  }),
  safeProvider({
    provide: PolicyServiceAbstraction,
    useExisting: InternalPolicyService,
  }),
  safeProvider({
    provide: InternalNewPolicyService,
    useClass: DefaultNewPolicyService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: PolicyApiServiceAbstraction,
    useClass: PolicyApiService,
    deps: [InternalPolicyService, InternalNewPolicyService, ApiServiceAbstraction, AccountService],
  }),
  safeProvider({
    provide: InternalMasterPasswordServiceAbstraction,
    useClass: MasterPasswordService,
    deps: [
      StateProvider,
      KeyGenerationService,
      LogService,
      CryptoFunctionServiceAbstraction,
      AccountServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: MasterPasswordServiceAbstraction,
    useExisting: InternalMasterPasswordServiceAbstraction,
  }),
  safeProvider({
    provide: V2UpgradeTokenStateService,
    useClass: DefaultV2UpgradeTokenStateService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: MasterPasswordUnlockService,
    useClass: DefaultMasterPasswordUnlockService,
    deps: [InternalMasterPasswordServiceAbstraction, LegacyCompatKeyService, LogService],
  }),
  safeProvider({
    provide: KeyConnectorServiceAbstraction,
    useClass: KeyConnectorService,
    deps: [
      AccountServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      LegacyCompatKeyService,
      ApiServiceAbstraction,
      TokenServiceAbstraction,
      LogService,
      OrganizationServiceAbstraction,
      LOGOUT_CALLBACK,
      StateProvider,
      ConfigService,
      RegisterSdkService,
      AccountCryptographicStateService,
      SdkService,
      InternalUserDecryptionOptionsServiceAbstraction,
      UnlockService,
    ],
  }),
  safeProvider({
    provide: UserVerificationServiceAbstraction,
    useClass: UserVerificationService,
    deps: [
      KeyService,
      AccountServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      I18nServiceAbstraction,
      UserVerificationApiServiceAbstraction,
      UserDecryptionOptionsServiceAbstraction,
      PinServiceAbstraction,
      KdfConfigService,
      BiometricsService,
      MasterPasswordUnlockService,
    ],
  }),
  safeProvider({
    provide: InternalOrganizationServiceAbstraction,
    useClass: DefaultOrganizationService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: OrganizationUserService,
    useClass: DefaultOrganizationUserService,
    deps: [
      KeyService,
      EncryptService,
      OrganizationUserApiService,
      AccountService,
      I18nServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: OrganizationServiceAbstraction,
    useExisting: InternalOrganizationServiceAbstraction,
  }),

  safeProvider({
    provide: OrganizationUserApiService,
    useClass: DefaultOrganizationUserApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationInviteLinkApiService,
    useClass: DefaultOrganizationInviteLinkApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationInviteLinkService,
    useClass: DefaultOrganizationInviteLinkService,
    deps: [OrganizationInviteLinkApiService, StateProvider, EnvironmentService, SdkService],
  }),
  safeProvider({
    provide: PasswordResetEnrollmentServiceAbstraction,
    useClass: PasswordResetEnrollmentServiceImplementation,
    deps: [
      OrganizationApiServiceAbstraction,
      AccountServiceAbstraction,
      KeyService,
      EncryptService,
      OrganizationUserApiService,
      I18nServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: ProviderServiceAbstraction,
    useClass: ProviderService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: TwoFactorService,
    useClass: DefaultTwoFactorService,
    deps: [
      I18nServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      GlobalStateProvider,
      TwoFactorApiService,
    ],
  }),
  safeProvider({
    provide: FormValidationErrorsServiceAbstraction,
    useClass: FormValidationErrorsService,
    deps: [],
  }),
  safeProvider({
    provide: UserVerificationApiServiceAbstraction,
    useClass: UserVerificationApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationApiServiceAbstraction,
    useClass: OrganizationApiService,
    // This is a slightly odd dependency tree for a specialized api service
    // it depends on SyncService so that new data can be retrieved through the sync
    // rather than updating the OrganizationService directly. Instead OrganizationService
    // subscribes to sync notifications and will update itself based on that.
    deps: [ApiServiceAbstraction, SyncService],
  }),
  safeProvider({
    provide: OrganizationSponsorshipApiServiceAbstraction,
    useClass: OrganizationSponsorshipApiService,
    deps: [ApiServiceAbstraction, PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationBillingApiServiceAbstraction,
    useClass: OrganizationBillingApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: AccountBillingApiServiceAbstraction,
    useClass: AccountBillingApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: DefaultConfigService,
    useClass: DefaultConfigService,
    deps: [
      ConfigApiServiceAbstraction,
      EnvironmentService,
      LogService,
      StateProvider,
      AuthServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: ConfigService,
    useExisting: DefaultConfigService,
  }),
  safeProvider({
    provide: ConfigApiServiceAbstraction,
    useClass: ConfigApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: AnonymousHubServiceAbstraction,
    useClass: AnonymousHubService,
    deps: [EnvironmentService, AuthRequestServiceAbstraction, PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: ValidationServiceAbstraction,
    useClass: ValidationService,
    deps: [I18nServiceAbstraction, PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: LoginEmailServiceAbstraction,
    useClass: LoginEmailService,
    deps: [AccountServiceAbstraction, AuthServiceAbstraction, StateProvider],
  }),
  safeProvider({
    provide: OrgDomainInternalServiceAbstraction,
    useClass: OrgDomainService,
    deps: [PlatformUtilsServiceAbstraction, I18nServiceAbstraction],
  }),
  safeProvider({
    provide: OrgDomainServiceAbstraction,
    useExisting: OrgDomainInternalServiceAbstraction,
  }),
  safeProvider({
    provide: OrgDomainApiServiceAbstraction,
    useClass: OrgDomainApiService,
    deps: [OrgDomainInternalServiceAbstraction, ApiServiceAbstraction],
  }),
  safeProvider({
    provide: DevicesApiServiceAbstraction,
    useClass: DevicesApiServiceImplementation,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: DevicesServiceAbstraction,
    useClass: DevicesServiceImplementation,
    deps: [AppIdServiceAbstraction, DevicesApiServiceAbstraction, I18nServiceAbstraction],
  }),
  safeProvider({
    provide: AuthRequestApiServiceAbstraction,
    useClass: DefaultAuthRequestApiService,
    deps: [ApiServiceAbstraction, LogService],
  }),
  safeProvider({
    provide: DeviceTrustServiceAbstraction,
    useClass: DeviceTrustService,
    deps: [
      CryptoFunctionServiceAbstraction,
      KeyService,
      EncryptService,
      AppIdServiceAbstraction,
      DevicesApiServiceAbstraction,
      I18nServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      StateProvider,
      SECURE_STORAGE,
      UserDecryptionOptionsServiceAbstraction,
      LogService,
      ConfigService,
      AccountServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: AuthRequestServiceAbstraction,
    useClass: AuthRequestService,
    deps: [
      AppIdServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      KeyService,
      LegacyCompatKeyService,
      EncryptService,
      ApiServiceAbstraction,
      StateProvider,
      AuthRequestApiServiceAbstraction,
      AccountServiceAbstraction,
      UnlockService,
    ],
  }),
  safeProvider({
    provide: PinServiceAbstraction,
    useClass: PinService,
    deps: [SdkService],
  }),
  safeProvider({
    provide: WebAuthnLoginPrfKeyServiceAbstraction,
    useClass: WebAuthnLoginPrfKeyService,
    deps: [CryptoFunctionServiceAbstraction],
  }),
  safeProvider({
    provide: WebAuthnLoginApiServiceAbstraction,
    useClass: WebAuthnLoginApiService,
    deps: [ApiServiceAbstraction, EnvironmentService],
  }),
  safeProvider({
    provide: WebAuthnLoginServiceAbstraction,
    useClass: WebAuthnLoginService,
    deps: [
      WebAuthnLoginApiServiceAbstraction,
      LoginStrategyServiceAbstraction,
      WebAuthnLoginPrfKeyServiceAbstraction,
      WINDOW,
      LogService,
    ],
  }),
  safeProvider({
    provide: StorageServiceProvider,
    useClass: StorageServiceProvider,
    deps: [OBSERVABLE_DISK_STORAGE, OBSERVABLE_MEMORY_STORAGE],
  }),
  safeProvider({
    provide: AutomationDriver,
    useClass: AutomationDriver,
    // The driver takes the whole array; `deps` cannot express that a multi-provider token resolves
    // to one, so the token is cast to the shape the constructor actually receives.
    deps: [AutomationCapability as unknown as SafeInjectionToken<AutomationCapability[]>],
  }),
  // Automation capabilities every Angular client supports. Client-specific ones are registered
  // in that client's own provider module.
  safeProvider({
    provide: AutomationCapability,
    useFactory: (configService: ConfigService, stateProvider: StateProvider) =>
      new FeatureFlagsCapability(configService, stateProvider),
    deps: [ConfigService, StateProvider],
    multi: true,
  }),
  safeProvider({
    provide: AutomationCapability,
    useFactory: (storageServiceProvider: StorageServiceProvider) =>
      new StateCapability(storageServiceProvider),
    deps: [StorageServiceProvider],
    multi: true,
  }),
  safeProvider({
    provide: AutomationCapability,
    useFactory: (
      accountService: AccountServiceAbstraction,
      authService: AuthServiceAbstraction,
      lockService: LockService,
      unlockService: UnlockService,
    ) => new LockCapability(accountService, authService, lockService, unlockService),
    deps: [AccountServiceAbstraction, AuthServiceAbstraction, LockService, UnlockService],
    multi: true,
  }),
  safeProvider({
    provide: AutomationCapability,
    useFactory: (flightRecorder: FlightRecorderService) => new LoggingCapability(flightRecorder),
    deps: [FlightRecorderService],
    multi: true,
  }),
  safeProvider({
    provide: StateEventRegistrarService,
    useClass: DefaultStateEventRegistrarService,
    deps: [GlobalStateProvider, StorageServiceProvider],
  }),
  safeProvider({
    provide: StateEventRunnerService,
    useClass: DefaultStateEventRunnerService,
    deps: [GlobalStateProvider, StorageServiceProvider],
  }),
  safeProvider({
    provide: GlobalStateProvider,
    useClass: DefaultGlobalStateProvider,
    deps: [StorageServiceProvider, LogService],
  }),
  safeProvider({
    provide: ActiveUserAccessor,
    useClass: DefaultActiveUserAccessor,
    deps: [AccountServiceAbstraction],
  }),
  safeProvider({
    provide: ActiveUserStateProvider,
    useClass: DefaultActiveUserStateProvider,
    deps: [ActiveUserAccessor, SingleUserStateProvider],
  }),
  safeProvider({
    provide: SingleUserStateProvider,
    useClass: DefaultSingleUserStateProvider,
    deps: [StorageServiceProvider, StateEventRegistrarService, LogService],
  }),
  safeProvider({
    provide: DerivedStateProvider,
    useClass: DefaultDerivedStateProvider,
    deps: [],
  }),
  safeProvider({
    provide: StateProvider,
    useClass: DefaultStateProvider,
    deps: [
      ActiveUserStateProvider,
      SingleUserStateProvider,
      GlobalStateProvider,
      DerivedStateProvider,
    ],
  }),
  safeProvider({
    provide: OrganizationBillingServiceAbstraction,
    useClass: OrganizationBillingService,
    deps: [
      ApiServiceAbstraction,
      BillingApiServiceAbstraction,
      LegacyCompatKeyService,
      EncryptService,
      I18nServiceAbstraction,
      OrganizationApiServiceAbstraction,
      SyncService,
      ConfigService,
    ],
  }),
  safeProvider({
    provide: AutofillSettingsServiceAbstraction,
    useClass: AutofillSettingsService,
    deps: [StateProvider, PolicyServiceAbstraction, AccountService, RestrictedItemTypesService],
  }),
  safeProvider({
    provide: BadgeSettingsServiceAbstraction,
    useClass: BadgeSettingsService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: BiometricStateService,
    useClass: DefaultBiometricStateService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: VaultSettingsServiceAbstraction,
    useClass: VaultSettingsService,
    deps: [StateProvider, RestrictedItemTypesService],
  }),
  safeProvider({
    provide: MigrationRunner,
    useClass: MigrationRunner,
    deps: [AbstractStorageService, LogService, MigrationBuilderService, CLIENT_TYPE],
  }),
  safeProvider({
    provide: MigrationBuilderService,
    useClass: MigrationBuilderService,
    deps: [],
  }),
  safeProvider({
    provide: BillingApiServiceAbstraction,
    useClass: BillingApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: OrganizationMetadataServiceAbstraction,
    useClass: DefaultOrganizationMetadataService,
    deps: [BillingApiServiceAbstraction, PlatformUtilsServiceAbstraction],
  }),
  safeProvider({
    provide: BillingAccountProfileStateService,
    useClass: DefaultBillingAccountProfileStateService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: PremiumCheckoutPendingService,
    useClass: DefaultPremiumCheckoutPendingService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: SubscriptionPricingServiceAbstraction,
    useClass: DefaultSubscriptionPricingService,
    deps: [
      BillingApiServiceAbstraction,
      ConfigService,
      I18nServiceAbstraction,
      LogService,
      EnvironmentService,
    ],
  }),
  safeProvider({
    provide: OrganizationManagementPreferencesService,
    useClass: DefaultOrganizationManagementPreferencesService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: ErrorHandler,
    useClass: LoggingErrorHandler,
    deps: [],
  }),
  safeProvider({
    provide: INTRAPROCESS_MESSAGING_SUBJECT,
    useFactory: () => new Subject<Message<Record<string, unknown>>>(),
    deps: [],
  }),
  safeProvider({
    provide: MessageListener,
    useFactory: (subject: Subject<Message<Record<string, unknown>>>) =>
      new MessageListener(subject.asObservable()),
    deps: [INTRAPROCESS_MESSAGING_SUBJECT],
  }),
  safeProvider({
    provide: MessageSender,
    useFactory: (subject: Subject<Message<Record<string, unknown>>>) =>
      new SubjectMessageSender(subject),
    deps: [INTRAPROCESS_MESSAGING_SUBJECT],
  }),
  safeProvider({
    provide: TaskSchedulerService,
    useClass: DefaultTaskSchedulerService,
    deps: [LogService],
  }),
  safeProvider({
    provide: ProviderApiServiceAbstraction,
    useClass: ProviderApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: KdfConfigService,
    useClass: DefaultKdfConfigService,
    deps: [StateProvider],
  }),
  safeProvider({
    provide: OrganizationInviteService,
    useClass: NoopOrganizationInviteService,
    deps: [],
  }),
  safeProvider({
    provide: SetInitialPasswordService,
    useClass: DefaultSetInitialPasswordService,
    deps: [
      ApiServiceAbstraction,
      EncryptService,
      I18nServiceAbstraction,
      KdfConfigService,
      KeyService,
      LegacyCompatKeyService,
      MasterPasswordApiServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      OrganizationApiServiceAbstraction,
      OrganizationUserApiService,
      InternalUserDecryptionOptionsServiceAbstraction,
      AccountCryptographicStateService,
      RegisterSdkService,
      UnlockService,
    ],
  }),
  safeProvider({
    provide: DefaultServerSettingsService,
    useClass: DefaultServerSettingsService,
    deps: [ConfigService],
  }),
  safeProvider({
    provide: AnonLayoutWrapperDataService,
    useClass: DefaultAnonLayoutWrapperDataService,
    deps: [],
  }),
  safeProvider({
    provide: RegistrationFinishServiceAbstraction,
    useClass: DefaultRegistrationFinishService,
    deps: [
      LegacyCompatKeyService,
      AccountApiServiceAbstraction,
      MasterPasswordServiceAbstraction,
      ConfigService,
      SdkService,
    ],
  }),
  safeProvider({
    provide: DeepLinkRedirectService,
    useClass: NoopDeepLinkRedirectService,
    deps: [],
  }),
  safeProvider({
    provide: TwoFactorAuthComponentService,
    useClass: DefaultTwoFactorAuthComponentService,
    deps: [],
  }),
  safeProvider({
    provide: TwoFactorAuthWebAuthnComponentService,
    useClass: DefaultTwoFactorAuthWebAuthnComponentService,
    deps: [],
  }),
  safeProvider({
    provide: TwoFactorApiService,
    useClass: DefaultTwoFactorApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: ViewCacheService,
    useExisting: NoopViewCacheService,
    deps: [],
  }),
  safeProvider({
    provide: LoginComponentService,
    useClass: DefaultLoginComponentService,
    deps: [
      CryptoFunctionServiceAbstraction,
      EnvironmentService,
      PasswordGenerationServiceAbstraction,
      PlatformUtilsServiceAbstraction,
      SsoLoginServiceAbstraction,
    ],
  }),
  safeProvider({
    provide: RegisterSdkService,
    useClass: DefaultRegisterSdkService,
    deps: [
      SdkClientFactory,
      EnvironmentService,
      PlatformUtilsServiceAbstraction,
      AccountServiceAbstraction,
      ApiServiceAbstraction,
      StateProvider,
      ConfigService,
      ManagedSettingsService,
    ],
  }),
  safeProvider({
    provide: SdkService,
    useClass: DefaultSdkService,
    deps: [
      SdkClientFactory,
      EnvironmentService,
      PlatformUtilsServiceAbstraction,
      AccountServiceAbstraction,
      KdfConfigService,
      KeyService,
      AccountCryptographicStateService,
      ApiServiceAbstraction,
      StateProvider,
      ConfigService,
      V2UpgradeTokenStateService,
      ManagedSettingsService,
    ],
  }),
  safeProvider({
    provide: ManagedSettingsService,
    useFactory: () => {
      if (!devFlagEnabled("managedSettingsDevSource")) {
        return new DefaultManagedSettingsService(SdkLoadService.Ready);
      }

      const service = new DevManagedSettingsService(SdkLoadService.Ready);
      service.pushExplicit(devFlagValue("managedSettingsDevSource") as Record<string, unknown>);
      return service;
    },
    deps: [],
  }),
  safeProvider({
    provide: CipherAuthorizationService,
    useClass: DefaultCipherAuthorizationService,
    deps: [CollectionService, OrganizationServiceAbstraction, AccountServiceAbstraction],
  }),
  safeProvider({
    provide: SendPasswordService,
    useClass: DefaultSendPasswordService,
    deps: [CryptoFunctionServiceAbstraction],
  }),
  safeProvider({
    provide: LoginDecryptionOptionsService,
    useClass: DefaultLoginDecryptionOptionsService,
    deps: [MessagingServiceAbstraction],
  }),
  safeProvider({
    provide: UserAsymmetricKeysRegenerationService,
    useClass: DefaultUserAsymmetricKeysRegenerationService,
    deps: [KeyService, LogService, SdkService, ConfigService],
  }),
  safeProvider({
    provide: LoginSuccessHandlerService,
    useClass: DefaultLoginSuccessHandlerService,
    deps: [
      LoginEmailService,
      SsoLoginServiceAbstraction,
      SyncService,
      UserAsymmetricKeysRegenerationService,
      EncryptedMigrator,
    ],
  }),
  safeProvider({
    provide: TaskService,
    useClass: DefaultTaskService,
    deps: [
      StateProvider,
      ApiServiceAbstraction,
      OrganizationServiceAbstraction,
      AuthServiceAbstraction,
      ServerNotificationsService,
      MessageListener,
    ],
  }),
  safeProvider({
    provide: SendTokenService,
    useClass: DefaultSendTokenService,
    deps: [GlobalStateProvider, SdkService, SendPasswordService],
  }),
  safeProvider({
    provide: EndUserNotificationService,
    useClass: DefaultEndUserNotificationService,
    deps: [
      StateProvider,
      ApiServiceAbstraction,
      ServerNotificationsService,
      AuthServiceAbstraction,
      LogService,
    ],
  }),
  safeProvider({
    provide: AccountDeletionService,
    useClass: AccountDeletionService,
    deps: [AccountServiceAbstraction, OrganizationServiceAbstraction, DialogService],
  }),
  safeProvider({
    provide: DeviceTrustToastServiceAbstraction,
    useClass: DeviceTrustToastService,
    deps: [
      AuthRequestServiceAbstraction,
      DeviceTrustServiceAbstraction,
      I18nServiceAbstraction,
      ToastService,
    ],
  }),
  safeProvider({
    provide: MasterPasswordApiServiceAbstraction,
    useClass: MasterPasswordApiService,
    deps: [ApiServiceAbstraction, LogService],
  }),
  safeProvider({
    provide: LogoutService,
    useClass: DefaultLogoutService,
    deps: [MessagingServiceAbstraction],
  }),
  safeProvider({
    provide: DocumentLangSetter,
    useClass: DocumentLangSetter,
    deps: [DOCUMENT, I18nServiceAbstraction],
  }),
  safeProvider({
    provide: CipherEncryptionService,
    useClass: DefaultCipherEncryptionService,
    deps: [SdkService, LogService],
  }),
  safeProvider({
    provide: DeviceManagementComponentServiceAbstraction,
    useClass: DefaultDeviceManagementComponentService,
    deps: [],
  }),
  safeProvider({
    provide: ChangePasswordService,
    useClass: DefaultChangePasswordService,
    deps: [
      KeyService,
      MasterPasswordApiServiceAbstraction,
      InternalMasterPasswordServiceAbstraction,
      MasterPasswordUnlockService,
      InternalPolicyService,
      OrganizationInviteService,
    ],
  }),
  safeProvider({
    provide: PasswordPreloginApiService,
    useClass: PasswordPreloginApiService,
    deps: [ApiServiceAbstraction, EnvironmentService],
  }),
  safeProvider({
    provide: PasswordPreloginService,
    useClass: DefaultPasswordPreloginService,
    deps: [PasswordPreloginApiService, SdkService, ConfigService],
  }),
  safeProvider({
    provide: EncryptedMigrationsSchedulerService,
    useClass: DefaultEncryptedMigrationsSchedulerService,
    deps: [
      SyncService,
      AccountService,
      StateProvider,
      EncryptedMigrator,
      AuthServiceAbstraction,
      LogService,
      DialogService,
      ToastService,
      I18nServiceAbstraction,
      Router,
    ],
  }),
  safeProvider({
    provide: APP_INITIALIZER as SafeInjectionToken<() => Promise<void>>,
    useFactory: (encryptedMigrationsScheduler: EncryptedMigrationsSchedulerService) => () => {},
    deps: [EncryptedMigrationsSchedulerService],
    multi: true,
  }),
  safeProvider({
    provide: LockService,
    useClass: DefaultLockService,
    deps: [
      AccountService,
      BiometricsService,
      VaultTimeoutSettingsService,
      LogoutService,
      MessagingServiceAbstraction,
      FolderServiceAbstraction,
      StateEventRunnerService,
      CipherServiceAbstraction,
      AuthServiceAbstraction,
      SystemService,
      ProcessReloadServiceAbstraction,
      LogService,
      KeyService,
    ],
  }),
  safeProvider({
    provide: CipherArchiveService,
    useClass: DefaultCipherArchiveService,
    deps: [CipherServiceAbstraction, ApiServiceAbstraction, BillingAccountProfileStateService],
  }),
  safeProvider({
    provide: RotateableKeySetService,
    useClass: DefaultRotateableKeySetService,
    deps: [LegacyCompatKeyService, EncryptService],
  }),
  safeProvider({
    provide: NewDeviceVerificationComponentService,
    useClass: DefaultNewDeviceVerificationComponentService,
    deps: [],
  }),
  safeProvider({
    provide: KeyConnectorApiService,
    useClass: DefaultKeyConnectorApiService,
    deps: [ApiServiceAbstraction],
  }),
  safeProvider({
    provide: PremiumInterestStateService,
    useClass: NoopPremiumInterestStateService,
    deps: [],
  }),
  safeProvider({
    provide: ChangeLoginPasswordService,
    useClass: DefaultChangeLoginPasswordService,
    deps: [ApiServiceAbstraction, EnvironmentService, DomainSettingsService],
  }),
];

@NgModule({
  declarations: [],
  // Do not register your dependency here! Add it to the typesafeProviders array using the helper function
  providers: safeProviders,
})
export class JslibServicesModule {}
