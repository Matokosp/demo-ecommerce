import groq from "groq";

import { COLOR_THEME } from "./fragments/colorTheme";
import { IMAGE } from "./fragments/image";
import { LINKS } from "./fragments/links";
import { PORTABLE_TEXT } from "./fragments/portableText/portableText";

export const LAYOUT_QUERY = groq`
  *[_type == 'settings' && _id == 'settings-' + $language] | order(_updatedAt desc) [0] {
    seo,
    "menuLinks": menu.links[] {
      ${LINKS}
    },
    siteLogo {
      ${IMAGE}
    },
    footer {
      subscribeText,
      columnOneTitle,
      columnTwoTitle,
      columnThreeTitle,
      linksOne[] {
        ${LINKS}
      },
      linksTwo[] {
        ${LINKS}
      },
      linksThree[] {
        ${LINKS}
      },
      bottomLinks[] {
        ${LINKS}
      },
      "legend": coalesce(legend[_key == $language][0].value, legend[_key == $baseLanguage][0].value),
      "copyright": coalesce(copyright[_key == $language][0].value, copyright[_key == $baseLanguage][0].value),
    },
    notFoundPage {
      body,
      "collectionGid": collection->store.gid,
      colorTheme->{
        ${COLOR_THEME}
      },
      title
    },
    "labels": *[_type == 'sharedText' && _id == 'sharedText'][0] {
      labels[] {
        key,
        "text": coalesce(text[_key == $language][0].value, text[_key == $baseLanguage][0].value),
      }
    }.labels
  }
`;
