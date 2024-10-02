import type { PortableTextBlock } from "@portabletext/types";
import {
  type ShopifyAnalyticsPayload,
  type ShopifyAnalyticsProduct,
} from "@shopify/hydrogen";
import type {
  Product,
  ProductVariant,
} from "@shopify/hydrogen/storefront-api-types";
import clsx from "clsx";
import { useState } from "react";
import invariant from "tiny-invariant";

import ProductOptions from "~/components/product/Options";
import type { SanityCustomProductOption } from "~/lib/sanity";
import { hasMultipleProductOptions } from "~/lib/utils";

import { Label } from "../global/Label";
import PortableText from "../portableText/PortableText";
import AddToBagButton from "./buttons/AddToBagButton";

export default function ProductForm({
  product,
  variants,
  selectedVariant,
  analytics,
  customProductOptions,
  description,
  deliveryAndReturns,
}: {
  product: Product;
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  analytics: ShopifyAnalyticsPayload;
  customProductOptions?: SanityCustomProductOption[];
  description: PortableTextBlock[];
  deliveryAndReturns?: PortableTextBlock[];
}) {
  const isOutOfStock = !selectedVariant?.availableForSale;

  const multipleProductOptions = hasMultipleProductOptions(product.options);

  invariant(
    analytics?.products?.[0],
    "Missing product analytics data for product page"
  );

  const productAnalytics: ShopifyAnalyticsProduct = {
    ...analytics.products[0],
    quantity: 1,
  };

  const [selectedOption, setSelectedOption] = useState<{
    lines: any;
    option: any;
  }>({
    lines: {
      merchandiseId: selectedVariant.id,
      quantity: 1,
    },
    option: "single",
  });

  return (
    <>
      <div className="flex w-2/4 flex-col gap-y-8">
        <PortableText blocks={description} />
        {multipleProductOptions && (
          <div>
            <ProductOptions
              product={product}
              variants={variants}
              options={product.options}
              selectedVariant={selectedVariant}
              customProductOptions={customProductOptions}
            />
          </div>
        )}
      </div>

      <div>
        <div className="flex items-start gap-x-[10px]">
          <div className="w-2/4">
            <button
              className={clsx(
                "w-full rounded-xl border-[1px] border-black px-4 py-[3px] text-black duration-200",
                selectedOption.option === "single" && "bg-black text-white"
              )}
              disabled={isOutOfStock}
              onClick={() =>
                setSelectedOption({
                  lines: {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                  },
                  option: "single",
                })
              }
            >
              <div className="flex justify-between">
                <Label _key="cart.oneTimePurchase" />
                <span>
                  {selectedVariant.price.amount}{" "}
                  {selectedVariant.price.currencyCode}
                </span>
              </div>
            </button>
          </div>
          {selectedVariant.sellingPlanAllocations.edges.length > 0 && (
            <div className="w-2/4">
              <button
                className={clsx(
                  "w-full rounded-xl border-[1px] border-black px-4 py-[3px] text-black",
                  selectedOption.option === "subscription" &&
                    "bg-black text-white"
                )}
                disabled={isOutOfStock}
                onClick={() =>
                  setSelectedOption({
                    lines: {
                      merchandiseId: selectedVariant.id,
                      quantity: 1,
                      sellingPlanId:
                        selectedVariant.sellingPlanAllocations.edges[0].node
                          .sellingPlan.id,
                    },
                    option: "subscription",
                  })
                }
              >
                <div className="flex justify-between">
                  <Label _key="cart.subscribeAddButton" />
                  <span>
                    {
                      selectedVariant.sellingPlanAllocations.edges[0].node
                        .priceAdjustments[0].price.amount
                    }{" "}
                    {
                      selectedVariant.sellingPlanAllocations.edges[0].node
                        .priceAdjustments[0].price.currencyCode
                    }
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="w-2/4">
            <AddToBagButton
              lines={[selectedOption.lines]}
              disabled={isOutOfStock}
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
              buttonClassName="w-full bg-black text-white py-[3px] rounded-xl px-4"
            />
          </div>
        </div>
        {deliveryAndReturns && (
          <div className="mt-4 pl-4">
            <PortableText
              blocks={deliveryAndReturns}
              className="flex items-center gap-x-8 text-[14px] text-[rgba(0,0,0,0.3)] [&>p]:relative [&>p]:m-0 [&>p]:!text-[14px] [&>p]:before:absolute [&>p]:before:left-[-10px] [&>p]:before:top-[calc(50%-1.5px)] [&>p]:before:h-[3px] [&>p]:before:w-[3px] [&>p]:before:rounded-md [&>p]:before:bg-[rgba(0,0,0,0.3)] [&>p]:before:content-['']"
            />
          </div>
        )}
      </div>
    </>
  );
}
