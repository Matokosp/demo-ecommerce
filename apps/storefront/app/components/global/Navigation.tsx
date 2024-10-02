import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Link } from "~/components/Link";
import type {
  SanityAssetImage,
  SanityLinkInternal,
  SanityMenuLink,
} from "~/lib/sanity";
import { toRoman } from "~/lib/utils";

import { Asterisk } from "../elements/Icons";
import SanityImage from "../media/SanityImage";

type Props = {
  menuLinks: SanityMenuLink[];
  contentMenu: { title: string; contentLinks: SanityMenuLink[] };
  setIsOpen: React.Dispatch<React.SetStateAction<number | null>>;
  isOpen: number | null;
  navigationLabels: string[];
  allProducts: SanityLinkInternal;
  localePrefix: string;
  menuShipping: string;
  journalImage: SanityAssetImage;
  shopImage: SanityAssetImage;
  sanityDataset: string;
  sanityProjectID: string;
  journalLinks: {
    title: string;
    link: SanityLinkInternal;
  };
  latestArticles: {
    tags: {
      title: string;
      _id: string;
    }[];
    slug: {
      current: string;
    };
    title: string;
    _id: string;
  }[];
};

type NavigationPanelKey = "shop" | "learn";

type NavigationPanel = {
  label: string;
  itemsTitle?: string;
  items: any;
  image: SanityAssetImage;
  endLink?: SanityLinkInternal;
  latestPosts?: {
    posts: Props["latestArticles"];
    title: string;
    endLink: SanityLinkInternal;
  };
};

// Reuse code for AnimatePresence
const animationSettings = (idx = 0, factor = 0, exitDuration = 0) => ({
  initial: { y: 12, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { delay: (idx + 0.1) * factor, type: "linear" },
  },
  exit: {
    y: 12,
    opacity: 0,
    transition: { delay: 0, duration: exitDuration },
  },
});

