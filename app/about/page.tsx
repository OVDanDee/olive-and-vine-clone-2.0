"use client";

import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";

const aboutSectionCopy = {
  headline: {
    en: "We are only here\nto deliver impactful outcome\nand pragmatic solutions",
    ko: "우리는 오직\n성과와 실용적 해법을\n전달하기 위해 여기 있습니다",
  },
  paragraph: {
    en: "To do so, we believe in power of partnership. We will listen to your voice. We will acknowledge your needs and find a practical solution.",
    ko: "그래서 우리는 협력의 힘을 믿습니다. 귀하의 목소리에 귀 기울이고, 귀하의 필요를 인정하며 실질적인 해결책을 찾겠습니다.",
  },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const headline = language === "KOR" ? aboutSectionCopy.headline.ko : aboutSectionCopy.headline.en;
  const paragraph = language === "KOR" ? aboutSectionCopy.paragraph.ko : aboutSectionCopy.paragraph.en;

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">
            {language === "KOR" ? "회사소개" : "About us"}
          </h2>
        </div>
      </section>

      <section className="relative w-full min-h-[400px] sm:min-h-[480px] md:min-h-[520px] overflow-hidden bg-[#F7F4EC]">
        <Image
          src="/about/bg-about.png"
          alt=""
          fill
          className="object-cover object-left"
          priority
          sizes="100vw"
          quality={95}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-base text-[#111B12] whitespace-pre-line leading-tight mb-4 sm:mb-6">
              {headline}
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-[#333333] leading-relaxed max-w-lg">
              {paragraph}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
