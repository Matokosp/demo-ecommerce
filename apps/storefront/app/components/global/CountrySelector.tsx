import { useFetcher, useLocation } from "@remix-run/react";
import { CartForm } from "@shopify/hydrogen";
import clsx from "clsx";
import { useState } from "react";
import invariant from "tiny-invariant";

import allCountries from "~/data/allCountries.json";
import { countries } from "~/data/countries";
import { DEFAULT_LOCALE } from "~/lib/utils";
import { useRootLoaderData } from "~/root";
import type { Locale } from "~/types/shopify";

import { Chevron } from "../elements/Icons";

type Props = {
  align?: "center" | "left" | "right";
  languageBox: string;
  colorTheme?: { background: string; text: string };
};

export function CountrySelector({ languageBox, colorTheme }: Props) {
  const fetcher = useFetcher();

  const [listboxOpen, setListboxOpen] = useState(false);

  const fetcherLocaleLabel = fetcher?.formData?.get("label") as string;

  const selectedLocale = useRootLoaderData()?.selectedLocale ?? DEFAULT_LOCALE;
  const selectedLocalePrefix = `${selectedLocale?.language}-${selectedLocale?.country}`;
  const { pathname, search } = useLocation();
  const pathWithoutLocale = `${pathname.replace(
    selectedLocale.pathPrefix,
    ""
  )}${search}`;

  const defaultLocale = countries?.["default"];
  const defaultLocalePrefix = defaultLocale
    ? `${defaultLocale?.language}-${defaultLocale?.country}`
    : "";

  const setLocale = (newLocale: Locale) => {
    invariant(newLocale, "newLocale is required");
    const newLocalePrefix = `${newLocale?.language}-${newLocale?.country}`;

    if (newLocalePrefix !== selectedLocalePrefix) {
      const countryUrlPath = getCountryUrlPath({
        countryLocale: newLocale,
        defaultLocalePrefix,
        pathWithoutLocale,
      });

      fetcher.submit(
        {
          cartFormInput: JSON.stringify({
            action: CartForm.ACTIONS.BuyerIdentityUpdate,
            inputs: {
              buyerIdentity: {
                countryCode: newLocale.country,
              },
            },
          }),
          redirectTo: countryUrlPath,
        },
        { method: "post", action: "/cart?index" }
      );
    }
  };

  return (
    <>
      <button
        className="relative z-[10] flex items-center gap-x-[10px]"
        onClick={() => setListboxOpen(!listboxOpen)}
      >
        <p className={clsx(listboxOpen && "text-black")}>
          {fetcherLocaleLabel || selectedLocale.label}
        </p>
        <span className={clsx(listboxOpen && "rotate-180", "duration-300")}>
          <Chevron fill={!listboxOpen ? colorTheme?.text : "black"} />
        </span>
      </button>
      <div
        className={clsx(
          `absolute bottom-0 left-0 z-[5] h-[200px] w-full translate-y-[100%] bg-[rgba(251,251,246,0.98)] p-[22px] duration-300`,
          listboxOpen && "!translate-y-0"
        )}
        style={{
          color: "black",
        }}
      >
        <div className="grid grid-cols-12">
          <p className="col-span-3">{languageBox}</p>
          <div className="col-span-1"></div>
          <Countries setLocale={setLocale} selectedLocale={selectedLocale} />
        </div>
      </div>
    </>
  );
}

export function Countries({
  setLocale,
  selectedLocale,
}: {
  setLocale: (newLocale: Locale) => void;
  selectedLocale: Locale;
}) {
  let availableCountries: { name: string; description: string }[] = [];

  Object.keys(countries).map((countryKey) => {
    const countryLocale = countries[countryKey];
    const arr: { name: string; description: string }[] = [];
    const countryName: { name: string; description: string }[] =
      allCountries.filter((ele) => ele.name === countryLocale.country);
    !arr.includes(countryName[0]) ? arr.push(countryName[0]) : null;

    availableCountries = arr;
  });

  return (
    <>
      <div className="col-span-1 flex flex-col items-start justify-start gap-y-2">
        {Object.keys(countries).map((countryKey) => {
          return (
            <button
              className={clsx(
                "text-body",
                selectedLocale.label !== countries[countryKey].label &&
                  "opacity-30"
              )}
              onClick={() => setLocale(countries[countryKey])}
              key={countries[countryKey].label}
            >
              {countries[countryKey].label}
            </button>
          );
        })}
      </div>
      <div className="col-span-1 flex flex-col items-start justify-start gap-y-2">
        {availableCountries.map((country, i) => (
          <button className={clsx(`text-body`)} key={country.name}>
            {country.description}
          </button>
        ))}
      </div>
    </>
  );
}

function getCountryUrlPath({
  countryLocale,
  defaultLocalePrefix,
  pathWithoutLocale,
}: {
  countryLocale: Locale;
  pathWithoutLocale: string;
  defaultLocalePrefix: string;
}) {
  let countryPrefixPath = "";
  const countryLocalePrefix = `${countryLocale.language}-${countryLocale.country}`;

  if (countryLocalePrefix !== defaultLocalePrefix) {
    countryPrefixPath = `/${countryLocalePrefix.toLowerCase()}`;
  }
  return `${countryPrefixPath}${pathWithoutLocale}`;
}
