import { Jsonify } from "type-fest";

import {
  CollectionView,
  CollectionData,
} from "@bytewarden/common/admin-console/models/collections";
import {
  COLLECTION_DISK,
  COLLECTION_MEMORY,
  UserKeyDefinition,
} from "@bytewarden/common/platform/state";
import { CollectionId } from "@bytewarden/common/types/guid";

export const ENCRYPTED_COLLECTION_DATA_KEY = UserKeyDefinition.record<CollectionData, CollectionId>(
  COLLECTION_DISK,
  "collections",
  {
    deserializer: (jsonData: Jsonify<CollectionData>) => CollectionData.fromJSON(jsonData),
    clearOn: ["logout"],
  },
);

export const DECRYPTED_COLLECTION_DATA_KEY = new UserKeyDefinition<CollectionView[] | null>(
  COLLECTION_MEMORY,
  "decryptedCollections",
  {
    deserializer: (obj: Jsonify<CollectionView[] | null>) =>
      obj?.map((f) => CollectionView.fromJSON(f)) ?? null,
    clearOn: ["logout", "lock"],
  },
);
