import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useCallback } from "react";

import { Link } from "~/components/Link";
import type { SanityMenuLink } from "~/lib/sanity";
import { toRoman } from "~/lib/utils";

import { Asterisk } from "../elements/Icons";

/**
 * A component that defines the navigation for a web storefront
 */

type Props = {
  menuLinks: SanityMenuLink[];
  handleClose: () => void;
  isOpen: boolean;
};

export default function Navigation({ menuLinks, handleClose, isOpen }: Props) {
  const renderLinks = useCallback(() => {
    return menuLinks?.map((link, idx) => {
      if (link._type === "collectionGroup" && link.productLinks) {
        return (
          <Fragment key={link._key}>
            <ul>
              <li className={clsx("mb-2", idx != 0 ? "mt-10" : "")}>
                <h3 className="inline-flex items-center gap-x-2 font-bold">
                  {idx === 0 ? (
                    link.title
                  ) : idx < 3 ? (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black p-1 text-[10px]">
                      {toRoman(idx)}
                    </span>
                  ) : idx === 3 ? (
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black p-0 text-[10px]">
                      <Asterisk />
                    </span>
                  ) : null}
                  {link.title}
                </h3>
              </li>
              {link.productLinks?.map((element) => {
                return (
                  <li key={element._id} className="mb-2 pl-6">
                    <Link
                      to={`/products/${element.slug}`}
                      onClick={() => handleClose()}
                      className={`function`}
                    >
                      {element.title}
                      {idx === 0 && <sup> Stack</sup>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Fragment>
        );
      }
      if (link._type === "linkExternal") {
        return (
          <div className="flex items-center" key={link._key}>
            <a
              className="linkTextNavigation"
              href={link.url}
              rel="noreferrer"
              target={link.newWindow ? "_blank" : "_self"}
            >
              {link.title}
            </a>
          </div>
        );
      }
      if (link._type === "linkInternal") {
        if (!link.slug) {
          return null;
        }

        return (
          <div className="flex items-center" key={link._key}>
            <Link className="linkTextNavigation" to={link.slug}>
              {link.title}
            </Link>
          </div>
        );
      }

      return null;
    });
  }, [handleClose, menuLinks]);

  return (
    <nav
      className={clsx(
        "NAVIGATION relative hidden items-stretch justify-start gap-6 text-sm font-bold",
        "lg:flex"
      )}
    >
      <div className="relative flex items-center">
        <Transition show={isOpen} unmount={false}>
          <Dialog
            open={isOpen}
            className="z-1 relative"
            onClose={handleClose}
            static
          >
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              unmount={false}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0"
              />
            </Transition.Child>

            {/* Panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
              unmount={false}
            >
              <Dialog.Panel
                onMouseLeave={() => handleClose()}
                className={clsx(
                  "fixed bottom-0 left-[64px] right-0 top-0 flex h-full w-full flex-col overflow-y-auto bg-limestone bg-opacity-95 pl-6 pt-10",
                  "md:bottom-auto md:right-auto md:block md:w-[490px]"
                )}
              >
                {renderLinks()}
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
    </nav>
  );
}
