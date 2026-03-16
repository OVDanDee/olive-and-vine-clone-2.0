"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { corporateServicePageTranslations } from "@/app/utils/pageCorporateServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import * as Icons from "@/app/utils/icons";

export default function CorporateServicePage() {
  const { language } = useLanguage();
  const t = corporateServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const section1Title = language === "KOR" ? t.whatIsCompanySecretary.ko : t.whatIsCompanySecretary.en;
  const section1Items = language === "KOR" ? t.whatIsItems.ko : t.whatIsItems.en;
  const section2Title = language === "KOR" ? t.keyResponsibilities.ko : t.keyResponsibilities.en;
  const section2Items = language === "KOR" ? t.keyResponsibilitiesItems.ko : t.keyResponsibilitiesItems.en;
  const startUpTitle = language === "KOR" ? t.startUp.ko : t.startUp.en;
  const startUpItems = language === "KOR" ? t.startUpItems.ko : t.startUpItems.en;
  const inBusinessTitle = language === "KOR" ? t.inBusiness.ko : t.inBusiness.en;
  const inBusinessItems = language === "KOR" ? t.inBusinessItems.ko : t.inBusinessItems.en;
  const exitTitle = language === "KOR" ? t.exit.ko : t.exit.en;
  const exitItems = language === "KOR" ? t.exitItems.ko : t.exitItems.en;
  const corporateServicesIntro = language === "KOR" ? t.corporateServicesIntro.ko : t.corporateServicesIntro.en;
  const startUpDescription = language === "KOR" ? t.startUpDescription.ko : t.startUpDescription.en;
  const inBusinessDescription = language === "KOR" ? t.inBusinessDescription.ko : t.inBusinessDescription.en;
  const exitDescription = language === "KOR" ? t.exitDescription.ko : t.exitDescription.en;
  const digitalisationTitle = language === "KOR" ? t.digitalisationTitle.ko : t.digitalisationTitle.en;
  const digitalisationDescription = language === "KOR" ? t.digitalisationDescription.ko : t.digitalisationDescription.en;

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160078682?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%" }} title="Corporate services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
            {heroTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-[20px] text-[#FFFFFF]/70 w-full text-center">
            {heroSubtitle}
          </p>
        </div>
      </section>
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
          <span className="text-base text-[#111B12]">
            {corporateServicesIntro}
          </span>
        </div>
      </section>
      <section className="w-full pt-4 pb-12 sm:pt-5 sm:pb-14 md:pt-6 md:pb-20 lg:pt-6 lg:pb-24 xl:pt-6 xl:pb-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                {section1Title}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4">
                {section1Items.map((item, i) => {
                  const colonIdx = item.indexOf(":");
                  const label = colonIdx >= 0 ? item.slice(0, colonIdx + 1) : "";
                  const rest = colonIdx >= 0 ? item.slice(colonIdx + 1).trimStart() : item;
                  return (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="inline-block flex-shrink-0 text-black">•</span>
                      <span className="flex flex-col text-base text-[#111B12]">
                        {label ? (
                          <>
                            <strong className="font-bold">{label}</strong>
                            <span className="font-normal">{rest}</span>
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                {section2Title}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4">
                {section2Items.map((item, i) => {
                  const colonIdx = item.indexOf(":");
                  const label = colonIdx >= 0 ? item.slice(0, colonIdx + 1) : "";
                  const rest = colonIdx >= 0 ? item.slice(colonIdx + 1).trimStart() : item;
                  return (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="inline-block flex-shrink-0 text-black">•</span>
                      <span className="flex flex-col text-base text-[#111B12]">
                        {label ? (
                          <>
                            <strong className="font-bold">{label}</strong>
                            <span className="font-normal">{rest}</span>
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-[12rem] relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src="/services/cs1.svg" alt="" fill className="object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                {startUpTitle}
              </h3>
              <span className="block text-base text-[#111B12] text-justify mb-4 md:mb-5 lg:mb-6">
                {startUpDescription}
              </span>
              <ul className="flex flex-col gap-3 md:gap-4">
                {startUpItems.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="inline-block flex-shrink-0 text-black">•</span>
                    <span className="block text-base text-[#111B12]/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                {inBusinessTitle}
              </h3>
              <span className="block text-base text-[#111B12] text-justify mb-4 md:mb-5 lg:mb-6">
                {inBusinessDescription}
              </span>
              <ul className="flex flex-col gap-3 md:gap-4">
                {inBusinessItems.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="inline-block flex-shrink-0 text-black">•</span>
                    <span className="block text-base text-[#111B12]/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl lg:text-2xl font-medium text-[#111B12] mb-4 md:mb-5 lg:mb-6">
                {exitTitle}
              </h3>
              <span className="block text-base text-[#111B12] text-justify mb-4 md:mb-5 lg:mb-6">
                {exitDescription}
              </span>
              <ul className="flex flex-col gap-3 md:gap-4">
                {exitItems.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="inline-block flex-shrink-0 text-black">•</span>
                    <span className="block text-base text-[#111B12]/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
            {digitalisationTitle}
          </h3>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {digitalisationDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} firstCardAmendment secondCardIncorporation thirdCardCorporateSecretary action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
  );
}
