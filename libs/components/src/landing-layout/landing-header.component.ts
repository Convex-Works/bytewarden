import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterModule } from "@angular/router";

import { BytewardenLogo, BytewardenLogoBeta } from "@bytewarden/assets/svg";
import { flagEnabled } from "@bytewarden/common/platform/misc/flags";
import { I18nPipe } from "@bytewarden/ui-common";

import { SvgModule } from "../svg";

/**
 * Header component for landing pages with optional Bytewarden logo and header actions slot.
 *
 * @remarks
 * This component provides:
 * - Optional Bytewarden logo with link to home page (left-aligned)
 * - Default content projection slot for header actions (right-aligned, auto-margin left)
 * - Consistent header styling across landing pages
 * - Responsive layout that adapts logo size
 *
 * Use this component inside `bit-landing-layout` as the first child to position it at the top.
 * Content projected into this component will automatically align to the right side of the header.
 *
 * @example
 * ```html
 * <bit-landing-header [hideLogo]="false">
 *   <!-- Content here appears in the right-aligned actions slot -->
 *   <nav>
 *     <a routerLink="/login">Log in</a>
 *     <button type="button">Sign up</button>
 *   </nav>
 * </bit-landing-header>
 * ```
 */
@Component({
  selector: "bit-landing-header",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./landing-header.component.html",
  imports: [I18nPipe, RouterModule, SvgModule],
})
export class LandingHeaderComponent {
  readonly hideLogo = input<boolean>(false);
  protected readonly logo = flagEnabled("prereleaseBuild") ? BytewardenLogoBeta : BytewardenLogo;
}
