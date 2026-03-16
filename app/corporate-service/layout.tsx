import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Service",
  description:
    "Hong Kong corporate services by Olive & Vine — company incorporation, corporate secretary, business registration amendments, and compliance.",
  alternates: { canonical: "/corporate-service" },
};

export default function CorporateServiceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
