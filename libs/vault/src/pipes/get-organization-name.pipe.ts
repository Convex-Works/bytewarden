import { Pipe, PipeTransform } from "@angular/core";
import { OrganizationId } from "@bitwarden/sdk-internal";

import { Organization } from "@bytewarden/common/admin-console/models/domain/organization";

@Pipe({
  name: "orgNameFromId",
  pure: true,
})
export class GetOrgNameFromIdPipe implements PipeTransform {
  transform(value: string | OrganizationId, organizations: Organization[]) {
    const orgName = organizations?.find((o) => o.id === value)?.name;
    return orgName;
  }
}
