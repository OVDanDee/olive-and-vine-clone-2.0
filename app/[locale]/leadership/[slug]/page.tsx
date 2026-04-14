import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { LEADERSHIP_SLUGS } from "@/app/utils/leadershipProfileTranslations";
import LeadershipProfilePageClient from "./LeadershipProfilePageClient";

interface LeadershipProfilePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    LEADERSHIP_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export default async function LeadershipProfilePage({ params }: LeadershipProfilePageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <LeadershipProfilePageClient slug={slug} />;
}
