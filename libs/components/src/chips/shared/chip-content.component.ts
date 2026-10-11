import { Component, ChangeDetectionStrategy, input, computed } from "@angular/core";

import { IconComponent } from "../../icon";
import { BytewardenIcon } from "../../shared/icon";

import { ChipSize } from "./base-chip.directive";

/**
 * `<bit-chip-content>` is a content wrapper component that provides consistent chip styling
 * and layout with support for icons, custom content slots, and dismiss functionality.
 *
 * @internal only to be used within lib/components
 */
@Component({
  selector: "bit-chip-content, [bit-chip-content]",
  templateUrl: "./chip-content.component.html",
  imports: [IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "classList()",
  },
})
export class ChipContentComponent {
  readonly startIcon = input<BytewardenIcon>();

  readonly endIcon = input<BytewardenIcon>();

  readonly size = input<ChipSize>("large");

  protected readonly gapClass = computed(() => {
    const size = this.size() || "large";
    return size === "large" ? "tw-gap-1.5" : "tw-gap-1";
  });

  protected readonly classList = computed(() => {
    return [
      "tw-inline-flex",
      "tw-min-w-0",
      "tw-w-full",
      "tw-max-w-full",
      "tw-items-center",
      "tw-justify-between",
      this.gapClass(),
    ].join(" ");
  });
}
