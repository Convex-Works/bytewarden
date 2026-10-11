import { ModuleWithProviders, NgModule } from "@angular/core";
import { DefaultNoComponentGlobalConfig, GlobalConfig, TOAST_CONFIG } from "ngx-toastr";

import { ToastContainerComponent } from "./toast-container.component";
import { BytewardenToastrComponent } from "./toastr.component";

@NgModule({
  imports: [BytewardenToastrComponent, ToastContainerComponent],
  exports: [BytewardenToastrComponent, ToastContainerComponent],
})
export class ToastModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<ToastModule> {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: BytewardenToastrGlobalConfig,
            config: config,
          },
        },
      ],
    };
  }
}

export const BytewardenToastrGlobalConfig: GlobalConfig = {
  ...DefaultNoComponentGlobalConfig,
  toastComponent: BytewardenToastrComponent,
  tapToDismiss: false,
  timeOut: 5000,
  extendedTimeOut: 2000,
  maxOpened: 5,
  autoDismiss: true,
  progressBar: true,
};
