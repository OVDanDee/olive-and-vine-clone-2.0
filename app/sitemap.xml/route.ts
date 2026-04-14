import { INSIGHT_PAGES } from "@/app/utils/dynamicPageConfig";

// Use canonical production URL for sitemap so Search Console accepts it (never use Vercel deployment URL)
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://test.oliveandvinehk.com";

const root = baseUrl.replace(/\/$/, "");

const staticRoutes = [
  "",
  "/services",
  "/contact",
  "/about",
  "/our-values",
  "/subscribe",
  "/insights",
  "/accounting-service",
  "/assurance-service",
  "/consulting-service",
  "/corporate-service",
  "/tax-service",
  "/hr-service",
  "/leadership",
  "/leadership/rebecca",
  "/leadership/miyoung",
];

const locales = ["en", "ko"];

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = new Date().toISOString();
  const urls: string[] = [];

  for (const path of staticRoutes) {
    // Add entries for each locale
    for (const locale of locales) {
      const url = `${root}/${locale}${path}`;
      const isHomepage = path === "" && locale === "en";
      const isHighPriority = path === "" || path === "/services" || path === "/contact";
      const changefreq = isHighPriority ? "weekly" : "monthly";
      const priority = isHomepage ? "1.0" : isHighPriority ? "0.9" : "0.8";

      urls.push(
        `  <url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
      );
    }
  }

  for (const key of Object.keys(INSIGHT_PAGES)) {
    // Add insight entries for each locale
    for (const locale of locales) {
      const url = `${root}/${locale}/insights/${key}`;
      urls.push(
        `  <url><loc>${escapeXml(url)}</loc><lastmod>${now}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`
      );
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
