import groq from "groq";

import { ARTICLE_PAGE } from "./fragments/pages/article";

export const ARTICLE_QUERY = groq`
  *[
    _type == 'person'
    && slug.current == $slug
  ] | order(_updatedAt desc) {
    ${ARTICLE_PAGE}
  }[0]`;
