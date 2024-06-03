import clsx from "clsx";

import Module from "~/components/modules/Module";
import ProductCard from "~/components/product/Card";
import type { SanityModule } from "~/lib/sanity";
import type { ProductWithNodes } from "~/types/shopify";

import { Section } from "../layout/Section";

// Sanity modules to render in full width (across all grid columns)
const FULL_WIDTH_MODULE_TYPES: SanityModule["_type"][] = [
  "module.callout",
  "module.callToAction",
];

// Tailwind class map
const CLASSES = {
  flexAlign: {
    center: "items-center",
    end: "items-end",
    start: "items-start",
  },
  flexJustify: {
    center: "justify-center",
    end: "justify-end",
    start: "justify-start",
  },
  imageAspect: {
    landscape: "aspect-square md:aspect-[16/9]",
    square: "aspect-square",
  },
  width: {
    sm: "w-full md:w-[55%]",
    md: "w-full md:w-[65%]",
    lg: "w-full md:w-full",
  },
};

// Layout rules for grid children.
// Each child iterates (and loops) through this array of rules.
// These layout rules only apply to both product modules and non-module products.
const PRODUCT_LAYOUT = [
  {
    aspect: "square",
    flex: { align: "start", justify: "start" },
    offsetY: false,
    width: "md",
  },
  {
    aspect: "square",
    flex: { align: "start", justify: "end" },
    offsetY: false,
    width: "lg",
  },
  {
    aspect: "square",
    flex: { align: "start", justify: "start" },
    offsetY: false,
    width: "lg",
  },
  {
    aspect: "square",
    flex: { align: "center", justify: "start" },
    offsetY: false,
    width: "sm",
  },
  {
    aspect: "square",
    flex: { align: "start", justify: "end" },
    offsetY: false,
    width: "md",
  },
  {
    aspect: "square",
    flex: { align: "start", justify: "end" },
    offsetY: true,
    width: "md",
  },
  {
    aspect: "square",
    flex: { align: "start", justify: "start" },
    offsetY: false,
    width: "lg",
  },
  {
    aspect: "landscape",
    flex: { align: "center", justify: "end" },
    offsetY: false,
    width: "lg",
  },
] as const;

type Props = {
  items: (SanityModule | ProductWithNodes)[];
};

export default function ModuleGrid({ items }: Props) {
  return (
    <>
      {items.map((item, index) => {
        const productLayout = PRODUCT_LAYOUT[index % PRODUCT_LAYOUT.length];
        const productImageAspect = CLASSES.imageAspect[productLayout.aspect];
        const productWidth = CLASSES.width[productLayout.width];
        const productLayoutClasses = clsx([
          CLASSES.flexAlign[productLayout.flex.align],
          CLASSES.flexJustify[productLayout.flex.justify],
          productLayout.offsetY ? "md:mt-[5vw]" : "mt-0",
        ]);

        if (isModule(item)) {
          // Render modules
          return (
            <Module
              key={item._key}
              imageAspectClassName={productImageAspect}
              module={item}
            />
          );
        } else {
          // Render product cards
          return (
            <section className={productLayoutClasses} key={item.id}>
              <div className={productWidth}>
                <ProductCard
                  imageAspectClassName={productImageAspect}
                  storefrontProduct={item}
                />
              </div>
            </section>
          );
        }
      })}
    </>
  );
}

const isModule = (
  item: SanityModule | ProductWithNodes
): item is SanityModule => {
  return (item as SanityModule)._type?.startsWith("module");
};
