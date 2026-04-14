import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Olive & Vine — an accounting and advisory firm serving businesses in Hong Kong with tailored corporate, tax, HR, and consulting solutions.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
