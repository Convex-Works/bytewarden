import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { of } from "rxjs";

import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { BillingAccountProfileStateService } from "@bytewarden/common/billing/abstractions/account/billing-account-profile-state.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { PremiumUpgradePromptService } from "@bytewarden/common/vault/abstractions/premium-upgrade-prompt.service";
import { BadgeModule, I18nMockService } from "@bytewarden/components";

import { JslibModule } from "../../../jslib.module";

import { PremiumBadgeComponent } from "./premium-badge.component";

export default {
  title: "Billing/Premium Badge",
  component: PremiumBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [JslibModule, BadgeModule],
      providers: [
        {
          provide: AccountService,
          useValue: {
            activeAccount$: of({
              id: "123",
            }),
          },
        },
        {
          provide: I18nService,
          useFactory: () => {
            return new I18nMockService({
              upgrade: "Upgrade",
            });
          },
        },
        {
          provide: BillingAccountProfileStateService,
          useValue: {
            hasPremiumFromAnySource$: () => of(false),
          },
        },
        {
          provide: PremiumUpgradePromptService,
          useValue: {
            promptForPremium: (orgId?: string) => {},
          },
        },
      ],
    }),
  ],
} as Meta;

type Story = StoryObj<PremiumBadgeComponent>;

export const Primary: Story = {};
