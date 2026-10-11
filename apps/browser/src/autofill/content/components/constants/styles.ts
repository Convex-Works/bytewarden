import { Theme } from "@bytewarden/common/platform/enums";

import { IconProps } from "../common-types";

const lightTheme = {
  transparent: {
    hover: `rgb(0 0 0 / 0.02)`,
  },
  shadow: `rgba(168 179 200)`,
  primary: {
    100: `rgba(245, 245, 245)`,
    300: `rgba(163, 163, 163)`,
    600: `rgba(0, 0, 0)`,
    700: `rgba(64, 64, 64)`,
  },
  secondary: {
    100: `rgba(245, 245, 245)`,
    300: `rgba(212, 212, 212)`,
    500: `rgba(115, 115, 115)`,
    600: `rgba(82, 82, 82)`,
    700: `rgba(64, 64, 64)`,
  },
  success: {
    100: `rgba(245, 245, 245)`,
    600: `rgba(163, 163, 163)`,
    700: `rgba(64, 64, 64)`,
  },
  danger: {
    100: `rgba(255, 236, 239)`,
    600: `rgba(203, 38, 58)`,
    700: `rgba(149, 27, 42)`,
  },
  warning: {
    100: `rgba(255, 248, 228)`,
    600: `rgba(255, 191, 0)`,
    700: `rgba(172, 88, 0)`,
  },
  info: {
    100: `rgba(245, 245, 245)`,
    600: `rgba(163, 163, 163)`,
    700: `rgba(64, 64, 64)`,
  },
  art: {
    primary: `rgba(0, 0, 0)`,
    accent: `rgba(163, 163, 163)`,
  },
  text: {
    main: `rgba(0, 0, 0)`,
    muted: `rgba(115, 115, 115)`,
    contrast: `rgba(255, 255, 255)`,
    alt2: `rgba(255, 255, 255)`,
    code: `rgba(64, 64, 64)`,
  },
  background: {
    DEFAULT: `rgba(255, 255, 255)`,
    alt: `rgba(245, 245, 245)`,
    alt2: `rgba(23, 23, 23)`,
    alt3: `rgba(64, 64, 64)`,
    alt4: `rgba(0, 0, 0)`,
  },
  brandLogo: `rgba(0, 0, 0)`,
  passwordSpecial: `rgba(184, 0, 23)`,
  passwordNumber: `rgba(0, 0, 0)`,
};

const darkTheme = {
  transparent: {
    hover: `rgb(255 255 255 / 0.02)`,
  },
  shadow: `rgba(0, 0, 0)`,
  primary: {
    100: `rgba(38, 38, 38)`,
    300: `rgba(64, 64, 64)`,
    600: `rgba(255, 255, 255)`,
    700: `rgba(212, 212, 212)`,
  },
  secondary: {
    100: `rgba(38, 38, 38)`,
    300: `rgba(64, 64, 64)`,
    500: `rgba(115, 115, 115)`,
    600: `rgba(163, 163, 163)`,
    700: `rgba(212, 212, 212)`,
  },
  success: {
    100: `rgba(11, 111, 21)`,
    600: `rgba(107, 241, 120)`,
    700: `rgba(191, 236, 195)`,
  },
  danger: {
    100: `rgba(149, 27, 42)`,
    600: `rgba(255, 78, 99)`,
    700: `rgba(255, 236, 239)`,
  },
  warning: {
    100: `rgba(172, 88, 0)`,
    600: `rgba(255, 191, 0)`,
    700: `rgba(255, 248, 228)`,
  },
  info: {
    100: `rgba(64, 64, 64)`,
    600: `rgba(163, 163, 163)`,
    700: `rgba(245, 245, 245)`,
  },
  art: {
    primary: `rgba(245, 245, 245)`,
    accent: `rgba(163, 163, 163)`,
  },
  text: {
    main: `rgba(245, 245, 245)`,
    muted: `rgba(163, 163, 163)`,
    contrast: `rgba(10 10 10)`,
    alt2: `rgba(255, 255, 255)`,
    code: `rgba(212, 212, 212)`,
  },
  background: {
    DEFAULT: `rgba(10, 10, 10)`,
    alt: `rgba(23, 23, 23)`,
    alt2: `rgba(38, 38, 38)`,
    alt3: `rgba(38, 38, 38)`,
    alt4: `rgba(23, 23, 23)`,
  },
  brandLogo: `rgba(255, 255, 255)`,
  passwordSpecial: `rgba(255, 141, 133)`,
  passwordNumber: `rgba(255, 255, 255)`,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,

  // For compatibility
  system: lightTheme,
};

export const spacing = {
  4: `16px`,
  3: `12px`,
  2: `8px`,
  "1.5": `6px`,
  1: `4px`,
};

export const border = {
  radius: {
    large: `8px`,
    full: `9999px`,
  },
};

export const typography = {
  body1: `
    line-height: 24px;
    font-family: Inter, sans-serif;
    font-size: 16px;
  `,
  body2: `
    line-height: 20px;
    font-family: Inter, sans-serif;
    font-size: 14px;
  `,
  helperMedium: `
    line-height: 16px;
    font-family: Inter, sans-serif;
    font-size: 12px;
  `,
};

export const ruleNames = {
  fill: "fill",
  stroke: "stroke",
} as const;

type RuleName = (typeof ruleNames)[keyof typeof ruleNames];

/*
 * `color` is an intentionally generic name here, since either fill or stroke may apply, due to
 * inconsistent SVG construction. This consequently precludes dynamic multi-colored icons here.
 */
export const buildIconColorRule = (color: string, rule: RuleName = ruleNames.fill) => `
  ${rule}: ${color};
`;

export const resolveIconColor = ({ color, disabled, theme }: IconProps) =>
  disabled ? themes[theme].secondary["300"] : color || themes[theme].text.main;

export const animations = {
  spin: `
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(359deg);
    }
  `,
};

export function scrollbarStyles(theme: Theme, color?: { thumb?: string; track?: string }) {
  const thumbColor = color?.thumb || themes[theme].secondary["500"];
  const trackColor = color?.track || themes[theme].background.alt;

  return {
    /* FireFox & Chrome support */
    default: `
      scrollbar-color: ${thumbColor} ${trackColor};
    `,
    /* Safari Support */
    safari: `
      ::-webkit-scrollbar {
        overflow: auto;
      }
      ::-webkit-scrollbar-thumb {
        border-width: 4px;
        border-style: solid;
        border-radius: 0.5rem;
        border-color: transparent;
        background-clip: content-box;
        background-color: ${thumbColor};
      }
      ::-webkit-scrollbar-track {
        ${trackColor};
      }
      ::-webkit-scrollbar-thumb:hover {
        ${themes[theme].secondary["600"]};
      }
    `,
  };
}
