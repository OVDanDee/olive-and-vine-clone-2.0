import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { INSIGHT_ROUTES } from "@/app/utils/insightTranslations";
import InsightPageClient from "./InsightPageClient";

interface InsightPageProps {
  params: Promise<{
    locale: string;
    tag: string;
    slug: string;
  }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INSIGHT_ROUTES.map(({ tag, slug }) => ({ locale, tag, slug }))
  );
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { locale, tag, slug } = await params;
  setRequestLocale(locale);
  return <InsightPageClient tag={tag} slug={slug} />;
}
