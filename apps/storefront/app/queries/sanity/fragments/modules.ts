import groq from "groq";

import { MODULE_ACCORDION } from "./modules/accordion";
import { MODULE_ARTICLE_ARCHIVE } from "./modules/articleArchive";
import { MODULE_CALLOUT } from "./modules/callout";
import { MODULE_CALL_TO_ACTION } from "./modules/callToAction";
import { MODULE_COLLECTION } from "./modules/collection";
import { MODULE_COLLECTIONS_SWIPER } from "./modules/collectionsSwiper";
import { MODULE_FEATURED_ARTICLE } from "./modules/featuredArticle";
import { MODULE_FLOATING_TEXTS } from "./modules/floatingTexts";
import { MODULE_HOME_ARTICLES } from "./modules/homeArticles";
import { MODULE_IMAGE } from "./modules/image";
import { MODULE_INSTAGRAM } from "./modules/instagram";
import { MODULE_PRODUCT } from "./modules/product";
import { MODULE_PRODUCT_HIGHLIGHT } from "./modules/productHighlight";
import { MODULE_PRODUCT_SHOWCASE } from "./modules/productShowcase";

export const MODULES = groq`
  _key,
  _type,
  (_type == "module.accordion") => {
    ${MODULE_ACCORDION}
  },
  (_type == "module.callout") => {
    ${MODULE_CALLOUT}
  },
  (_type == 'module.callToAction') => {
    ${MODULE_CALL_TO_ACTION}
  },
  (_type == "module.collection") => {
    ${MODULE_COLLECTION}
  },
  (_type == "module.image") => {
    ${MODULE_IMAGE}
  },
  (_type == "module.instagram") => {
    ${MODULE_INSTAGRAM}
  },
  (_type == "module.productHighlight") => {
    ${MODULE_PRODUCT_HIGHLIGHT}
  },
  (_type == "module.product") => {
    ${MODULE_PRODUCT}
  },
  (_type == "module.collectionsSwiper") => {
    ${MODULE_COLLECTIONS_SWIPER}
  },
  (_type == "module.homeArticles") => {
    ${MODULE_HOME_ARTICLES}
  },
  (_type == "module.featuredArticle") => {
    ${MODULE_FEATURED_ARTICLE}
  },
  (_type == "module.articleArchive") => {
    ${MODULE_ARTICLE_ARCHIVE}
  },
  (_type == "module.productShowcase") => {
    ${MODULE_PRODUCT_SHOWCASE}
  },
  (_type == "module.floatingTexts") => {
    ${MODULE_FLOATING_TEXTS}
  }
`;
