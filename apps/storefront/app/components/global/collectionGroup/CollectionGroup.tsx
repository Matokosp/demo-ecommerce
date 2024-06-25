import CollectionGroupDialog from "~/components/global/collectionGroup/CollectionGroupDialog";
import type { SanityCollectionGroup } from "~/lib/sanity";

type Props = {
  collectionGroup: SanityCollectionGroup;
  handleClose: () => void;
  isOpen: boolean;
};

export default function CollectionGroup({
  collectionGroup,
  handleClose,
  isOpen,
}: Props) {
  return (
    <CollectionGroupDialog
      isOpen={isOpen}
      handleClose={handleClose}
      collection={collectionGroup.collectionProducts}
      collectionGroup={collectionGroup}
    />
  );
}
