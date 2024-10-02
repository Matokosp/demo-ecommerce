import clsx from "clsx";

import { SanityModuleFloatingTexts } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import PortableText from "../portableText/PortableText";

type FlotaingTextsProps = {
  module: SanityModuleFloatingTexts;
  colorTheme?: { background: string; text: string };
};

export const FloatingTexts = ({ module, colorTheme }: FlotaingTextsProps) => {
  const { layout, featuredImage, referenceImage, reference, copy, legend } =
    module;
  const { sanityDataset, sanityProjectID } = useRootLoaderData();
  const defaultStyles = [
    "col-start-2 col-end-5",
    "col-start-9 col-end-12",
    "col-start-4 col-end-7",
  ];
  return (
    <Section
      style={{
        backgroundColor: colorTheme ? colorTheme.background : null,
        color: colorTheme ? colorTheme.text : null,
      }}
      className="border-b-[1px] border-b-[rgba(251,251,246,0.3)] py-30"
    >
      {layout === "default" ? (
        <div className="relative col-span-12 pt-[200px]">
          <SanityImage
            crop={featuredImage?.crop}
            dataset={sanityDataset}
            hotspot={featuredImage?.hotspot}
            layout="responsive"
            projectId={sanityProjectID}
            sizes={["100vw"]}
            width={1}
            height={1}
            src={featuredImage?.asset?._ref}
            className="absolute left-1/2 top-0 !aspect-auto !w-[1.4vw] min-w-[25px] translate-x-[-50%]"
          />
          {copy.map((text, idx) => {
            return (
              <div
                className={clsx("grid grid-cols-12", idx !== 0 && "mt-[170px]")}
                key={text.simplecontent[0]._key}
              >
                <div className={defaultStyles[idx]}>
                  <PortableText blocks={text.simplecontent} />
                </div>
              </div>
            );
          })}
          {legend && <p className="mt-[200px] text-center">{legend}</p>}
        </div>
      ) : (
        <div className="col-span-12">
          <div className="flex justify-center gap-x-[108px]">
            {copy.map((text, idx) => {
              return (
                <div className="w-[25%]" key={text.simplecontent[0]._key}>
                  <PortableText blocks={text.simplecontent} />
                </div>
              );
            })}
          </div>
          <div className="mt-30 grid grid-cols-12">
            <div className="col-start-6 col-end-8 flex items-start justify-center">
              <SanityImage
                crop={referenceImage?.crop}
                dataset={sanityDataset}
                hotspot={referenceImage?.hotspot}
                layout="responsive"
                projectId={sanityProjectID}
                sizes={["100vw"]}
                width={1}
                height={1}
                src={referenceImage?.asset?._ref}
                className="!aspect-auto !w-[6vw] min-w-[95px]"
              />
              <div className="flex h-4 w-4 items-center justify-center rounded-lg border-[1px] border-[#FBFBF6]">
                <p className="text-[10px]">I</p>
              </div>
            </div>
            <div className="relative col-start-11 col-end-13">
              <div className="absolute left-[-26px] top-1 flex h-4 w-4 items-center justify-center rounded-lg border-[1px] border-[#FBFBF6]">
                <p className="text-[10px]">I</p>
              </div>
              {reference && <PortableText blocks={reference} />}
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};
