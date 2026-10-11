// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { CollectionView } from "@bytewarden/common/admin-console/models/collections";
import { UserId } from "@bytewarden/user-core";

export abstract class ImportCollectionServiceAbstraction {
  getAllAdminCollections: (organizationId: string, userId: UserId) => Promise<CollectionView[]>;
}
