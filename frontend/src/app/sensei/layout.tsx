import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Football Sensei",
  description:
    "Ask any football question and get beginner-friendly explanations powered by AI.",
};

export default function SenseiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
