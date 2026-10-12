import { firstValueFrom } from "rxjs";

import { FakeStateProvider, awaitAsync, mockAccountInfoWith } from "../../../spec";
import { FakeAccountService } from "../../../spec/fake-account-service";
import { UserId } from "../../types/guid";
import { CloudRegion, Environment, Region } from "../abstractions/environment.service";

import {
  GLOBAL_ENVIRONMENT_KEY,
  DefaultEnvironmentService,
  EnvironmentUrls,
  USER_ENVIRONMENT_KEY,
} from "./default-environment.service";

// There are a few main states EnvironmentService could be in when first used
// 1. Not initialized, no active user. Hopefully not to likely but possible
// 2. Not initialized, with active user. Not likely
// 3. Initialized, no active user.
// 4. Initialized, with active user.
describe("EnvironmentService", () => {
  let accountService: FakeAccountService;
  let stateProvider: FakeStateProvider;

  let sut: DefaultEnvironmentService;

  const testUser = "00000000-0000-1000-a000-000000000001" as UserId;
  const alternateTestUser = "00000000-0000-1000-a000-000000000002" as UserId;

  beforeEach(async () => {
    accountService = new FakeAccountService({
      [testUser]: mockAccountInfoWith({
        name: "name",
        email: "email",
      }),
      [alternateTestUser]: mockAccountInfoWith({
        name: "name",
        email: "email",
      }),
    });
    stateProvider = new FakeStateProvider(accountService);

    sut = new DefaultEnvironmentService(stateProvider, accountService);
  });

  const switchUser = async (userId: UserId) => {
    accountService.activeAccountSubject.next({
      id: userId,
      ...mockAccountInfoWith({
        email: "test@example.com",
        name: `Test Name ${userId}`,
      }),
    });
    await awaitAsync();
  };

  const setGlobalData = (region: Region, environmentUrls: EnvironmentUrls) => {
    stateProvider.global.getFake(GLOBAL_ENVIRONMENT_KEY).stateSubject.next({
      region: region,
      urls: environmentUrls,
    });
  };

  const setUserData = (
    region: Region,
    environmentUrls: EnvironmentUrls,
    userId: UserId = testUser,
  ) => {
    stateProvider.singleUser.getFake(userId, USER_ENVIRONMENT_KEY).nextState({
      region: region,
      urls: environmentUrls,
    });
  };

  // Bytewarden has no hosted regions: stored cloud regions resolve to an unconfigured server.
  const FORMER_CLOUD_REGIONS = [Region.US, Region.EU, Region.Gov];

  const expectUnconfigured = (env: Environment) => {
    expect(env.getRegion()).toBe(Region.SelfHosted);
    expect(env.isCloud()).toBe(false);
    expect(env.hasBaseUrl()).toBe(false);
    expect(env.getWebVaultUrl()).toBeNull();
    expect(env.getApiUrl()).toBeNull();
    expect(env.getIdentityUrl()).toBeNull();
    expect(env.getIconsUrl()).toBeNull();
    expect(env.getNotificationsUrl()).toBeNull();
    expect(env.getEventsUrl()).toBeNull();
    expect(env.getHostname()).toBeNull();
  };

  describe("with user", () => {
    it.each(FORMER_CLOUD_REGIONS)(
      "treats a stored %s region as an unconfigured server",
      async (region) => {
        setUserData(region, new EnvironmentUrls());
        await switchUser(testUser);

        expectUnconfigured(await firstValueFrom(sut.environment$));
      },
    );

    describe("logout race condition: USER_ENVIRONMENT_KEY cleared before activeAccountId$ switches to null", () => {
      // The race: background clears USER_ENVIRONMENT_KEY ("logout" state event) before
      // the popup's activeAccountId$ receives the null emission from accountService.clean().
      // If the USER_ENVIRONMENT_KEY clear propagates first, environment$ watches USER state while
      // setEnvironment() writes only to GLOBAL, causing the selector to fall back to the default (US) immediately.

      it("falls back to global when user environment state is cleared mid-logout", async () => {
        const globalUrls = new EnvironmentUrls();
        globalUrls.base = "https://global.example.com";
        setGlobalData(Region.SelfHosted, globalUrls);
        const userUrls = new EnvironmentUrls();
        userUrls.base = "https://user.example.com";
        setUserData(Region.SelfHosted, userUrls);
        await switchUser(testUser);

        // Storage event arrives: USER_ENVIRONMENT_KEY = null (logout cleared it)
        // but activeAccountId$ still emits testUser (account not yet cleaned up)
        stateProvider.singleUser.getFake(testUser, USER_ENVIRONMENT_KEY).nextState(null);
        await awaitAsync();

        const env = await firstValueFrom(sut.environment$);
        // Without fix: null USER state → buildEnvironment(null, null) → unconfigured
        // With fix: falls back to GLOBAL
        expect(env.getHostname()).toBe("global.example.com");
      });

      it("reflects setEnvironment call when user environment state is null mid-logout", async () => {
        // GLOBAL is unconfigured; USER had a server (seeded at login time)
        setGlobalData(Region.SelfHosted, new EnvironmentUrls());
        const userUrls = new EnvironmentUrls();
        userUrls.base = "https://user.example.com";
        setUserData(Region.SelfHosted, userUrls);
        await switchUser(testUser);

        // Race: USER_ENVIRONMENT_KEY clear arrives before activeAccountId$ → null
        stateProvider.singleUser.getFake(testUser, USER_ENVIRONMENT_KEY).nextState(null);
        await awaitAsync();

        // User enters a server URL on the login page → setEnvironment → writes GLOBAL
        // Without fix: environment$ watches USER state (null) and ignores the GLOBAL write
        // With fix: environment$ falls back to GLOBAL and emits the new server
        await sut.setEnvironment(Region.SelfHosted, { base: "https://new.example.com" });
        await awaitAsync();

        const env = await firstValueFrom(sut.environment$);
        expect(env.getHostname()).toBe("new.example.com");
      });
    });

    it("returns user data", async () => {
      const globalEnvironmentUrls = new EnvironmentUrls();
      globalEnvironmentUrls.base = "https://global-url.example.com";
      setGlobalData(Region.SelfHosted, globalEnvironmentUrls);

      const userEnvironmentUrls = new EnvironmentUrls();
      userEnvironmentUrls.base = "https://user-url.example.com";
      setUserData(Region.SelfHosted, userEnvironmentUrls);

      await switchUser(testUser);

      const env = await firstValueFrom(sut.environment$);

      expect(env.getWebVaultUrl()).toBe("https://user-url.example.com");
      expect(env.getIdentityUrl()).toBe("https://user-url.example.com/identity");
      expect(env.getApiUrl()).toBe("https://user-url.example.com/api");
      expect(env.getIconsUrl()).toBe("https://user-url.example.com/icons");
      expect(env.getNotificationsUrl()).toBe("https://user-url.example.com/notifications");
      expect(env.getEventsUrl()).toBe("https://user-url.example.com/events");
      expect(env.getScimUrl()).toBe("https://user-url.example.com/scim/v2");
      expect(env.getSendUrl()).toBe("https://user-url.example.com/#/send/");
      expect(env.isCloud()).toBe(false);
      expect(env.getUrls()).toEqual({
        base: "https://user-url.example.com",
        api: null,
        cloudWebVault: undefined,
        events: null,
        icons: null,
        identity: null,
        keyConnector: null,
        notifications: null,
        scim: null,
        webVault: null,
        send: null,
      });
    });

    it("getSendUrl falls back to webVault when only webVault is configured (regression)", async () => {
      // Regression: self-hosted user sets only webVault (no base, no send).
      // getSendUrl() must use the self-hosted webVault, not the Bytewarden cloud send URL.
      const userEnvironmentUrls = new EnvironmentUrls();
      userEnvironmentUrls.webVault = "https://vault.myserver.com";
      setUserData(Region.SelfHosted, userEnvironmentUrls);

      await switchUser(testUser);

      const env = await firstValueFrom(sut.environment$);

      expect(env.getWebVaultUrl()).toBe("https://vault.myserver.com");
      // Must NOT return "https://send.bitwarden.com/#/" (cloud fallback)
      expect(env.getSendUrl()).toBe("https://vault.myserver.com/#/send/");
    });

    it("getScimUrl falls back to webVault when only webVault is configured (regression)", async () => {
      // Regression: self-hosted user sets only webVault (no base, no scim).
      // getScimUrl() must use the self-hosted webVault, not the Bytewarden cloud scim URL.
      const userEnvironmentUrls = new EnvironmentUrls();
      userEnvironmentUrls.webVault = "https://vault.myserver.com";
      setUserData(Region.SelfHosted, userEnvironmentUrls);
      await switchUser(testUser);
      const env = await firstValueFrom(sut.environment$);
      expect(env.getWebVaultUrl()).toBe("https://vault.myserver.com");
      // Must NOT return "https://scim.bitwarden.com/v2" (cloud fallback)
      expect(env.getScimUrl()).toBe("https://vault.myserver.com/scim/v2");
    });

    it("derives urls from webVault for self-hosted when base is not set", async () => {
      const userEnvironmentUrls = new EnvironmentUrls();
      userEnvironmentUrls.webVault = "https://vault.atjb.link";
      setUserData(Region.SelfHosted, userEnvironmentUrls);

      await switchUser(testUser);

      const env = await firstValueFrom(sut.environment$);

      expect(env.getWebVaultUrl()).toBe("https://vault.atjb.link");
      expect(env.getIdentityUrl()).toBe("https://vault.atjb.link/identity");
      expect(env.getApiUrl()).toBe("https://vault.atjb.link/api");
      expect(env.getIconsUrl()).toBe("https://vault.atjb.link/icons");
      expect(env.getNotificationsUrl()).toBe("https://vault.atjb.link/notifications");
      expect(env.getEventsUrl()).toBe("https://vault.atjb.link/events");
      expect(env.getScimUrl()).toBe("https://vault.atjb.link/scim/v2");
      expect(env.getSendUrl()).toBe("https://vault.atjb.link/#/send/");
      expect(env.isCloud()).toBe(false);
    });
  });

  describe("without user", () => {
    it("is unconfigured when nothing is stored", async () => {
      expectUnconfigured(await firstValueFrom(sut.environment$));
    });

    it.each(FORMER_CLOUD_REGIONS)(
      "treats a stored %s region as an unconfigured server",
      async (region) => {
        setGlobalData(region, new EnvironmentUrls());

        expectUnconfigured(await firstValueFrom(sut.environment$));
      },
    );

    it("gets global data", async () => {
      const globalEnvironmentUrls = new EnvironmentUrls();
      globalEnvironmentUrls.base = "https://global-url.example.com";
      globalEnvironmentUrls.keyConnector = "https://global-key-connector.example.com";
      setGlobalData(Region.SelfHosted, globalEnvironmentUrls);

      const userEnvironmentUrls = new EnvironmentUrls();
      userEnvironmentUrls.base = "https://user-url.example.com";
      userEnvironmentUrls.keyConnector = "https://user-key-connector.example.com";
      setUserData(Region.SelfHosted, userEnvironmentUrls);

      const env = await firstValueFrom(sut.environment$);

      expect(env.getWebVaultUrl()).toBe("https://global-url.example.com");
      expect(env.getIdentityUrl()).toBe("https://global-url.example.com/identity");
      expect(env.getApiUrl()).toBe("https://global-url.example.com/api");
      expect(env.getIconsUrl()).toBe("https://global-url.example.com/icons");
      expect(env.getNotificationsUrl()).toBe("https://global-url.example.com/notifications");
      expect(env.getEventsUrl()).toBe("https://global-url.example.com/events");
      expect(env.getScimUrl()).toBe("https://global-url.example.com/scim/v2");
      expect(env.getSendUrl()).toBe("https://global-url.example.com/#/send/");
      expect(env.getKeyConnectorUrl()).toBe("https://global-key-connector.example.com");
      expect(env.isCloud()).toBe(false);
      expect(env.getUrls()).toEqual({
        api: null,
        base: "https://global-url.example.com",
        cloudWebVault: undefined,
        webVault: null,
        events: null,
        icons: null,
        identity: null,
        keyConnector: "https://global-key-connector.example.com",
        notifications: null,
        scim: null,
        send: null,
      });
    });
  });

  describe("setEnvironment", () => {
    it("self-hosted with base-url", async () => {
      await sut.setEnvironment(Region.SelfHosted, {
        base: "base.example.com",
      });
      await awaitAsync();

      const env = await firstValueFrom(sut.environment$);

      expect(env.getRegion()).toBe(Region.SelfHosted);
      expect(env.getUrls()).toEqual({
        base: "https://base.example.com",
        api: null,
        identity: null,
        webVault: null,
        icons: null,
        notifications: null,
        scim: null,
        events: null,
        keyConnector: null,
        send: null,
      });
    });

    it("self-hosted and sets all urls", async () => {
      let env = await firstValueFrom(sut.environment$);
      expect(env.getApiUrl()).toBeNull();

      await sut.setEnvironment(Region.SelfHosted, {
        base: "base.example.com",
        api: "api.example.com",
        identity: "identity.example.com",
        webVault: "vault.example.com",
        icons: "icons.example.com",
        notifications: "notifications.example.com",
        scim: "scim.example.com",
      });

      env = await firstValueFrom(sut.environment$);

      expect(env.getRegion()).toBe(Region.SelfHosted);
      expect(env.getUrls()).toEqual({
        base: "https://base.example.com",
        api: "https://api.example.com",
        identity: "https://identity.example.com",
        webVault: "https://vault.example.com",
        icons: "https://icons.example.com",
        notifications: "https://notifications.example.com",
        scim: null,
        events: null,
        keyConnector: null,
        send: null,
      });
      expect(env.getScimUrl()).toBe("https://vault.example.com/scim/v2");
    });

    it("clears the server when the urls are empty", async () => {
      await sut.setEnvironment(Region.SelfHosted, { base: "base.example.com" });
      await sut.setEnvironment(Region.SelfHosted, {});

      expectUnconfigured(await firstValueFrom(sut.environment$));
    });

    it("treats a cloud region as an unconfigured server", async () => {
      await sut.setEnvironment(Region.US);

      expectUnconfigured(await firstValueFrom(sut.environment$));
    });

    it("normalizes a blank send url to null", async () => {
      await sut.setEnvironment(Region.SelfHosted, {
        base: "base.example.com",
        send: "", // empty string from the dialog — should be normalized to null
      });
      await awaitAsync();

      const env = await firstValueFrom(sut.environment$);

      // A blank send URL should fall back through base, not persist as "" causing getSendUrl() to return "/#/"
      expect(env.getSendUrl()).toBe("https://base.example.com/#/send/");
    });
  });

  describe("getEnvironment$", () => {
    it("gets it from the passed in userId", async () => {
      const activeUrls = new EnvironmentUrls();
      activeUrls.base = "https://active.example.com";
      setUserData(Region.SelfHosted, activeUrls);
      const otherUrls = new EnvironmentUrls();
      otherUrls.base = "https://other.example.com";
      setUserData(Region.SelfHosted, otherUrls, alternateTestUser);

      await switchUser(testUser);

      const env = await firstValueFrom(sut.getEnvironment$(alternateTestUser));
      expect(env?.getHostname()).toBe("other.example.com");
    });

    it("gets env from saved self host config from passed in user when there is a different active user", async () => {
      setUserData(Region.EU, new EnvironmentUrls());

      const selfHostUserUrls = new EnvironmentUrls();
      selfHostUserUrls.base = "https://base.example.com";
      setUserData(Region.SelfHosted, selfHostUserUrls, alternateTestUser);

      await switchUser(testUser);

      const env = await firstValueFrom(sut.getEnvironment$(alternateTestUser));
      expect(env?.getHostname()).toBe("base.example.com");
    });
  });

  describe("getEnvironment (deprecated)", () => {
    it("gets self hosted env from active user when no user passed in", async () => {
      const selfHostUserUrls = new EnvironmentUrls();
      selfHostUserUrls.base = "https://base.example.com";
      setUserData(Region.SelfHosted, selfHostUserUrls);

      await switchUser(testUser);

      const env = await sut.getEnvironment();
      expect(env?.getHostname()).toBe("base.example.com");
    });

    it("gets self hosted env from passed in user", async () => {
      const selfHostUserUrls = new EnvironmentUrls();
      selfHostUserUrls.base = "https://base.example.com";
      setUserData(Region.SelfHosted, selfHostUserUrls);

      await switchUser(testUser);

      const env = await sut.getEnvironment(testUser);
      expect(env?.getHostname()).toBe("base.example.com");
    });
  });

  describe("cloudWebVaultUrl$", () => {
    it("is null without a cloud region", async () => {
      expect(await firstValueFrom(sut.cloudWebVaultUrl$)).toBeNull();
    });

    it.each([Region.US, Region.EU])("is null for a reported %s cloud region", async (region) => {
      await switchUser(testUser);

      await sut.setCloudRegion(testUser, region as CloudRegion);
      expect(await firstValueFrom(sut.cloudWebVaultUrl$)).toBeNull();
    });
  });
});
