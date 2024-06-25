import groq from "groq";

import { PORTABLE_TEXT } from "../portableText/portableText";
import { SEO } from "../seo";

export const ARTICLE_PAGE = groq`
  title,
  "content": content[_key == $language][0].value[] {
    ${PORTABLE_TEXT}
  },
  ${SEO}
`;
