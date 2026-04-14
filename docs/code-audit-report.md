# i18n Migration Code Audit Report
**Branch:** `feature/i18n-next-intl-migration`  
**Audit Date:** 2026-04-14  
**Auditor:** Claude Haiku 4.5

---

## 1. CRITICAL ISSUES (Must Fix Before Merge)

### 1.1 Invalid Korean Text in 404 Page
**File:** `app/[locale]/not-found.tsx` (lines 14, 18, 24)  
**Severity:** HIGH  
**Issue:** The "Korean" copy is actually Japanese characters:
- Line 14: `"ページが見つかりません"` (Japanese: "Page not found")
- Line 18: `"申し訳ございませんが、お探しのページは存在しません。"` (Japanese: "We apologize, but the page you're looking for does not exist.")
- Line 24: `"ホームに戻る"` (Japanese: "Back to home")

**Impact:** Korean users see Japanese text on 404 error pages. Breaks UX for non-English visitors.

**Recommendation:** Replace with correct Korean text:
- `"페이지를 찾을 수 없습니다"`
- `"죄송하지만 찾으시는 페이지가 존재하지 않습니다."`
- `"홈으로 돌아가기"`

Or better: use next-intl's `useTranslations()` hook and load from `messages/ko.json` instead of inline strings.

---

### 1.2 React Hook Errors: setState in useEffect (React Performance Anti-pattern)
**Files:**
- `app/[locale]/page.tsx` (lines 54–56)
- `app/[locale]/insights/page.tsx` (lines 63, 66)
- `app/components/AnimatedHeadline.tsx` (line 21)

**Severity:** HIGH (Build does not fail, but linter reports errors)  
**Issue:** Calling `setState` synchronously inside `useEffect` causes cascading re-renders and performance degradation. React's own docs warn against this pattern.

Example from `app/[locale]/page.tsx:53–57`:
```typescript
useEffect(() => {
  setCurrentIndex(0);
  setDisplayedText("");
  setIsDeleting(false);
}, [language]);
```

**Recommendation:** Consolidate state updates into a single `setState` call or restructure to avoid state mutations in effects. For typing animations, consider moving to a reducer pattern.

---

### 1.3 Variable Declaration Order (TDZ violation)
**Files:**
- `app/components/DynamicStatStrip.tsx` (lines 82, 101–155)
- `app/components/HeroInteractionLayer.tsx` (lines 38, 33–39)

**Severity:** HIGH  
**Issue:** Functions referenced in `useEffect` are declared *after* the effect, triggering Temporal Dead Zone (TDZ) error and breaking exhaustive-deps linter rules.

Example from `DynamicStatStrip.tsx:80–155`:
```typescript
useEffect(() => {
  if (entry.isIntersecting && !hasAnimated.current) {
    animateStats(); // Called here
  }
}, []);

const animateStats = () => { // Declared here (after use)
  // ...
};
```

**Recommendation:** Hoist all functions referenced in effects above the effects, or wrap in `useCallback`.

---

## 2. TECH DEBT (Should Fix Soon)

### 2.1 Massive Inline Translation Pattern Duplication
**Scope:** 685+ occurrences of `language === "KOR" ? x.ko : x.en` across codebase  
**File Examples:**
- `app/[locale]/page.tsx` (20 instances)
- `app/[locale]/accounting-service/page.tsx` (multiple instances)
- Almost every page and utility file

**Severity:** MEDIUM  
**Issue:** No abstraction helper exists. Repeated ternary patterns throughout code.

**Current Status:** Pages still use legacy `{ en: value, ko: value }` inline pattern consumed via language flag, rather than leveraging next-intl's `useTranslations()` hook.

**Recommendation:** Create a simple helper:
```typescript
export const t = (item: { en: string; ko: string }, language: "ENG" | "KOR") =>
  language === "KOR" ? item.ko : item.en;
```

Better: Migrate to next-intl's `useTranslations()` hook in a phased approach (post-merge task).

---

