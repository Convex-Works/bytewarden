// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import { CollectionService } from "@bytewarden/admin-console/common";
import { safeProvider, SafeProvider } from "@bytewarden/angular/platform/utils/safe-provider";
import { ApiService } from "@bytewarden/common/abstractions/api.service";
import { PolicyService } from "@bytewarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { ConfigService } from "@bytewarden/common/platform/abstractions/config/config.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { LogService } from "@bytewarden/common/platform/abstractions/log.service";
import { PlatformUtilsService } from "@bytewarden/common/platform/abstractions/platform-utils.service";
import { SdkService } from "@bytewarden/common/platform/abstractions/sdk/sdk.service";
import { KeyServiceLegacyEncryptorProvider } from "@bytewarden/common/tools/cryptography/key-service-legacy-encryptor-provider";
import { LegacyEncryptorProvider } from "@bytewarden/common/tools/cryptography/legacy-encryptor-provider";
import { ExtensionRegistry } from "@bytewarden/common/tools/extension/extension-registry.abstraction";
import { buildExtensionRegistry } from "@bytewarden/common/tools/extension/factory";
import {
  createSystemServiceProvider,
  SystemServiceProvider,
} from "@bytewarden/common/tools/providers";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { FolderService } from "@bytewarden/common/vault/abstractions/folder/folder.service.abstraction";
import { RestrictedItemTypesService } from "@bytewarden/common/vault/services/restricted-item-types.service";
import { KeyService } from "@bytewarden/key-management";
// eslint-disable-next-line no-restricted-imports
import { EncryptService, KeyGenerationService } from "@bytewarden/legacy-crypto";
import { StateProvider } from "@bytewarden/state";
import { SafeInjectionToken } from "@bytewarden/ui-common";

import {
  ImportApiService,
  ImportApiServiceAbstraction,
  ImportService,
  ImportServiceAbstraction,
} from "../services";

// FIXME: unify with `SYSTEM_SERVICE_PROVIDER` when migrating it from the generator component module
//        to a general module.
export const SYSTEM_SERVICE_PROVIDER = new SafeInjectionToken<SystemServiceProvider>(
  "SystemServices",
);

/** Import service factories */
export const ImporterProviders: SafeProvider[] = [
  safeProvider({
    provide: ImportApiServiceAbstraction,
    useClass: ImportApiService,
    deps: [ApiService],
  }),
  safeProvider({
    provide: LegacyEncryptorProvider,
    useClass: KeyServiceLegacyEncryptorProvider,
    deps: [EncryptService, KeyService, SdkService],
  }),
  safeProvider({
    provide: ExtensionRegistry,
    useFactory: () => {
      return buildExtensionRegistry();
    },
    deps: [],
  }),
  safeProvider({
    provide: SYSTEM_SERVICE_PROVIDER,
    useFactory: createSystemServiceProvider,
    deps: [
      LegacyEncryptorProvider,
      StateProvider,
      PolicyService,
      ExtensionRegistry,
      LogService,
      PlatformUtilsService,
      ConfigService,
    ],
  }),
  safeProvider({
    provide: ImportServiceAbstraction,
    useClass: ImportService,
    deps: [
      CipherService,
      FolderService,
      ImportApiServiceAbstraction,
      I18nService,
      CollectionService,
      KeyService,
      EncryptService,
      KeyGenerationService,
      AccountService,
      RestrictedItemTypesService,
      ConfigService,
      SdkService,
    ],
  }),
];
