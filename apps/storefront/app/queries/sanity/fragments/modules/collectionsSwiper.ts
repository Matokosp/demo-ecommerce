import groq from "groq";

import { MODULE_PRODUCT } from "./product";

export const MODULE_COLLECTIONS_SWIPER = groq`
  firstCollection,
  secondCollection,
  thirdCollection,
  firstCollectionItems[] {
    ${MODULE_PRODUCT}
  },
  secondCollectionItems[] {
    ${MODULE_PRODUCT}
  },
  thirdCollectionItems[] {
    ${MODULE_PRODUCT}
  },
`;
