import { AsyncPipe, CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { firstValueFrom, Observable, switchMap } from "rxjs";

import { NudgesService, NudgeType } from "@bytewarden/angular/vault";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { getUserId } from "@bytewarden/common/auth/services/account.service";
import { UserId } from "@bytewarden/common/types/guid";
import { TypographyModule, CalloutModule } from "@bytewarden/components";
import { I18nPipe } from "@bytewarden/ui-common";

// FIXME(https://bitwarden.atlassian.net/browse/CL-764): Migrate to OnPush
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: "nudge-generator-spotlight",
  templateUrl: "nudge-generator-spotlight.component.html",
  imports: [I18nPipe, CalloutModule, AsyncPipe, CommonModule, TypographyModule],
})
export class NudgeGeneratorSpotlightComponent {
  protected readonly NudgeType = NudgeType;
  private activeUserId$ = this.accountService.activeAccount$.pipe(getUserId);
  protected showGeneratorSpotlight$: Observable<boolean> = this.activeUserId$.pipe(
    switchMap((userId) =>
      this.nudgesService.showNudgeSpotlight$(NudgeType.GeneratorNudgeStatus, userId),
    ),
  );

  constructor(
    private nudgesService: NudgesService,
    private accountService: AccountService,
  ) {}

  async dismissGeneratorSpotlight(type: NudgeType) {
    const activeUserId = await firstValueFrom(this.activeUserId$);

    await this.nudgesService.dismissNudge(type, activeUserId as UserId);
  }
}
