import { AuthenticationStatus } from "@bytewarden/common/auth/enums/authentication-status";
import { UserId } from "@bytewarden/common/types/guid";

import { LogoutReason } from "../types";

export interface NewActiveUser {
  userId: UserId;
  authenticationStatus: AuthenticationStatus;
}

export abstract class LogoutService {
  /**
   * Logs out the user.
   * @param userId The user id.
   * @param logoutReason The optional reason for logging out.
   * @returns The new active user or undefined if there isn't a new active account.
   */
  abstract logout(userId: UserId, logoutReason?: LogoutReason): Promise<NewActiveUser | undefined>;
}