### 2.2 LanguageContext Shim Redundancy
**File:** `app/contexts/LanguageContext.tsx`  
**Severity:** LOW  
**Issue:** `LanguageProvider` is now a pass-through (no-op) — locale provisioning happens in `app/[locale]/layout.tsx` via `NextIntlClientProvider`.

**Current Usage:**
- 43 imports of `useLanguage` across codebase
- `LanguageProvider` component still in tree (renders nothing)

**Why it persists:** Backward compatibility. Existing code imports `useLanguage()` and calls `setLanguage()` which wraps next-intl's `useRouter/usePathname`.

**Recommendation:** This is acceptable API compat debt. Mark with TODO comment. Planned migration: once all pages use `useTranslations()`, deprecate the shim.

---

### 2.3 Regex-based Codemod Script is Dead Code
**File:** `scripts/apply-deepl-to-source.ts`  
**Severity:** LOW  
**Issue:** AST-based version (`scripts/apply-deepl-ast.ts`) supersedes regex version.

**Evidence:**
- `package.json` has no script entry for the regex version (only `i18n:apply-deepl` → `apply-deepl-ast.ts`)
- Regex version not referenced anywhere except its own console logs
- Both scripts have similar names; only AST version is used

**Recommendation:** Delete `scripts/apply-deepl-to-source.ts` to reduce cognitive load (dead code). Keeps codebase cleaner.

---

### 2.4 Legacy Translation Snapshot Not Required
**File:** `messages/ko.legacy.json`  
**Severity:** LOW  
**Issue:** Only used by `scripts/diff-translations.ts` for historical diff reports. Not imported at runtime.

**Recommendation:** Safe to leave (serves as baseline for translation audits), but flag in comments that it's historical. Consider moving to `docs/translations/` if it grows.

---

### 2.5 Missing generateStaticParams for Dynamic Routes
**Files:**
- `app/[locale]/insights/[tag]/[slug]/page.tsx`
- `app/[locale]/leadership/[slug]/page.tsx`

**Severity:** MEDIUM  
**Issue:** Pages use dynamic params `[tag]`, `[slug]` without `generateStaticParams`. This causes:
- ISR fallback mode (slower TTL)
- No pre-built static HTML
- Larger `.next/server` footprint at runtime

**Recommendation:** Export `generateStaticParams()` async functions to pre-build routes. Example:
```typescript
export async function generateStaticParams() {
  return Object.keys(INSIGHT_PAGES).flatMap(tag =>
    INSIGHT_PAGES[tag].map(slug => ({ locale: "*", tag, slug }))
  );
}
```

---

## 3. NITS & STYLE ISSUES

- **Unused imports/variables:**
  - `app/[locale]/page.tsx`: `Image`, `toggleLanguage` (lines 4, 21)
  - `app/[locale]/accounting-service/page.tsx`: `bookkeepingItems`, `accountingSectionItems`, `privateaccountingItems` (lines 23, 26, 29)
  - `app/utils/pageUtils.ts`: `getServiceTitleByKey`, `INSIGHT_TAG_SERVICE_KEY`
  - `app/contexts/LanguageContext.tsx`: `LanguageContextType` interface (unused type)
  - `app/components/Header.tsx`: `Icons` imported but never used

- **Custom fonts warning:**
  - `app/layout.tsx` lines 76–77 load fonts but should be in `_document.tsx` or layout for app router (Next.js 16+ supports in layout, so this is minor).

- **Ref cleanup warnings:**
  - `app/components/SectionReveal.tsx:84`, `app/components/DynamicStatStrip.tsx:96`, `app/[locale]/tax-service/page.tsx:49`: refs in effects may be stale by cleanup time.

- **Image tags instead of Next Image:**
  - `app/[locale]/accounting-service/page.tsx` (lines 78, 117, 156): Using `<img>` instead of `<Image />` from next/image. Impacts LCP and bundle size.

---

## 4. WHAT'S WELL DONE ✓

