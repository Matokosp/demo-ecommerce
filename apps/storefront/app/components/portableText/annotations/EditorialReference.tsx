import type { PortableTextMarkComponentProps } from "@portabletext/react";

type Props = PortableTextMarkComponentProps & {
  value?: PortableTextMarkComponentProps["value"] & {
    reference?: string;
  };
  setActiveEditorialRef?: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function EditorialReference({
  children,
  setActiveEditorialRef,
  value,
}: Props) {
  const parsedText = children
    ? children.join("").replace("[", "").replace("]", "")
    : "";

  const handleMouseEnter = () => {
    if (value?._key && setActiveEditorialRef) {
      setActiveEditorialRef(value._key);
    }
  };

  const num = parsedText.match(/\d/g);
  return (
    <>
      <span
        onMouseEnter={() => handleMouseEnter()}
        onMouseLeave={() =>
          setActiveEditorialRef && setActiveEditorialRef(null)
        }
        className="inline-block cursor-pointer [&:hover+span]:opacity-100"
      >
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border-[1px] border-black text-[12px]">
          {num}
        </span>
        &nbsp;
        {children ? parsedText.replace(/\d/g, "") : ""}
      </span>{" "}
    </>
  );
}
