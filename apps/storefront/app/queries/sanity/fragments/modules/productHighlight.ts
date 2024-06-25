import groq from "groq";

import { IMAGE } from "../image";
import { LINK_EXTERNAL } from "../linkExternal";
import { LINK_INTERNAL } from "../linkInternal";

export const MODULE_PRODUCT_HIGHLIGHT = groq`
  title,
  body,
  textColor,
  order,
  "link": links[0] {
    (_type == 'linkExternal') => {
      ${LINK_EXTERNAL}
    },
    (_type == 'linkInternal') => {
      ${LINK_INTERNAL}
    },
  },
  backgroundImage {
    ${IMAGE}
  },
`;
