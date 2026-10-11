import { Observable, combineLatest, of } from "rxjs";

import { LogService } from "@bytewarden/logging";
import {
  CombinedState,
  SingleUserState,
  StateEventRegistrarService,
  UserKeyDefinition,
} from "@bytewarden/state";
import { AbstractStorageService, ObservableStorageService } from "@bytewarden/storage-core";
import { UserId } from "@bytewarden/user-core";

import { StateBase } from "./state-base";

export class DefaultSingleUserState<T>
  extends StateBase<T, UserKeyDefinition<T>>
  implements SingleUserState<T>
{
  readonly combinedState$: Observable<CombinedState<T | null>>;

  constructor(
    readonly userId: UserId,
    keyDefinition: UserKeyDefinition<T>,
    chosenLocation: AbstractStorageService & ObservableStorageService,
    private stateEventRegistrarService: StateEventRegistrarService,
    logService: LogService,
  ) {
    super(keyDefinition.buildKey(userId), chosenLocation, keyDefinition, logService);
    this.combinedState$ = combineLatest([of(userId), this.state$]);
  }

  protected override async doStorageSave(newState: T, oldState: T): Promise<void> {
    await super.doStorageSave(newState, oldState);
    await this.stateEventRegistrarService.registerEvents(this.keyDefinition);
  }
}
