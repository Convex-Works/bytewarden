import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
  combineLatest,
  filter,
  firstValueFrom,
  map,
  Observable,
  shareReplay,
  switchMap,
} from "rxjs";

import { PremiumUpgradeDialogComponent } from "@bytewarden/angular/billing/components";
import { JslibModule } from "@bytewarden/angular/jslib.module";
import { NudgesService, NudgeType } from "@bytewarden/angular/vault";
import { AutomaticUserConfirmationService } from "@bytewarden/auto-confirm";
import { Account, AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { getUserId } from "@bytewarden/common/auth/services/account.service";
import { AutofillSettingsServiceAbstraction } from "@bytewarden/common/autofill/services/autofill-settings.service";
import { BillingAccountProfileStateService } from "@bytewarden/common/billing/abstractions";
import { UserId } from "@bytewarden/common/types/guid";
import {
  DialogService,
  ItemModule,
  LinkModule,
  TypographyModule,
  CalloutModule,
  BerryComponent,
} from "@bytewarden/components";

import { CurrentAccountComponent } from "../../../auth/popup/account-switching/current-account.component";
import { PopOutComponent } from "../../../platform/popup/components/pop-out.component";
import { PopupHeaderComponent } from "../../../platform/popup/layout/popup-header.component";
import { PopupPageComponent } from "../../../platform/popup/layout/popup-page.component";

@Component({
  templateUrl: "settings-v2.component.html",
  imports: [
    CommonModule,
    JslibModule,
    RouterModule,
    PopupPageComponent,
    PopupHeaderComponent,
    PopOutComponent,
    ItemModule,
    CurrentAccountComponent,
    TypographyModule,
    LinkModule,
    CalloutModule,
    BerryComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsV2Component {
  readonly NudgeType = NudgeType;

  private readonly authenticatedAccount$: Observable<Account> =
    this.accountService.activeAccount$.pipe(
      filter((account): account is Account => account !== null),
      shareReplay({ bufferSize: 1, refCount: true }),
    );

  protected readonly hasPremium$ = this.authenticatedAccount$.pipe(
    switchMap((account) => this.accountProfileStateService.hasPremiumFromAnySource$(account.id)),
  );

  readonly showDownloadBytewardenNudge$: Observable<boolean> = this.authenticatedAccount$.pipe(
    switchMap((account) =>
      this.nudgesService.showNudgeBadge$(NudgeType.DownloadBytewarden, account.id),
    ),
  );

  readonly showVaultBadge$: Observable<boolean> = this.authenticatedAccount$.pipe(
    switchMap((account) =>
      this.nudgesService.showNudgeBadge$(NudgeType.EmptyVaultNudge, account.id),
    ),
  );

  readonly showAdminBadge$: Observable<boolean> = this.authenticatedAccount$.pipe(
    switchMap((account) =>
      this.nudgesService.showNudgeBadge$(NudgeType.AutoConfirmNudge, account.id),
    ),
  );

  readonly showAutofillBadge$: Observable<boolean> = this.authenticatedAccount$.pipe(
    switchMap((account) =>
      combineLatest([
        this.nudgesService.showNudgeBadge$(NudgeType.AutofillNudge, account.id),
        this.autofillSettingsService.showClipboardSettingUpdateNotification$,
      ]).pipe(
        map(
          ([showAutofillNudge, showClipboardNotification]) =>
            showAutofillNudge || showClipboardNotification,
        ),
      ),
    ),
  );

  readonly showAdminSettingsLink$: Observable<boolean> = this.accountService.activeAccount$.pipe(
    getUserId,
    switchMap((userId) => this.autoConfirmService.canManageAutoConfirm$(userId)),
  );

  constructor(
    private readonly nudgesService: NudgesService,
    private readonly accountService: AccountService,
    private readonly autoConfirmService: AutomaticUserConfirmationService,
    private readonly accountProfileStateService: BillingAccountProfileStateService,
    private readonly dialogService: DialogService,
    private readonly autofillSettingsService: AutofillSettingsServiceAbstraction,
  ) {}

  protected openUpgradeDialog() {
    PremiumUpgradeDialogComponent.open(this.dialogService);
  }

  async dismissBadge(type: NudgeType) {
    if (await firstValueFrom(this.showVaultBadge$)) {
      const account = await firstValueFrom(this.authenticatedAccount$);
      await this.nudgesService.dismissNudge(type, account.id as UserId, true);
    }
  }
}
