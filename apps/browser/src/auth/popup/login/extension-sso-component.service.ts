import { Injectable } from "@angular/core";

import { DefaultSsoComponentService, SsoComponentService } from "@bytewarden/auth/angular";
import { AuthService } from "@bytewarden/common/auth/abstractions/auth.service";
import { EnvironmentService } from "@bytewarden/common/platform/abstractions/environment.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { LogService } from "@bytewarden/common/platform/abstractions/log.service";
import { SyncService } from "@bytewarden/common/vault/abstractions/sync/sync.service.abstraction";

/**
 * This service is used to handle the SSO login process for the browser extension.
 */
@Injectable()
export class ExtensionSsoComponentService
  extends DefaultSsoComponentService
  implements SsoComponentService
{
  constructor(
    protected syncService: SyncService,
    protected authService: AuthService,
    protected environmentService: EnvironmentService,
    protected i18nService: I18nService,
    protected logService: LogService,
  ) {
    super();
  }

  /**
   * Closes the popup window after a successful login.
   */
  async closeWindow() {
    window.close();
  }
}
