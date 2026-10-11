import { CollectionView } from "@bytewarden/common/admin-console/models/collections";
import { OrganizationId } from "@bytewarden/common/types/guid";
import { CipherView } from "@bytewarden/common/vault/models/view/cipher.view";
import { SafeInjectionToken } from "@bytewarden/ui-common";

export interface AssignCollectionsParams {
  ciphers: CipherView[];
  organizationId: OrganizationId;
  availableCollections: CollectionView[];
  activeCollection?: CollectionView;
  isSingleCipherAdmin?: boolean;
}

export const AssignCollectionsResult = {
  Saved: "saved",
  Canceled: "canceled",
} as const;

export type AssignCollectionsResult =
  (typeof AssignCollectionsResult)[keyof typeof AssignCollectionsResult];

export interface AssignCollectionsDialogRef {
  open(params: AssignCollectionsParams): Promise<AssignCollectionsResult>;
}

export const ASSIGN_COLLECTIONS_DIALOG = new SafeInjectionToken<AssignCollectionsDialogRef>(
  "ASSIGN_COLLECTIONS_DIALOG",
);
