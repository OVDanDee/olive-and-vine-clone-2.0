"use client";

import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";

const ourCultureCopy = {
  heading: { en: "Our Culture", ko: "우리의 문화" },
  title: {
    en: "We focus on long term continual growth",
    ko: "우리는 장기적이고 지속적인 성장에 집중합니다",
  },
  paragraph: {
    en: "We will involve you in every step of our way to understand your way and provide professional service to help empowering you and your business. We are here to grow with you.",
    ko: "귀하의 방식을 이해하고, 귀하와 귀하의 비즈니스에 힘을 실어줄 전문 서비스를 제공하기 위해 우리는 모든 단계에 귀하를 참여시킵니다. 우리는 귀하와 함께 성장하기 위해 여기 있습니다.",
  },
};

const whatSetsUsApartCopy = {
  subtitle: { en: "What Sets Us Apart", ko: "우리를 다르게 만드는 것" },
  title: {
    en: "We deliver empowering solutions with professionalism and care",
    ko: "우리는 전문성과 배려로 역량을 높이는 솔루션을 제공합니다",
  },
};

export default function OurValuesPage() {
  const { language } = useLanguage();
  const heading = language === "KOR" ? ourCultureCopy.heading.ko : ourCultureCopy.heading.en;
  const title = language === "KOR" ? ourCultureCopy.title.ko : ourCultureCopy.title.en;
  const paragraph = language === "KOR" ? ourCultureCopy.paragraph.ko : ourCultureCopy.paragraph.en;
  const setsApartSubtitle = language === "KOR" ? whatSetsUsApartCopy.subtitle.ko : whatSetsUsApartCopy.subtitle.en;
  const setsApartTitle = language === "KOR" ? whatSetsUsApartCopy.title.ko : whatSetsUsApartCopy.title.en;

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full pt-12 md:pt-24 pb-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">{language === "KOR" ? "우리의 가치" : "Our Values"}</h2>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
            <div className="relative w-full lg:max-w-[420px] xl:max-w-[480px] flex-shrink-0 aspect-[3/4] max-h-[280px] sm:max-h-[360px] lg:max-h-[520px] mx-auto lg:mx-0">
              <Image src="/value/bg-value.png" alt="" fill className="object-contain object-center lg:object-left" sizes="(max-width: 1024px) 100vw, 480px" quality={95} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] md:text-base font-semibold text-[#495F2B] mb-2 sm:mb-3">{heading}</p>
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-bold text-[#111B12] leading-tight mb-3 sm:mb-4 md:mb-6">{title}</h4>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#333333] leading-relaxed max-w-xl">{paragraph}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <p className="text-[14px] md:text-base font-semibold text-[#495F2B] mb-2 sm:mb-3">{setsApartSubtitle}</p>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-bold text-[#111B12] leading-tight max-w-3xl">{setsApartTitle}</h3>
        </div>
      </section>
    </div>
  );
}
