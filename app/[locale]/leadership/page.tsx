"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { leadershipPageTranslations } from "@/app/utils/pageLeadershipUtils";
import * as Icons from "@/app/utils/icons";

export default function Leadership() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-start">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-semibold text-[#495F2B]">
            {language === "KOR" ? leadershipPageTranslations.title.ko : leadershipPageTranslations.title.en}
          </h2>
        </div>
      </section>
      <section className="w-full py-8 sm:py-12 md:py-16 lg:py-24 bg-[#E9E6D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 flex flex-col items-end">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto max-w-full sm:max-w-3xl">
            <Image src="leadership/quote.svg" alt="Quote" width={60} height={60} className="object-contain flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"/>
            <p className="text-base sm:text-base md:text-lg lg:text-xl xl:text-[32px] text-[#111B12] leading-relaxed text-justify w-full sm:w-auto">
              {language === "KOR" ? leadershipPageTranslations.culture.ko : leadershipPageTranslations.culture.en}
            </p>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <Link href="/leadership/rebecca" className="w-full flex flex-row items-center justify-between gap-4 p-6 transition-all duration-300 cursor-pointer group">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[#111B12] mb-2">
                  {language === "KOR" ? leadershipPageTranslations.profiles.rebecca.name.ko : leadershipPageTranslations.profiles.rebecca.name.en}
                </h3>
                <p className="text-sm sm:text-base md:text-[16px] text-[#878787]">
                  {language === "KOR" ? leadershipPageTranslations.profiles.rebecca.qualifications.ko : leadershipPageTranslations.profiles.rebecca.qualifications.en}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/70 group-hover:border-[#627F38] group-hover:bg-[#627F38] flex items-center justify-center transition-colors shrink-0">
                <Icons.CgArrowTopRight className="size-6 md:size-8 text-[#111B12]/70 group-hover:text-white transition-colors" />
              </div>
            </Link>
            <Link href="/leadership/miyoung" className="w-full flex flex-row items-center justify-between gap-4 p-6 transition-all duration-300 cursor-pointer group">
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] text-[#111B12] mb-2">
                  {language === "KOR" ? leadershipPageTranslations.profiles.miyoung.name.ko : leadershipPageTranslations.profiles.miyoung.name.en}
                </h3>
                <p className="text-sm sm:text-base md:text-[16px] text-[#878787]">
                  {language === "KOR" ? leadershipPageTranslations.profiles.miyoung.qualifications.ko : leadershipPageTranslations.profiles.miyoung.qualifications.en}
                </p>
              </div>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/70 group-hover:border-[#627F38] group-hover:bg-[#627F38] flex items-center justify-center transition-colors shrink-0">
                <Icons.CgArrowTopRight className="size-6 md:size-8 text-[#111B12]/70 group-hover:text-white transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
