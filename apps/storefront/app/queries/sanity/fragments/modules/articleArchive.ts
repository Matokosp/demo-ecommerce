import groq from "groq";

import { IMAGE } from "../image";
import { MARK_DEFS } from "../portableText/markDefs";
import { PORTABLE_TEXT } from "../portableText/portableText";

export const MODULE_ARTICLE_ARCHIVE = groq`
  layout,
  "articles": *[_type == 'article'  && language == $language] | order(_updatedAt desc) {
    _id,
    title,
    image {
      ${IMAGE}
    },
    slug,
    tags[]->{
      _id,
      "title": coalesce(title[_key == $language][0].value),
    },
   preamble,
   author,
    time,
    description[]{
    ${PORTABLE_TEXT}
  },
  },
  "tags": *[_type == 'blogPostTag']  | order(_updatedAt desc) {
    _id,
    "title": coalesce(title[_key == $language][0].value),
  }
  `;
