import { PortableTextBlock } from "@portabletext/types";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

import { Label } from "../global/Label";
import { Expand } from "../icons/Expand";
import { Minimize } from "../icons/Minimize";
import { Section } from "../layout/Section";
import PortableText from "../portableText/PortableText";

type ProductBenefitsProps = {
  benefits: {
    title: string;
    body: PortableTextBlock[];
  }[];
};

export const ProductBenefits = ({ benefits }: ProductBenefitsProps) => {
  const itemRefs = useRef([]);
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const handleOpen = (index: number) => {
    index === isOpen ? setIsOpen(null) : setIsOpen(index);
  };

  useEffect(() => {
    if (itemRefs.current) {
      setIsOpen(0);
    }
  }, [itemRefs]);
  return (
    <Section className="border-b-[1px] border-b-[rgba(0,0,0,0.1)]">
      <div className="col-span-12 py-[160px] text-center">
        <h3 className="mb-20">
          <Label _key={"benefits.title"} />
        </h3>
        {benefits.map((benefit, index: number) => {
          return (
            <div key={benefit.title} className="flex flex-col items-center">
              <button
                onClick={() => handleOpen(index)}
                className={clsx(
                  "flex items-center gap-x-6 duration-200 ease-in-out",
                  isOpen === index ? "opacity-100" : "opacity-30"
                )}
              >
                <h2 className="heading-1">{benefit.title}</h2>
                <div className="relative">
                  {isOpen === index ? (
                    <Minimize color="black" />
                  ) : (
                    <Expand color="black" />
                  )}
                </div>
              </button>
              <div
                className={clsx(
                  "max-h-0 max-w-[600px] overflow-hidden duration-200"
                )}
                style={{
                  maxHeight:
                    isOpen === index
                      ? itemRefs.current[index].offsetHeight
                      : "0px",
                }}
              >
                <span
                  className="block pb-20 pt-10"
                  ref={(el) => (itemRefs.current[index] = el)}
                >
                  <PortableText blocks={benefit.body} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
