import { signal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { BehaviorSubject, firstValueFrom } from "rxjs";

import { CollectionService } from "@bytewarden/admin-console/common";
import { ViewCacheService } from "@bytewarden/angular/platform/view-cache";
import { OrganizationService } from "@bytewarden/common/admin-console/abstractions/organization/organization.service.abstraction";
import { PolicyService } from "@bytewarden/common/admin-console/abstractions/policy/policy.service.abstraction";
import { CollectionView } from "@bytewarden/common/admin-console/models/collections";
import { AccountService } from "@bytewarden/common/auth/abstractions/account.service";
import { AvatarService } from "@bytewarden/common/auth/abstractions/avatar.service";
import { ConfigService } from "@bytewarden/common/platform/abstractions/config/config.service";
import { I18nService } from "@bytewarden/common/platform/abstractions/i18n.service";
import { mockAccountServiceWith } from "@bytewarden/common/spec";
import { UserId } from "@bytewarden/common/types/guid";
import { CipherService } from "@bytewarden/common/vault/abstractions/cipher.service";
import { FolderService } from "@bytewarden/common/vault/abstractions/folder/folder.service.abstraction";
import { CipherType } from "@bytewarden/common/vault/enums";
import { TreeNode } from "@bytewarden/common/vault/models/domain/tree-node";
import {
  RestrictedCipherType,
  RestrictedItemTypesService,
} from "@bytewarden/common/vault/services/restricted-item-types.service";

import { VaultPopupListTableFiltersService } from "./vault-popup-list-table-filters.service";

const USER_ID = "userId" as UserId;

describe("VaultPopupListTableFiltersService — cipherTypes$", () => {
  let service: VaultPopupListTableFiltersService;

  const restricted$ = new BehaviorSubject<RestrictedCipherType[]>([]);
  const featureFlag$ = new BehaviorSubject<boolean>(false);
  const cipherListViews$ = new BehaviorSubject<{ type: CipherType }[]>([]);

  beforeEach(() => {
    restricted$.next([]);
    featureFlag$.next(false);
    cipherListViews$.next([]);

    TestBed.configureTestingModule({
      providers: [
        VaultPopupListTableFiltersService,
        {
          provide: AccountService,
          useValue: mockAccountServiceWith(USER_ID),
        },
        {
          provide: CipherService,
          useValue: { cipherListViews$: () => cipherListViews$ },
        },
        {
          provide: RestrictedItemTypesService,
          useValue: { restricted$, isCipherRestricted: jest.fn().mockReturnValue(false) },
        },
        {
          provide: ConfigService,
          useValue: { getFeatureFlag$: jest.fn(() => featureFlag$) },
        },
        {
          provide: I18nService,
          useValue: { t: (key: string) => key },
        },
        {
          provide: FolderService,
          useValue: { folderViews$: () => new BehaviorSubject([]) },
        },
        {
          provide: OrganizationService,
          useValue: {
            memberOrganizations$: () => new BehaviorSubject([]),
            organizations$: new BehaviorSubject([]),
          },
        },
        {
          provide: CollectionService,
          useValue: {
            decryptedCollections$: () => new BehaviorSubject([]),
            getAllNested: jest.fn(() => [] as TreeNode<CollectionView>[][]),
          },
        },
        {
          provide: PolicyService,
          useValue: { policyAppliesToUser$: jest.fn(() => new BehaviorSubject(false)) },
        },
        {
          provide: AvatarService,
          useValue: { getUserAvatarColor$: () => new BehaviorSubject(undefined) },
        },
        {
          provide: ViewCacheService,
          useValue: {
            signal: jest.fn(() => {
              const s = signal({});
              s.set = (v: object) => s.update(() => v);
              return s;
            }),
          },
        },
      ],
    });

    service = TestBed.inject(VaultPopupListTableFiltersService);
  });

  it("returns only cipher types present in the vault", async () => {
    cipherListViews$.next([{ type: CipherType.Login }, { type: CipherType.SecureNote }] as {
      type: CipherType;
    }[]);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).toEqual([CipherType.Login, CipherType.SecureNote]);
  });

  it("returns all unrestricted cipher types present in the vault", async () => {
    cipherListViews$.next([
      { type: CipherType.Login },
      { type: CipherType.Card },
      { type: CipherType.Identity },
      { type: CipherType.SecureNote },
      { type: CipherType.SshKey },
    ] as { type: CipherType }[]);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).toEqual([
      CipherType.Login,
      CipherType.Card,
      CipherType.Identity,
      CipherType.SecureNote,
      CipherType.SshKey,
    ]);
  });

  it("excludes restricted cipher types even when present in the vault", async () => {
    cipherListViews$.next([{ type: CipherType.Login }, { type: CipherType.Card }] as {
      type: CipherType;
    }[]);
    restricted$.next([{ cipherType: CipherType.Card, allowViewOrgIds: [] }]);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).toEqual([CipherType.Login]);
  });

  it("excludes cipher types not in the vault even when unrestricted", async () => {
    cipherListViews$.next([{ type: CipherType.Login }] as { type: CipherType }[]);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).not.toContain(CipherType.Card);
    expect(types.map((t) => t.value)).not.toContain(CipherType.Identity);
    expect(types.map((t) => t.value)).not.toContain(CipherType.SshKey);
  });

  it("excludes BankAccount type when PM32009NewItemTypes flag is disabled", async () => {
    cipherListViews$.next([{ type: CipherType.BankAccount }] as { type: CipherType }[]);
    featureFlag$.next(false);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).not.toContain(CipherType.BankAccount);
  });

  it("includes BankAccount type when PM32009NewItemTypes flag is enabled and items are present", async () => {
    featureFlag$.next(true);
    cipherListViews$.next([{ type: CipherType.BankAccount }] as { type: CipherType }[]);

    const types = await firstValueFrom(service.cipherTypes$);
    expect(types.map((t) => t.value)).toContain(CipherType.BankAccount);
  });
});
