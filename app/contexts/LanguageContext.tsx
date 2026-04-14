"use client";

import { createContext, useContext, ReactNode } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

type LanguageContextType = {
  language: "ENG" | "KOR";
  setLanguage: (lang: "ENG" | "KOR") => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // This is now a pass-through provider. Locale provisioning happens in [locale]/layout.tsx via NextIntlClientProvider.
  // We keep this for backward compatibility with existing code that wraps components with LanguageProvider.
  return <>{children}</>;
}

export function useLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  // Convert next-intl locale code ("en"/"ko") to our legacy language constants
  const language: "ENG" | "KOR" = locale === "ko" ? "KOR" : "ENG";

  const setLanguage = (lang: "ENG" | "KOR") => {
    const targetLocale = lang === "KOR" ? "ko" : "en";
    // Push to the same pathname under the new locale
    // useRouter from @/i18n/navigation handles locale prefix automatically
    router.push(pathname, { locale: targetLocale });
  };

  return { language, setLanguage };
}
