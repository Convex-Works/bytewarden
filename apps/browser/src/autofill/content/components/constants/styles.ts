import { Theme } from "@bytewarden/common/platform/enums";

import { IconProps } from "../common-types";

// Bytewarden palette: green-tinted ink neutrals; the mark's RGB subpixels carry brand, danger, and info.
const lightTheme = {
  transparent: {
    hover: `rgb(11 12 12 / 0.02)`,
  },
  shadow: `rgba(146, 155, 150)`,
  primary: {
    100: `rgba(210, 254, 223)`,
    300: `rgba(111, 248, 155)`,
    600: `rgba(10, 122, 52)`,
    700: `rgba(8, 98, 42)`,
  },
  secondary: {
    100: `rgba(232, 236, 234)`,
    300: `rgba(180, 188, 184)`,
    500: `rgba(111, 120, 115)`,
    600: `rgba(83, 91, 87)`,
    700: `rgba(58, 64, 61)`,
  },
  success: {
    100: `rgba(210, 254, 223)`,
    600: `rgba(10, 122, 52)`,
    700: `rgba(8, 98, 42)`,
  },
  danger: {
    100: `rgba(255, 224, 230)`,
    600: `rgba(200, 16, 46)`,
    700: `rgba(160, 14, 39)`,
  },
  warning: {
    100: `rgba(255, 248, 228)`,
    600: `rgba(255, 191, 0)`,
    700: `rgba(172, 88, 0)`,
  },
  info: {
    100: `rgba(230, 238, 255)`,
    600: `rgba(61, 125, 255)`,
    700: `rgba(31, 91, 214)`,
  },
  art: {
    primary: `rgba(11, 12, 12)`,
    accent: `rgba(10, 122, 52)`,
  },
  text: {
    main: `rgba(11, 12, 12)`,
    muted: `rgba(83, 91, 87)`,
    contrast: `rgba(255, 255, 255)`,
    alt2: `rgba(255, 255, 255)`,
    code: `rgba(58, 64, 61)`,
  },
  background: {
    DEFAULT: `rgba(255, 255, 255)`,
    alt: `rgba(244, 246, 245)`,
    alt2: `rgba(20, 23, 22)`,
    alt3: `rgba(58, 64, 61)`,
    alt4: `rgba(11, 12, 12)`,
  },
  brandLogo: `rgba(11, 12, 12)`,
  passwordSpecial: `rgba(200, 16, 46)`,
  passwordNumber: `rgba(31, 91, 214)`,
};

const darkTheme = {
  transparent: {
    hover: `rgb(244 246 245 / 0.02)`,
  },
  shadow: `rgba(0, 0, 0)`,
  primary: {
    100: `rgba(5, 42, 19)`,
    300: `rgba(15, 178, 74)`,
    600: `rgba(61, 255, 122)`,
    700: `rgba(111, 248, 155)`,
  },
  secondary: {
    100: `rgba(38, 42, 40)`,
    300: `rgba(58, 64, 61)`,
    500: `rgba(111, 120, 115)`,
    600: `rgba(146, 155, 150)`,
    700: `rgba(214, 219, 216)`,
  },
  success: {
    100: `rgba(5, 42, 19)`,
    600: `rgba(61, 255, 122)`,
    700: `rgba(210, 254, 223)`,
  },
  danger: {
    100: `rgba(69, 5, 15)`,
    600: `rgba(255, 58, 94)`,
    700: `rgba(255, 224, 230)`,
  },
  warning: {
    100: `rgba(172, 88, 0)`,
    600: `rgba(255, 191, 0)`,
    700: `rgba(255, 248, 228)`,
  },
  info: {
    100: `rgba(16, 33, 74)`,
    600: `rgba(122, 166, 255)`,
    700: `rgba(230, 238, 255)`,
  },
  art: {
    primary: `rgba(244, 246, 245)`,
    accent: `rgba(61, 255, 122)`,
  },
  text: {
    main: `rgba(244, 246, 245)`,
    muted: `rgba(146, 155, 150)`,
    contrast: `rgba(11, 12, 12)`,
    alt2: `rgba(244, 246, 245)`,
    code: `rgba(214, 219, 216)`,
  },
  background: {
    DEFAULT: `rgba(20, 23, 22)`,
    alt: `rgba(11, 12, 12)`,
    alt2: `rgba(38, 42, 40)`,
    alt3: `rgba(38, 42, 40)`,
    alt4: `rgba(11, 12, 12)`,
  },
  brandLogo: `rgba(244, 246, 245)`,
  passwordSpecial: `rgba(255, 143, 163)`,
  passwordNumber: `rgba(122, 166, 255)`,
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
    font-family: Inter, system-ui, sans-serif;
    font-size: 16px;
  `,
  body2: `
    line-height: 20px;
    font-family: Inter, system-ui, sans-serif;
    font-size: 14px;
  `,
  helperMedium: `
    line-height: 16px;
    font-family: Inter, system-ui, sans-serif;
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
