import type { PortableTextBlock } from "@portabletext/types";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { Link } from "~/components/Link";
import { SanityAssetImage, SanityModuleArticleArchive } from "~/lib/sanity";
import { useColorTheme } from "~/lib/theme";
import { useRootLoaderData } from "~/root";

import { Label } from "../global/Label";
import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import PortableText from "../portableText/PortableText";

type Props = {
  module: SanityModuleArticleArchive;
};

const ArticleCard = ({
  tags,
  author,
  time,
  title,
  preamble,
  image,
  sanityDataset,
  sanityProjectID,
  isLandscape,
  slug,
  idx,
}: {
  tags: SanityModuleArticleArchive["tags"];
  author: string;
  time: string;
  title: string;
  preamble: string;
  image: SanityAssetImage;
  sanityDataset: string;
  sanityProjectID: string;
  isLandscape: boolean;
  slug: string;
  idx: number;
}) => {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { delay: (idx + 0.1) * 0.2, type: "linear" },
      }}
      exit={{ y: 12, opacity: 0, transition: { delay: 0, duration: 0 } }}
      className={clsx("mb-20", isLandscape ? "col-span-6" : "col-span-3")}
    >
      <Link to={"/article/" + slug}>
        <div className={clsx(isLandscape ? "!aspect-[2/1]" : "aspect-square")}>
          <SanityImage
            crop={image?.crop}
            dataset={sanityDataset}
            hotspot={image?.hotspot}
            layout="responsive"
            projectId={sanityProjectID}
            sizes={["100vw"]}
            width={1}
            height={1}
            src={image?.asset?._ref}
            className={clsx(
              "object-cover",
              isLandscape ? "h-[calc(100%-5px)]" : ""
            )}
          />
        </div>
        <div className="my-4 flex gap-x-2">
          {tags.map((tag) => (
            <p
              className="caption border-[1px] border-black px-[6px] py-[2px]"
              key={tag._id}
            >
              {tag.title}
            </p>
          ))}
        </div>
        <p
          className={clsx(
            "caption text-darkGray",
            author || time ? "mb-6" : ""
          )}
        >
          {author ?? null}
          {time ? " • " + time : null}
        </p>
        <h3 className="mb-4" dangerouslySetInnerHTML={{ __html: title }} />
        <p>{preamble}</p>
      </Link>
    </motion.div>
  );
};

export const ArticleArchive = ({ module }: Props) => {
  const { layout, tags, articles } = module;
  const colorTheme = useColorTheme();
  const [activeTag, setActiveTag] = useState("all");

  const { sanityDataset, sanityProjectID, selectedLocale } =
    useRootLoaderData();

  const generateLandscapeIndices = () => {
    const indices = [];
    let currentIndex = 0;
    let addValue = 9;
    while (currentIndex < articles.length) {
      indices.push(currentIndex);
      currentIndex += addValue;
      addValue = addValue === 9 ? 5 : 9;
    }
    return indices;
  };

  const filterArticlesByActiveTag = () => {
    return activeTag === "all"
      ? articles
      : articles.filter((article: { tags: any[] }) =>
          article.tags.some((tag: { title: string | any[] }) =>
            tag.title.includes(activeTag)
          )
        );
  };

  return (
    <Section
      style={{
        backgroundColor: colorTheme?.background,
      }}
    >
      <div className="col-span-12 mb-10 flex items-center justify-center gap-x-8 pb-[20px]">
        <button
          onClick={() => setActiveTag("all")}
          style={{
            opacity: activeTag !== "all" ? 0.3 : 1,
          }}
          className="duration-200"
        >
          <Label _key="misc.all" />
        </button>
        {tags.map((tag) => {
          return (
            <button
              className="duration-200"
              onClick={() => setActiveTag(tag.title)}
              style={{
                opacity: activeTag !== tag.title ? 0.3 : 1,
              }}
              key={tag._id}
            >
              {tag.title}
            </button>
          );
        })}
      </div>
      <AnimatePresence key={activeTag}>
        {filterArticlesByActiveTag().map((article, indx) => {
          return (
            <ArticleCard
              key={article._id}
              idx={indx}
              tags={article.tags}
              author={article.author}
              time={article.time}
              title={article.title}
              preamble={article.preamble}
              image={article.image}
              sanityDataset={sanityDataset}
              sanityProjectID={sanityProjectID}
              isLandscape={
                layout === "landscape" &&
                generateLandscapeIndices().includes(indx)
              }
              slug={article.slug.current}
            />
          );
        })}
      </AnimatePresence>
    </Section>
  );
};
