import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Plan & Saved Lifts",
  description: "View and manage today's workout plan and saved lifts.",
};

export default function MyPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
