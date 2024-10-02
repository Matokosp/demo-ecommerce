import groq from "groq";

import { ARTICLE_PAGE } from "./fragments/pages/article";

export const ARTICLE_QUERY = groq`
  *[
    _type == 'article'
    && slug.current == $slug
    && $language == language
  ] | order(_updatedAt desc) {
    _id,
    ${ARTICLE_PAGE}
  }[0]`;
