import groq from "groq";

import { IMAGE } from "../image";
import { MODULE_PRODUCT } from "./product";

export const MODULE_PRODUCT_SHOWCASE = groq`
  layout,
  title,
  direction,
  image {
    ${IMAGE}
  },
  modules[] {
    _key,
    ${MODULE_PRODUCT}
  }
`;
