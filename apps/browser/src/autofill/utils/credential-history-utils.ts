import { firstValueFrom, Observable } from "rxjs";

import { Account } from "@bytewarden/common/auth/abstractions/account.service";
import { getOptionalUserId } from "@bytewarden/common/auth/services/account.service";
import { GeneratedCredential } from "@bytewarden/generator-core";
import { GeneratorHistoryService } from "@bytewarden/generator-history";

/**
 * Tracks a generated credential for the active user.
 * Does nothing if there is no active user.
 */
export async function trackGeneratedCredential(
  historyService: GeneratorHistoryService,
  account$: Observable<Account | null>,
  generated: GeneratedCredential,
): Promise<void> {
  const userId = await firstValueFrom(account$.pipe(getOptionalUserId));
  if (userId) {
    await historyService.track(
      userId,
      generated.credential,
      generated.category,
      generated.generationDate,
    );
  }
}
