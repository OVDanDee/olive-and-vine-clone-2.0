import {
  getDynamicPageEntry,
  INSIGHT_TAG_SERVICE_KEY,
  INSIGHTS_PATH_LABELS,
} from "./dynamicPageConfig";
import { getLeadershipProfile } from "./leadershipProfileTranslations";

export const getPageName = (pathname: string): string => {
  if (pathname === "/") return "Home";
  const parts = pathname.slice(1).split("/");
  return parts.map((part, index) => {
    if (index === 0) {
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }
    return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  }).join("/");
};

const pageTranslations: Record<string, { en: string; ko: string }> = {
  Home: { en: "Home", ko: "홈" },
  About: { en: "About us", ko: "회사소개" },
  "About us": { en: "About us", ko: "회사소개" },
  "Our-values": { en: "Our values", ko: "우리의 가치" },
  Leadership: { en: "Leadership", ko: "리더십" },
  Services: { en: "Services", ko: "서비스" },
  "Corporate-service": { en: "Corporate Service", ko: "기업 서비스" },
  "Accounting-service": { en: "Accounting", ko: "회계" },
  "Assurance-service": { en: "Assurance", ko: "보증" },
  "Tax-service": { en: "Tax", ko: "세무" },
  "Consulting-service": { en: "Consulting", ko: "컨설팅" },
  "Hr-service": { en: "HR", ko: "인사" },
  Insights: { en: "Insights", ko: "인사이트" },
  Contact: { en: "Contact", ko: "고객지원" },
};

function getServiceTitleByKey(tagKey: string, language: string): string | null {
  const entry = servicesTranslations[tagKey as keyof typeof servicesTranslations];
  if (!entry || typeof entry !== "object" || !("title" in entry)) return null;
  const title = (entry as { title: { en: string; ko: string } }).title;
  return language === "KOR" ? title.ko : title.en;
}

function buildInsightPathSegments(
  pathname: string,
  language: string
): string[] | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length < 1 || raw[0].toLowerCase() !== "insights") return null;
  const lang = language === "KOR" ? "ko" : "en";
  const insightsLabel = INSIGHTS_PATH_LABELS[lang];
  return [insightsLabel];
}

const leadershipLabel = pageTranslations["Leadership"];

function getLeadershipDocumentTitle(pathname: string, language: string): string | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length === 0 || raw[0].toLowerCase() !== "leadership") return null;
  const title = language === "KOR" ? leadershipLabel.ko : leadershipLabel.en;
  if (raw.length === 1) return title;
  const slug = raw[1];
  const profile = getLeadershipProfile(slug);
  if (!profile) return null;
  const name = language === "KOR" ? profile.heroTitle.ko : profile.heroTitle.en;
  return `${name} - ${title}`;
}

