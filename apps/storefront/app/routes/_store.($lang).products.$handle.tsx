import { Await, useLoaderData, useParams } from "@remix-run/react";
import type { ShopifyAnalyticsPayload } from "@shopify/hydrogen";
import {
  flattenConnection,
  getSelectedProductOptions,
  type SeoConfig,
  type SeoHandleFunction,
  ShopifyAnalyticsProduct,
} from "@shopify/hydrogen";
import type {
  MediaConnection,
  MediaImage,
  Product,
  ProductOption,
  ProductVariant,
} from "@shopify/hydrogen/storefront-api-types";
import { AnalyticsPageType } from "@shopify/hydrogen-react";
import {
  defer,
  type LoaderFunctionArgs,
  redirect,
} from "@shopify/remix-oxygen";
import clsx from "clsx";
import { SanityPreview } from "hydrogen-sanity";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/elements/Breadcrumb";
import { Footer } from "~/components/global/Footer";
import { Label } from "~/components/global/Label";
import { Section } from "~/components/layout/Section";
import { ProductShowcase } from "~/components/modules/ProductShowcase";
import PortableText from "~/components/portableText/PortableText";
import ProductDetails from "~/components/product/Details";
import ProductForm from "~/components/product/Form";
import ProductGalleryVertical from "~/components/product/GalleryVertical";
import Magazine from "~/components/product/Magazine";
import { ArticleGallery } from "~/components/sections/ArticleGallery";
import { ProductBenefits } from "~/components/sections/ProductBenefits";
import { baseLanguage } from "~/data/countries";
import type { SanityFaqs, SanityProductPage } from "~/lib/sanity";
import { ColorTheme } from "~/lib/theme";
import { fetchGids, notFound, validateLocale } from "~/lib/utils";
import { PRODUCT_PAGE_QUERY } from "~/queries/sanity/product";
import {
  PRODUCT_QUERY,
  RECOMMENDED_PRODUCTS_QUERY,
  VARIANTS_QUERY,
} from "~/queries/shopify/product";

const seo: SeoHandleFunction<typeof loader> = ({ data }) => {
  const media = flattenConnection<MediaConnection>(data.product?.media).find(
    (media) => media.mediaContentType === "IMAGE"
  ) as MediaImage | undefined;

  return {
    title:
      data?.page?.seo?.title ??
      data?.product?.seo?.title ??
      data?.product?.title,
    media: data?.page?.seo?.image ?? media?.image,
    description:
      data?.page?.seo?.description ??
      data?.product?.seo?.description ??
      data?.product?.description,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      brand: data?.product?.vendor,
      name: data?.product?.title,
    },
  } satisfies SeoConfig<Product>;
};

export const handle = {
  seo,
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  validateLocale({ context, params });
  const language = context.storefront.i18n.language.toLowerCase();

  const lang = context.storefront.i18n;

  const { handle } = params;
  invariant(handle, "Missing handle param, check route filename");

  const selectedOptions = getSelectedProductOptions(request);

  const cache = context.storefront.CacheCustom({
    mode: "public",
    maxAge: 60,
    staleWhileRevalidate: 60,
  });

  const [page, { product }] = await Promise.all([
    context.sanity.query<SanityProductPage>({
      query: PRODUCT_PAGE_QUERY,
      params: {
        slug: params.handle,
        language,
        baseLanguage,
      },
      cache,
    }),
    context.storefront.query<{
      product: Product & {
        selectedVariant?: ProductVariant;
        translatedOptions?: ProductOption[];
      };
    }>(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions,
      },
    }),
  ]);

  if (!page || !product?.id) {
    throw notFound();
  }

  if (!product.selectedVariant) {
    return redirectToFirstVariant({ product, request });
  }

  // Resolve any references to products on the Storefront API
  const gids = fetchGids({ page, context });

  // In order to show which variants are available in the UI, we need to query
  // all of them. We defer this query so that it doesn't block the page.
  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle,
    },
  });

  // Get recommended products from Shopify
  // const recommended = context.storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
  //   variables: {
  //     productId: product.id,
  //   },
  // });

  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics: ShopifyAnalyticsProduct = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  return defer({
    language,
    lang,
    page,
    product,
    variants,
    gids,
    selectedVariant,
    // recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
  });
}

function redirectToFirstVariant({
  product,
  request,
}: {
  product: Product;
  request: Request;
}) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams();
  const firstVariant = product!.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  throw redirect(`${url.pathname}?${searchParams.toString()}`, 302);
}

