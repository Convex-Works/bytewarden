import { ConsoleLogService } from "@bytewarden/common/platform/services/console-log.service";

import MainBackground from "../background/main.background";

const logService = new ConsoleLogService(false);
const bytewardenMain = ((self as any).bytewardenMain = new MainBackground());
bytewardenMain.bootstrap().catch((error) => logService.error(error));
