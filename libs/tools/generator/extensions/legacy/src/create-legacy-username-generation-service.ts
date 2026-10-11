// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
import { ApiService } from "@bytewarden/common/abstractions/api.service";
import { PolicyService } from "@bytewarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { SdkService } from "@bytewarden/common/platform/abstractions/sdk/sdk.service";
import { StateProvider } from "@bytewarden/common/platform/state";
import { RestClient } from "@bytewarden/common/tools/integration/rpc";
import { engine, services, strategies, Integrations } from "@bytewarden/generator-core";
import { DefaultGeneratorNavigationService } from "@bytewarden/generator-navigation";
import { KeyService } from "@bytewarden/key-management";

import { LegacyUsernameGenerationService } from "./legacy-username-generation.service";
import { UsernameGenerationServiceAbstraction } from "./username-generation.service.abstraction";

const { SdkRandomizer, UsernameRandomizer, EmailRandomizer, EmailCalculator } = engine;
const DefaultGeneratorService = services.DefaultGeneratorService;
const {
  CatchallGeneratorStrategy,
  SubaddressGeneratorStrategy,
  EffUsernameGeneratorStrategy,
  ForwarderGeneratorStrategy,
} = strategies;

export function legacyUsernameGenerationServiceFactory(
  apiService: ApiService,
  i18nService: I18nService,
  keyService: KeyService,
  sdkService: SdkService,
  policyService: PolicyService,
  accountService: AccountService,
  stateProvider: StateProvider,
): UsernameGenerationServiceAbstraction {
  const randomizer = new SdkRandomizer();
  const restClient = new RestClient(apiService, i18nService);
  const usernameRandomizer = new UsernameRandomizer(randomizer);
  const emailRandomizer = new EmailRandomizer(randomizer);
  const emailCalculator = new EmailCalculator();

  const effUsername = new DefaultGeneratorService(
    new EffUsernameGeneratorStrategy(usernameRandomizer, stateProvider),
    policyService,
  );

  const subaddress = new DefaultGeneratorService(
    new SubaddressGeneratorStrategy(emailCalculator, emailRandomizer, stateProvider),
    policyService,
  );

  const catchall = new DefaultGeneratorService(
    new CatchallGeneratorStrategy(emailCalculator, emailRandomizer, stateProvider),
    policyService,
  );

  const addyIo = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.AddyIo,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const duckDuckGo = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.DuckDuckGo,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const fastmail = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.Fastmail,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const firefoxRelay = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.FirefoxRelay,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const forwardEmail = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.ForwardEmail,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const simpleLogin = new DefaultGeneratorService(
    new ForwarderGeneratorStrategy(
      Integrations.SimpleLogin,
      restClient,
      i18nService,
      sdkService,
      keyService,
      stateProvider,
    ),
    policyService,
  );

  const navigation = new DefaultGeneratorNavigationService(stateProvider, policyService);

  return new LegacyUsernameGenerationService(
    accountService,
    navigation,
    catchall,
    effUsername,
    subaddress,
    addyIo,
    duckDuckGo,
    fastmail,
    firefoxRelay,
    forwardEmail,
    simpleLogin,
  );
}
