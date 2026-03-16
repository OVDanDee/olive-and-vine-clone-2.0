"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { getLeadershipProfile } from "@/app/utils/leadershipProfileTranslations";
import * as Icons from "@/app/utils/icons";

interface LeadershipProfilePageProps {
  params: Promise<{ slug: string }>;
}

export default function LeadershipProfilePage({ params }: LeadershipProfilePageProps) {
  const { slug } = use(params);
  return <LeadershipProfilePageClient slug={slug} />;
}

function LeadershipProfilePageClient({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const [imageHovered, setImageHovered] = useState(false);
  const profile = getLeadershipProfile(slug);
  const backToLeadershipEn = "Back to Our Leadership";
  const backToLeadershipKo = "우리 리더십으로 돌아가기";

  if (!profile) {
    return (
      <div className="min-h-screen bg-white">
        <div className="w-full py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 flex flex-col items-start">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-base text-[#111B12] leading-tight">
              {language === "KOR" ? "페이지를 찾을 수 없습니다" : "Page not found"}
            </h2>
            <Link href="/leadership" className="mt-6 text-[#627F38] hover:underline">
              {language === "KOR" ? backToLeadershipKo : backToLeadershipEn}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const name = language === "KOR" ? profile.heroTitle.ko : profile.heroTitle.en;
  const credentials = language === "KOR" ? profile.heroSubtitle.ko : profile.heroSubtitle.en;
  const bio = language === "KOR" ? profile.inBriefDescription.ko : profile.inBriefDescription.en;
  const educationTitle = "educationTitle" in profile ? (language === "KOR" ? profile.educationTitle.ko : profile.educationTitle.en) : null;
  const educationDescription = "educationDescription" in profile ? (language === "KOR" ? profile.educationDescription.ko : profile.educationDescription.en) : null;
  const educationItemsData = "educationItems" in profile ? (profile.educationItems as { en: string[]; ko: string[] }) : null;
  const educationItemsRaw = educationItemsData ? (language === "KOR" ? educationItemsData.ko : educationItemsData.en) : [];
  const educationItemsFallback = educationItemsData ? (language === "KOR" ? educationItemsData.en : educationItemsData.ko) : [];
  const educationItems = Array.isArray(educationItemsRaw) && educationItemsRaw.length > 0 ? educationItemsRaw : educationItemsFallback;
  const professionalCareersTitle = "professionalCareersTitle" in profile ? (language === "KOR" ? profile.professionalCareersTitle.ko : profile.professionalCareersTitle.en) : null;
  const professionalCareersItems = "professionalCareersItems" in profile ? (language === "KOR" ? profile.professionalCareersItems.ko : profile.professionalCareersItems.en) : [];
  const languageTitle = "languageTitle" in profile ? (language === "KOR" ? profile.languageTitle.ko : profile.languageTitle.en) : null;
  const languageItems = "languageItems" in profile ? (language === "KOR" ? profile.languageItems.ko : profile.languageItems.en) : [];
  const keyExperienceTitle = "keyExperienceTitle" in profile ? (language === "KOR" ? profile.keyExperienceTitle.ko : profile.keyExperienceTitle.en) : null;
  const keyExperienceItems = "keyExperienceItems" in profile ? (language === "KOR" ? profile.keyExperienceItems.ko : profile.keyExperienceItems.en) : [];

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <Link href="/leadership" className="inline-flex items-center gap-2 sm:gap-3 md:gap-4 group/link mb-8 sm:mb-10 md:mb-12 min-h-[44px] sm:min-h-0 items-center">
            <span className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] group-hover/link:text-[#627F38] transition-colors">{language === "KOR" ? backToLeadershipKo : backToLeadershipEn}</span>
            <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-11 lg:h-11 rounded-full border border-[#111B12]/50 group-hover/link:border-[#627F38] group-hover/link:bg-[#627F38] transition-all duration-300 flex-shrink-0">
              <Icons.BiSolidChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[#111B12] group-hover/link:text-white transition-colors" />
            </span>
          </Link>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 items-start">
            {"imagePath" in profile && typeof profile.imagePath === "string" ? (
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full flex-shrink-0 mx-auto md:mx-0 overflow-hidden cursor-pointer" onMouseEnter={() => setImageHovered(true)} onMouseLeave={() => setImageHovered(false)}>
                <Image src={"imagePathHover" in profile && typeof profile.imagePathHover === "string" && imageHovered ? profile.imagePathHover : profile.imagePath} alt={name} fill className="object-cover transition-opacity duration-200" style={imageHovered && "imageObjectPositionHover" in profile && typeof profile.imageObjectPositionHover === "string" ? { objectPosition: profile.imageObjectPositionHover } : "imageObjectPosition" in profile && typeof profile.imageObjectPosition === "string" ? { objectPosition: profile.imageObjectPosition } : { objectPosition: "center 32%" }} sizes="(max-width: 768px) 208px, (max-width: 1024px) 256px, 288px"
                />
              </div>
            ) : (
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-[#E5E5E5] flex-shrink-0 mx-auto md:mx-0" />
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-bold text-[#111B12] mb-2 sm:mb-2.5 md:mb-3">
                {name}
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#878787] mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                {credentials}
              </p>
              <p className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify whitespace-pre-line mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                {bio}
              </p>
              {educationTitle != null && (Array.isArray(educationItems) && educationItems.length > 0 ? (
                <>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">
                    {educationTitle}
                  </h3>
                  {educationItems.map((item, i) => (
                    <p key={i} className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-3.5 md:mb-4 last:mb-0 lg:last:mb-8">
                      <span className="inline-block mr-2">•</span>
                      {item}
                    </p>
                  ))}
                </>
              ) : educationDescription != null && educationDescription.trim() !== "" ? (
                <>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">
                    {educationTitle}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                    <span className="inline-block mr-2">•</span>
                    {educationDescription}
                  </p>
                </>
              ) : null)}
              {professionalCareersTitle != null && (
                <>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4">
                    {professionalCareersTitle}
                  </h3>
                  {Array.isArray(professionalCareersItems) && professionalCareersItems.length > 0 && professionalCareersItems.map((item, i) => (
                    <p key={i} className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-3.5 md:mb-4 last:mb-0">
                      <span className="inline-block mr-2">•</span>
                      {item}
                    </p>
                  ))}
                </>
              )}
              {languageTitle != null && (
                <>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    {languageTitle}
                  </h3>
                  {Array.isArray(languageItems) && languageItems.length > 0 && languageItems.map((item, i) => (
                    <p key={i} className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-3.5 md:mb-4 last:mb-0">
                      <span className="inline-block mr-2">•</span>
                      {item}
                    </p>
                  ))}
                </>
              )}
              {keyExperienceTitle != null && (
                <>
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-[24px] xl:text-[24px] font-semibold text-[#627F38] mb-3 sm:mb-3.5 md:mb-4 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                    {keyExperienceTitle}
                  </h3>
                  {Array.isArray(keyExperienceItems) && keyExperienceItems.length > 0 && keyExperienceItems.map((item, i) => (
                    <p key={i} className="text-xs sm:text-sm md:text-base lg:text-[16px] text-[#111B12] leading-relaxed text-justify mb-3 sm:mb-3.5 md:mb-4 last:mb-0">
                      <span className="inline-block mr-2">•</span>
                      {item}
                    </p>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
