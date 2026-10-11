// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
// eslint-disable-next-line no-restricted-imports
import { EncArrayBuffer, EncString } from "@bytewarden/legacy-crypto";

import { ApiService } from "../../../abstractions/api.service";
import { ConfigService } from "../../abstractions/config/config.service";
import {
  FileUploadApiMethods,
  FileUploadService as FileUploadServiceAbstraction,
  UploadOptions,
} from "../../abstractions/file-upload/file-upload.service";
import { LogService } from "../../abstractions/log.service";
import { FileUploadType } from "../../enums";

import { AzureFileUploadService } from "./azure-file-upload.service";
import { BytewardenFileUploadService } from "./bytewarden-file-upload.service";

export class FileUploadService implements FileUploadServiceAbstraction {
  private azureFileUploadService: AzureFileUploadService;
  private bytewardenFileUploadService: BytewardenFileUploadService;

  constructor(
    protected logService: LogService,
    apiService: ApiService,
    configService: ConfigService,
  ) {
    this.azureFileUploadService = new AzureFileUploadService(logService, apiService, configService);
    this.bytewardenFileUploadService = new BytewardenFileUploadService();
  }

  async upload(
    uploadData: { url: string; fileUploadType: FileUploadType },
    fileName: EncString,
    encryptedFileData: EncArrayBuffer,
    fileUploadMethods: FileUploadApiMethods,
    options?: UploadOptions,
  ) {
    try {
      switch (uploadData.fileUploadType) {
        case FileUploadType.Direct:
          await this.bytewardenFileUploadService.upload(
            fileName.encryptedString,
            encryptedFileData,
            (fd) => fileUploadMethods.postDirect(fd),
          );
          break;
        case FileUploadType.Azure: {
          await this.azureFileUploadService.upload(
            uploadData.url,
            encryptedFileData,
            fileUploadMethods.renewFileUploadUrl,
            options,
          );
          break;
        }
        default:
          throw new Error("Unknown file upload type");
      }
    } catch (e) {
      await fileUploadMethods.rollback();
      throw e;
    }
  }
}
