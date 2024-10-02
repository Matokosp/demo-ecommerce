import clsx from "clsx";

import { Link } from "~/components/Link";
import type { SanityLink, SanityLinkInternal } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import CustomInput from "../elements/CustomInput";
import { Legend } from "../elements/Icons";
import { Section } from "../layout/Section";
import { CountrySelector } from "./CountrySelector";

/**
 * A component that specifies the content of the footer on the website
 */
export const Footer = ({
  colorTheme,
}: {
  colorTheme?: { background: string; text: string };
}) => {
  const { layout, selectedLocale } = useRootLoaderData();
  const { footer } = layout || {};

  const langPrefix =
    "/" +
    selectedLocale.language.toLowerCase() +
    "-" +
    selectedLocale.country.toLowerCase();

  const {
    subscribeText,
    linksOne,
    linksTwo,
    linksThree,
    columnOneTitle,
    columnTwoTitle,
    columnThreeTitle,
    bottomLinks,
    legend,
    copyright,
    languageBox,
  } = footer;

  const listLinks = (columnLinks: SanityLink[], title: string) => {
    return (
      <div>
        <h4 className="mb-5 uppercase">{title}</h4>
        <div className="flex flex-col gap-y-[5px]">
          {columnLinks.map((link) => {
            return link._type === "linkExternal" ? (
              <a
                key={link._key}
                href={link.url}
                rel="noreferrer"
                target={link.newWindow ? "_blank" : "_self"}
              >
                {link.title}
              </a>
            ) : link._type === "linkInternal" ? (
              <Link key={link._key} to={link.slug ?? "#"}>
                {link.title}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    );
  };

  return (
    <footer
      className={clsx(
        "overflow-hidden border-[1px] border-[rgba(0,0,0,0.1)] pt-20"
      )}
      role="contentinfo"
      style={{
        background: colorTheme && colorTheme.background,
        color: colorTheme && colorTheme.text,
      }}
    >
      <Section className="relative">
        <div className="col-span-6 flex gap-x-20">
          {listLinks(linksOne, columnOneTitle)}
          {listLinks(linksTwo, columnTwoTitle)}
          {listLinks(linksThree, columnThreeTitle)}
        </div>
        <div className="col-span-6 flex justify-end">
          <div className="flex w-5/6 flex-col gap-y-6">
            <p>{subscribeText}</p>
            <CustomInput
              type="text"
              placeholder="Email"
              submitButton="Subscribe"
            />
          </div>
        </div>
        <div className="col-span-12 mt-[200px] w-full">
          <Legend color={colorTheme ? colorTheme.text : "black"} />
        </div>
        <div className="col-span-12 mt-12 flex items-center justify-between">
          <div className="flex items-center gap-x-10">
            {bottomLinks.map((link: SanityLinkInternal) => {
              return (
                <Link key={link._key} to={langPrefix + link.slug ?? "#"}>
                  {link.title}
                </Link>
              );
            })}
            <CountrySelector
              languageBox={languageBox}
              colorTheme={colorTheme}
            />
          </div>
          <p>{copyright}</p>
        </div>
      </Section>
    </footer>
  );
};
