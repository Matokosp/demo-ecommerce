import groq from "groq";

import { IMAGE } from "../image";

export const MODULE_FEATURED_ARTICLE = groq`
  title,
  featured-> {
    _id,
    title,
    slug,
    documentType,
    preamble,
    description,
    tags[]->{
      _id,
      "title": coalesce(title[_key == $language][0].value),
    },
    author,
    time
  },
 
  featuredImage {
    ${IMAGE}
  }
  `;
