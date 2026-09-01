import { ArrowDown, Braces, Search } from "lucide-react";

export function ForgeHero() {
  return (
    <section className="grid gap-8 border-b border-[var(--border)] pb-10 pt-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(17rem,0.55fr)] lg:items-end lg:pb-12 lg:pt-8">
      <div className="space-y-5">
        <p className="font-mono text-xs font-semibold text-[var(--accent)]">
          Local-first skills for WebMCP
        </p>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.05em] text-[var(--text)] sm:text-5xl lg:text-[3.5rem]">
            Give ChatGPT the skill for the job.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-[var(--text-muted)]">
            Keep reusable prompts in one local library. When you ask, ChatGPT
            can find the right skill and read its instructions through WebMCP.
          </p>
        </div>
      </div>

      <div className="border-l border-[var(--border-strong)] pl-5 font-mono text-xs lg:mb-1 lg:pl-7">
        <div className="grid gap-4 text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <Search className="size-4 text-[var(--accent)]" />
            <div>
              <p className="text-[var(--text)]">search_skills</p>
              <p className="mt-0.5">Find the right prompt</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Braces className="size-4 text-[var(--accent)]" />
            <div>
              <p className="text-[var(--text)]">get_skill</p>
              <p className="mt-0.5">Read it only when needed</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-[var(--text-subtle)]">
            <ArrowDown className="size-4" />
            <p>Browse the library below</p>
          </div>
        </div>
      </div>
    </section>
  );
}
