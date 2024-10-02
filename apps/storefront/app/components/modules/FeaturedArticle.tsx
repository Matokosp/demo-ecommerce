import clsx from "clsx";

import { SanityModuleFeaturedArticle } from "~/lib/sanity";
import { useColorTheme } from "~/lib/theme";
import { useRootLoaderData } from "~/root";

import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import PortableText from "../portableText/PortableText";

type Props = {
  module: SanityModuleFeaturedArticle;
};

export const FeaturedArticle = ({ module }: Props) => {
  const { sanityDataset, sanityProjectID } = useRootLoaderData();
  const { title, featured, featuredImage } = module;

  const colorTheme = useColorTheme();

  return (
    <Section
      style={{
        backgroundColor: colorTheme?.background,
      }}
      className={clsx(
        "relative h-[calc(100vh-99px)] pt-10 first-of-type:pt-[0px]"
      )}
    >
      <div className="absolute left-2/4 top-0 h-[calc(100%-22px)] w-[1px] bg-black opacity-10"></div>
      <div className="absolute bottom-[22px] left-0 h-[1px] w-full bg-black opacity-10"></div>
      <div className="col-span-6 flex h-full flex-col items-center justify-between pb-10 text-center">
        <h1>{title}</h1>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-center gap-x-2">
            {featured.tags.map((tag) => (
              <span
                className="caption border-[1px] border-black px-[6px] py-[2px]"
                key={tag._id}
              >
                {tag.title}
              </span>
            ))}
          </div>
          <h3>{featured.title}</h3>
        </div>
        <div className="flex w-[66%] flex-col gap-y-10">
          <PortableText blocks={featured.description} />
          <p className="caption opacity-30">
            {featured.author}
            {featured.time && " • " + featured.time}
          </p>
        </div>
      </div>
      <div className="col-span-6 pb-[22px] pl-[17px]">
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
          className="h-full w-full object-cover"
        />
      </div>
    </Section>
  );
};
