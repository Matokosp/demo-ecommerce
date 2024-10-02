import { MediaFile } from "@shopify/hydrogen";
import {
  MediaImage,
  ProductVariant,
} from "@shopify/hydrogen/storefront-api-types";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";

import type { ProductWithNodes } from "~/types/shopify";

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */

type Props = {
  storefrontProduct: ProductWithNodes;
  selectedVariant?: ProductVariant;
};

export default function ProductGalleryVertical({
  storefrontProduct,
  selectedVariant,
}: Props) {
  const typeNameMap = {
    MODEL_3D: "Model3d",
    VIDEO: "Video",
    IMAGE: "MediaImage",
    EXTERNAL_VIDEO: "ExternalVideo",
  };

  const media = storefrontProduct?.media?.nodes;

  if (!media?.length) {
    return null;
  }

  return (
    <div className="relative" tabIndex={-1}>
      <div className="mb-8 text-center">
        <h1 className="heading-2">{storefrontProduct.title}</h1>
      </div>
      <div className="flex h-full flex-col gap-y-2">
        {/* Slides */}
        {media.map((med, idx) => {
          let extraProps: Record<string, any> = {};

          if (med.mediaContentType === "MODEL_3D") {
            extraProps = {
              interactionPromptThreshold: "0",
              ar: true,
              loading: "eager",
              disableZoom: true,
              style: { height: "100%", margin: "0 auto" },
            };
          }

          const data = {
            ...med,
            __typename:
              typeNameMap[med.mediaContentType] || typeNameMap["IMAGE"],
            image: {
              // @ts-ignore
              ...med.image,
              altText: med.alt || "Product image",
            },
          } as MediaImage;

          return (
            idx > 0 && (
              <MediaFile
                className="relative flex w-full object-cover"
                data={data}
                draggable={false}
                key={med.id}
                tabIndex={0}
                mediaOptions={{
                  image: { crop: "center", sizes: "100vw", loading: "eager" },
                }}
                {...extraProps}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
