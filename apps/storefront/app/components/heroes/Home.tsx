import clsx from "clsx";

import LinkButton from "~/components/elements/LinkButton";
// import HeroContent from "~/components/heroes/HeroContent";
import type { SanityHeroHome } from "~/lib/sanity";

import { BrandBand } from "../elements/Icons";
import { ParallaxText } from "../global/ParallaxText";
import { Section } from "../layout/Section";
// import HeroContent from "./HeroContent";

type Props = {
  hero: SanityHeroHome;
};

export default function HomeHero({ hero }: Props) {
  return (
    <>
      <Section
        style={{
          backgroundImage: hero.heroImage
            ? `url('${hero.heroImage.url}')`
            : "transparent",
        }}
        className={`h-screen items-center bg-cover`}
      >
        <div
          className="h-svh absolute left-1/2 top-0 z-30 col-span-full h-screen -translate-x-2/4 overflow-hidden"
          aria-label="Ode to Strength"
        >
          {hero && (
            <ParallaxText baseVelocity={2}>
              <BrandBand fill="#FBFBF6" />
            </ParallaxText>
          )}
        </div>
        <div className="col-start-10 col-end-13">
          {hero.title && (
            <p className={clsx(`text-body pb-6 text-${hero.color}`, "")}>
              {hero.title}
            </p>
          )}
          {hero.link && (
            <LinkButton
              mode="outline"
              tone={hero.color === "#fff" ? "invert" : "default"}
              link={hero.link}
            />
          )}
        </div>
      </Section>
      <div className="mb-30 mt-20 grid grid-cols-12">
        <div className="col-span-5">
          <p className="indent-[50px]">{hero.textContent}</p>
        </div>
      </div>
    </>
  );
}