export default function ProductHandle() {
  const {
    language,
    lang,
    page,
    product,
    variants,
    selectedVariant,
    analytics,
    gids,
  } = useLoaderData<typeof loader>();
  const { handle } = useParams();

  const langPrefix =
    lang.language.toLowerCase() + "-" + lang.country.toLowerCase();

  const pagePaths = [
    {
      slug: "/" + langPrefix + "/" + "products",
      title: "Shop all",
    },
    {
      slug: null,
      title: product.collections.nodes[0].title,
    },
  ];

  return (
    <SanityPreview
      data={page}
      query={PRODUCT_PAGE_QUERY}
      params={{ slug: handle, language, baseLanguage }}
    >
      {(page) => (
        <ColorTheme value={page?.colorTheme}>
          <div className="relative w-full">
            <Breadcrumb paths={pagePaths} colorTheme={page?.colorTheme} />
            <Suspense
              fallback={
                <ProductDetails
                  selectedVariant={selectedVariant}
                  sanityProduct={page as SanityProductPage}
                  storefrontProduct={product}
                  storefrontVariants={[]}
                  analytics={analytics as ShopifyAnalyticsPayload}
                />
              }
            >
              <Await
                errorElement="There was a problem loading related products"
                resolve={[variants, gids]}
              >
                {(resp) => (
                  <Section className="border-b-[1px] border-b-[rgba(0,0,0,0.1)] pt-0">
                    <div className="col-span-12 h-full">
                      <div className="flex w-full gap-x-[22px]">
                        <div className="z-[-1] w-2/4 overflow-hidden">
                          <ProductGalleryVertical
                            storefrontProduct={product}
                            selectedVariant={selectedVariant}
                          />
                        </div>
                        <div className="sticky top-[185px] flex h-[calc(100vh-185px)] w-2/4 flex-col justify-between pb-[22px]">
                          <ProductForm
                            product={product}
                            description={page?.body ? page.body : []}
                            variants={product.variants.nodes || []}
                            selectedVariant={selectedVariant}
                            analytics={analytics as ShopifyAnalyticsPayload}
                            customProductOptions={page?.customProductOptions}
                            deliveryAndReturns={
                              page?.sharedText?.deliveryAndReturns
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Section>
                )}
              </Await>
            </Suspense>

            <Suspense>
              <Await resolve={gids}>
                {/* Magazine */}
                <Magazine page={page as SanityProductPage} product={product} />

                {/* Benefits */}
                {page?.benefits && (
                  <ProductBenefits benefits={page?.benefits} />
                )}

                {/* Related Articles */}
                {page?.articles && (
                  <ArticleGallery
                    articles={page?.articles}
                    text={page?.relatedArticlesText}
                    relatedArticles
                  />
                )}

                {/* FAQs */}
                <div
                  className={clsx(
                    "mb-10 p-[18px]",
                    "border-t-[1px] border-[rgba(0,0,0,0.1)]"
                  )}
                >
                  {page?.faqs?.groups && page?.faqs?.groups.length > 0 && (
                    <SanityProductFaqs faqs={page.faqs} />
                  )}
                </div>

                {/* Related products */}
                {page?.relatedProducts && (
                  <ProductShowcase
                    module={{
                      layout: "big",
                      direction: "ltr",
                      title: "Strength stacks",
                      modules: page?.relatedProducts,
                      image: undefined,
                    }}
                  />
                )}
              </Await>
            </Suspense>
          </div>

          {/* Footer */}
          <Footer />
        </ColorTheme>
      )}
    </SanityPreview>
  );
}

const SanityProductFaqs = ({ faqs }: { faqs: SanityFaqs }) => {
  return (
    <Section>
      <h2 className={clsx("heading-1 col-span-12 mb-10")}>
        <Label _key="faqs.title" />
      </h2>
      {faqs.groups.map((faq) => {
        return (
          <div
            key={faq._key}
            className={clsx(
              "col-span-4 mb-14 flex flex-col gap-y-6",
              "xl:w-[calc(100%-54px)]"
            )}
          >
            <div className="flex gap-x-8">
              <p>Q</p>
              <p>{faq.title}</p>
            </div>
            <div className="flex gap-x-8">
              <p>A</p>
              <PortableText blocks={faq.body} />
            </div>
          </div>
        );
      })}
    </Section>
  );
};
