"use client";

import Image from "next/image";
import Link from "next/link";

interface CardItem {
  image: string;
  alt: { en: string; ko: string };
  href: string;
  tag: { en: string; ko: string };
  title: { en: string; ko: string };
  description: { en: string; ko: string };
  date: { en: string; ko: string };
}

interface CorporateServiceInsightCardsProps {
  language: string;
  cards: CardItem[];
}

export default function CorporateServiceInsightCards({
  language,
  cards,
}: CorporateServiceInsightCardsProps) {
  const isKo = language === "KOR";

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 min-h-[520px]">
      {cards.map((card, index) => (
        <Link key={index} href={card.href} className="w-full min-h-[500px] md:min-h-[500px] bg-white p-6 flex flex-col hover:bg-[#495F2B]/40 hover:rounded-tr-[300px] transition-all duration-300 cursor-pointer group">
          <div className="w-[calc(100%+3rem)] h-[200px] sm:h-[240px] md:h-[280px] mb-4 relative -mx-6 -mt-6 overflow-hidden group-hover:rounded-tr-[300px] transition-all duration-300">
            <Image src={card.image} alt={isKo ? card.alt.ko : card.alt.en} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            <div className="absolute inset-0 bg-[#495F2B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
          <span className="text-base sm:text-lg md:text-xl lg:text-[16px] text-[#111B12]">
            {isKo ? card.tag.ko : card.tag.en}
          </span>
          <p
            className="text-base text-[24px] text-[#495F2B] leading-tight mt-2 group-hover:underline transition-all duration-300"
            dangerouslySetInnerHTML={{
              __html:
                index === 0
                  ? (isKo
                      ? card.title.ko + "<br />" + card.description.ko
                      : card.title.en + "<br />" + card.description.en)
                  : (isKo ? card.title.ko : card.title.en),
            }}
          />
          <span className="text-base sm:text-lg md:text-xl lg:text-[14px] text-[#8C8C8C] mt-auto">
            {isKo ? card.date.ko : card.date.en}
          </span>
        </Link>
      ))}
    </div>
  );
}
