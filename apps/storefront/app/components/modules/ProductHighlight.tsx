import type { SanityModuleProductHighlight } from "~/lib/sanity";

import LinkButton from "../elements/LinkButton";
import { Section } from "../layout/Section";

export default function InstagramModule({
  module,
}: {
  module: SanityModuleProductHighlight;
}) {
  const { title, backgroundImage, body, textColor, link, order } = module;
  return (
    <Section
      className="relative h-screen grid-flow-dense items-end bg-cover bg-right"
      style={{
        backgroundImage: backgroundImage
          ? `url('${backgroundImage.url}')`
          : "transparent",
      }}
    >
      <div
        className={`absolute top-[40vh] grid w-[33%] grid-cols-4 gap-x-[10px] gap-y-[25px] px-[22px] ${
          order === "right" ? "right-0" : ""
        }`}
      >
        {title.split("|").map((text, i) => (
          <h3
            className={`${
              order !== "right"
                ? i === 1
                  ? "col-start-5"
                  : i === 2
                  ? "col-start-3"
                  : "col-span-5"
                : i === 1
                ? "col-span-5"
                : i === 2
                ? "col-start-4"
                : "col-start-2 col-end-5"
            }`}
            key={text}
          >
            {text}
          </h3>
        ))}
      </div>
      <p
        className={`indent-[50px] ${
          order === "right" ? "col-start-8 col-end-13" : "col-span-5"
        }`}
        style={{ color: textColor }}
      >
        {body}
      </p>
      {link && link._type === "linkInternal" && (
        <div
          className={` ${
            order === "right" ? "col-span-5" : "col-start-8 col-end-13"
          }`}
        >
          <LinkButton layout="spread" link={link} />
        </div>
      )}
    </Section>
  );
}
