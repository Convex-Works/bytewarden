import { map, Observable } from "rxjs";

import { UserId } from "@bytewarden/user-core";

import { ActiveUserAccessor } from "../../platform/state";
import { AccountService } from "../abstractions/account.service";

/**
 * Implementation for Platform so they can avoid a direct dependency on AccountService. Not for general consumption.
 */
export class DefaultActiveUserAccessor implements ActiveUserAccessor {
  constructor(private readonly accountService: AccountService) {
    this.activeUserId$ = this.accountService.activeAccount$.pipe(
      map((a) => (a != null ? a.id : null)),
    );
  }

  activeUserId$: Observable<UserId | null>;
}
