import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Football Tutor",
  description:
    "Ask any football question and get beginner-friendly explanations powered by AI.",
};

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
