import groq from "groq";

import { IMAGE } from "../image";
import { LINK_EXTERNAL } from "../linkExternal";
import { LINK_INTERNAL } from "../linkInternal";
import { MARK_DEFS } from "../portableText/markDefs";

export const MODULE_HOME_ARTICLES = groq`
  title,
  description,
  featured-> {
    _id,
    "title": coalesce(title[_key == $language][0].value),
    slug
  },
  "articles": *[_type == 'article'] | order(_updatedAt desc) {
    _id,
    "title": coalesce(title[_key == $language][0].value),
    image {
      ${IMAGE}
    },
    tags[]->{
      _id,
      "title": coalesce(title[_key == $language][0].value),
    },
   "author": coalesce(author[_key == $language][0].value),
   "time": coalesce(time[_key == $language][0].value),
   "description": coalesce(description[_key == $language][0].value, 'en')[] {
      ...,
      markDefs[] {
        ${MARK_DEFS}
      }
    }
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