export default function Navigation({
  menuLinks,
  isOpen,
  setIsOpen,
  contentMenu,
  navigationLabels,
  allProducts,
  localePrefix,
  menuShipping,
  journalImage,
  shopImage,
  sanityDataset,
  sanityProjectID,
  journalLinks,
  latestArticles,
}: Props) {
  const navigationPanels: NavigationPanel[] = [
    {
      label: navigationLabels[1],
      items: menuLinks,
      image: shopImage,
      endLink: allProducts,
    },
    {
      latestPosts: {
        posts: latestArticles,
        title: journalLinks.title,
        endLink: journalLinks.link,
      },
      label: navigationLabels[0],
      itemsTitle: contentMenu.title,
      items: contentMenu.contentLinks,
      image: journalImage,
    },
  ];
  const arrangedMenuItems = (menuItems: SanityMenuLink[]) => {
    return menuItems.map((link, idx) => {
      if (link._type === "collectionGroup" && link.productLinks) {
        return (
          <motion.ul key={link._key}>
            <motion.li
              {...animationSettings(idx, 0.14, 0.01)}
              className={clsx("mb-2", idx != 0 ? "mt-8" : "")}
            >
              <p className="inline-flex items-center gap-x-2">
                {idx === 0 ? null : idx < 3 ? (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black p-1 text-[10px]">
                    {toRoman(idx)}
                  </span>
                ) : idx === 3 ? (
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black p-0 text-[10px]">
                    <Asterisk />
                  </span>
                ) : null}
                {link.title}
              </p>
            </motion.li>
            {link.productLinks?.map((element) => {
              return (
                <motion.li
                  {...animationSettings(idx, 0.14, 0.01)}
                  key={element._id}
                  className="mb-1 pl-6"
                >
                  <Link
                    to={`/products/${element.slug}`}
                    onClick={() => setIsOpen(null)}
                    className={`function text-body`}
                  >
                    {element.title}
                    {idx === 0 && <sup> Stack</sup>}
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        );
      }
      if (link._type === "linkExternal") {
        return (
          <motion.div
            {...animationSettings(idx, 0.12, 0.01)}
            className="flex items-center"
            key={link._key}
          >
            <a
              href={link.url}
              rel="noreferrer"
              target={link.newWindow ? "_blank" : "_self"}
              onClick={() => setIsOpen(null)}
            >
              {link.title}
            </a>
          </motion.div>
        );
      }
      if (link._type === "linkInternal") {
        if (!link.slug) {
          return null;
        }

        return (
          <motion.div
            {...animationSettings(idx, 0.14, 0.01)}
            className="flex items-center pl-6"
            key={link._key}
          >
            <Link to={link.slug} onClick={() => setIsOpen(null)}>
              {link.title}
            </Link>
          </motion.div>
        );
      }
      return null;
    });
  };

  const navigationImage = (image: SanityAssetImage, key: number) => {
    return (
      <motion.div
        {...animationSettings(0, 0.1, 0.01)}
        key={key}
        className="relative h-[40vw] w-[40vw] bg-black"
      >
        <SanityImage
          crop={image.crop}
          dataset={sanityDataset}
          hotspot={image.hotspot}
          layout="responsive"
          projectId={sanityProjectID}
          sizes={["40vw"]}
          width={1}
          height={1}
          src={image.asset?._ref}
          className={"absolute left-0 top-0 h-full w-full"}
        />
      </motion.div>
    );
  };

  return (
    <nav
      className={clsx(
        "fixed left-[0] top-0 z-[-1] h-full w-auto translate-x-[-100%] justify-start gap-6 bg-limestone bg-opacity-95 py-10 pl-6 pr-10 duration-500",
        isOpen !== null && "translate-x-[63px]",
        "lg:flex"
      )}
    >
      <AnimatePresence initial={false}>
        <div
          className={clsx(
            "flex flex-col overflow-y-auto duration-700",
            "md:bottom-auto md:right-auto md:w-auto md:min-w-[460px]"
          )}
        >
          {isOpen !== null && navigationPanels[isOpen].latestPosts && (
            <>
              <motion.p {...animationSettings()} className="mb-2">
                {navigationPanels[isOpen].latestPosts?.title}
              </motion.p>
              <motion.ul className="flex flex-col gap-y-6 pl-6">
                {navigationPanels[isOpen].latestPosts?.posts.map(
                  (post, idx) => {
                    return (
                      <motion.li
                        {...animationSettings(idx, 0.12, 0.01)}
                        key={post._id}
                        className="max-w-[70%]"
                      >
                        <Link
                          to={"/article/" + post.slug.current}
                          onClick={() => setIsOpen(null)}
                        >
                          <p dangerouslySetInnerHTML={{ __html: post.title }} />
                          <div className="mt-2 flex items-center justify-start gap-x-2">
                            {post.tags.map((tag) => {
                              return (
                                <span
                                  key={tag._id}
                                  className="text-body border-[1px] border-black px-[6px] py-[2px]"
                                >
                                  {tag.title}
                                </span>
                              );
                            })}
                          </div>
                        </Link>
                      </motion.li>
                    );
                  }
                )}
              </motion.ul>
              <motion.div
                {...animationSettings(
                  navigationPanels[isOpen].latestPosts?.posts.length,
                  0.14,
                  0.01
                )}
                className="mb-8 mt-10 flex items-center"
                key={navigationPanels[isOpen].latestPosts?.endLink._key}
              >
                <Link
                  onClick={() => setIsOpen(null)}
                  to={navigationPanels[isOpen].latestPosts?.endLink.slug}
                >
                  {navigationPanels[isOpen].latestPosts?.endLink.title}
                </Link>
              </motion.div>
            </>
          )}
          {isOpen !== null && navigationPanels[isOpen].itemsTitle && (
            <motion.p {...animationSettings(0, 0.2, 0.14)} className="mb-2">
              {navigationPanels[isOpen].itemsTitle}
            </motion.p>
          )}
          {isOpen !== null
            ? arrangedMenuItems(navigationPanels[isOpen].items)
            : null}
          {isOpen !== null && navigationPanels[isOpen].endLink && (
            <motion.div
              {...animationSettings(menuLinks.length, 0.14, 0.1)}
              className="mt-auto flex items-center"
            >
              <Link
                onClick={() => setIsOpen(null)}
                to={navigationPanels[isOpen].endLink?.slug}
              >
                {navigationPanels[isOpen].endLink?.title}
              </Link>
            </motion.div>
          )}
        </div>
        <div className="flex flex-col items-end justify-between" key="second">
          {isOpen !== null &&
            navigationImage(navigationPanels[isOpen].image, isOpen)}
          {menuShipping && <p>{menuShipping}</p>}
        </div>
      </AnimatePresence>
    </nav>
  );
}
