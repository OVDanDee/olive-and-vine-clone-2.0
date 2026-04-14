import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Olive & Vine's full range of professional services — accounting, assurance, tax, corporate services, consulting, and HR solutions in Hong Kong.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
