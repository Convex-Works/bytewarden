export const BadgeIcon = {
  Berry: {
    16: "/images/berry16.png",
    19: "/images/berry19.png",
    32: "/images/berry32.png",
    38: "/images/berry38.png",
  },
  LoggedOut: {
    16: "/images/icon16_gray.png",
    19: "/images/icon19_gray.png",
    32: "/images/icon32_gray.png",
    38: "/images/icon38_gray.png",
  } as IconPaths,
  Locked: {
    16: "/images/icon16_locked.png",
    19: "/images/icon19_locked.png",
    32: "/images/icon32_locked.png",
    38: "/images/icon38_locked.png",
  } as IconPaths,
  Unlocked: {
    16: "/images/icon16.png",
    19: "/images/icon19.png",
    32: "/images/icon32.png",
    38: "/images/icon38.png",
  } as IconPaths,
} as const satisfies Record<string, IconPaths>;

export type BadgeIcon = (typeof BadgeIcon)[keyof typeof BadgeIcon];

// 16 and 32 px match the toolbar's 1x and 2x slots, so the pixel art is drawn without resampling.
export type IconPaths = {
  16: string;
  19: string;
  32: string;
  38: string;
};
