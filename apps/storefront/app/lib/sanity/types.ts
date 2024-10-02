import type { PortableTextBlock } from "@portabletext/types";
import type { Image } from "@sanity/types";

import type { SanityColorTheme } from "~/lib/theme";
import type { ProductWithNodes } from "~/types/shopify";

export interface SanityAssetImage extends Image {
  _type: "image";
  altText?: string;
  blurDataURL: string;
  height: number;
  url: string;
  width: number;
}

export type SanityLabel = {
  key: string;
  text: string;
};

export type SanityLayout = {
  seo: SanitySeo;
  menuLinks?: SanityMenuLink[];
  siteLogo?: { url: string };
  footer?: any;
  notFoundPage?: SanityNotFoundPage;
  labels?: SanityLabel[];
  navigationLegend: string;
  navigationLabels: string[];
  contentMenu?: { contentLinks: SanityMenuLink[]; title: string };
  allProducts: SanityLinkInternal;
  menuShipping: string;
  shopImage: SanityAssetImage;
  journalImage: SanityAssetImage;
  journalLinks: {
    title: string;
    link: SanityLinkInternal;
  };
  latestArticles: {
    tags: {
      title: string;
      _id: string;
    }[];
    title: string;
    _id: string;
  }[];
};

export type SanityCollection = {
  _id: string;
  colorTheme: SanityColorTheme;
  gid: string;
  hero?: SanityHeroPage;
  slug?: string;
  title: string;
  vector?: string;
};

export type SanityProduct = {
  _id: string;
  _type: string;
  available: boolean;
  gid: string;
  previewImageUrl: string;
  hero?: SanityHeroPage;
  slug?: string;
  title: string;
  vector?: string;
  onlineStoreUrl: string;
  variantGid: string;
};

export type SanityCollectionPage = {
  _id: string;
  colorTheme: SanityColorTheme;
  hero?: SanityHeroCollection;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
  slug?: string;
  sortOrder: string;
  title: string;
};

export type SanityCollectionGroup = {
  _key: string;
  _type: "collectionGroup";
  collectionLinks?: SanityCollection[];
  productLinks?: SanityProduct[];
  collectionProducts?: SanityCollection;
  title: string;
};

export type SanityCustomProductOption =
  | SanityCustomProductOptionColor
  | SanityCustomProductOptionSize;

interface SanityCustomProductOptionBase {
  _key: string;
  title: string;
}
export interface SanityCustomProductOptionColor
  extends SanityCustomProductOptionBase {
  _type: "customProductOption.color";
  colors: {
    hex: string;
    title: string;
  }[];
}

export interface SanityCustomProductOptionSize
  extends SanityCustomProductOptionBase {
  _type: "customProductOption.size";
  sizes: {
    height: number;
    title: string;
    width: number;
  }[];
}

export type SanityHero = SanityHeroCollection | SanityHeroHome | SanityHeroPage;

export type SanityHeroCollection = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  description?: string;
  title?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
};

export type SanityHeroHome = {
  color: string;
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  link?: SanityLink;
  title?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
  heroImage?: SanityAssetImage;
  textContent?: string;
};

export type SanityHeroPage = {
  content?: SanityImageWithProductHotspots | SanityProductWithVariant;
  title?: string;
  data?: ProductWithNodes[] | ProductWithNodes;
};

export type SanityHomePage = {
  hero?: SanityHeroHome;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
  seo: SanitySeo;
};

export type SanityImageWithProductHotspots = {
  _key?: string;
  _type: "imageWithProductHotspots";
  image: SanityAssetImage;
  productHotspots: SanityProductHotspot[];
};

export type SanityLink = SanityLinkExternal | SanityLinkInternal;

export type SanityLinkExternal = {
  _key: string;
  _type: "linkExternal";
  newWindow?: boolean;
  url: string;
  title: string;
};

export type SanityLinkInternal = {
  _key: string;
  _type: "linkInternal";
  documentType: string;
  slug?: string;
  title: string;
};

export type SanityMenuLink =
  | SanityCollectionGroup
  | SanityLinkExternal
  | SanityLinkInternal;

export type SanityModule =
  | SanityModuleAccordion
  | SanityModuleCallout
  | SanityModuleCallToAction
  | SanityModuleCollection
  | SanityModuleGrid
  | SanityModuleImage
  | SanityModuleInstagram
  | SanityModuleProduct
  | SanityModuleProductHighlight
  | SanityModuleCollectionsSwiper
  | SanityModuleFeaturedArticle
  | SanityModuleArticleArchive
  | SanityModuleProductShowcase
  | SanityModuleFloatingTexts;

