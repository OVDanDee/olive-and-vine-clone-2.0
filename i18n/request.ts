import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Server-side config loader invoked by next-intl for every request.
 * Reads the requested locale from the URL segment and loads the matching
 * messages/{locale}.json bundle.
 *
 * If the requested locale is not in the supported list, falls back to the
 * default locale rather than throwing — prevents 500s on stale bookmarks.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
