// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

// This import has been flagged as unallowed for this class. It may be involved in a circular dependency loop.
// eslint-disable-next-line no-restricted-imports
import { UserVerificationFormInputComponent } from "@bytewarden/auth/angular";
import { AccountApiService } from "@bytewarden/common/auth/abstractions/account-api.service";
import { Verification } from "@bytewarden/common/auth/types/verification";
import { ErrorResponse } from "@bytewarden/common/models/response/error.response";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import {
  CalloutModule,
  ButtonModule,
  DialogModule,
  AsyncActionsModule,
  DialogRef,
  DialogService,
  ToastService,
} from "@bytewarden/components";
import { I18nPipe } from "@bytewarden/ui-common";

// FIXME(https://bitwarden.atlassian.net/browse/CL-764): Migrate to OnPush
// eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection
@Component({
  templateUrl: "delete-account-dialog.component.html",
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    I18nPipe,
    DialogModule,
    CalloutModule,
    UserVerificationFormInputComponent,
    AsyncActionsModule,
  ],
})
export class DeleteAccountDialogComponent {
  deleteForm = this.formBuilder.group({
    verification: undefined as Verification | undefined,
  });
  invalidSecret: boolean = false;

  constructor(
    private i18nService: I18nService,
    private formBuilder: FormBuilder,
    private accountApiService: AccountApiService,
    private dialogRef: DialogRef,
    private toastService: ToastService,
  ) {}

  submit = async () => {
    try {
      const verification = this.deleteForm.get("verification").value;
      await this.accountApiService.deleteAccount(verification);
      await this.dialogRef.close();
      this.toastService.showToast({
        variant: "success",
        title: this.i18nService.t("accountDeleted"),
        message: this.i18nService.t("accountDeletedDesc"),
      });
    } catch (e) {
      if (e instanceof ErrorResponse && e.statusCode === 400) {
        this.invalidSecret = true;
      }
      throw e;
    }
  };

  static open(dialogService: DialogService) {
    return dialogService.open(DeleteAccountDialogComponent);
  }
}
