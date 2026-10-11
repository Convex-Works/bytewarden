import { NgClass } from "@angular/common";
import { ChangeDetectionStrategy, Component, input, inject } from "@angular/core";
import { RouterLinkActive, RouterLink } from "@angular/router";

import { BytewardenShield, SideNavLogo, SideNavLogoBeta, BitSvg } from "@bytewarden/assets/svg";
import { flagEnabled } from "@bytewarden/common/platform/misc/flags";

import { SvgComponent } from "../svg/svg.component";

import { SideNavService } from "./side-nav.service";

@Component({
  selector: "bit-nav-logo",
  templateUrl: "./nav-logo.component.html",
  imports: [NgClass, RouterLinkActive, RouterLink, SvgComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "tw-contents" },
})
export class NavLogoComponent {
  protected readonly sideNavService = inject(SideNavService);

  /**
   * The v2 side nav always displays this logo for the open state, regardless of `openIcon`.
   */
  protected readonly sideNavLogo = flagEnabled("prereleaseBuild") ? SideNavLogoBeta : SideNavLogo;

  /**
   * Icon that is displayed when the side nav is closed
   *
   * @default BytewardenShield
   */
  readonly closedIcon = input(BytewardenShield);

  /**
   * Icon that is displayed when the side nav is open
   */
  readonly openIcon = input.required<BitSvg>();

  /**
   * Route to be passed to internal `routerLink`
   */
  readonly route = input.required<string | any[]>();

  /**
   * Passed to `attr.aria-label` and `attr.title`
   */
  readonly label = input.required<string>();
}
