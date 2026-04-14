import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Supported locales
  locales: ["en", "ko"] as const,

  // Default locale used when no locale matches (and Accept-Language detection fails)
  defaultLocale: "en",

  // Locale prefix mode:
  //   "always"    → /en/about, /ko/about  (no unprefixed routes — best for SEO)
  //   "as-needed" → /about (default) + /ko/about
  //
  // We use "always" because:
  //   1. Clear hreflang pairing for search engines
  //   2. No ambiguity when both languages target HK/KR markets
  //   3. Root path "/" redirects via middleware based on Accept-Language
  localePrefix: "always",

  // Auto-detect via Accept-Language header on root "/" access, then redirect.
  // Once a user picks a locale via the switcher, the NEXT_LOCALE cookie overrides.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
