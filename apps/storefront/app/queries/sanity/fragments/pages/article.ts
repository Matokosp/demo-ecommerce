import groq from "groq";

import { IMAGE } from "../image";
import { PORTABLE_TEXT } from "../portableText/portableText";
import { SEO } from "../seo";

export const ARTICLE_PAGE = groq`
  title,
  description[] {
    ${PORTABLE_TEXT}
  },
  preamble,
  author,
  time,
  image,
  contentHeading[] {
    _key,
    ${PORTABLE_TEXT}
  },
  content[] {
    _key,
    image {
      ${IMAGE}
    },
    "textContent": textContent[] {
      _key,
      ${PORTABLE_TEXT}
    }
  },
  tags[]->{
    _id,
    "title": coalesce(title[_key == $language][0].value),
  },
  "latestArticles": *[_type == 'article' && _id != ^._id && $language == language] | order(_updatedAt desc)[0...4] {
    _id,
    image {
      ${IMAGE}
    },
    title,
    preamble,
    author,
    slug,
    time,
    tags[]->{
      _id,
      "title": coalesce(title[_key == $language][0].value),
    },
    slug
  },
  ${SEO}
`;
