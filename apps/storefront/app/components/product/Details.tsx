import { ShopifyAnalyticsPayload } from "@shopify/hydrogen";
import type {
  Product,
  ProductVariant,
} from "@shopify/hydrogen/storefront-api-types";
import clsx from "clsx";

import ProductWidget from "~/components/product/Widget";
import type { SanityProductPage } from "~/lib/sanity";

import ProductGalleryVertical from "./GalleryVertical";

type Props = {
  sanityProduct: SanityProductPage;
  storefrontProduct: Product;
  storefrontVariants: ProductVariant[];
  selectedVariant: ProductVariant;
  analytics: ShopifyAnalyticsPayload;
};

export default function ProductDetails({
  sanityProduct,
  storefrontProduct,
  storefrontVariants,
  selectedVariant,
  analytics,
}: Props) {
  return <></>;
}