- **next-intl wiring:** Routing, middleware, and locale detection are correct. Matcher pattern properly excludes API, `_next`, static files.
- **Locale parameter handling:** All pages correctly await and validate `params.locale` with `hasLocale()` check and `notFound()` fallback.
- **Middleware setup:** Proper use of `createMiddleware` and config matcher; handles redirects cleanly.
- **SEO metadata:** `generateMetadata()` in locale layout emits correct hreflang and canonical URLs. Sitemap and robots.ts correctly generate locale-prefixed URLs.
- **Sitemap generation:** Both static routes and dynamic insight routes included with proper locale iteration.
- **Page migration:** All old `app/*` routes successfully moved to `app/[locale]/*`. No orphaned routes detected.
- **Navigation API:** `useRouter`, `Link` from `@/i18n/navigation` correctly enforces locale-aware links.

---

## 5. BUILD & LINT METRICS

### Lint Results
- **Total Issues:** 29 problems (6 errors, 23 warnings)
- **NEW errors (introduced by migration):**
  - 3x setState in useEffect (React hook rule violations)
  - 2x variable access before declaration (TDZ)
  - 1x Cannot access variable before it is declared (`animateStats`, `animate`)
- **NEW warnings (introduced by migration):**
  - 8x unused variables (mostly import cleanup needed)
  - 4x ref cleanup exhaustive-deps warnings
  - 3x custom font warnings (minor, Next.js 16 compatible)
  - 6x img tag usage (should use next/image)

### Build Status
- **TypeScript Check:** ✓ Passes (`npx tsc --noEmit` produces no output)
- **Next.js Build:** ⚠ **Fails** due to middleware deprecation warning + lingering `.next` cache corruption. Clean rebuild recommended before merge.
  - Warning: "The 'middleware' file convention is deprecated. Please use 'proxy' instead."
  - This is a **Next.js 16+ deprecation notice**, not a blocker. Plan to migrate `middleware.ts` → `proxy` pattern in follow-up PR.

### Bundle Size
- No `analyze` report available in build output. Recommend running `npm run build -- --analyze` (if webpack-bundle-analyzer configured) to check if `NextIntlClientProvider` + `getMessages()` are bloating client bundles. *Current risk:* If `messages/ko.json` (2.8 KB) is sent to every page instead of being scoped per-route, that's redundant and should be optimized with route-level `messages` prop selection.

---

## 6. SUMMARY & RECOMMENDATIONS

### Before Merge
1. **Fix 404 page Japanese → Korean text** (critical UX)
2. **Fix setState-in-useEffect** errors (3 locations) — consolidate updates or refactor with useCallback
3. **Fix variable declaration order** (DynamicStatStrip, HeroInteractionLayer) — hoist functions
4. **Clean up unused imports** in 6 files (quick lint fix)
5. **Test clean build:** Delete `.next/` and rebuild to confirm no cache issues

### Post-Merge (Scheduled Tasks)
1. Migrate `middleware.ts` → `proxy` pattern (Next.js 16 deprecation)
2. Add `generateStaticParams` for dynamic insight/leadership routes
3. Migrate leaf pages to `useTranslations()` from next-intl (phased rollout)
4. Delete `scripts/apply-deepl-to-source.ts` (dead code)
5. Audit bundle size with i18n provider; scope messages per-route if bloated
6. Add helper function for `language === "KOR"` ternary pattern (or full translation hook migration)

### Risk Assessment
- **Functional Risk:** LOW — routing, locale detection, and static pages work correctly.
- **Performance Risk:** MEDIUM — useState-in-effect patterns cause cascading re-renders; missing static params on dynamic routes; potential bundle bloat from messages.
- **Merge Readiness:** CONDITIONAL — fix the 3 critical hook errors + 404 text. Linter warnings are acceptable tech debt for next sprint.

---

**Report Generated:** 2026-04-14 by automated audit  
**Branch:** feature/i18n-next-intl-migration  
**Next Review:** After critical fixes applied
