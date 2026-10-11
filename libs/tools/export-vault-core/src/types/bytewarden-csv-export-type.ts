import { CipherRepromptType } from "@bytewarden/common/vault/enums/cipher-reprompt-type";

export type BytewardenCsvExportType = {
  type: string;
  name: string;
  notes: string;
  fields: string;
  reprompt: CipherRepromptType;
  // Login props
  login_uri: string[];
  login_username: string;
  login_password: string;
  login_totp: string;
  favorite: number | null;
  archivedDate: string | null;
};

export type BytewardenCsvIndividualExportType = BytewardenCsvExportType & {
  folder: string | null;
};

export type BytewardenCsvOrgExportType = BytewardenCsvExportType & {
  collections: string[] | null;
};
