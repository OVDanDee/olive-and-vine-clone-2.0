import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale middleware responsibilities:
 *   1. Redirect "/"  →  "/en" or "/ko" based on Accept-Language / NEXT_LOCALE cookie.
 *   2. Validate the [locale] segment; unknown locales fall back to defaultLocale.
 *   3. Rewrite internal requests so the [locale] segment reaches the RSC tree.
 */
export default createMiddleware(routing);

export const config = {
  // Match all request paths EXCEPT:
  //   - /api/*       (API routes should not be localized)
  //   - /_next/*     (Next.js internals)
  //   - /_vercel/*   (Vercel analytics)
  //   - files with an extension (robots.txt, sitemap.xml, favicon.ico, images)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
