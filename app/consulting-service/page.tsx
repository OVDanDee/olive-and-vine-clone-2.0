"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { consultingServicePageTranslations } from "@/app/utils/pageConsultingServiceUtils";
import { learnMoreTranslations, statStripTranslations, ctaTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import * as Icons from "@/app/utils/icons";

export default function ConsultingServicePage() {
  const { language } = useLanguage();
  const t = consultingServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const sectionTitle = language === "KOR" ? t.sectionTitle.ko : t.sectionTitle.en;
  const internalTitle = language === "KOR" ? t.internalTitle.ko : t.internalTitle.en;
  const internalItems = language === "KOR" ? t.internalItems.ko : t.internalItems.en;
  const hrServiceTitle = language === "KOR" ? t.hrServiceTitle.ko : t.hrServiceTitle.en;
  const hrServiceItems = language === "KOR" ? t.hrServiceItems.ko : t.hrServiceItems.en;
  const othersTitle = language === "KOR" ? t.othersTitle.ko : t.othersTitle.en;
  const othersItems = language === "KOR" ? t.othersItems.ko : t.othersItems.en;
  const innovatingTitle = language === "KOR" ? t.innovatingTitle.ko : t.innovatingTitle.en;
  const consultingServiceIntro = language === "KOR" ? t.consultingServiceIntro.ko : t.consultingServiceIntro.en;
  const methodologyTitle = language === "KOR" ? t.methodologyTitle.ko : t.methodologyTitle.en;
  const methodologyDescription = language === "KOR" ? t.methodologyDescription.ko : t.methodologyDescription.en;
  const methodologyItems = language === "KOR" ? t.methodologyItems.ko : t.methodologyItems.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1177226397?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)" }} title="Consulting services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full">
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
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">{language === "KOR" ? statStripTranslations.yearsValue.ko : statStripTranslations.yearsValue.en}</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">{language === "KOR" ? statStripTranslations.yearsLabel.ko : statStripTranslations.yearsLabel.en}</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">{language === "KOR" ? statStripTranslations.clientsValue.ko : statStripTranslations.clientsValue.en}</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">{language === "KOR" ? statStripTranslations.clientsLabel.ko : statStripTranslations.clientsLabel.en}</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">{language === "KOR" ? statStripTranslations.hkValue.ko : statStripTranslations.hkValue.en}</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">{language === "KOR" ? statStripTranslations.hkLabel.ko : statStripTranslations.hkLabel.en}</span>
            </div>
            <div>
              <span className="block text-xl md:text-2xl lg:text-3xl font-bold text-white">{language === "KOR" ? statStripTranslations.big4Value.ko : statStripTranslations.big4Value.en}</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">{language === "KOR" ? statStripTranslations.big4Label.ko : statStripTranslations.big4Label.en}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {consultingServiceIntro.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="w-full my-8 sm:my-12 md:my-16 lg:my-30 consulting-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-5 lg:gap-6 w-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[440px] justify-center md:justify-start py-8 sm:py-10 md:py-6 lg:py-[8rem]">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] text-left w-full max-w-xl mx-auto md:mx-0 md:mr-auto">
              {sectionTitle}
            </h2>
            <div className="w-full max-w-xl mx-auto md:mx-0 md:mr-auto text-left">
              <h3 className="text-base font-bold text-[#111B12] mt-6 mb-2">
                {internalTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {internalItems.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                    <span className="block text-base text-[#111B12]">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-bold text-[#111B12] mt-6 mb-2">
                {hrServiceTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {hrServiceItems.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                    <span className="block text-base text-[#111B12]">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-bold text-[#111B12] mt-6 mb-2">
                {othersTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {othersItems.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                    <span className="block text-base text-[#111B12]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section — clean cream bg */}
      <section className="w-full py-16 sm:py-20 lg:py-24 bg-[#F5F3E8] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start text-left w-full">
          <Image src="/services/q2.svg" alt="" width={120} height={120} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] object-contain mb-4 sm:mb-6 self-start" aria-hidden />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[48px] font-light text-[#111B12] max-w-3xl leading-tight text-center mx-auto" dangerouslySetInnerHTML={{ __html: innovatingTitle }} />
          <Image src="/services/q1.svg" alt="" width={120} height={120} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[120px] lg:h-[120px] object-contain mt-4 sm:mt-6 self-end" aria-hidden />
        </div>
      </section>

      {/* Methodology */}
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
            {methodologyTitle}
          </h3>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {methodologyDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 mt-4 md:mt-5 lg:mt-6">
              {methodologyItems.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="block text-lg md:text-xl lg:text-2xl font-bold text-[#111B12]">{item.title}</span>
                  <span className="block text-base text-[#111B12] leading-relaxed text-justify">{item.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="h-12 sm:h-16 md:h-20 lg:h-24 bg-white" />
      <section className="w-full bg-[#495F2B] py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white mb-4">{language === "KOR" ? ctaTranslations.heading.ko : ctaTranslations.heading.en}</h2>
          <p className="text-base lg:text-lg text-white/70 max-w-2xl mx-auto mb-8">{language === "KOR" ? ctaTranslations.description.ko : ctaTranslations.description.en}</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-white text-[#495F2B] font-semibold px-8 py-3 rounded-full hover:bg-[#F5F3E8] transition-colors duration-300">{language === "KOR" ? ctaTranslations.button.ko : ctaTranslations.button.en}</a>
        </div>
      </section>

      {/* Insights */}
      <section className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} secondPageFirstCardBigDataDriven secondPageSecondCardDigitalTransformationTVP secondPageThirdCardLegalConsiderationsMA action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-5 py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
  );
}
