import Link from "~/components/elements/Link";

export const Breadcrumb = ({
  paths,
  colorTheme,
}: {
  paths: {
    slug: null | string;
    title: string;
  }[];
  colorTheme?: { background: string; text: string };
}) => {
  return (
    <div
      className="flex gap-x-2 px-[22px] py-10"
      style={{
        backgroundColor: colorTheme?.background,
        color: colorTheme?.text,
      }}
    >
      <Link
        link={{
          _key: "home-link",
          _type: "linkInternal",
          documentType: "",
          slug: "/",
          title: "Home",
        }}
      >
        <p className="flex gap-x-2">
          Home <span>/</span>
        </p>
      </Link>
      <>
        {paths.map((item, idx) =>
          item.slug ? (
            <Link
              key={item.title}
              link={{
                _key: "link" + idx,
                _type: "linkInternal",
                documentType: "",
                slug: item.slug,
                title: item.title,
              }}
            >
              <p className="flex gap-x-2">
                {item.title} <span>/</span>
              </p>
            </Link>
          ) : (
            <p key={item.title} className="flex gap-x-2">
              {item.title} {paths.length !== idx + 1 && <span>/</span>}
            </p>
          )
        )}
      </>
    </div>
  );
};
