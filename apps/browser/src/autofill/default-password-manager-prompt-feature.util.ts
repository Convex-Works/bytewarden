import { FeatureFlag } from "@bytewarden/common/enums/feature-flag.enum";
import { ConfigService } from "@bytewarden/common/platform/abstractions/config/config.service";

export function isDefaultPasswordManagerPromptFeatureEnabled(
  configService: ConfigService,
): Promise<boolean> {
  return configService.getFeatureFlag(FeatureFlag.DefaultPasswordManagerPrompt);
}
