import groq from "groq";

import { COLLECTION } from "./collection";
import { PRODUCT } from "./product";

export const COLLECTION_GROUP = groq`
  _key,
  _type,
  collectionLinks[]->{
    _key,
    ${COLLECTION}
  },
  productLinks[]->{
    _key,
    ${PRODUCT}
  },
  collectionProducts->{
    ${COLLECTION}
  },
  title,
`;
