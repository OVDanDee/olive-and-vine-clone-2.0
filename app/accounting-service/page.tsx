"use client";

import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { accountingServicePageTranslations } from "@/app/utils/pageAccountingServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import * as Icons from "@/app/utils/icons";

export default function AccountingServicePage() {
  const { language } = useLanguage();
  const t = accountingServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const accountingServiceIntro = language === "KOR" ? t.accountingServiceIntro.ko : t.accountingServiceIntro.en;
  const bookkeepingTitle = language === "KOR" ? t.bookkeepingTitle.ko : t.bookkeepingTitle.en;
  const bookkeepingDescription = language === "KOR" ? t.bookkeepingDescription.ko : t.bookkeepingDescription.en;
  const bookkeepingItems = language === "KOR" ? t.bookkeepingItems.ko : t.bookkeepingItems.en;
  const accountingSectionTitle = language === "KOR" ? t.accountingSectionTitle.ko : t.accountingSectionTitle.en;
  const accountingSectionDescription = language === "KOR" ? t.accountingSectionDescription.ko : t.accountingSectionDescription.en;
  const accountingSectionItems = language === "KOR" ? t.accountingSectionItems.ko : t.accountingSectionItems.en;
  const privateaccountingTitle = language === "KOR" ? t.privateaccountingTitle.ko : t.privateaccountingTitle.en;
  const privateaccountingDescription = language === "KOR" ? t.privateaccountingDescription.ko : t.privateaccountingDescription.en;
  const privateaccountingItems = language === "KOR" ? t.privateaccountingItems.ko : t.privateaccountingItems.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1177226362?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%" }} title="Accounting services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-[#FFFFFF] mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
            {heroTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-[20px] text-[#FFFFFF]/70 w-full text-center">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Stat Strip */}
      <section className="w-full bg-[#495F2B] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">25+</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Years of Experience</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">500+</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Clients Served</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">HK</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Focused Practice</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">Big 4</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Trained Alumni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {accountingServiceIntro.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bookkeeping */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 items-center bg-white pt-6 sm:pt-8 lg:pt-16 xl:pt-30">
        <div className="w-full min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] bg-cover bg-center bg-no-repeat py-16 md:py-24 lg:py-0" style={{ backgroundImage: "url(/services/b1.svg)" }} role="img" aria-label="Bookkeeping" />
        <div className="flex flex-col justify-center py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="max-w-xl">
            <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#000000] mb-4 md:mb-5 lg:mb-6">
              {bookkeepingTitle}
            </h3>
            <span className="block text-base text-[#111B12] text-justify mb-4 md:mb-5 lg:mb-6">
              {bookkeepingDescription}
            </span>
            <ul className="flex flex-col gap-3 md:gap-4">
              {bookkeepingItems.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                  <span className="block text-base text-[#111B12]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accounting */}
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 items-center bg-white">
        <div className="flex flex-col justify-center py-6 sm:py-8 md:py-12 lg:py-16 px-4 sm:px-5 md:px-6 lg:px-8 order-1 lg:order-1">
          <div className="max-w-xl lg:ml-auto">
            <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#000000] mb-4 md:mb-5 lg:mb-6">
              {accountingSectionTitle}
            </h3>
            <span className="block text-base text-[#111B12] text-justify mb-4 md:mb-5 lg:mb-6">
              {accountingSectionDescription}
            </span>
            <ul className="flex flex-col gap-3 md:gap-4">
              {accountingSectionItems.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                  <span className="block text-base text-[#111B12]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full min-h-[280px] sm:min-h-[340px] lg:min-h-[400px] bg-cover bg-center bg-no-repeat order-2 lg:order-2 py-16 md:py-24 lg:py-0" style={{ backgroundImage: "url(/services/a1.svg)" }} role="img" aria-label="Accounting" />
      </section>

      {/* Private Accounting */}
      <section className="w-full bg-[#F5F3E8] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
              {privateaccountingTitle}
            </h3>
            <span className="block text-base text-[#111B12] text-justify mb-6 md:mb-8">
              {privateaccountingDescription}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {privateaccountingItems.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                  <span className="block text-base text-[#111B12]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#495F2B] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4">Ready to Get Started?</h2>
          <p className="text-base lg:text-lg text-white/70 max-w-2xl mx-auto mb-8">Let our experienced team help you navigate your business needs with confidence.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-white text-[#495F2B] font-semibold px-8 py-3 rounded-full hover:bg-[#F5F3E8] transition-colors duration-300">Book a Consultation</a>
        </div>
      </section>

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
  );
}
