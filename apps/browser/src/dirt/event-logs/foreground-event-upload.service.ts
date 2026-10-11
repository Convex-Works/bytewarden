import { EventUploadService } from "@bytewarden/common/dirt/event-logs/abstractions/event-upload.service";
import { UserId } from "@bytewarden/common/types/guid";

/**
 * No-op implementation of EventUploadService for the browser foreground (popup) context.
 * Event uploads are handled exclusively by the background service worker to prevent
 * duplicate uploads from both contexts responding to the same browser alarm.
 */
export class ForegroundEventUploadService implements EventUploadService {
  async uploadEvents(_userId?: UserId): Promise<void> {
    // Intentional no-op: the background service worker owns event uploads.
  }
}
