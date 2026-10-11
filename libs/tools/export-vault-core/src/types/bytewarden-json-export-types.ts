import {
  CipherWithIdExport,
  CollectionWithIdExport,
  FolderWithIdExport,
} from "@bytewarden/common/models/export";

// Base
export type BytewardenJsonExport = BytewardenUnEncryptedJsonExport | BytewardenEncryptedJsonExport;

// Decrypted
export type BytewardenUnEncryptedJsonExport =
  BytewardenUnEncryptedIndividualJsonExport | BytewardenUnEncryptedOrgJsonExport;

export type BytewardenUnEncryptedIndividualJsonExport = {
  encrypted: false;
  items: CipherWithIdExport[];
  folders: FolderWithIdExport[];
};

export type BytewardenUnEncryptedOrgJsonExport = {
  encrypted: false;
  items: CipherWithIdExport[];
  collections: CollectionWithIdExport[];
};

// Account-encrypted
export type BytewardenEncryptedJsonExport =
  BytewardenEncryptedIndividualJsonExport | BytewardenEncryptedOrgJsonExport;

export type BytewardenEncryptedIndividualJsonExport = {
  encrypted: true;
  encKeyValidation_DO_NOT_EDIT: string;
  items: CipherWithIdExport[];
  folders: FolderWithIdExport[];
};

export type BytewardenEncryptedOrgJsonExport = {
  encrypted: true;
  encKeyValidation_DO_NOT_EDIT: string;
  items: CipherWithIdExport[];
  collections: CollectionWithIdExport[];
};

// Password-protected
export type BytewardenPasswordProtectedFileFormat = {
  encrypted: true;
  passwordProtected: true;
  salt: string;
  kdfIterations: number;
  kdfMemory?: number;
  kdfParallelism?: number;
  kdfType: number;
  encKeyValidation_DO_NOT_EDIT: string;
  data: string;
};

// Unencrypted type guards
export function isUnencrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenUnEncryptedJsonExport {
  return data != null && (data as { encrypted?: unknown }).encrypted !== true;
}

export function isIndividualUnEncrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenUnEncryptedIndividualJsonExport {
  return isUnencrypted(data) && (data as { folders?: unknown }).folders != null;
}

export function isOrgUnEncrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenUnEncryptedOrgJsonExport {
  return isUnencrypted(data) && (data as { collections?: unknown }).collections != null;
}

// Encrypted type guards
export function isEncrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenEncryptedJsonExport {
  return data != null && (data as { encrypted?: unknown }).encrypted === true;
}
export function isPasswordProtected(
  data: BytewardenPasswordProtectedFileFormat | BytewardenJsonExport | null | undefined,
): data is BytewardenPasswordProtectedFileFormat {
  return (
    data != null &&
    (data as { encrypted?: unknown }).encrypted === true &&
    (data as { passwordProtected?: unknown }).passwordProtected === true
  );
}

export function isIndividualEncrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenEncryptedIndividualJsonExport {
  return isEncrypted(data) && (data as { folders?: unknown }).folders != null;
}

export function isOrgEncrypted(
  data: BytewardenJsonExport | null | undefined,
): data is BytewardenEncryptedOrgJsonExport {
  return isEncrypted(data) && (data as { collections?: unknown }).collections != null;
}
