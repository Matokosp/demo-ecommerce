import { Image } from "@shopify/hydrogen";
import clsx from "clsx";
import React from "react";

import { Link } from "~/components/Link";
import { SanityModuleProductShowcase } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";

type ProductShowcaseProps = {
  module: SanityModuleProductShowcase;
};

export const ProductShowcase = ({ module }: ProductShowcaseProps) => {
  const { layout, title, modules, image, direction } = module;
  const { sanityDataset, sanityProjectID } = useRootLoaderData();

  const ProductCard = ({
    product,
    index,
    width,
  }: {
    product: any;
    index: number;
    width: "half" | "quarter";
  }) => {
    return (
      <Link
        to={`/products/${product.productWithVariant.slug}`}
        key={product._key}
        className={clsx(
          "relative aspect-square",
          width === "half" ? "w-2/4" : "w-1/4",
          index % 2 === 0
            ? "bg-[linear-gradient(180deg,rgba(0,0,0,1)56%,rgba(238,227,212,0.50)94%,rgba(243,232,217,0.50)100%)]"
            : "bg-black"
        )}
      >
        <div className="aspect-square p-20">
          <Image
            className="aspect-square bg-center object-contain object-center ease-in-out"
            src={product.productWithVariant.image}
            crop="center"
            sizes="100%"
          />
        </div>
        <p
          className={clsx(
            "absolute bottom-0 flex w-full justify-between p-[22px]",
            index % 2 !== 0 && "text-white"
          )}
        >
          <span>{product.productWithVariant.title}</span>
          <span>
            from {product.productWithVariant.price.minVariantPrice} SEK
          </span>
        </p>
      </Link>
    );
  };

  return (
    <Section className="border-b-[1px] border-b-[rgba(0,0,0,0.1)] px-0 pb-0 pt-20 first-of-type:pt-[98px] last-of-type:border-b-0">
      <div className="col-span-12 mb-6 px-[22px]">
        <h3>{title}</h3>
      </div>
      <div
        className={clsx(
          "col-span-12 flex flex-wrap",
          direction === "rtl" && "flex-row-reverse"
        )}
      >
        {layout === "big" ? (
          modules.map((product, idx) => {
            return !image && idx <= 1 ? (
              <ProductCard
                product={product}
                index={idx + 1}
                width="half"
                key={product._key}
              />
            ) : image && idx === 0 ? (
              <React.Fragment key={product._key}>
                <ProductCard product={product} index={idx + 1} width="half" />
                <div className="relative aspect-square w-2/4">
                  <SanityImage
                    crop={image.crop}
                    dataset={sanityDataset}
                    hotspot={image.hotspot}
                    projectId={sanityProjectID}
                    sizes={["100%"]}
                    width={1}
                    height={1}
                    src={image.asset?._ref}
                    className="absolute h-full w-full"
                  />
                </div>
              </React.Fragment>
            ) : (
              <ProductCard product={product} index={idx + 1} width="quarter" />
            );
          })
        ) : (
          <>
            <div className="flex w-2/4 flex-wrap items-start">
              {modules.map((product, idx) => {
                return (
                  <ProductCard
                    key={product._key}
                    product={product}
                    index={idx}
                    width="half"
                  />
                );
              })}
            </div>
            <div className="relative aspect-square w-2/4">
              <SanityImage
                crop={image?.crop}
                dataset={sanityDataset}
                hotspot={image?.hotspot}
                projectId={sanityProjectID}
                sizes={["100%"]}
                width={1}
                height={1}
                src={image?.asset?._ref}
                className="absolute h-full w-full"
              />
            </div>
          </>
        )}
      </div>
    </Section>
  );
};
