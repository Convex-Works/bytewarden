import { IconTileOptions } from "../icon-tile";
import { MappedDataToSignal } from "../shared/data-to-signal-type";
import { BytewardenIcon } from "../shared/icon";

export interface Option<T> {
  icon?: BytewardenIcon;
  /** Renders an icon tile in place of `icon`; takes precedence when both are set. */
  iconTile?: IconTileOptions;
  value: T | null;
  label?: string;
  description?: string;
  metaData?: string;
  disabled?: boolean;
}

export type MappedOptionComponent<T> = MappedDataToSignal<Option<T>>;