export type SanityModuleProductShowcase = {
  layout: "defult" | "big";
  direction: "rtl" | "ltr";
  title: string;
  image?: Image;
  modules: SanityModuleProduct[];
};

export type SanityModuleFloatingTexts = {
  layout: "default" | "columns";
  featuredImage?: SanityAssetImage;
  referenceImage?: SanityAssetImage;
  reference?: PortableTextBlock[];
  copy: {
    simplecontent: PortableTextBlock[];
  }[];
  legend?: string;
};

export type SanityModuleArticleArchive = {
  layout: string;
  articles: {
    _id: string;
    title: string;
    description: PortableTextBlock[];
    slug: {
      current: string;
    };
    tags: {
      _id: string;
      title: string;
    }[];
    time: string;
    author: string;
    image: SanityAssetImage;
    preamble: string;
  }[];
  tags: {
    title: string;
    _id: string;
  }[];
};

export type SanityModuleAccordion = {
  _key?: string;
  _type: "module.accordion";
  groups: {
    _key: string;
    _type: "group";
    body: PortableTextBlock[];
    title: string;
  }[];
};

export type SanityModuleCallout = {
  _key?: string;
  _type: "module.callout";
  link: SanityLink;
  text: string;
};

export type SanityModuleCallToAction = {
  _key?: string;
  _type: "module.callToAction";
  body?: string;
  content?: SanityAssetImage | SanityProductWithVariant;
  layout: "left" | "right";
  link: SanityLink;
  title: string;
};

export type SanityModuleCollection = {
  _key?: string;
  _type: "module.collection";
  collection: SanityCollection;
  showBackground?: boolean;
};

export type SanityModuleCollectionsSwiper = {
  title: string;
  firstCollection: string;
  secondCollection: string;
  thirdCollection: string;
  firstCollectionItems: {
    productWithVariant: SanityProductWithVariant;
  }[];
  secondCollectionItems: {
    productWithVariant: SanityProductWithVariant;
  }[];
  thirdCollectionItems: {
    productWithVariant: SanityProductWithVariant;
  }[];
};

export type SanityModuleFeaturedArticle = {
  title: string;
  featured: {
    _id: string;
    title: string;
    preamble: PortableTextBlock[];
    slug: {
      current: string;
    };
    tags: {
      _id: string;
      title: string;
    }[];
    time: string;
    author: string;
    description: PortableTextBlock[];
  };
  featuredImage: Image;
};

export type SanityModuleStackHighlight = {
  title: string;
};

export type SanityModuleImage =
  | SanityModuleImageCallToAction
  | SanityModuleImageCaption
  | SanityModuleImageProductHotspots
  | SanityModuleImageProductTags;

export type SanityModuleGrid = {
  _key?: string;
  _type: "module.grid";
  items: {
    _key: string;
    _type: "items";
    body: PortableTextBlock[];
    image: SanityAssetImage;
    title: string;
  }[];
};

export type SanityModuleImageBase = {
  _key?: string;
  _type: "module.image";
  image: SanityAssetImage;
};

export interface SanityModuleImageCallToAction extends SanityModuleImageBase {
  _key?: string;
  callToAction?: {
    link: SanityLink;
    title?: string;
  };
  variant: "callToAction";
}

export interface SanityModuleImageCaption extends SanityModuleImageBase {
  _key?: string;
  caption?: string;
  variant: "caption";
}
export interface SanityModuleImageProductHotspots
  extends SanityModuleImageBase {
  _key?: string;
  productHotspots?: SanityProductHotspot[];
  variant: "productHotspots";
}

export interface SanityModuleImageProductTags extends SanityModuleImageBase {
  _key?: string;
  productTags?: SanityProductWithVariant[];
  variant: "productTags";
}

export type SanityModuleImages = {
  _key?: string;
  _type: "module.images";
  fullWidth?: boolean;
  modules: SanityModuleImage[];
  verticalAlign?: "bottom" | "center" | "top";
};

export type SanityModuleInstagram = {
  _key?: string;
  _type: "module.instagram";
  url: string;
};

export type SanityModuleProduct = {
  _key?: string;
  _type: "module.product";
  productWithVariant: SanityProductWithVariant;
};

export type SanityModuleProducts = {
  _key?: string;
  _type: "module.products";
  layout?: "card" | "pill";
  modules: SanityModuleProduct[];
};

export type SanityModuleTaggedProducts = {
  _key?: string;
  _type: "module.taggedProducts";
  tag: string;
  number: number;
  layout?: "card" | "pill";
  products: SanityModuleProduct[];
};

