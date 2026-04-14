import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assurance Service",
  description:
    "Olive & Vine's assurance services — audit, review engagements, and compliance assurance for Hong Kong businesses.",
  alternates: { canonical: "/assurance-service" },
};

export default function AssuranceServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
