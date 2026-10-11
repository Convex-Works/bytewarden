import { CipherListView } from "@bitwarden/sdk-internal";

import { CollectionView } from "@bytewarden/common/admin-console/models/collections";
import { Organization } from "@bytewarden/common/admin-console/models/domain/organization";
import { CipherView } from "@bytewarden/common/vault/models/view/cipher.view";

interface CommonPopupCipherView {
  collections?: CollectionView[];
  organization?: Organization;
}

/** Extended view for the popup based off of `CipherView`  */
interface PopupCipherView extends CipherView, CommonPopupCipherView {}

/** Extended view for the popup based off of `CipherListView` from the SDK. */
interface PopupCipherListView extends CipherListView, CommonPopupCipherView {}

export type PopupCipherViewLike = PopupCipherListView | PopupCipherView;
