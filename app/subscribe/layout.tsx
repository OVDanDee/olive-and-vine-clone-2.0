import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe",
  description:
    "Subscribe to Olive & Vine for the latest insights on accounting, tax, HR, and business advisory in Hong Kong.",
  alternates: { canonical: "/subscribe" },
};

export default function SubscribeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
