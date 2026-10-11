import { MessagingService } from "@bytewarden/common/platform/abstractions/messaging.service";
import { UserId } from "@bytewarden/common/types/guid";

import { LogoutService, NewActiveUser } from "../../abstractions/logout.service";
import { LogoutReason } from "../../types";

export class DefaultLogoutService implements LogoutService {
  constructor(protected messagingService: MessagingService) {}
  async logout(userId: UserId, logoutReason?: LogoutReason): Promise<NewActiveUser | undefined> {
    this.messagingService.send("logout", { userId, logoutReason });

    return undefined;
  }
}
