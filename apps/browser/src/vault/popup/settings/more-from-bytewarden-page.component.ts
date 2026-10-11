import { ChangeDetectionStrategy, Component } from "@angular/core";

import { JslibModule } from "@bytewarden/angular/jslib.module";
import { ItemModule } from "@bytewarden/components";

import { PopOutComponent } from "../../../platform/popup/components/pop-out.component";
import { PopupHeaderComponent } from "../../../platform/popup/layout/popup-header.component";
import { PopupPageComponent } from "../../../platform/popup/layout/popup-page.component";

@Component({
  templateUrl: "more-from-bytewarden-page.component.html",
  imports: [JslibModule, PopupPageComponent, PopupHeaderComponent, PopOutComponent, ItemModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoreFromBytewardenPageComponent {}
