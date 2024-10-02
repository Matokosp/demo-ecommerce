import { Localizations } from "~/types/shopify";

export const countries: Localizations = {
  default: {
    language: "EN",
    country: "SE",
    label: "English",
    currency: "SEK",
  },
  "/sv-se": {
    language: "SV",
    country: "SE",
    label: "Swedish",
    currency: "SEK",
  },
};

export const baseLanguage = countries.default.language.toLowerCase();
