"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import * as Icons from "@/app/utils/icons";

interface CarouselProps {
  pageCount?: number;
  children: (currentPage: number) => React.ReactNode;
  prevLabel?: string;
  nextLabel?: string;
  dotsAriaLabel?: string;
  pageLabel?: (index: number) => string;
  rightAction?: ReactNode;
}

export default function Carousel({
  pageCount = 3,
  children,
  prevLabel = "Previous",
  nextLabel = "Next",
  dotsAriaLabel = "Carousel pages",
  pageLabel = (i) => `Page ${i + 1}`,
  rightAction,
}: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const goToPage = (targetPage: number) => {
    setCurrentPage((targetPage + pageCount) % pageCount);
  };

  return (
    <div className="w-full">
      <div key={currentPage} className="carousel-fade">
        {children(currentPage)}
      </div>
      <div className="flex items-center justify-between mt-6 md:mt-8 w-full">
        <div className="flex gap-1.5" role="tablist" aria-label={dotsAriaLabel}>
          {Array.from({ length: pageCount }, (_, i) => (
            <button key={i} type="button" role="tab" aria-selected={currentPage === i} aria-label={pageLabel(i)} onClick={() => goToPage(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i ? "bg-[#111B12]/70 cursor-default" : "bg-[#D9D9D9] hover:bg-[#D9D9D9]/80 cursor-pointer"}`} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => goToPage(currentPage - 1)} className="w-10 h-10 rounded-full border border-[#111B12]/50 bg-white flex items-center justify-center text-[#111B12]/70 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer" aria-label={prevLabel}><Icons.CgArrowLeft className="size-5" aria-hidden /></button>
          <button type="button" onClick={() => goToPage(currentPage + 1)} className="w-10 h-10 rounded-full border border-[#111B12]/50 bg-white flex items-center justify-center text-[#111B12]/70 hover:bg-[#436A1F] hover:border-[#436A1F] hover:text-white active:bg-[#648E3E] active:border-[#648E3E] transition-all duration-300 cursor-pointer" aria-label={nextLabel}><Icons.CgArrowRight className="size-5" aria-hidden /></button>
          {rightAction}
        </div>
      </div>
    </div>
  );
}
