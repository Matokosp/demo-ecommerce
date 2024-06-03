import type { SanityModuleHomeArticles } from "~/lib/sanity";

import { Section } from "../layout/Section";

export const HomeArticles = ({
  module,
}: {
  module: SanityModuleHomeArticles;
}) => {
  console.log(module);
  return (
    <Section>
      <div></div>
    </Section>
  );
};
