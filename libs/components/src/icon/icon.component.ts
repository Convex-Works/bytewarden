import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

import { BytewardenIcon } from "../shared/icon";

@Component({
  selector: "bit-icon",
  host: {
    "[class]": "classList()",
    "[attr.aria-hidden]": "ariaLabel() ? null : true",
    "[attr.aria-label]": "ariaLabel()",
    "[attr.role]": "ariaLabel() ? 'img' : 'presentation'",
  },
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  /**
   * The Bytewarden icon name (e.g., "bwi-lock", "bwi-user")
   */
  readonly name = input.required<BytewardenIcon>();

  /**
   * Accessible label for the icon
   */
  readonly ariaLabel = input<string>();

  /**
   * Whether the icon should use a fixed width
   */
  readonly fixedWidth = input(false, { transform: booleanAttribute });

  protected readonly classList = computed(() =>
    ["bwi", this.name(), this.fixedWidth() && "bwi-fw"].filter(Boolean),
  );
}
