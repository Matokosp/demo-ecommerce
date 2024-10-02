import { PortableTextBlock } from "@portabletext/types";

import { SanityAssetImage } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import PortableText from "../portableText/PortableText";

type HeroProps = {
  content: {
    title: string;
    description: PortableTextBlock[];
    image?: SanityAssetImage | null;
    author: string;
    time: string;
    tags: {
      _id: string;
      title: string;
    }[];
  };
};

export const Hero = ({ content }: HeroProps) => {
  const { sanityDataset, sanityProjectID } = useRootLoaderData();

  const { title, description, image, author, time, tags } = content;
  return (
    <Section className="h-screen bg-secondary pt-[95px]">
      <div className="col-span-6 flex h-full flex-col items-start justify-between">
        <div className="flex gap-x-2">
          {tags?.map((tag) => (
            <p
              className="caption border-[1px] border-black px-[6px] py-[2px]"
              key={tag._id}
            >
              {tag.title}
            </p>
          ))}
        </div>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        <div className="flex w-[66.6%] flex-col gap-y-10">
          <PortableText blocks={description} />
          <p className="caption mb-6 text-darkGray">
            {author ?? null}
            {time && " • " + time}
          </p>
        </div>
      </div>
      <div className="col-span-6">
        {image && (
          <SanityImage
            crop={image.crop}
            dataset={sanityDataset}
            hotspot={image.hotspot}
            layout="responsive"
            projectId={sanityProjectID}
            sizes={["100%"]}
            width={1}
            height={1}
            src={image.asset?._ref}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </Section>
  );
};
