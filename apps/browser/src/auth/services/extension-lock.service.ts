import { LogoutService } from "@bytewarden/auth/common";
import MainBackground from "@bytewarden/browser/background/main.background";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { AuthService } from "@bytewarden/common/auth/abstractions/auth.service";
import { ProcessReloadServiceAbstraction } from "@bytewarden/common/key-management/process-reload";
import { VaultTimeoutSettingsService } from "@bytewarden/common/key-management/vault-timeout";
import { MessagingService } from "@bytewarden/common/platform/abstractions/messaging.service";
import { SystemService } from "@bytewarden/common/platform/abstractions/system.service";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { FolderService } from "@bytewarden/common/vault/abstractions/folder/folder.service.abstraction";
import { BiometricsService, KeyService } from "@bytewarden/key-management";
import { LogService } from "@bytewarden/logging";
import { StateEventRunnerService } from "@bytewarden/state";
import { DefaultLockService, LockSource } from "@bytewarden/unlock";
import { UserId } from "@bytewarden/user-core";

export class ExtensionLockService extends DefaultLockService {
  constructor(
    accountService: AccountService,
    biometricService: BiometricsService,
    vaultTimeoutSettingsService: VaultTimeoutSettingsService,
    logoutService: LogoutService,
    messagingService: MessagingService,
    folderService: FolderService,
    stateEventRunnerService: StateEventRunnerService,
    cipherService: CipherService,
    authService: AuthService,
    systemService: SystemService,
    processReloadService: ProcessReloadServiceAbstraction,
    logService: LogService,
    keyService: KeyService,
    private readonly main: MainBackground,
  ) {
    super(
      accountService,
      biometricService,
      vaultTimeoutSettingsService,
      logoutService,
      messagingService,
      folderService,
      stateEventRunnerService,
      cipherService,
      authService,
      systemService,
      processReloadService,
      logService,
      keyService,
    );
  }

  async runPlatformOnLockActions(userId: UserId, source: LockSource): Promise<void> {
    await super.runPlatformOnLockActions(userId, source);
    await this.main.refreshMenu(true);
  }
}
