// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { PolicyService } from "@bytewarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { SdkService } from "@bytewarden/common/platform/abstractions/sdk/sdk.service";
import { StateProvider } from "@bytewarden/common/platform/state";
import { engine, services, strategies } from "@bytewarden/generator-core";
import { LocalGeneratorHistoryService } from "@bytewarden/generator-history";
import { DefaultGeneratorNavigationService } from "@bytewarden/generator-navigation";

import { LegacyPasswordGenerationService } from "./legacy-password-generation.service";
import { PasswordGenerationServiceAbstraction } from "./password-generation.service.abstraction";

const { PassphraseGeneratorStrategy, PasswordGeneratorStrategy } = strategies;
const { SdkRandomizer, PasswordRandomizer } = engine;

const DefaultGeneratorService = services.DefaultGeneratorService;

export function legacyPasswordGenerationServiceFactory(
  policyService: PolicyService,
  accountService: AccountService,
  stateProvider: StateProvider,
  sdkService: SdkService,
): PasswordGenerationServiceAbstraction {
  const randomizer = new SdkRandomizer();
  const passwordRandomizer = new PasswordRandomizer(randomizer, Date.now);

  const passwords = new DefaultGeneratorService(
    new PasswordGeneratorStrategy(passwordRandomizer, stateProvider),
    policyService,
  );

  const passphrases = new DefaultGeneratorService(
    new PassphraseGeneratorStrategy(passwordRandomizer, stateProvider),
    policyService,
  );

  const navigation = new DefaultGeneratorNavigationService(stateProvider, policyService);

  const history = new LocalGeneratorHistoryService(stateProvider, sdkService);

  return new LegacyPasswordGenerationService(
    accountService,
    navigation,
    passwords,
    passphrases,
    history,
  );
}
