import { CollectionAdminView } from "@bytewarden/common/admin-console/models/collections";
import { Organization } from "@bytewarden/common/admin-console/models/domain/organization";
import { CipherType } from "@bytewarden/common/vault/enums";
import { ITreeNodeObject } from "@bytewarden/common/vault/models/domain/tree-node";
import { FolderView } from "@bytewarden/common/vault/models/view/folder.view";
import { BytewardenIcon } from "@bytewarden/components";

export type CipherStatus = "all" | "favorites" | "archive" | "trash" | CipherType;

export type CipherTypeFilter = ITreeNodeObject & { type: CipherStatus; icon?: BytewardenIcon };
export type CollectionFilter = CollectionAdminView & {
  icon?: BytewardenIcon;
};
export type FolderFilter = FolderView & {
  icon?: BytewardenIcon;
  /**
   * Full folder name.
   *
   * Used for when the folder `name` property is be separated into parts.
   */
  fullName?: string;
};
export type OrganizationFilter = Organization & { icon?: BytewardenIcon; hideOptions?: boolean };
