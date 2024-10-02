import groq from "groq";

import { MARK_DEFS } from "./portableText/markDefs";

export const PRODUCT_BENEFITS = groq`
  "benefits": array::compact(
      [
        ...coalesce(benefits[_key == $language][0].value, benefits[_key == $baseLanguage][0].value)[] {
          _key,
          "title": title,
          "body": text[] {
            ...,
            markDefs[] {
              ${MARK_DEFS}
            }
          }
        },
      ]
    )

`;
