"use client";

import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/app/utils/icons";

interface ServiceCard {
  image: string;
  imageWhite: string;
  imageSize: number;
  translationKey: string;
  alt: string;
  href?: string;
}

interface ServiceCardsProps {
  language: string;
  translations: {
    corporate: { title: { en: string; ko: string }; description: { en: string; ko: string } };
    accounting: { title: { en: string; ko: string }; description: { en: string; ko: string } };
    assurance: { title: { en: string; ko: string }; description: { en: string; ko: string } };
    tax: { title: { en: string; ko: string }; description: { en: string; ko: string } };
    service5: { title: { en: string; ko: string }; description: { en: string; ko: string } };
    service6: { title: { en: string; ko: string }; description: { en: string; ko: string } };
  };
}

export default function ServiceCards({ language, translations }: ServiceCardsProps) {
  const services: ServiceCard[] = [
    {
      image: "/home/os-corporate.svg",
      imageWhite: "/home/os-corporate-w.svg",
      imageSize: 80,
      translationKey: "corporate",
      alt: "OS Corporate",
      href: "/corporate-service",
    },
    {
      image: "/home/os-accounting.svg",
      imageWhite: "/home/os-accounting-w.svg",
      imageSize: 80,
      translationKey: "accounting",
      alt: "OS Accounting",
      href: "/accounting-service",
    },
    {
      image: "/home/os-assurance.svg",
      imageWhite: "/home/os-assurance-w.svg",
      imageSize: 80,
      translationKey: "assurance",
      alt: "OS Assurance",
      href: "/assurance-service",
    },
    {
      image: "/home/os-tax.svg",
      imageWhite: "/home/os-tax-w.svg",
      imageSize: 80,
      translationKey: "tax",
      alt: "OS Tax",
      href: "/tax-service",
    },
    {
      image: "/home/os-consulting.svg",
      imageWhite: "/home/os-consulting-w.svg",
      imageSize: 80,
      translationKey: "service5",
      alt: "OS Consulting",
      href: "/consulting-service",
    },
    {
      image: "/home/os-hr.svg",
      imageWhite: "/home/os-hr-w.svg",
      imageSize: 80,
      translationKey: "service6",
      alt: "OS HR",
      href: "/hr-service",
    },
  ];

  const getTranslation = (key: string) => {
    const service = translations[key as keyof typeof translations];
    if (!service) return { title: { en: "", ko: "" }, description: { en: "", ko: "" } };
    return service;
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {services.map((service, index) => {
        const serviceTranslation = getTranslation(service.translationKey);
        const cardClassName = "w-full min-h-[330px] md:min-h-[330px] bg-[#F9F8F4] border border-[#627F38] p-6 flex flex-col hover:bg-[#627F38] hover:rounded-tr-[30px] transition-all duration-300 cursor-pointer group";
        const cardContent = (
          <>
            <div className="flex justify-start mb-4 relative">
              <Image src={service.image} alt={service.alt} width={service.imageSize} height={service.imageSize} className="object-contain group-hover:opacity-0 transition-opacity duration-300"/>
              <Image src={service.imageWhite} alt={service.alt} width={service.imageSize} height={service.imageSize} className="object-contain absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px] text-[#111B12] group-hover:text-white transition-colors pt-8">
              {language === "KOR" ? serviceTranslation.title.ko : serviceTranslation.title.en}
            </h3>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4 md:mt-auto gap-4 md:gap-0">
              <p className="text-base sm:text-lg md:text-xl lg:text-[16px] text-[#111B12]/70 group-hover:text-white leading-relaxed transition-colors" dangerouslySetInnerHTML={{__html: language === "KOR" ? serviceTranslation.description.ko : serviceTranslation.description.en,}}/>
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#111B12]/70 group-hover:border-white group-hover:bg-white flex items-center justify-center transition-colors shrink-0 md:ml-4 self-end md:self-auto">
                <Icons.CgArrowTopRight className="size-6 md:size-8 text-[#111B12]/70 group-hover:text-[#495F2B] transition-colors" />
              </div>
            </div>
          </>
        );
        return service.href ? (
          <Link key={index} href={service.href} className={cardClassName}>
            {cardContent}
          </Link>
        ) : (
          <div key={index} className={cardClassName}>
            {cardContent}
          </div>
        );
      })}
    </div>
  );
}
