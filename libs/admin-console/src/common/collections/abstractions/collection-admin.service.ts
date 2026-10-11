import { Observable } from "rxjs";

import {
  CollectionAdminView,
  CollectionAccessSelectionView,
  CollectionDetailsResponse,
} from "@bytewarden/common/admin-console/models/collections";
import { UserId } from "@bytewarden/common/types/guid";

export abstract class CollectionAdminService {
  abstract collectionAdminViews$(
    organizationId: string,
    userId: UserId,
  ): Observable<CollectionAdminView[]>;
  abstract update(
    collection: CollectionAdminView,
    userId: UserId,
  ): Promise<CollectionDetailsResponse>;
  abstract create(
    collection: CollectionAdminView,
    userId: UserId,
  ): Promise<CollectionDetailsResponse>;
  abstract delete(organizationId: string, collectionId: string): Promise<void>;
  abstract bulkAssignAccess(
    organizationId: string,
    collectionIds: string[],
    users: CollectionAccessSelectionView[],
    groups: CollectionAccessSelectionView[],
  ): Promise<void>;
}
