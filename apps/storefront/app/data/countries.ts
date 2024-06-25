import { Localizations } from "~/types/shopify";

export const countries: Localizations = {
  default: {
    language: "EN",
    country: "SE",
    label: "English (SEK kr)",
    currency: "SEK",
  },
  "/sv-se": {
    language: "SV",
    country: "SE",
    label: "Sweden (SEK kr)",
    currency: "SEK",
  },
};

export const baseLanguage = countries.default.language.toLowerCase();
