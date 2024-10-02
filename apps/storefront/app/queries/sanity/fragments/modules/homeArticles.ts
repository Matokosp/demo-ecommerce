import groq from "groq";

import { IMAGE } from "../image";
import { LINK_EXTERNAL } from "../linkExternal";
import { LINK_INTERNAL } from "../linkInternal";

export const MODULE_HOME_ARTICLES = groq`
  title,
  description,
  featured-> {
    _id,
    title,
    slug,
    documentType
  },
  "articles": *[_type == 'article' && language == $language] | order(_updatedAt desc) {
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
  },
  firstImage {
    ${IMAGE}
  },
  secondImage {
    ${IMAGE}
  },
  "link": link[0] {
    (_type == 'linkExternal') => {
      ${LINK_EXTERNAL}
    },
    (_type == 'linkInternal') => {
      ${LINK_INTERNAL}
    },
  },
  `;
