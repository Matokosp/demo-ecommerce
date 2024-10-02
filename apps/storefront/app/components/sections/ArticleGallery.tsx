import type { PortableTextBlock } from "@portabletext/types";
import { Image } from "@shopify/hydrogen";
import clsx from "clsx";

import { SanityAssetImage } from "~/lib/sanity";

import Link from "../elements/Link";
import { Label } from "../global/Label";
import PortableText from "../portableText/PortableText";

type Props = {
  articles: {
    _id: string;
    title: string;
    image: SanityAssetImage;
    tags: {
      _id: string;
      title: string;
    }[];
    author: string;
    time: string;
    description: PortableTextBlock[];
    preamble?: any;
    slug: { current: string };
  }[];
  filtered?: string;
  relatedArticles?: boolean;
  bg?: string;
  text?: PortableTextBlock[];
};

export const ArticleGallery = ({
  articles,
  filtered,
  bg,
  relatedArticles,
  text,
}: Props) => {
  return (
    <div
      className={clsx(
        "col-span-12 grid grid-cols-12 gap-x-[10px] px-[22px] pb-[80px] pt-10",
        bg === "secondary" && "bg-secondary",
        filtered && "border-t-[1px] border-t-[rgba(0,0,0,0.1)] pb-[200px]",
        text && relatedArticles && "pb-[200px]"
      )}
    >
      {!relatedArticles ? (
        <h2 className="heading-1 col-span-12 mb-10">
          <Label _key="pages.moreJournal" />
        </h2>
      ) : (
        <>
          <div className="col-span-5 mb-[120px]">
            <h3 className="mb-6">
              <Label _key="pages.relatedArticles" />
            </h3>
            {text && (
              <span className="indent-[50px]">
                <PortableText blocks={text} />
              </span>
            )}
          </div>
          <div className="col-span-7" />
        </>
      )}
      {articles.map((article, i) => {
        return filtered && article.title !== filtered ? (
          <div key={article.title} className="col-span-3 !cursor-pointer">
            <Link
              link={{
                _key: article._id,
                _type: "linkInternal",
                documentType: "article",
                slug: "/article/" + article.slug.current,
                title: "readmore",
              }}
            >
              <Image src={article.image.url} />
              <div className="mt-4">
                {article.tags.map((category) => {
                  return (
                    <p
                      className="caption mb-4 mr-2 inline-block border-[1px] border-black px-[6px] py-[2px]"
                      key={category.title}
                    >
                      {category.title}
                    </p>
                  );
                })}
                <p className="caption mb-6 text-darkGray">
                  {article.author}
                  {article.time && " • " + article.time}
                </p>
                <h3 className="mb-4">{article.title}</h3>
                {article.preamble && <PortableText blocks={article.preamble} />}
              </div>
            </Link>
          </div>
        ) : (
          <div key={article.title} className="col-span-3 !cursor-pointer">
            <Link
              link={{
                _key: article._id,
                _type: "linkInternal",
                documentType: "article",
                slug: "/article/" + article.slug.current,
                title: "readmore",
              }}
            >
              <Image src={article.image.url} />
              <div className="mt-4">
                {article.tags.map((category) => {
                  return (
                    <p
                      className="caption mb-4 mr-2 inline-block border-[1px] border-black px-[6px] py-[2px]"
                      key={category.title}
                    >
                      {category.title}
                    </p>
                  );
                })}
                <p className="caption mb-6 text-darkGray">
                  {article.author}
                  {article.time && " • " + article.time}
                </p>
                <h3 className="mb-4">{article.title}</h3>
                {article.preamble && <PortableText blocks={article.preamble} />}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
