import groq from "groq";

import { COLOR_THEME } from "../colorTheme";
import { IMAGE } from "../image";
import { PORTABLE_TEXT } from "../portableText/portableText";

export const MODULE_FLOATING_TEXTS = groq`
  layout,
  featuredImage {
    ${IMAGE}
  },
  referenceImage {
    ${IMAGE}
  },
  reference,
  copy[] {
    simplecontent[] {
      ${PORTABLE_TEXT}
    }
  },
  legend
`;
