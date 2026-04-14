export const taxTwoTieredSalariesTaxTranslations = {
  heroTag: { en: "Tax", ko: "세금" },
  heroTitle: {
    en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
    ko: "홍콩의 2단계 급여세(2024/25년)",
  },
  inBrief: { en: "In brief", ko: "요약하자면" },
  inBriefDescription: {
    en: "Starting from the 2024/25 year of assessment (April 1, 2024), Hong Kong introduced a two-tiered standard rate system for Salaries Tax. High-income earners whose net income exceeds HKD 5 million now face a higher standard rate of 16%, while the first HKD 5 million continues to be taxed at 15%. This change affects approximately 12,000 taxpayers and reflects a targeted adjustment to Hong Kong's otherwise simple and flat tax system.",
    ko: "홍콩은 2024/25년 과세 연도(2024년 4월 1일)부터 급여세에 2단계 표준 세율 체계를 도입했습니다. 순소득이 500만 홍콩달러를 초과하는 고소득자는 16%의 높은 표준 세율이 적용되며, 첫 500만 홍콩달러까지는 계속 15%로 과세됩니다. 이러한 변화는 약 12,000명의 납세자에게 영향을 미치며, 단순하고 획일적인 홍콩의 세금 시스템에 대한 목표 조정이 반영된 것입니다.",
  },
  aiTaskAutomation: {
    en: "Two-Tiered Salaries Tax in Hong Kong (2024/25)",
    ko: "홍콩의 2단계 급여세(2024/25년)",
  },
  importanceOfAIDescription: {
    en: "Salaries Tax is levied under the Inland Revenue Ordinance (Cap. 112) on income arising from any office, employment, or pension in Hong Kong. Hong Kong operates on a territorial basis — only income sourced from Hong Kong is taxable, regardless of where it is paid or where the employer is incorporated. Taxable income includes salaries, wages, directors' fees, commissions, bonuses, non-cash benefits, share awards and options upon vesting or exercise, and pension income. Exempt income includes severance payments and long-service payments under the Employment Ordinance (Cap. 57).",
    ko: "급여세는 홍콩의 모든 사무실, 고용 또는 연금에서 발생하는 소득에 대해 내륙세 조례(112조)에 따라 부과됩니다. 홍콩은 영토 기준으로 운영되며, 지급 장소나 고용주의 법인 소재지에 관계없이 홍콩에서 발생한 소득만 과세 대상입니다. 과세 대상 소득에는 급여, 임금, 이사 보수, 커미션, 보너스, 비현금성 수당, 주식 보상 및 행사 시 옵션, 연금 소득이 포함됩니다. 비과세 소득에는 고용 조례(57조)에 따른 퇴직금과 장기 근속 수당이 포함됩니다.",
  },

  // Section 1 — How Salaries Tax is Calculated
  section1Title: {
    en: "How Salaries Tax is Calculated",
    ko: "급여세 계산 방법",
  },
  section1Description: {
    en: "Hong Kong uses a \"lower of two methods\" approach. The IRD calculates your tax under both methods and charges the lower amount.",
    ko: "홍콩에서는 \"두 가지 방법 중 낮은 방법\" 방식을 사용합니다. IRD는 두 가지 방법 모두에 따라 세금을 계산하고 더 낮은 금액을 부과합니다.",
  },
  section1Method1Title: {
    en: "Method 1 — Progressive Rates (on net chargeable income = income − deductions − allowances)",
    ko: "방법 1 - 누진세율(순 청구 가능 소득 = 소득 - 공제 - 충당금)",
  },
  section1ProgressiveRates: [
    { label: { en: "First HKD 50,000", ko: "첫 HKD 50,000" }, rate: { en: "2%", ko: "2%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 HKD 50,000" }, rate: { en: "6%", ko: "6%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 HKD 50,000" }, rate: { en: "10%", ko: "10%" } },
    { label: { en: "Next HKD 50,000", ko: "다음 HKD 50,000" }, rate: { en: "14%", ko: "14%" } },
    { label: { en: "Remainder", ko: "나머지" }, rate: { en: "17%", ko: "17%" } },
  ],
  section1Method2Title: {
    en: "Method 2 — Standard Rate (on net income = income − deductions, before allowances)",
    ko: "방법 2 - 표준 요율(순이익 = 소득 - 공제액, 충당금 전)",
  },
  section1StandardRates: [
    { label: { en: "First HKD 5,000,000", ko: "최초 HKD 5,000,000" }, rate: { en: "15%", ko: "15%" } },
    { label: { en: "Above HKD 5,000,000 (from 2024/25 onwards)", ko: "HKD 5,000,000 이상(2024/25년 이후부터)" }, rate: { en: "16%", ko: "16%" } },
  ],
  section1Note: {
    en: "The standard rate acts as a cap: high earners who claim few allowances pay at standard rate. Lower-income taxpayers almost always benefit more from progressive rates.",
    ko: "표준 세율은 상한선 역할을 합니다. 수당을 거의 청구하지 않는 고소득자는 표준 세율로 납부합니다. 저소득 납세자는 거의 항상 누진세율의 혜택을 더 많이 받습니다.",
  },

  // Section 2 — The Two-Tiered Change
  section2Title: {
    en: "The New Two-Tiered Standard Rate (2024/25 Change)",
    ko: "새로운 2단계 표준 요금제(2024/25년 변경)",
  },
  section2Description: {
    en: "Prior to 2024/25, a flat 15% standard rate applied to all taxpayers regardless of income level. The 2024/25 Budget introduced a two-tiered regime targeting the highest earners.",
    ko: "2024/25년 이전에는 소득 수준에 관계없이 모든 납세자에게 15%의 단일 표준 세율이 적용되었습니다. 2024/25 예산안에는 최고 소득자를 대상으로 하는 2단계 세율 체계가 도입되었습니다.",
  },
  section2WhoAffectedTitle: {
    en: "Who Is Affected?",
    ko: "영향을 받는 대상은 누구인가요?",
  },
  section2WhoAffectedItems: [
    {
      en: "The 16% rate applies only to the portion of net income exceeding HKD 5 million.",
      ko: "16% 세율은 순소득 중 500만 홍콩달러를 초과하는 부분에 대해서만 적용됩니다.",
    },
    {
      en: "A taxpayer with HKD 5.5 million net income pays 15% on the first HKD 5M and 16% on the remaining HKD 500,000.",
      ko: "순소득이 550만 홍콩달러인 납세자는 첫 번째 500만 홍콩달러에 대해 15%, 나머지 50만 홍콩달러에 대해 16%의 세금을 납부합니다.",
    },
    {
      en: "Approximately 12,000 taxpayers (0.6% of the total taxpayer base) are affected.",
      ko: "약 12,000명의 납세자(전체 납세자 기반의 0.6%)가 영향을 받습니다.",
    },
    {
      en: "The government expects to raise an additional HKD 910 million per year from this measure.",
      ko: "정부는 이번 조치로 연간 9억 1,000만 홍콩 달러의 추가 수입이 발생할 것으로 예상하고 있습니다.",
    },
  ],
  section2EmployerTitle: {
    en: "Why This Matters for Employers",
    ko: "이것이 고용주에게 중요한 이유",
  },
  section2EmployerItems: [
    {
      en: "Accurately reporting all remuneration paid (cash and non-cash) via the annual Employer's Return (BIR56A / IR56B).",
      ko: "연간 고용주 신고서(BIR56A/IR56B)를 통해 지급된 모든 보수(현금 및 비현금)를 정확하게 보고합니다.",
    },
    {
      en: "Reporting share awards and options — commonly the income items that push executives above the HKD 5M threshold.",
      ko: "일반적으로 임원이 5백만 홍콩달러를 초과하는 소득 항목인 주식 보상 및 옵션에 대한 보고.",
    },
    {
      en: "Briefing affected high-income employees (e.g. expatriate executives) on the impact on provisional tax calculations.",
      ko: "고소득 직원(예: 외국인 임원)에게 잠정 세금 계산에 미치는 영향에 대한 브리핑을 실시합니다.",
    },
  ],

  // Section 3 — Deductions and Allowances
  section3Title: {
    en: "Key Deductions and Allowances",
    ko: "주요 공제 및 수당",
  },
  section3DeductionsTitle: {
    en: "Deductions (applied before standard rate calculation):",
    ko: "공제(표준 요금 계산 전에 적용):",
  },
  section3DeductionItems: [
    { en: "Mandatory MPF contributions (up to HKD 18,000/year per employee)", ko: "의무 MPF 기부금(직원 1인당 연간 최대 18,000홍콩달러)" },
    { en: "Self-education expenses (up to HKD 100,000/year)", ko: "자가 교육 비용(최대 HKD 100,000/년)" },
    { en: "Home loan interest (up to HKD 100,000/year, max 20 years of assessment)", ko: "주택 대출 이자(연간 최대 100,000홍콩달러, 최대 20년 평가)" },
    { en: "Domestic rent (up to HKD 100,000/year, subject to qualifying conditions)", ko: "국내 임대료(연간 최대 100,000홍콩달러, 자격 조건에 따라 달라질 수 있음)" },
    { en: "Approved charitable donations (up to 35% of assessable income)", ko: "승인된 자선 기부(과세 대상 소득의 최대 35%)" },
    { en: "Elderly residential care expenses", ko: "노인 주거 케어 비용" },
    { en: "Assisted reproductive services (up to HKD 100,000/year; new from 2024/25 — eligible for infertile couples and certain medical cases under Cap. 561)", ko: "보조 생식 서비스(연간 최대 100,000홍콩달러, 2024/25년부터 신설 - 불임 부부 및 상한선에 따른 특정 의료 사례에 해당). 561)" },
  ],
  section3AllowancesTitle: {
    en: "Personal Allowances (applied only under progressive rate method):",
    ko: "개인 수당(누진율 방식에만 적용):",
  },
  section3AllowanceItems: [
    { en: "Basic allowance: HKD 132,000", ko: "기본 수당: HKD 132,000" },
    { en: "Married person's allowance: HKD 264,000", ko: "기혼자 수당: HKD 264,000" },
    { en: "Child allowance: HKD 130,000 per child", ko: "아동 수당: 어린이 1인당 HKD 130,000" },
    { en: "Dependent parent/grandparent allowance: HKD 25,000–HKD 50,000 per person", ko: "부양 부모/조부모 수당: 1인당 25,000~50,000홍콩달러" },
  ],

  // Section 4 — Employer Reporting Obligations
  section4Title: {
    en: "Employer Reporting Obligations",
    ko: "고용주 보고 의무",
  },
  section4Description: {
    en: "Employers play a central role in the salaries tax system. Key obligations under IRO Cap. 112, s.52:",
    ko: "고용주는 급여세 제도에서 중심적인 역할을 합니다. IRO 한도에 따른 주요 의무 112, s.52:",
  },
  section4Items: [
    { en: "BIR56A + IR56B — Annual Employer's Return, issued by IRD on April 1 each year; must be filed within 1 month", ko: "BIR56A + IR56B - 매년 4월 1일에 IRD에서 발행하는 연간 고용주 신고서, 1개월 이내에 제출해야 합니다" },
    { en: "IR56E — New employee notification, filed within 3 months of hire", ko: "IR56E - 신규 직원 신고, 채용 후 3개월 이내에 제출됨" },
    { en: "IR56F — Termination notice, filed 1 month before termination date", ko: "IR56F - 해지 통지, 해지일 1개월 전에 제출됨" },
    { en: "IR56G — Departure notice for employees leaving HK, filed 1 month before departure", ko: "IR56G - 출국 1개월 전에 제출한 홍콩 출국 직원용 출국 신고서" },
    { en: "Record keeping — All payroll records must be retained for at least 7 years (IRO s.51)", ko: "기록 보관 - 모든 급여 기록은 최소 7년간 보관해야 합니다(IRO s.51)" },
  ],
  section4ExposureTitle: {
    en: "Employer Exposure",
    ko: "고용주 노출",
  },
  section4ExposureDescription: {
    en: "Non-compliance may result in penalties under IRO s.80 and s.82A. Employers who fail to notify the IRD of a departing employee risk personal liability for the employee's unpaid tax under IRO s.52(6).",
    ko: "이를 준수하지 않을 경우 IRO s.80 및 s.82A에 따라 벌금이 부과될 수 있습니다. 퇴사하는 직원에 대해 IRD에 통지하지 않은 고용주는 IRO s.52(6)에 따라 해당 직원의 미납 세금에 대해 개인적인 책임을 져야 할 수 있습니다.",
  },

  frequentlyAskedQuestions: {
    en: "Frequently Asked Questions (Q&A)",
    ko: "자주 묻는 질문(Q&A)",
  },
  faqItems: [
    {
      question: { en: "Q1: Does the new 16% rate mean I will pay more tax overall?", ko: "질문 1: 새로운 16% 세율로 인해 전체적으로 세금을 더 많이 내게 되나요?" },
      answer: { en: "Not necessarily. You only pay the 16% rate on the portion of net income above HKD 5 million. You also pay whichever is lower between the progressive and standard rate calculations — if your progressive tax comes out lower, you still pay that amount regardless of the standard rate.", ko: "반드시 그렇지는 않습니다. 순소득 중 5백만 홍콩달러를 초과하는 부분에 대해서만 16%의 세율을 납부합니다. 또한 누진세와 표준세율 중 더 낮은 세율로 계산한 금액을 납부하며, 누진세가 더 낮게 나오면 표준세율에 관계없이 해당 금액을 납부합니다." },
    },
    {
      question: { en: "Q2: What counts as \"net income\" for the standard rate calculation?", ko: "질문 2: 표준 요율 계산 시 '순이익'은 무엇으로 계산되나요?" },
      answer: { en: "Net income for standard rate purposes is your total assessable income minus allowable deductions (MPF, rent, home loan interest, etc.) but before personal allowances such as the basic allowance or dependent parent allowances. Personal allowances are only relevant under the progressive rate calculation.", ko: "표준 요율 목적의 순소득은 총 과세 대상 소득에서 허용되는 공제(MPF, 임대료, 주택 대출 이자 등)를 뺀 금액에서 기본 수당 또는 부양 부모 수당과 같은 개인 수당을 제외한 금액입니다. 개인 수당은 누진율 계산에만 해당됩니다." },
    },
    {
      question: { en: "Q3: I receive share awards from my employer. When are they taxable?", ko: "Q3: 고용주로부터 주식 보너스를 받습니다. 언제 과세 대상이 되나요?" },
      answer: { en: "Share awards are generally taxable as employment income at the time they vest — i.e. when the restriction on disposal is lifted. Share options are typically taxable on exercise. These amounts must be reported by your employer on Form IR56B and will form part of your assessable income for the year they are received.", ko: "주식 보상은 일반적으로 부여 시점, 즉 처분 제한이 해제되는 시점에 근로소득으로 과세됩니다. 스톡옵션은 일반적으로 행사 시 과세 대상이 됩니다. 이러한 금액은 고용주가 IR56B 양식에 따라 보고해야 하며, 수령한 연도의 과세 대상 소득의 일부가 됩니다." },
    },
    {
      question: { en: "Q4: As an employer, do I need to do anything differently because of the new two-tiered rate?", ko: "질문 4: 고용주로서 새로운 2단계 요금제로 인해 달라져야 할 사항이 있나요?" },
      answer: { en: "Your core reporting obligations remain unchanged — you still file BIR56A and IR56B annually. However, for employees whose total remuneration (including share awards, bonuses, and non-cash benefits) may approach or exceed HKD 5 million, ensure all such items are reported accurately and completely. Incomplete reporting can lead to penalties under IRO s.80.", ko: "핵심 보고 의무는 변함이 없으며, 매년 BIR56A 및 IR56B를 제출해야 합니다. 그러나 총 보수(주식 보상, 보너스, 비현금성 혜택 포함)가 5백만 홍콩달러를 초과할 수 있는 직원의 경우 해당 항목을 모두 정확하고 완전하게 보고해야 합니다. 불완전하게 보고하면 IRO s.80에 따라 처벌을 받을 수 있습니다." },
    },
    {
      question: { en: "Q5: What is provisional salaries tax, and how is it affected?", ko: "Q5: 잠정 급여세란 무엇이며 어떤 영향을 받나요?" },
      answer: { en: "Provisional salaries tax is an advance payment estimated by IRD based on the prior year's assessment. For affected employees, the new 16% rate will flow through to future provisional tax calculations. Employees may apply to reduce provisional tax if their income for the year is expected to be lower — but this requires timely application and supporting documentation.", ko: "잠정 급여세는 전년도 평가에 따라 IRD에서 추정하여 미리 납부하는 세금입니다. 영향을 받는 직원의 경우, 새로운 16% 세율이 향후 잠정 세금 계산에 적용됩니다. 직원은 해당 연도의 소득이 더 낮을 것으로 예상되는 경우 잠정세 감면을 신청할 수 있지만, 적시에 신청하고 증빙 서류를 제출해야 합니다." },
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
    en: "The two-tiered standard rate is a targeted measure affecting a small percentage of HK's taxpayer base, but its implications for employers — especially those managing expatriate or executive payroll — are real. Accurate reporting of all remuneration forms, particularly share-based compensation, is more important than ever. If you are unsure whether your reporting obligations are being met, or how the new rate affects your tax position, Olive & Vine's tax team is ready to assist.",
    ko: "2단계 표준 세율은 홍콩 납세자 중 일부에게만 영향을 미치는 대상 조치이지만, 고용주, 특히 해외 주재원이나 임원 급여를 관리하는 고용주에게 미치는 영향은 매우 큽니다. 모든 보수 형태, 특히 주식 기반 보상에 대한 정확한 신고가 그 어느 때보다 중요합니다. 신고 의무를 제대로 이행하고 있는지, 또는 새로운 세율이 세무상 어떤 영향을 미치는지 잘 모르겠다면 Olive & Vine의 세무팀이 도와드릴 준비가 되어 있습니다.",
  },
};
