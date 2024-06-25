import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, useState } from "react";

import CollectionGroupContent from "~/components/global/collectionGroup/CollectionGroupContent";
import type { SanityCollection, SanityCollectionGroup } from "~/lib/sanity";

export default function CollectionGroupDialog({
  collection,
  collectionGroup,
  handleClose,
  isOpen,
}: {
  collection?: SanityCollection;
  collectionGroup: SanityCollectionGroup;
  handleClose: () => void;
  isOpen: boolean;
}) {
  return (
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
              className={`hola fixed bottom-0 left-[60px] right-0 top-0 flex h-full w-full flex-col overflow-y-auto rounded-r-lg bg-limestone bg-opacity-70 md:bottom-auto md:right-auto md:block md:w-[490px]`}
            >
              <CollectionGroupContent
                collection={collection}
                collectionGroup={collectionGroup}
                onClose={handleClose}
              />
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
}
