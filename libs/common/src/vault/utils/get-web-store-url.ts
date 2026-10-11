import { DeviceType } from "../../enums";

/** Returns Bytewarden releases until independent browser store listings are available. */
export const getWebStoreUrl = (_deviceType: DeviceType): string => {
  return "https://github.com/Convex-Works/bytewarden/releases";
};
