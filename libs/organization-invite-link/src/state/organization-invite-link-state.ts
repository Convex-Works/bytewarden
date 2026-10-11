import { OrganizationId } from "@bytewarden/common/types/guid";
import { ORGANIZATION_INVITE_LINK_DISK, UserKeyDefinition } from "@bytewarden/state";

import { OrganizationInviteLink } from "../models/responses/organization-invite-link.response";

export const ORGANIZATION_INVITE_LINK_KEY = UserKeyDefinition.record<
  OrganizationInviteLink,
  OrganizationId
>(ORGANIZATION_INVITE_LINK_DISK, "inviteLink", {
  deserializer: (obj) => OrganizationInviteLink.fromJSON(obj),
  clearOn: ["lock", "logout"],
});
