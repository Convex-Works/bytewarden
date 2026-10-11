import { Component, inject } from "@angular/core";
import { combineLatest, map, Observable, of, startWith, switchMap } from "rxjs";

import { NudgesService } from "@bytewarden/angular/vault";
import {
  VaultInactive,
  VaultActive,
  GeneratorInactive,
  GeneratorActive,
  SendInactive,
  SendActive,
  SettingsInactive,
  SettingsActive,
} from "@bytewarden/assets/svg";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { getUserId } from "@bytewarden/common/auth/services/account.service";
import { AutofillSettingsServiceAbstraction } from "@bytewarden/common/autofill/services/autofill-settings.service";
import { BottomNavigationButton } from "@bytewarden/components";
import { SendPolicyService } from "@bytewarden/send-ui";

import { HEALTH_TAB_NAV_BUTTON } from "./health-tab-nav-button";

// FIXME(https://bitwarden.atlassian.net/browse/CL-764): Migrate to OnPush
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: "app-tabs-v2",
  templateUrl: "./tabs-v2.component.html",
  standalone: false,
})
export class TabsV2Component {
  private sendPolicyService = inject(SendPolicyService);
  private healthNavButton$: Observable<BottomNavigationButton | undefined> =
    inject(HEALTH_TAB_NAV_BUTTON, { optional: true }) ?? of(undefined);

  private userId$ = this.accountService.activeAccount$.pipe(getUserId);
  private hasActiveBadges$ = this.userId$.pipe(
    switchMap((userId) => this.nudgesService.hasActiveBadges$(userId)),
  );

  private showSettingsBerry$ = combineLatest([
    this.hasActiveBadges$,
    this.autofillSettingsService.showClipboardSettingUpdateNotification$,
  ]).pipe(map(([hasBadges, showClipboard]) => hasBadges || showClipboard));

  private sendEnabled$ = this.sendPolicyService.disableSend$.pipe(
    map((disableSend) => !disableSend),
  );

  protected navButtons$: Observable<BottomNavigationButton[]> = combineLatest([
    this.showSettingsBerry$.pipe(startWith(false)),
    this.sendEnabled$.pipe(startWith(true)),
    this.healthNavButton$.pipe(startWith(undefined)),
  ]).pipe(
    map(([showBerry, sendEnabled, healthNavButton]) => {
      const buttons: BottomNavigationButton[] = [
        {
          label: "vault",
          page: "/tabs/vault",
          icon: VaultInactive,
          iconActive: VaultActive,
        },
        {
          label: "generator",
          page: "/tabs/generator",
          icon: GeneratorInactive,
          iconActive: GeneratorActive,
        },
        ...(sendEnabled
          ? [
              {
                label: "send",
                page: "/tabs/send",
                icon: SendInactive,
                iconActive: SendActive,
              } as BottomNavigationButton,
            ]
          : []),
        ...(healthNavButton ? [healthNavButton] : []),
        {
          label: "settings",
          page: "/tabs/settings",
          icon: SettingsInactive,
          iconActive: SettingsActive,
          showBerry,
        },
      ];
      return buttons;
    }),
  );

  constructor(
    private nudgesService: NudgesService,
    private accountService: AccountService,
    private autofillSettingsService: AutofillSettingsServiceAbstraction,
  ) {}
}
