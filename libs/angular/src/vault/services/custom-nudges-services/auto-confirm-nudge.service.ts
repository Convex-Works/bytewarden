import { Injectable } from "@angular/core";
import { combineLatest, map, Observable } from "rxjs";

import { AutomaticUserConfirmationService } from "@bytewarden/auto-confirm";
import { StateProvider } from "@bytewarden/common/platform/state";
import { UserId } from "@bytewarden/user-core";

import { DefaultSingleNudgeService } from "../default-single-nudge.service";
import { NudgeType, NudgeStatus } from "../nudges.service";

/**
 * Browser specific nudge service for auto-confirm nudge.
 */
@Injectable()
export class AutoConfirmNudgeService extends DefaultSingleNudgeService {
  constructor(
    stateProvider: StateProvider,
    private autoConfirmService: AutomaticUserConfirmationService,
  ) {
    super(stateProvider);
  }

  nudgeStatus$(nudgeType: NudgeType, userId: UserId): Observable<NudgeStatus> {
    return combineLatest([
      this.getNudgeStatus$(nudgeType, userId),
      this.autoConfirmService.configuration$(userId),
      this.autoConfirmService.canManageAutoConfirm$(userId),
    ]).pipe(
      map(([nudgeStatus, autoConfirmState, canManageAutoConfirm]) => {
        if (!canManageAutoConfirm) {
          return {
            hasBadgeDismissed: true,
            hasSpotlightDismissed: true,
          };
        }

        if (nudgeStatus.hasBadgeDismissed || nudgeStatus.hasSpotlightDismissed) {
          return nudgeStatus;
        }

        const dismissed = autoConfirmState.showBrowserNotification === false;

        return {
          hasBadgeDismissed: dismissed,
          hasSpotlightDismissed: dismissed,
        };
      }),
    );
  }
}
