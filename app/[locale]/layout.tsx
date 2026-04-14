import { ReactNode } from "react";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import PageTitle from "@/app/components/PageTitle";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const CANONICAL_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://test.oliveandvinehk.com"
).replace(/\/$/, "");

const localeMetadata: Record<string, { title: string; description: string }> = {
  en: {
    title: "Olive & Vine | Accounting and Advisory Solutions",
    description: "Olive & Vine provides accounting and advisory solutions to businesses in Hong Kong.",
  },
  ko: {
    title: "올리브 & 바인 | 회계 및 자문 솔루션",
    description: "올리브 & 바인은 홍콩 기업을 위한 회계 및 자문 솔루션을 제공합니다.",
  },
};

export async function generateMetadata({
  params,
}: Readonly<LocaleLayoutProps>): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const meta = localeMetadata[locale as keyof typeof localeMetadata] || localeMetadata.en;

  return {
    metadataBase: new URL(CANONICAL_ORIGIN),
    title: {
      default: meta.title,
      template: `%s | Olive & Vine`,
    },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: `${CANONICAL_ORIGIN}/en`,
        ko: `${CANONICAL_ORIGIN}/ko`,
        "x-default": `${CANONICAL_ORIGIN}/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering by calling setRequestLocale
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <PageTitle />
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </NextIntlClientProvider>
  );
}
