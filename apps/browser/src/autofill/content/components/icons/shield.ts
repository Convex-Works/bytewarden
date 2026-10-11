import { css } from "@emotion/css";
import { html } from "lit";

import { IconProps } from "../common-types";
import { buildIconColorRule, ruleNames, themes } from "../constants/styles";

export function Shield({ ariaHidden = true, color, theme }: IconProps) {
  const shapeColor = color || themes[theme].brandLogo;

  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="${ariaHidden}"
    >
      <path
        class=${css(buildIconColorRule(shapeColor, ruleNames.fill))}
        fill-rule="evenodd"
        d="M12 4H16A4 4 0 0 1 20 8V20H40A16 16 0 0 1 56 36V44A16 16 0 0 1 40 60H12A4 4 0 0 1 8 56V8A4 4 0 0 1 12 4ZM36 42.93A8 8 0 1 0 28 42.93V52H36Z"
      />
    </svg>
  `;
}
