import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership team at Olive & Vine — experienced professionals driving accounting, advisory, and business solutions in Hong Kong.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
