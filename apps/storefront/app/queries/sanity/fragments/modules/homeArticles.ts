import groq from "groq";

import { ARTICLE_PAGE } from "../pages/article";

export const MODULE_HOME_ARTICLES = groq`
  title,
  "articles": *[_type == 'article'] {
    _id,
    title,
    category->{
      parent->
    }
  }[0]
  `;