export type SanityNotFoundPage = {
  body?: string;
  collectionGid?: string;
  colorTheme?: SanityColorTheme;
  title: string;
};

export type SanityPage = {
  bodyTitle: string;
  body: PortableTextBlock[];
  colorTheme?: SanityColorTheme;
  hero?: SanityHeroPage;
  seo: SanitySeo;
  title: string;
  showHero: boolean;
  modules: (SanityModuleImage | SanityModuleInstagram)[];
};

export type SanityProductHotspot = {
  _key?: string;
  product: SanityProductWithVariant;
  x: number;
  y: number;
};

export type SanityProductWithVariant = {
  _id: string;
  _key?: string;
  _type: "productWithVariant";
  available: boolean;
  gid: string;
  slug?: string;
  image: string;
  title: string;
  price: {
    minVariantPrice: number;
    maxVariantPrice: number;
  };
  variantGid: string;
};

export type SanityProductPage = {
  _id: string;
  available: boolean;
  body: PortableTextBlock[];
  colorTheme?: SanityColorTheme;
  customProductOptions?: SanityCustomProductOption[];
  gid: string;
  slug?: string;
  seo: SanitySeo;
  creators: SanityCreator[];
  composition: SanityComposition[];
  faqs: SanityFaqs;
  guide: SanityGuideProducts;
  materialUpsells: SanityModuleProduct[];
  sharedText: {
    deliveryAndReturns: PortableTextBlock[];
    deliverySummary: string;
    environmentallyFriendly: string;
  };
  benefits: {
    title: string;
    body: PortableTextBlock[];
  }[];
  articles: {
    _id: string;
    title: string;
    image: SanityAssetImage;
    tags: {
      _id: string;
      title: string;
    }[];
    author: string;
    time: string;
    description: PortableTextBlock[];
    preamble: any;
  }[];
  relatedArticlesText: PortableTextBlock[];
  relatedProducts: SanityModuleProduct[];
};

export type SanitySeo = {
  description?: string;
  image?: SanityAssetImage;
  title: string;
};

export type SanityPerson = {
  name: string;
  slug: string;
  bio: PortableTextBlock[];
  image: SanityAssetImage;
  seo: SanitySeo;
};

export type SanityPersonPage = SanityPerson & {
  seo: SanitySeo;
  products: SanityModuleProduct[];
};

export type SanityArticle = {
  title: string;
  tags: {
    _id: string;
    title: string;
  }[];
  description: PortableTextBlock[];
  author: string;
  time: string;
  image: SanityAssetImage;
  latestArticles: any;
  contentHeading: PortableTextBlock[] | null;
  content: {
    _key: string;
    textContent: PortableTextBlock[] | null;
    image: SanityAssetImage;
  }[];
};

export type SanityArticlePage = SanityArticle & {
  colorTheme?: SanityColorTheme;
  seo: SanitySeo;
  // products: SanityModuleProduct[];
};

export type SanityCreator = {
  _key: string;
  role: string;
  person: SanityPerson;
};

export type SanityMaterialAttributes = {
  environmentallyFriendly: boolean;
  dishwasherSafe: boolean;
};

export type SanityFaq = {
  _key: string;
  _type: "group";
  title: string;
  body: PortableTextBlock[];
};

export type SanityFaqs = {
  groups: SanityFaq[];
  _type: "module.accordion";
};

export type SanityModuleHomeArticles = {
  _id: string;
  _key?: string;
  _type: "module.homeArticles";
  title: string;
  description: string;
  featured: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  };
  articles: {
    _id: string;
    title: string;
    image: SanityAssetImage;
    tags: {
      _id: string;
      title: string;
    }[];
    author: string;
    time: string;
    description: PortableTextBlock[];
    preamble: any;
  }[];
  firstImage: Image;
  secondImage: Image;
  link: SanityLink;
};

export type SanityModuleProductHighlight = {
  _id: string;
  _key?: string;
  _type: "module.productHighlight";
  sectionTitle?: string;
  title: string;
  backgroundImage: Image;
  body: string;
  textColor: string;
  link?: SanityLink;
  order?: "left" | "right";
};

export type SanityMaterial = {
  name: string;
  attributes: SanityMaterialAttributes;
  story: PortableTextBlock[];
};

export type SanityComposition = {
  _key: string;
  material: SanityMaterial;
};

export type SanityGuide = SanityPage;

export type SanityGuideProducts = {
  title: string;
  slug: string;
  images: SanityModuleImage[];
};
