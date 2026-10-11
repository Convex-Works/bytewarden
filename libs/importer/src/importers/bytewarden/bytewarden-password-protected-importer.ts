// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { KeyService } from "@bytewarden/key-management";
// eslint-disable-next-line no-restricted-imports
import {
  Argon2KdfConfig,
  EncryptService,
  EncString,
  KdfConfig,
  KdfType,
  KeyGenerationService,
  PBKDF2KdfConfig,
  SymmetricCryptoKey,
} from "@bytewarden/legacy-crypto";
import {
  BytewardenJsonExport,
  BytewardenPasswordProtectedFileFormat,
  isPasswordProtected,
} from "@bytewarden/vault-export-core";

import { ImportResult } from "../../models/import-result";
import { Importer } from "../importer";

import { BytewardenEncryptedJsonImporter } from "./bytewarden-encrypted-json-importer";

export class BytewardenPasswordProtectedImporter
  extends BytewardenEncryptedJsonImporter
  implements Importer
{
  private key: SymmetricCryptoKey;

  constructor(
    keyService: KeyService,
    encryptService: EncryptService,
    i18nService: I18nService,
    cipherService: CipherService,
    private keyGenerationService: KeyGenerationService,
    accountService: AccountService,
    private promptForPassword_callback: () => Promise<string>,
  ) {
    super(keyService, encryptService, i18nService, cipherService, accountService);
  }

  async parse(data: string): Promise<ImportResult> {
    const result = new ImportResult();
    const parsedData: BytewardenPasswordProtectedFileFormat | BytewardenJsonExport =
      JSON.parse(data);

    if (!parsedData) {
      result.success = false;
      return result;
    }

    if (!isPasswordProtected(parsedData)) {
      return await super.parse(data);
    }

    if (this.cannotParseFile(parsedData)) {
      result.success = false;
      return result;
    }

    // File is password-protected
    const password = await this.promptForPassword_callback();
    if (!(await this.checkPassword(parsedData, password))) {
      result.success = false;
      result.errorMessage = this.i18nService.t("invalidFilePassword");
      return result;
    }

    const encData = new EncString(parsedData.data);
    const clearTextData = await this.encryptService.decryptString(encData, this.key);
    return await super.parse(clearTextData);
  }

  private async checkPassword(
    jdoc: BytewardenPasswordProtectedFileFormat,
    password: string,
  ): Promise<boolean> {
    if (this.isNullOrWhitespace(password)) {
      return false;
    }

    const kdfConfig: KdfConfig =
      jdoc.kdfType === KdfType.PBKDF2_SHA256
        ? new PBKDF2KdfConfig(jdoc.kdfIterations)
        : new Argon2KdfConfig(jdoc.kdfIterations, jdoc.kdfMemory, jdoc.kdfParallelism);

    this.key = await this.keyGenerationService.deriveVaultExportKey(password, jdoc.salt, kdfConfig);

    const encKeyValidation = new EncString(jdoc.encKeyValidation_DO_NOT_EDIT);

    try {
      await this.encryptService.decryptString(encKeyValidation, this.key);
      return true;
    } catch {
      return false;
    }
  }

  private cannotParseFile(jdoc: BytewardenPasswordProtectedFileFormat): boolean {
    return (
      !jdoc ||
      !jdoc.encrypted ||
      !jdoc.passwordProtected ||
      !jdoc.salt ||
      !jdoc.kdfIterations ||
      typeof jdoc.kdfIterations !== "number" ||
      jdoc.kdfType == null ||
      KdfType[jdoc.kdfType] == null ||
      !jdoc.encKeyValidation_DO_NOT_EDIT ||
      !jdoc.data
    );
  }
}
