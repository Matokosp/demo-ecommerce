import type { SanityModuleHomeArticles } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Arrow } from "../elements/Icons";
import Link from "../elements/Link";
import LinkButton from "../elements/LinkButton";
import { Label } from "../global/Label";
import { Section } from "../layout/Section";
import SanityImage from "../media/SanityImage";
import { ArticleGallery } from "../sections/ArticleGallery";

export const HomeArticles = ({
  module,
}: {
  module: SanityModuleHomeArticles;
}) => {
  const { sanityDataset, sanityProjectID, selectedLocale } =
    useRootLoaderData();
  const {
    articles,
    description,
    featured,
    title,
    firstImage,
    secondImage,
    link,
  } = module;

  const prefix =
    selectedLocale.language.toLowerCase() +
    "-" +
    selectedLocale.country.toLowerCase();

  return (
    <Section noPadding className="mb-[58px] mt-[200px]">
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
                  _type: "linkInternal",
                  documentType: "article",
                  slug: "/article/" + featured.slug.current,
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
      <ArticleGallery articles={articles} filtered={featured.title} />
      {link && (
        <div className="col-span-12 px-6">
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
