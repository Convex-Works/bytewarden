import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { firstValueFrom } from "rxjs";

import { EnvironmentService } from "@bytewarden/common/platform/abstractions/environment.service";
import { CenterPositionStrategy, DialogService, ItemModule } from "@bytewarden/components";
import { TroubleshootingDialogComponent } from "@bytewarden/logging-angular";
import { I18nPipe } from "@bytewarden/ui-common";

import { BrowserApi } from "../../../../platform/browser/browser-api";
import { PopOutComponent } from "../../../../platform/popup/components/pop-out.component";
import { PopupHeaderComponent } from "../../../../platform/popup/layout/popup-header.component";
import { PopupPageComponent } from "../../../../platform/popup/layout/popup-page.component";
import { AboutDialogComponent } from "../about-dialog/about-dialog.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "about-page-v2.component.html",
  imports: [
    CommonModule,
    RouterModule,
    PopupPageComponent,
    PopupHeaderComponent,
    PopOutComponent,
    ItemModule,
    I18nPipe,
  ],
})
export class AboutPageV2Component {
  constructor(
    private readonly dialogService: DialogService,
    private readonly environmentService: EnvironmentService,
  ) {}

  about() {
    this.dialogService.open(AboutDialogComponent, {
      positionStrategy: new CenterPositionStrategy(),
    });
  }

  troubleshoot() {
    TroubleshootingDialogComponent.open(this.dialogService);
  }

  async launchHelp() {
    await BrowserApi.createNewTab("https://github.com/Convex-Works/bytewarden#develop-and-build");
  }

  async openWebVault() {
    const confirmed = await this.dialogService.openSimpleDialog({
      title: { key: "continueToWebApp" },
      content: { key: "continueToWebAppDesc" },
      type: "info",
      acceptButtonText: { key: "continue" },
    });
    if (confirmed) {
      const env = await firstValueFrom(this.environmentService.environment$);
      const url = env.getWebVaultUrl();
      await BrowserApi.createNewTab(url);
    }
  }

  async reportIssue() {
    await BrowserApi.createNewTab("https://github.com/Convex-Works/bytewarden/issues");
  }
}
