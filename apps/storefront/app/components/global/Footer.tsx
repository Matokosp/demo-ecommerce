import clsx from "clsx";

import SanityFooter from "~/components/global/SanityFooter";
import LogoIcon from "~/components/icons/Logo";
import { Link } from "~/components/Link";
import PortableText from "~/components/portableText/PortableText";
import type { SanityLink } from "~/lib/sanity";
import { useRootLoaderData } from "~/root";

import { Legend } from "../elements/Icons";
import { Section } from "../layout/Section";

/**
 * A component that specifies the content of the footer on the website
 */
export default function Footer() {
  const { layout } = useRootLoaderData();
  const { footer } = layout || {};

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
  } = footer;

  const listLinks = (columnLinks: SanityLink[], title: string) => {
    return (
      <div>
        <h4>{title}</h4>
        {columnLinks.map((link) => {
          return link._type === "linkExternal" ? (
            <div className="mb-6" key={link._key}>
              <a
                className="linkTextNavigation"
                href={link.url}
                rel="noreferrer"
                target={link.newWindow ? "_blank" : "_self"}
              >
                {link.title}
              </a>
            </div>
          ) : link._type === "linkInternal" ? (
            <div className="mb-6" key={link._key}>
              {/* <Link className="linkTextNavigation" to={link.slug}>
                {link.title}
              </Link> */}
            </div>
          ) : null;
        })}
      </div>
    );
  };

  // const renderLinks = footer?.linksOne?.map((link: SanityLink) => {
  //   if (link._type === "linkExternal") {
  //     return (
  //       <div className="mb-6" key={link._key}>
  //         <a
  //           className="linkTextNavigation"
  //           href={link.url}
  //           rel="noreferrer"
  //           target={link.newWindow ? "_blank" : "_self"}
  //         >
  //           {link.title}
  //         </a>
  //       </div>
  //     );
  //   }
  //   if (link._type === "linkInternal") {
  //     if (!link.slug) {
  //       return null;
  //     }

  //     return (
  //       <div className="mb-6" key={link._key}>
  //         <Link className="linkTextNavigation" to={link.slug}>
  //           {link.title}
  //         </Link>
  //       </div>
  //     );
  //   }
  //   return null;
  // });

  return (
    <footer
      className="mt-20 border-[1px] border-[rgba(0,0,0,0.1)] pl-16 pt-20"
      role="contentinfo"
    >
      <Section>
        <div className="col-span-6 flex gap-x-20">
          {listLinks(linksOne, columnOneTitle)}
          {listLinks(linksTwo, columnTwoTitle)}
          {listLinks(linksThree, columnThreeTitle)}
        </div>
        <div className="col-span-6 flex justify-end">
          <div className="flex w-5/6 flex-col gap-y-6">
            <p>{subscribeText}</p>
            <input type="text" />
          </div>
        </div>
        <div className="col-span-12 mt-[200px] w-full">
          <Legend />
          {/* <h3 className="text-[calc(9.5vw+0.3rem)]">{legend}</h3> */}
        </div>
        <div className="col-span-12 mt-12">
          {/* {bottomLinks.map((link) => {
            return;
          })} */}
        </div>
      </Section>
    </footer>
  );
}
