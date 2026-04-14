import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation helpers.
 *
 * Use these INSTEAD of next/link, next/navigation's useRouter, etc., anywhere
 * you build links or programmatic navigation. They automatically preserve the
 * active locale prefix.
 *
 * Example:
 *   import { Link } from "@/i18n/navigation";
 *   <Link href="/about">About</Link>   // resolves to /en/about or /ko/about
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
