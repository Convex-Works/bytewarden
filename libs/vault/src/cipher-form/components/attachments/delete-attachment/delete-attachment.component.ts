import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { firstValueFrom } from "rxjs";

import { JslibModule } from "@bytewarden/angular/jslib.module";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { getOptionalUserId } from "@bytewarden/common/auth/services/account.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { LogService } from "@bytewarden/common/platform/abstractions/log.service";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { AttachmentView } from "@bytewarden/common/vault/models/view/attachment.view";
import {
  AsyncActionsModule,
  ButtonModule,
  DialogService,
  IconButtonModule,
  ToastService,
} from "@bytewarden/components";

// FIXME(https://bitwarden.atlassian.net/browse/CL-764): Migrate to OnPush
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  selector: "app-delete-attachment",
  templateUrl: "./delete-attachment.component.html",
  imports: [AsyncActionsModule, CommonModule, JslibModule, ButtonModule, IconButtonModule],
})
export class DeleteAttachmentComponent {
  /** Id of the cipher associated with the attachment */
  // FIXME(https://bitwarden.atlassian.net/browse/CL-903): Migrate to Signals
  // eslint-disable-next-line @angular-eslint/prefer-signals
  @Input({ required: true }) cipherId!: string;

  /** The attachment that is can be deleted */
  // FIXME(https://bitwarden.atlassian.net/browse/CL-903): Migrate to Signals
  // eslint-disable-next-line @angular-eslint/prefer-signals
  @Input({ required: true }) attachment!: AttachmentView;

  /** Whether the attachment is being accessed from the admin console */
  // FIXME(https://bitwarden.atlassian.net/browse/CL-903): Migrate to Signals
  // eslint-disable-next-line @angular-eslint/prefer-signals
  @Input() admin: boolean = false;

  /** Emits when the attachment is successfully deleted */
  // FIXME(https://bitwarden.atlassian.net/browse/CL-903): Migrate to Signals
  // eslint-disable-next-line @angular-eslint/prefer-output-emitter-ref
  @Output() onDeletionSuccess = new EventEmitter<void>();

  constructor(
    private toastService: ToastService,
    private i18nService: I18nService,
    private cipherService: CipherService,
    private logService: LogService,
    private dialogService: DialogService,
    private accountService: AccountService,
  ) {}

  delete = async () => {
    const confirmed = await this.dialogService.openSimpleDialog({
      title: { key: "deleteAttachment" },
      content: { key: "permanentlyDeleteAttachmentConfirmation" },
      type: "warning",
    });

    if (!confirmed) {
      return;
    }

    try {
      const activeUserId = await firstValueFrom(
        this.accountService.activeAccount$.pipe(getOptionalUserId),
      );

      if (activeUserId == null) {
        throw new Error("An active user is expected while deleting an attachment.");
      }

      await this.cipherService.deleteAttachmentWithServer(
        this.cipherId,
        this.attachment.id!,
        activeUserId,
        this.admin,
      );

      this.toastService.showToast({
        variant: "success",
        title: "",
        message: this.i18nService.t("deletedAttachment"),
      });

      this.onDeletionSuccess.emit();
    } catch (e) {
      this.logService.error(e);
    }
  };
}
