import { UserId } from "@bytewarden/user-core";

import { ClearEvent } from "./user-key-definition";

export abstract class StateEventRunnerService {
  abstract handleEvent(event: ClearEvent, userId: UserId): Promise<void>;
}
