import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Values",
  description:
    "Discover the core values that guide Olive & Vine — integrity, excellence, and client-centric advisory services in Hong Kong.",
  alternates: { canonical: "/our-values" },
};

export default function OurValuesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
