import { PortableTextBlock } from "@portabletext/types";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { SanityAssetImage } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import PortableText from "../portableText/PortableText";

type BodyProps = {
  heading?: PortableTextBlock[] | null;
  content: {
    _key: string;
    textContent: PortableTextBlock[] | null;
    image: SanityAssetImage | null;
  }[];
};

type MarkDefs = {
  _type: string;
  _key: string;
  reference: string;
};

const ReferencesPanel = ({ references, activeEditorialRef }: any) => {
  const filtered = references.filter(
    (ele: MarkDefs) => ele._type === "annotationReference"
  );

  return (
    <div className="flex flex-col gap-y-6">
      {filtered.map((ref: any, idx: number) => {
        return ref._type === "annotationReference" ? (
          <p
            className={clsx(
              "relative duration-500",
              activeEditorialRef !== null &&
                activeEditorialRef !== ref._key &&
                "opacity-30"
            )}
            key={ref._key}
          >
            <span className="absolute left-[-22px] top-0 inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black text-[12px]">
              {idx + 1}{" "}
            </span>
            {ref.reference}
          </p>
        ) : null;
      })}
    </div>
  );
};

export const Body = ({ content, heading }: BodyProps) => {
  const [activeEditorialRef, setActiveEditorialRef] = useState<string | null>(
    null
  );

  const { sanityDataset, sanityProjectID } = useRootLoaderData();

  return (
    <Section className="bg-secondary pb-[200px] pt-20">
      {heading && (
        <div className="col-start-3 col-end-11 mb-[120px] text-center">
          <PortableText className="[&_p]:text-[24px]" blocks={heading} />
        </div>
      )}
      {content.map((paragraph, idx) => {
        return (
          paragraph.textContent && (
            <React.Fragment key={paragraph._key}>
              <div className="relative col-start-4 col-end-10">
                <PortableText
                  blocks={paragraph.textContent}
                  setState={setActiveEditorialRef}
                />
              </div>
              <div className="col-start-11 col-end-13">
                <ReferencesPanel
                  references={paragraph.textContent[0].markDefs}
                  activeEditorialRef={activeEditorialRef}
                />
              </div>
              {paragraph.image && (
                <div className="relative left-[-22px] col-span-12 my-[120px]">
                  <SanityImage
                    crop={paragraph.image.crop}
                    dataset={sanityDataset}
                    hotspot={paragraph.image.hotspot}
                    projectId={sanityProjectID}
                    sizes={["100%"]}
                    width={1}
                    height={1}
                    src={paragraph.image.asset?._ref}
                    className="w-(calc(100%+44px)) h-full max-w-[unset]"
                  />
                </div>
              )}
            </React.Fragment>
          )
        );
      })}
    </Section>
  );
};
