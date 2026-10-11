import {
  DefaultNewDeviceVerificationComponentService,
  NewDeviceVerificationComponentService,
} from "@bytewarden/auth/angular";

export class ExtensionNewDeviceVerificationComponentService
  extends DefaultNewDeviceVerificationComponentService
  implements NewDeviceVerificationComponentService
{
  showBackButton() {
    return false;
  }
}