function getLeadershipPathSegments(pathname: string, language: string): string[] | null {
  const raw = pathname.replace(/^\//, "").split("/");
  if (raw.length === 0 || raw[0].toLowerCase() !== "leadership") return null;
  const label = language === "KOR" ? leadershipLabel.ko : leadershipLabel.en;
  return [label];
}

export const getDocumentPageName = (pathname: string, language: string): string => {
  const entry = getDynamicPageEntry(pathname);
  if (entry) {
    return language === "KOR" ? entry.documentTitle.ko : entry.documentTitle.en;
  }
  const segments = buildInsightPathSegments(pathname, language);
  if (segments) {
    return segments.join(" - ");
  }
  const leadershipTitle = getLeadershipDocumentTitle(pathname, language);
  if (leadershipTitle) return leadershipTitle;
  const pageName = getPageName(pathname);
  const translation = pageTranslations[pageName];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return pageName;
};

export const getMenuLabel = (label: string, language: string): string => {
  const translation = pageTranslations[label];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return label;
};

export const getTranslatedPageName = (pathname: string, language: string): string => {
  const insightSegments = buildInsightPathSegments(pathname, language);
  if (insightSegments) {
    return insightSegments.join("/");
  }
  const leadershipSegments = getLeadershipPathSegments(pathname, language);
  if (leadershipSegments) {
    return leadershipSegments.join("/");
  }
  const entry = getDynamicPageEntry(pathname);
  if (entry) {
    const segs = language === "KOR" ? entry.pathSegments.ko : entry.pathSegments.en;
    return segs.join("/");
  }
  const pageName = getPageName(pathname);
  const translation = pageTranslations[pageName];
  if (translation) {
    return language === "KOR" ? translation.ko : translation.en;
  }
  return pageName;
};

export const aboutUsTranslations = {
  title: {
    en: "About Us",
    ko: "회사소개",
  },
  description: {
    en: "Delivers pragmatic accounting and advisory solutions, providing clarity, compliance, and actionable insight for businesses.",
    ko: "명확성, 규정 준수 및 실행 가능한 통찰을 제공하여 실용적인 회계 및 자문 솔루션을 제공해 드립니다.",
  },
};

export const integrityTranslations = {
  title: {
    en: "Integrity",
    ko: "무결성",
  },
  words: {
    en: ["Integrity", "Partnership", "Clarity"],
    ko: ["무결성", "파트너십", "명확성"],
  },
  description: {
    en: "Trust is built through consistent professionalism and open partnership. At Olive & Vine, integrity guides every step—clear<br />communication, transparent processes, and a steadfast commitment to the client's success.",
    ko: "일관된 전문성과 개방적인 파트너십을 통해 신뢰가 구축됩니다. Olive & Vine에서는 무결성이 모든 단계를 이끌어 주며, 명확한 소통, 투명한 과정 및 고객의 성공을 위한 확고한 약속을 지켜 드립니다.",
  },
};

export const portfolioTranslations = {
  title: {
    en: "Portfolio",
    ko: "포트폴리오",
  },
  heading: {
    en: "Our\nClients",
    ko: "우리의\n고객",
  },
};

export const learnMoreTranslations = {
  title: {
    en: "Learn More",
    ko: "더 알아보기",
  },
  heading: {
    en: "Featured news\n& Insights",
    ko: "주요 뉴스\n및 인사이트",
  },
  button: {
    en: "All insights",
    ko: "모든 인사이트",
  },
  card: {
    title: {
      en: "Consulting",
      ko: "컨설팅",
    },
    description: {
      en: "2025 Outlook<br />Looking to the Future",
      ko: "2025 전망<br />미래를 바라보며",
    },
    date: {
      en: "January 2025",
      ko: "2025년 1월",
    },
  },
};

export const questionsTranslations = {
  title: {
    en: "We're here<br />to answer<br />any questions",
    ko: "궁금하신 점이 있으시면<br />언제든<br />문의해 주세요",
  },
  form: {
    name: {
      en: "Name",
      ko: "이름",
    },
    contactNumber: {
      en: "Contact Number",
      ko: "연락처",
    },
    email: {
      en: "Email",
      ko: "이메일",
    },
    title: {
      en: "Title",
      ko: "제목",
    },
    message: {
      en: "Message",
      ko: "메시지",
    },
  },
  button: {
    en: "Send message",
    ko: "메시지 보내기",
  },
};

export const complianceTranslations = {
  title: {
    en: "Compliance & Ethics Notice:",
    ko: "규정 준수 및 윤리 고지:",
  },
  description: {
    en: "Olive & Vine is committed to the highest standards of integrity, confidentiality, and regulatory compliance. All services are delivered in accordance with Hong Kong law and professional codes of conduct. The information provided on this website is for general guidance only and does not constitute legal or professional advice. For tailored advice, please contact our team directly.",
    ko: "Olive & Vine는 무결성, 기밀성 및 규정 준수의 최고 기준에 전념합니다. 모든 서비스는 홍콩 법률 및 전문 행동 강령에 따라 제공됩니다. 본 웹사이트의 정보는 일반적인 참고용으로만 제공되며, 법적 또는 전문 자문을 대체하지 않습니다. 맞춤형 자문이 필요하시면 당사에 직접 문의하시기 바랍니다.",
  },
};

export const heroWords = {
  en: ["Building", "Empowering", "Partnerships"],
  ko: ["구축", "역량 강화", "파트너십"],
};

export const servicesTranslations = {
  title: {
    en: "Expertise",
    ko: "전문성",
  },
  heading: {
    en: "Our\nServices",
    ko: "우리의\n서비스",
  },
  button: {
    en: "All services",
    ko: "모든 서비스",
  },
  corporate: {
    title: {
      en: "Corporate Service",
      ko: "기업 서비스",
    },
    description: {
      en: "Company secretarial and statutory compliance for smooth business operations from incorporation to ongoing governance.",
      ko: "회사 비서 및 법정 규정 준수로 설립부터 지속적인 거버넌스까지 원활한 비즈니스 운영을 지원해 드립니다.",
    },
  },
  accounting: {
    title: {
      en: "Accounting",
      ko: "회계",
    },
    description: {
      en: "Precise bookkeeping and financial management, providing timely insights for informed decisions and regulatory compliance.",
      ko: "정확한 부기 및 재무 관리로 정보에 입각한 결정과 규정 준수를 위한 시기적절한 통찰을 제공해 드립니다.",
    },
  },
  assurance: {
    title: {
      en: "Assurance",
      ko: "보증",
    },
    description: {
      en: "Reliable audits that provide transparency, actionable insights, and strengthen trust in your organisation.",
      ko: "투명성과 실행 가능한 통찰을 제공하며 조직에 대한 신뢰를 강화하는 신뢰할 수 있는 감사 서비스를 제공해 드립니다.",
    },
  },
  tax: {
    title: {
      en: "Tax",
      ko: "세무",
    },
    description: {
      en: "Comprehensive tax compliance and advisory, ensuring accurate filings and optimized tax positions for businesses and individuals.",
      ko: "비즈니스 및 개인을 위한 정확한 신고와 최적화된 세무 위치를 보장하는 종합적인 세무 준수 및 자문 서비스를 제공해 드립니다.",
    },
  },
  service5: {
    title: {
      en: "Consulting",
      ko: "컨설팅",
    },
    description: {
      en: "Strategic advice tailored to the objectives, enhancing efficiency and supporting sustainable growth.",
      ko: "목표에 맞는 전략적 자문으로 효율성 향상 및 지속 가능한 성장을 지원해 드립니다.",
    },
  },
  service6: {
    title: {
      en: "HR",
      ko: "인사",
    },
    description: {
      en: "Practical HR support for payroll, MPF, recruitment, and visa needs ensuring compliance and operational efficiency.",
      ko: "급여, MPF, 채용, 비자 등 실용적인 인사 지원으로 규정 준수 및 운영 효율을 보장해 드립니다.",
    },
  },
};

export const portfolioCardTranslations = {
  startups: {
    title: {
      en: "Startups",
      ko: "스타트업",
    },
    description: {
      en: "Startups need more than incorporation – they need a partner who understands scaling, system setup, and adaptable process design. We guide founders from the first day with digital-first accounting, HR setup, compliance roadmaps, and pragmatic advice. As the business grows, our team continuously refines financial systems to support sustainable expansion.",
      ko: "스타트업은 설립만으로는 부족합니다. 규모 확장, 시스템 설정, 적응 가능한 프로세스 설계를 이해하는 파트너가 필요합니다. 창업 첫날부터 디지털 회계, 인사 설정, 규정 준수 로드맵, 실용적인 조언으로 안내해 드립니다. 비즈니스가 성장함에 따라 재무 시스템을 지속적으로 개선하여 지속 가능한 확장을 지원해 드립니다.",
    },
  },
  missionDriven: {
    title: {
      en: "SMEs (Small and Medium Enterprises)",
      ko: "중소기업 (Small and Medium Enterprises)",
    },
    description: {
      en: "SMEs often face rapid growth, evolving compliance needs, and limited internal resources. We support them by providing end‑to‑end corporate, accounting, tax, and HR services that bring structure and clarity. Our approach ensures business owners gain visibility and confidence while staying compliant and financially healthy.",
      ko: "중소기업은 빠른 성장, 변화하는 규정 요구, 제한된 내부 자원에 직면합니다. 구조와 명확성을 제공하는 기업, 회계, 세무, 인사 서비스를 제공하여 지원해 드립니다. 사업주가 가시성과 신뢰를 얻으며 규정을 준수하고 재무적으로 건전하게 운영할 수 있도록 합니다.",
    },
  },
  regionalOperations: {
    title: {
      en: "Growing Regional Businesses (APAC Multi‑entity / Cross‑border)",
      ko: "성장하는 지역 비즈니스 (APAC 다중 엔터티 / 교차 국경)",
    },
    description: { 
      en: "Companies expanding internationally face complex reporting, tax coordination, and multi‑entity workflows. We bring Big 4 and corporate experience to harmonize processes, strengthen controls, and streamline cross‑border accounting. Our support helps management make informed decisions while maintaining compliance across jurisdictions.", 
      ko: "국제적으로 확장하는 기업은 복잡한 보고, 세무 조정, 다중 엔터티 워크플로우에 직면합니다. Big 4와 기업 경험을 통해 프로세스를 조화하고 통제를 강화하며 국경 간 회계를 단순화해 드립니다. 여러 관할 구역에서 규정을 준수하며 정보에 입각한 의사결정을 내릴 수 있도록 지원해 드립니다.",
    },
  },
  newVentures: {
    title: {
      en: "Corporates & Mature Organisations",
      ko: "기업 & 성숙한 조직",
    },
    description: { 
      en: "Corporates require discipline, documentation, governance, and transparent reporting. We deliver assurance, advisory, internal control assessment, HR compliance, and digital transformation guidance grounded in proven methodologies. Our experience with global insurers, financial institutions, and large corporates ensures robust, principle‑driven support.", 
      ko: "기업은 규율, 문서화, 거버넌스, 투명한 보고를 필요로 합니다. 보증, 자문, 내부 통제 평가, 인사 규정 준수, 디지털 전환 가이드를 검증된 방법론에 기반하여 제공해 드립니다. 글로벌 보험사, 금융 기관, 대기업과의 경험을 바탕으로 원칙 중심의 견고한 지원을 제공해 드립니다.",
    },
  },
};

export const footerTranslations = {
  navigation: {
    home: {
      en: "Home",
      ko: "홈",
    },
    about: {
      en: "About",
      ko: "회사소개",
    },
    services: {
      en: "Services",
      ko: "서비스",
    },
    insights: {
      en: "Insights",
      ko: "인사이트",
    },
    contact: {
      en: "Contact",
      ko: "연락처",
    },
  },
  copyright: {
    en: "@Olive&Vine",
    ko: "@Olive&Vine",
  },
  privacy: {
    en: "Privacy",
    ko: "개인정보처리방침",
  },
  terms: {
    en: "Terms",
    ko: "이용약관",
  },
};
