export const hrWithholdingObligationsDepartingEmployeesTranslations = {
  heroTag: { en: "HR", ko: "HR" },
  heroTitle: {
    en: "Employer Withholding Obligations for Departing Employees",
    ko: "퇴사하는 직원에 대한 고용주의 원천징수 의무",
  },
  inBrief: { en: "In brief", ko: "요약하자면" },
  inBriefDescription: {
    en: "When an employee plans to leave Hong Kong permanently or for an extended period, employers must follow specific statutory procedures under Section 52 of the Inland Revenue Ordinance (Cap. 112). A key issue is the timing and release of final payments. This Insight explains the withholding obligation, the one-month rule, and practical safeguards for employers.",
    ko: "직원이 영구적으로 또는 장기간 홍콩을 떠날 계획인 경우 고용주는 내륙세 조례 52조(112조)에 따라 특정 법적 절차를 따라야 합니다. 핵심 쟁점은 최종 지급 시기와 지급 방식입니다. 이 인사이트에서는 원천징수 의무, 1개월 규정, 고용주를 위한 실질적인 안전장치에 대해 설명합니다.",
  },
  aiTaskAutomation: {
    en: "Employer Withholding Obligations for Departing Employees",
    ko: "퇴사하는 직원에 대한 고용주의 원천징수 의무",
  },
  importanceOfAIDescription: {
    en: "When an employee plans to leave Hong Kong permanently or for an extended period, employers are required to follow specific statutory procedures under Section 52 of the Inland Revenue Ordinance (Cap. 112). A key issue for employers is the timing and release of final payments. This Insight explains the withholding obligation, the one-month rule, and practical safeguards for employers.",
    ko: "직원이 영구적으로 또는 장기간 홍콩을 떠날 계획인 경우, 고용주는 내국세 조례 52조(112조)에 따라 특정 법적 절차를 따라야 합니다. 고용주에게 중요한 문제는 최종 지급 시기와 공개입니다. 이 인사이트에서는 원천징수 의무, 1개월 규정, 고용주를 위한 실질적인 안전장치에 대해 설명합니다.",
  },

  // Section 1: Legal Framework
  section1Title: {
    en: "Legal Framework – Withholding Requirement Under Section 52(7)",
    ko: "법적 프레임워크 - 섹션 52(7)에 따른 원천징수 요건",
  },
  section1Description: {
    en: "Once Form IR56G is submitted, employers must withhold all remuneration payable to the departing employee. Payments may only be released when:",
    ko: "양식 IR56G가 제출되면 고용주는 퇴사하는 직원에게 지급할 모든 보수를 원천징수해야 합니다. 다음과 같은 경우에만 급여를 지급할 수 있습니다:",
  },
  section1Conditions: [
    {
      label: { en: "Section 52(7)(a)", ko: "섹션 52(7)(a)" },
      description: { en: "The IRD authorises payment; or", ko: "IRD가 지불을 승인하거나, 또는" },
    },
    {
      label: { en: "Section 52(7)(b)", ko: "섹션 52(7)(b)" },
      description: { en: "One month has elapsed since IRD received IR56G", ko: "IRD가 IR56G를 받은 후 한 달이 경과했습니다" },
    },
  ],
  section1Note: {
    en: "The two conditions operate independently.",
    ko: "두 조건은 독립적으로 작동합니다.",
  },

  // Section 2: Release of Payment
  section2Title: {
    en: "Release of Payment After One Month – Practical Considerations",
    ko: "한 달 후 결제 해제 - 실무적 고려 사항",
  },
  section2Description: {
    en: "Employers may legally release payments after 30 days, even without IRD notification, but only if they are certain that 30 full days have passed since IRD's receipt.",
    ko: "고용주는 IRD 통지 없이도 30일이 지나면 합법적으로 급여를 지급할 수 있지만, IRD의 수령일로부터 30일이 완전히 지났다는 것이 확실한 경우에만 가능합니다.",
  },
  section2ReceiptDateTitle: {
    en: "Confirming IRD Receipt Date",
    ko: "IRD 수령 날짜 확인",
  },
  section2ReceiptDateDescription: {
    en: "The IRD does not issue formal acknowledgement for paper filings. Employers generally establish receipt date through:",
    ko: "IRD는 서류 제출에 대해 공식적인 확인서를 발급하지 않습니다. 고용주는 일반적으로 접수 날짜를 정합니다:",
  },
  section2ReceiptMethods: [
    { en: "eTAX submission record (official timestamp)", ko: "eTAX 제출 기록(공식 타임스탬프)" },
    { en: "Postal tracking records showing delivery to IRD", ko: "IRD로의 배송을 보여주는 우편 추적 기록" },
    { en: "Hand-delivery stamp (if filed at IRD's drop-box or counter)", ko: "수기 배달 스탬프(IRD의 드롭박스 또는 카운터에 접수된 경우)" },
  ],
  section2ReceiptNote: {
    en: "These records should be retained to evidence the 30-day period.",
    ko: "이러한 기록은 30일의 기간을 증명하기 위해 보관해야 합니다.",
  },
  section2ClearanceTimelineTitle: {
    en: "Will IRD normally issue clearance within 30 days?",
    ko: "IRD는 일반적으로 30일 이내에 허가를 발급하나요?",
  },
  section2ClearanceTimelineDescription: {
    en: "Yes — in most straightforward cases, when IR56G is filed at least one month before departure, compensation details are correct, and no complex income items (e.g., share awards, equity vesting) require review. This general timing aligns with IRD practice and professional experience. However, delays can occur, particularly during peak season.",
    ko: "예 - 대부분의 간단한 경우, 출국 최소 1개월 전에 IR56G를 제출하면 보상 내역이 정확하고 복잡한 소득 항목(예: 주식 보상, 주식 부여)은 검토할 필요가 없습니다. 이 일반적인 시기는 IRD 실무 및 전문가 경험과 일치합니다. 그러나 특히 성수기에는 지연이 발생할 수 있습니다.",
  },
  section2ExposureTitle: {
    en: "Employer Exposure",
    ko: "고용주 노출",
  },
  section2ExposureDescription: {
    en: "If the employer releases payment prematurely, or files IR56G late, Section 52(6) exposes the employer to personal liability for the employee's unpaid tax. This makes accurate tracking of the 30-day period essential.",
    ko: "고용주가 조기에 지급을 해제하거나 IR56G를 늦게 제출하는 경우, 섹션 52(6)에 따라 고용주는 직원의 미납 세금에 대한 개인적인 책임을 지게 됩니다. 따라서 30일 동안의 정확한 추적이 필수적입니다.",
  },

  // Section 3: Practical Guidance
  section3Title: {
    en: "Practical Guidance for Employers",
    ko: "고용주를 위한 실무 지침",
  },
  section3Items: [
    { en: "Retain proof of IR56G receipt date", ko: "IR56G 수령 날짜 증명 보관" },
    { en: "Do not release any remuneration prior to meeting one of the statutory release conditions", ko: "법정 공개 조건 중 하나를 충족하기 전에는 보수를 공개하지 마세요" },
    { en: "Ensure IR56G is filed on time to avoid employer liability", ko: "고용주 책임을 피하기 위해 IR56G를 제때 제출해야 합니다" },
    { en: "Prepare complete and accurate compensation data to avoid clearance delays", ko: "완전하고 정확한 보상 데이터를 준비하여 통관 지연 방지" },
    { en: "Document the internal decision to release payments (after 30 days or after IRD approval)", ko: "지급 해제에 대한 내부 결정을 문서화합니다(30일 후 또는 IRD 승인 후)" },
  ],

  // Section 4: After 30-day period
  section4Title: {
    en: "If IRD Issues Clearance After the 30-Day Period",
    ko: "IRD가 30일 기간 이후에 허가를 발급하는 경우",
  },
  section4Description: {
    en: "If the employer has already released payment after Day 30, they are statutorily protected. A subsequently issued clearance letter does not revive liability, provided the employer filed IR56G correctly, counted the 30-day period accurately, and withheld payments during the 30-day window.",
    ko: "고용주가 30일 이후에 이미 급여를 지급한 경우에는 법적으로 보호됩니다. 고용주가 IR56G를 올바르게 제출하고 30일 기간을 정확하게 계산했으며 30일 기간 동안 급여를 원천 징수했다면 이후에 발급된 허가서는 책임을 되살리지 않습니다.",
  },

  // Section 5: Key Points
  section5Title: {
    en: "Key Points",
    ko: "핵심 포인트",
  },
  section5Items: [
    { en: "Withholding is mandatory once IR56G is filed.", ko: "IR56G를 제출하면 원천 징수는 필수입니다." },
    { en: "Payment can be released after IRD authorisation or after 30 days from IRD receipt.", ko: "IRD 승인 후 또는 IRD 수령 후 30일이 지나면 지급이 해제될 수 있습니다." },
    { en: "IRD often issues clearance within 30 days if filings are correct and timely.", ko: "IRD는 제출 서류가 정확하고 적시에 제출된 경우 30일 이내에 허가를 발급하는 경우가 많습니다." },
    { en: "Employers must verify IRD receipt date due to lack of formal acknowledgement.", ko: "고용주는 공식적인 승인이 없으므로 IRD 접수일을 확인해야 합니다." },
    { en: "Failure to give proper notice can cause employer personal tax liability.", ko: "적절한 통지를 하지 않으면 고용주에게 개인 납세 책임이 발생할 수 있습니다." },
  ],

  frequentlyAskedQuestions: {
    en: "Frequently Asked Questions (Q&A)",
    ko: "자주 묻는 질문(Q&A)",
  },
  faqItems: [
    {
      question: { en: "Q1: When does the employer's withholding obligation begin?", ko: "Q1: 고용주의 원천징수 의무는 언제부터 시작되나요?" },
      answer: { en: "The obligation begins from the date IR56G is submitted to the IRD — not from the date the employee gives notice. Filing triggers the statutory withholding requirement immediately.", ko: "의무는 직원이 통지한 날짜가 아니라 IRD에 IR56G를 제출한 날부터 시작됩니다. 제출하면 즉시 법정 원천 징수 의무가 발생합니다." },
    },
    {
      question: { en: "Q2: How does the employer confirm the IRD's receipt date for IR56G?", ko: "Q2: 고용주는 IRD의 IR56G 수령 날짜를 어떻게 확인하나요?" },
      answer: { en: "The IRD does not issue formal acknowledgement for paper filings. Employers should use eTAX submission timestamps, postal tracking records showing delivery, or a hand-delivery stamp as evidence of the receipt date.", ko: "IRD는 서면 제출에 대해서는 공식적인 확인서를 발급하지 않습니다. 고용주는 접수 날짜의 증거로 eTAX 제출 타임스탬프, 배달을 보여주는 우편 추적 기록 또는 직접 배달 스탬프를 사용해야 합니다." },
    },
    {
      question: { en: "Q3: What is the employer's liability if payment is released too early?", ko: "질문 3: 급여가 너무 일찍 지급된 경우 고용주의 책임은 어떻게 되나요?" },
      answer: { en: "Under Section 52(6) of the IRO, the employer becomes personally liable for the employee's unpaid salaries tax. This liability attaches regardless of whether the employer was aware of the outstanding tax amount.", ko: "IRO 52(6)조에 따라 고용주는 직원의 미납 급여세에 대해 개인적으로 책임을 집니다. 이 책임은 고용주가 미납 세액을 알고 있었는지 여부와 관계없이 부과됩니다." },
    },
    {
      question: { en: "Q4: If the IRD issues clearance after the employer already released payment on Day 30, is the employer still protected?", ko: "Q4: 고용주가 30일째에 이미 급여를 지급한 후 IRD가 승인서를 발급하는 경우에도 고용주는 여전히 보호되나요?" },
      answer: { en: "Yes. Provided the employer filed IR56G correctly, tracked the 30-day receipt window accurately, and withheld payments throughout that period, the employer is fully protected under Section 52(7)(b). A later-issued clearance letter does not revive liability.", ko: "예. 고용주가 IR56G를 올바르게 제출하고 30일의 수령 기간을 정확하게 추적했으며 해당 기간 동안 급여를 원천 징수했다면 고용주는 섹션 52(7)(b)에 따라 완전히 보호됩니다. 나중에 발급된 허가서는 책임을 되살리지 않습니다." },
    },
    {
      question: { en: "Q5: Does the withholding obligation apply to all types of payments, including bonuses?", ko: "질문 5: 원천징수 의무는 상여금을 포함한 모든 유형의 지급에 적용되나요?" },
      answer: { en: "Yes. The obligation covers all remuneration including salary, bonus, commission, leave pay, payment in lieu of notice, and any other termination entitlements. There are no exemptions for specific payment types.", ko: "예. 이 의무는 급여, 보너스, 커미션, 휴가 수당, 통지 대신 지급, 기타 해고 수당을 포함한 모든 보수를 포함합니다. 특정 지급 유형에 대한 면제는 없습니다." },
    },
  ],
  contactInformationDisclaimer: {
    en: "This material covers general information and does not provide solutions for any specific issues of any company or individual. Differences in legal terms may exist due to the translation into Korean to aid understanding. Olive and Vine does not assume any legal responsibility or guarantee the accuracy, completeness, or usefulness of this information. This material cannot replace legal or consulting advice; please consult with a professional if necessary.",
    ko: "본 자료는 일반적인 정보를 다루고 있으며 특정 기업이나 개인의 특정 문제에 대한 해결책을 제시하지 않습니다. 이해를 돕기 위해 한국어로 번역되었기 때문에 법률 용어에 차이가 있을 수 있습니다. 올리브앤바인은 본 정보의 정확성, 완전성, 유용성에 대해 어떠한 법적 책임도 지지 않으며 보증하지 않습니다. 본 자료는 법률 또는 컨설팅 자문을 대체할 수 없으므로 필요한 경우 전문가와 상의하시기 바랍니다.",
  },
  conclusionTitle: {
    en: "Conclusion",
    ko: "결론",
  },
  conclusionDescription: {
    en: "Understanding withholding obligations is essential for employers navigating employee departures from Hong Kong. By filing IR56G promptly, tracking the 30-day receipt window carefully, and documenting all release decisions, employers can fulfil their legal duties and avoid personal liability under the Inland Revenue Ordinance.",
    ko: "직원의 홍콩 출국을 관리하는 고용주에게는 원천징수 의무에 대한 이해가 필수적입니다. IR56G를 신속하게 제출하고 30일의 수령 기간을 주의 깊게 추적하며 모든 출국 결정을 문서화함으로써 고용주는 법적 의무를 이행하고 내륙세 조례에 따른 개인적 책임을 피할 수 있습니다.",
  },
};
