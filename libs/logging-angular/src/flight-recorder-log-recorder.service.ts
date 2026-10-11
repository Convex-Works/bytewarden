import { Injectable } from "@angular/core";
import { FlightRecorderClient } from "@bitwarden/sdk-internal";

import { SdkLoadService } from "@bytewarden/common/platform/abstractions/sdk/sdk-load.service";
import { FlightRecorderLogRecorder } from "@bytewarden/logging";

/**
 * Angular wrapper for {@link FlightRecorderLogRecorder}.
 */
@Injectable({ providedIn: "root" })
export class FlightRecorderLogRecorderService extends FlightRecorderLogRecorder {
  constructor() {
    super(SdkLoadService.Ready.then(() => new FlightRecorderClient()));
  }
}
