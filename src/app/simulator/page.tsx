import type { Metadata } from "next";
import { Suspense } from "react";
import { SimulatorClient } from "./simulator-client";

export const metadata: Metadata = {
  title: "Agent Simulator & Playground — Skill Browser",
  description:
    "Interactive WebMCP agent simulator to test progressive discovery, tool calls, and human approval flows.",
};

export default function SimulatorPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <div className="h-32 w-full bg-[var(--surface)] rounded-md animate-pulse" />
          <div className="h-10 w-full bg-[var(--surface-elevated)] rounded-md animate-pulse" />
        </div>
      }
    >
      <SimulatorClient />
    </Suspense>
  );
}
