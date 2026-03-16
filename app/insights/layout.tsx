import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Read expert insights from Olive & Vine on accounting, tax compliance, corporate governance, HR regulations, and business consulting in Hong Kong.",
  alternates: { canonical: "/insights" },
};

export default function InsightsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
