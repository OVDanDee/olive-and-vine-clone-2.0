"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#495F2B] mb-4">404</h1>
        <p className="text-2xl text-[#111B12] mb-8">
          {locale === "ko" ? "ページが見つかりません" : "Page not found"}
        </p>
        <p className="text-lg text-[#627F38] mb-8">
          {locale === "ko"
            ? "申し訳ございませんが、お探しのページは存在しません。"
            : "Sorry, the page you&apos;re looking for doesn&apos;t exist."}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#495F2B] text-white rounded-lg hover:bg-[#495F2B]/90 transition-colors">
          {locale === "ko" ? "ホームに戻る" : "Back to home"}
        </Link>
      </div>
    </div>
  );
}
