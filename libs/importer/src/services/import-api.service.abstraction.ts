// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { ImportCiphersRequest } from "@bytewarden/common/models/request/import-ciphers.request";
import { ImportOrganizationCiphersRequest } from "@bytewarden/common/models/request/import-organization-ciphers.request";

export abstract class ImportApiServiceAbstraction {
  postImportCiphers: (request: ImportCiphersRequest) => Promise<any>;
  postImportOrganizationCiphers: (
    organizationId: string,
    request: ImportOrganizationCiphersRequest,
  ) => Promise<any>;
}
