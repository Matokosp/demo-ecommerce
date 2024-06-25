import { Image } from "@shopify/hydrogen";

import PortableText from "~/components/portableText/PortableText";
import type { SanityModuleHomeArticles } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Arrow } from "../elements/Icons";
import Link from "../elements/Link";
import LinkButton from "../elements/LinkButton";
import { Label } from "../global/Label";
import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";

export const HomeArticles = ({
  module,
}: {
  module: SanityModuleHomeArticles;
}) => {
  const { sanityDataset, sanityProjectID } = useRootLoaderData();
  const {
    articles,
    description,
    featured,
    title,
    firstImage,
    secondImage,
    link,
  } = module;

  return (
    <Section noPadding className="mt-[200px]">
      <div className="col-span-12 mb-10 grid grid-cols-12 items-center px-[22px]">
        <div className="col-span-6">
          <h2 className="heading-1">{title}</h2>
        </div>
        <div className="col-span-6">
          <p>{description}</p>
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-12">
        {Array.from([firstImage, secondImage]).map((image, i) => {
          return (
            <div
              className="relative col-span-6 flex items-center justify-center"
              key={image.asset?._ref}
            >
              <Link
                className="block"
                link={{
                  _key: featured._id,
                  _type: "linkExternal",
                  newWindow: true,
                  url: featured.slug.current,
                  title: "readmore",
                }}
              >
                {i === 0 ? (
                  <p
                    className="absolute top-2/4 w-full translate-y-[-50%] text-center text-limestone"
                    dangerouslySetInnerHTML={{ __html: featured.title }}
                  />
                ) : (
                  <p className="absolute top-2/4 flex w-full translate-y-[-50%] items-center justify-center gap-x-4 text-limestone">
                    <span>
                      <Label _key="article.readMore" />
                    </span>
                    <span>
                      <Arrow fill="#fff" />
                    </span>
                  </p>
                )}

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
                />
              </Link>
            </div>
          );
        })}
      </div>
      <div className="col-span-12 mt-10 grid grid-cols-12 gap-x-[10px] px-[22px]">
        {articles.map((article, i) => {
          return article.title !== featured.title ? (
            <div key={article.title} className="col-span-3">
              <Image src={article.image.url} />
              <div className="mt-4">
                {article.tags.map((category) => {
                  return (
                    <p
                      className="caption mb-4 inline-block border-[1px] border-black px-[6px] py-[2px]"
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
                {article.description && (
                  <PortableText blocks={article.description} />
                )}
              </div>
            </div>
          ) : null;
        })}
      </div>
      {link && (
        <div className="col-span-12 mt-20 px-6">
          <LinkButton
            mode="centered"
            tone="default"
            link={link}
            layout="spread"
            noIcon
          />
        </div>
      )}
    </Section>
  );
};
