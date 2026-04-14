# Korean Translation Context Review

**Review Date:** 2026-04-14  
**Branch:** feature/i18n-next-intl-migration  
**Commit SHA:** 669b8c9

## Summary

수행한 한국어 번역 정제 작업은 페이지 맥락과 톤을 개선하는 데 집중했습니다. DeepL의 기술적으로 정확한 번역이 문맥에 맞지 않는 경우를 식별하고 수정했습니다.

## Term Consistency Decisions

### 1. Partnership (파트너십)
- **Decision:** "파트너십" 일관 사용 (마케팅/서비스 맥락)
- **Rationale:** About/Values 페이지에서 관계 구축과 협력을 강조하는 문맥에서 일관되게 적용
- **Usage:** Partnership Beyond Numbers, Our Promise, Compassion value

### 2. Building/Founded (설립, 구축)
- **Decision:** 맥락에 따라 "신뢰 위에 세워진" / "기초해" 등으로 다양화
- **Rationale:** "빌딩" 같은 물리적 의미는 피하고, 관계/신뢰 구축의 의미로 표현
- **Usage:** storyTitle, leadershipTitle 등 핵심 메시지 섹션

### 3. Experience (경험)
- **Decision:** "경험 연수" (25+ Years of Experience)
- **Rationale:** "수년간의 경험"보다 더 명확하고 자연스러운 한국어 표현

### 4. Training/Alumni (전문가)
- **Decision:** "빅4 출신 전문가" (Big 4 Trained Alumni)
- **Rationale:** "교육받은 동문"보다 마케팅 맥락에서 더 신뢰감 있고 전문성 강조

### 5. Compassion (공감)
- **Decision:** "동정심" → "공감"
- **Rationale:** "동정심"은 일방적 동정의 느낌, "공감"은 상호 이해와 공동 여정을 시사

## Top 5 Most Impactful Edits

### 1. pageValuesUtils.ts - Compassion 가치
```
OLD: "연민은 훌륭한 자문과 거래 조언을 구분하는 요소입니다..."
NEW: "공감이 진정한 자문과 거래적 조언을 구분하는 핵심입니다..."
```
**Impact:** Warm professional tone 강화, 한국어 자연스러움 개선

### 2. pageAboutUtils.ts - storyTitle
```
OLD: "신뢰를 바탕으로 구축,\n매일의 삶"
NEW: "신뢰 위에 세워진\n매일의 실천"
```
**Impact:** 영문의 리듬감과 의미를 한국어로 자연스럽게 재현

### 3. pageUtils.ts - CTA Description
```
OLD: "숙련된 팀이 비즈니스 요구 사항을 자신 있게 탐색할 수 있도록..."
NEW: "저희의 경험 많은 팀이 비즈니스 도전을 함께 극복할 수 있도록..."
```
**Impact:** 협력 관계와 함께라는 메시지 강조

### 4. pageAccountingServiceUtils.ts - Private Accounting Title
```
OLD: "개인 계정"
NEW: "전담 회계"
```
**Impact:** 기술 용어의 부정확성 제거, 맥락에 맞는 표현

### 5. pageTaxServiceUtils.ts - Employer's Return
```
OLD: "고용주의 수익률"
NEW: "고용주 신고"
```
**Impact:** 세무 용어의 정확성 강화 (수익률은 이익률을 의미하므로 부정확)

## Files Touched

총 9개 파일 수정:
- `app/utils/pageUtils.ts` — 4개 수정 (경험 연수, 홍콩 집중 운영, 빅4 출신 전문가, CTA)
- `app/utils/pageAboutUtils.ts` — 3개 수정 (storyTitle, leadershipTitle, stats)
- `app/utils/pageValuesUtils.ts` — 3개 수정 (Compassion title, statement, body)
- `app/utils/pageAccountingServiceUtils.ts` — 3개 수정 (hero 수정, 전담 회계)
- `app/utils/pageServicesUtils.ts` — 1개 수정 (HR 서비스 description)
- `app/utils/pageTaxServiceUtils.ts` — 2개 수정 (Employer's Return, Salaries Tax)
- `app/utils/pageConsultingServiceUtils.ts` — 1개 수정 (Korn Ferry 오류 제거)
- `app/utils/pageCorporateServiceUtils.ts` — 1개 수정 (In Business)
- `app/utils/pageHrServiceUtils.ts` — 1개 수정 (hero subtitle)

## Verification Results

✅ **TypeScript Check:** No errors  
✅ **Build:** Successful (v16.1.6, Turbopack)  
✅ **Commit:** 669b8c9  

## Notes for Danny

- 모든 수정은 페이지 맥락을 고려하며, 기술 용어(세무, 규정)는 정확성 우선
- Protected terms (BIR56A, BIR, CIA, CPA, HKICPA, IR56, IRD, MPF, Xero, 인물명) 미변경
- `en:` 값은 모두 그대로 유지
- 21개의 타겟 수정으로 문맥 드리프트 교정 완료
- Insights 파일들은 제목 수준만 검토하고, 규제 컨텐츠는 기존 정확성 유지

