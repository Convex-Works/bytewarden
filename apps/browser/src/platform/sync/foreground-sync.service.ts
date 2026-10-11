import { filter, firstValueFrom, of, timeout } from "rxjs";

import { CollectionService } from "@bytewarden/admin-console/common";
import { ApiService } from "@bytewarden/common/abstractions/api.service";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { AuthService } from "@bytewarden/common/auth/abstractions/auth.service";
import { TokenService } from "@bytewarden/common/auth/abstractions/token.service";
import { ConfigService } from "@bytewarden/common/platform/abstractions/config/config.service";
import { LogService } from "@bytewarden/common/platform/abstractions/log.service";
import { SdkService } from "@bytewarden/common/platform/abstractions/sdk/sdk.service";
import {
  CommandDefinition,
  MessageListener,
  MessageSender,
} from "@bytewarden/common/platform/messaging";
import { Utils } from "@bytewarden/common/platform/misc/utils";
import { StateProvider } from "@bytewarden/common/platform/state";
// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import { CoreSyncService } from "@bytewarden/common/platform/sync/internal";
import { SyncOptions } from "@bytewarden/common/platform/sync/sync.service";
import { SendApiService } from "@bytewarden/common/tools/send/services/send-api.service.abstraction";
import { InternalSendService } from "@bytewarden/common/tools/send/services/send.service.abstraction";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { FolderApiServiceAbstraction } from "@bytewarden/common/vault/abstractions/folder/folder-api.service.abstraction";
import { InternalFolderService } from "@bytewarden/common/vault/abstractions/folder/folder.service.abstraction";

import { FULL_SYNC_FINISHED } from "./sync-service.listener";

export type FullSyncMessage = { forceSync: boolean; options: SyncOptions; requestId: string };

export const DO_FULL_SYNC = new CommandDefinition<FullSyncMessage>("doFullSync");

export class ForegroundSyncService extends CoreSyncService {
  constructor(
    tokenService: TokenService,
    folderService: InternalFolderService,
    folderApiService: FolderApiServiceAbstraction,
    messageSender: MessageSender,
    logService: LogService,
    cipherService: CipherService,
    collectionService: CollectionService,
    apiService: ApiService,
    accountService: AccountService,
    authService: AuthService,
    sendService: InternalSendService,
    sendApiService: SendApiService,
    private readonly messageListener: MessageListener,
    stateProvider: StateProvider,
    configService: ConfigService,
    sdkService: SdkService,
  ) {
    super(
      tokenService,
      folderService,
      folderApiService,
      messageSender,
      logService,
      cipherService,
      collectionService,
      apiService,
      accountService,
      authService,
      sendService,
      sendApiService,
      stateProvider,
      configService,
      sdkService,
    );
  }

  async fullSync(
    forceSync: boolean,
    allowThrowOnErrorOrOptions?: boolean | SyncOptions,
  ): Promise<boolean> {
    this.syncInProgress = true;
    try {
      // Normalize options
      const options =
        typeof allowThrowOnErrorOrOptions === "boolean"
          ? { allowThrowOnError: allowThrowOnErrorOrOptions, skipTokenRefresh: false }
          : {
              allowThrowOnError: allowThrowOnErrorOrOptions?.allowThrowOnError ?? false,
              skipTokenRefresh: allowThrowOnErrorOrOptions?.skipTokenRefresh ?? false,
            };
      const requestId = Utils.newGuid();
      const syncCompletedPromise = firstValueFrom(
        this.messageListener.messages$(FULL_SYNC_FINISHED).pipe(
          filter((m) => m.requestId === requestId),
          timeout({
            first: 30_000,
            // If we haven't heard back in 30 seconds, just pretend we heard back about an unsuccessful sync.
            with: () => {
              this.logService.warning(
                "ForegroundSyncService did not receive a message back in a reasonable time.",
              );
              return of({ successfully: false, errorMessage: "Sync timed out." });
            },
          }),
        ),
      );
      this.messageSender.send(DO_FULL_SYNC, { forceSync, options, requestId });
      const result = await syncCompletedPromise;

      if (options.allowThrowOnError && result.errorMessage != null) {
        throw new Error(result.errorMessage);
      }

      return result.successfully;
    } finally {
      this.syncInProgress = false;
    }
  }
}
