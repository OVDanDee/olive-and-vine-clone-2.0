"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { taxServicePageTranslations } from "@/app/utils/pageTaxServiceUtils";
import { learnMoreTranslations } from "@/app/utils/pageUtils";
import InsightCards from "@/app/components/InsightCards";
import * as Icons from "@/app/utils/icons";

export default function TaxServicePage() {
  const { language } = useLanguage();
  const t = taxServicePageTranslations;
  const heroTitle = language === "KOR" ? t.heroTitle.ko : t.heroTitle.en;
  const heroSubtitle = language === "KOR" ? t.heroSubtitle.ko : t.heroSubtitle.en;
  const taxTitle = language === "KOR" ? t.taxTitle.ko : t.taxTitle.en;
  const profitsTaxTitle = language === "KOR" ? t.profitsTaxTitle.ko : t.profitsTaxTitle.en;
  const profitsTaxItems = language === "KOR" ? t.profitsTaxItems.ko : t.profitsTaxItems.en;
  const salariesTaxTitle = language === "KOR" ? t.salariesTaxTitle.ko : t.salariesTaxTitle.en;
  const salariesTaxItems = language === "KOR" ? t.salariesTaxItems.ko : t.salariesTaxItems.en;
  const taxAdvisoryTitle = language === "KOR" ? t.taxAdvisoryTitle.ko : t.taxAdvisoryTitle.en;
  const taxAdvisoryItems = language === "KOR" ? t.taxAdvisoryItems.ko : t.taxAdvisoryItems.en;
  const taxServiceIntro = language === "KOR" ? t.taxServiceIntro.ko : t.taxServiceIntro.en;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1160897627?autoplay=1&loop=1&muted=1&background=1" className="absolute left-1/2 top-1/2 pointer-events-none w-full h-full min-w-full min-h-full" style={{ width: "max(100%, 177.78vh)", minWidth: "100%", height: "max(100%, 56.25vw)", minHeight: "100%", transform: "translate(-50%, -50%) scale(1.15)" }} title="Tax services background" allow="autoplay; fullscreen; picture-in-picture" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-[1]" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center pb-0 min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[60vh]">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-[96px] font-light text-white mb-2 sm:mb-2.5 md:mb-3 leading-tight text-center w-full px-1 sm:px-0">
            {heroTitle}
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-[20px] text-[#FFFFFF]/70 w-full text-center max-w-2xl sm:max-w-none mx-auto px-1 sm:px-0 leading-relaxed">
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
            {taxServiceIntro.split("<br><br>").map((paragraph, i) => (
              <span key={i} className="block text-base lg:text-lg text-[#111B12] text-justify">
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Services List */}
      <section className="w-full my-6 sm:my-8 md:my-12 lg:my-16 xl:my-30 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(/services/t1.png)" }}>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <div className="flex flex-col items-center md:items-start gap-4 md:gap-5 lg:gap-6 w-full max-w-xl mx-auto md:mx-0 md:mr-auto py-6 sm:py-8 md:py-6 lg:py-8">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#111B12] text-left w-full">
              {taxTitle}
            </h2>
            <div className="w-full text-left">
              <h3 className="text-base font-bold text-[#111B12] mb-2 mt-4">
                {profitsTaxTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {profitsTaxItems.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                    <span className="block text-base text-[#111B12]">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-bold text-[#111B12] mt-6 mb-2">
                {salariesTaxTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {salariesTaxItems.map((item, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed">
                    <span className="inline-block flex-shrink-0 w-2 h-2 rounded-full bg-[#627F38] mt-2"></span>
                    <span className="block text-base text-[#111B12]">{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-base font-bold text-[#111B12] mt-6 mb-2">
                {taxAdvisoryTitle}
              </h3>
              <ul className="flex flex-col gap-3 md:gap-4 list-none pl-0">
                {taxAdvisoryItems.map((item, i) => (
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

      {/* Diagram */}
      <section className="w-full py-6 sm:py-8 md:py-12 lg:py-20 xl:py-28 2xl:py-[18rem] relative overflow-hidden min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[480px] xl:min-h-[560px]">
        <div className="absolute inset-0 w-full h-full z-0">
          <Image src="/services/t2.svg" alt="" fill className="object-contain object-center" />
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
      <section className="w-full py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 2xl:py-[7.5rem] relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start w-full">
          <span className="text-base md:text-lg lg:text-[20px] font-semibold text-[#627F38]">
            {language === "KOR" ? learnMoreTranslations.title.ko : learnMoreTranslations.title.en}
          </span>
          <InsightCards language={language} translations={learnMoreTranslations.card} tagOverride={t.insightTag} action={<Link href="/insights" className="inline-flex items-center gap-1.5 text-sm sm:text-base md:text-[15px] text-[#111B12]/70 leading-relaxed rounded-full border border-[#111B12]/50 px-4 sm:px-5 py-2 sm:py-1.5 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer shrink-0 min-h-[44px] sm:min-h-0 items-center justify-center">{language === "KOR" ? learnMoreTranslations.button.ko : learnMoreTranslations.button.en}<Icons.CgArrowTopRight className="size-4" aria-hidden /></Link>} />
        </div>
      </section>
    </div>
  );
}
