"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { assuranceServicePageTranslations } from "@/app/utils/pageAssuranceServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import * as Icons from "@/app/utils/icons";

export default function AssuranceServicePage() {
  const { language } = useLanguage();
  const t = assuranceServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const auditTitle = language === "KOR" ? t.auditTitle.ko : t.auditTitle.en;
  const externalAuditTitle = language === "KOR" ? t.externalAuditTitle.ko : t.externalAuditTitle.en;
  const externalAuditItems = language === "KOR" ? t.externalAuditItems.ko : t.externalAuditItems.en;
  const otherAssuranceTitle = language === "KOR" ? t.otherAssuranceTitle.ko : t.otherAssuranceTitle.en;
  const otherAssuranceItems = language === "KOR" ? t.otherAssuranceItems.ko : t.otherAssuranceItems.en;
  const assuranceServiceIntro = language === "KOR" ? t.assuranceServiceIntro.ko : t.assuranceServiceIntro.en;
  const whatIsExternalAuditTitle = language === "KOR" ? t.whatIsExternalAuditTitle.ko : t.whatIsExternalAuditTitle.en;
  const whatIsExternalAuditDescription = language === "KOR" ? t.whatIsExternalAuditDescription.ko : t.whatIsExternalAuditDescription.en;
  const whatIsOtherAssuranceTitle = language === "KOR" ? t.whatIsOtherAssuranceTitle.ko : t.whatIsOtherAssuranceTitle.en;
  const whatIsOtherAssuranceDescription = language === "KOR" ? t.whatIsOtherAssuranceDescription.ko : t.whatIsOtherAssuranceDescription.en;
  const auditPhilosophyDescription = language === "KOR" ? t.auditPhilosophyDescription.ko : t.auditPhilosophyDescription.en;
  const commonAuditProceduresTitle = language === "KOR" ? t.commonAuditProceduresTitle.ko : t.commonAuditProceduresTitle.en;
  const commonAuditProceduresDescription = language === "KOR" ? t.commonAuditProceduresDescription.ko : t.commonAuditProceduresDescription.en;
  const commonAuditProceduresItems = language === "KOR" ? t.commonAuditProceduresItems.ko : t.commonAuditProceduresItems.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160105303?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full"
            style={{width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)",}} title="Assurance services background" allow="autoplay; fullscreen; picture-in-picture"/>
        </div>
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
      <section className="w-full bg-[#495F2B] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <div>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-white">25+</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Years of Experience</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-white">500+</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Clients Served</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-white">HK</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Focused Practice</span>
            </div>
            <div>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold text-white">Big 4</span>
              <span className="block text-sm md:text-base text-white/70 mt-1">Trained Alumni</span>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 text-justify">
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {assuranceServiceIntro.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What Is External Audit */}
      <section className="w-full pt-12 pb-2 sm:pt-14 sm:pb-3 md:pt-20 md:pb-4 lg:pt-6 xl:pt-6 lg:pb-4 xl:pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
            {whatIsExternalAuditTitle}
          </h3>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {whatIsExternalAuditDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* What Is Other Assurance */}
      <section className="w-full pt-6 pb-4 sm:pt-8 sm:pb-5 md:pt-10 md:pb-6 lg:pt-12 lg:pb-6 xl:pt-16 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
            {whatIsOtherAssuranceTitle}
          </h3>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {whatIsOtherAssuranceDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Services List */}
      <section className="w-full my-8 sm:my-12 md:my-16 lg:my-30 assurance-section-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <div className="flex flex-col items-center md:items-start gap-4 sm:gap-5 lg:gap-6 w-full min-h-[200px] sm:min-h-[280px] md:min-h-[320px] lg:min-h-[440px] justify-center md:justify-start py-8 sm:py-10 md:py-6 lg:py-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-[#000000] text-left w-full max-w-xl mx-auto md:mx-0 md:mr-auto">
              {auditTitle}
            </h2>
            <div className="w-full max-w-xl mx-auto md:mx-0 md:mr-auto text-left">
              <h3 className="text-base font-medium text-[#202020] mb-2 mt-4">
                {externalAuditTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-disc pl-5 marker:text-[#627F38]">
                {externalAuditItems.map((item, i) => (
                  <li key={i} className="leading-relaxed text-base text-[#111B12]">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-medium text-[#202020] mt-6 mb-2">
                {otherAssuranceTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-disc pl-5 marker:text-[#627F38]">
                {otherAssuranceItems.map((item, i) => (
                  <li key={i} className="leading-relaxed text-base text-[#202020]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagram + Philosophy */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-6 sm:gap-8 md:gap-10 lg:gap-0 min-h-[320px] sm:min-h-[380px] md:min-h-[480px] lg:min-h-[560px] items-start">
          <div className="relative w-full min-h-[280px] sm:min-h-[340px] lg:min-h-0 lg:h-full flex items-center justify-center p-0">
            <Image src="/services/au2.svg" alt="Audit and assurance types" fill className="object-contain object-center" sizes="(max-width: 1024px) 100vw, 64vw" />
          </div>
          <div className="w-full flex flex-col justify-center lg:self-center">
            <div className="flex flex-col gap-4 md:gap-5 lg:gap-6 text-base text-[#111B12] leading-relaxed text-justify">
              {auditPhilosophyDescription.split("<br><br>").map((paragraph, i) => (
                <p key={i} className="m-0 text-base text-[#000000]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Audit Procedures */}
      <section className="w-full pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-20 md:pb-6 lg:pt-24 lg:pb-6 xl:pt-30 xl:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] mb-4 md:mb-5 lg:mb-6">
            {commonAuditProceduresTitle}
          </h3>
          <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
            {commonAuditProceduresDescription.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
            <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0 mt-4 md:mt-5 lg:mt-6">
              {commonAuditProceduresItems.map((item, i) => (
                <li key={i} className="flex gap-2 leading-relaxed">
                  <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                  <div className="flex flex-col gap-1 text-base text-[#111B12]">
                    <span className="font-bold">{item.title}</span>
                    <span className="text-justify">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>
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
