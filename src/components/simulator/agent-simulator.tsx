"use client";

import { CheckCircle2, Play, Sparkles, Terminal, Zap } from "lucide-react";
import { useState } from "react";
import { useWebMcp } from "@/components/agent/webmcp-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { webMcpRegistry } from "@/infrastructure/webmcp";

interface Scenario {
  id: string;
  title: string;
  tag: string;
  description: string;
  tool: string;
  params: Record<string, unknown>;
  expectedOutcome: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "scenario-1",
    title: "1. Global Skill Discovery",
    tag: "READ",
    description:
      "Agent discovers skills matching 'Next.js App Router' from the global registry.",
    tool: "search_skills",
    params: { query: "Next.js", limit: 3 },
    expectedOutcome:
      "Returns 3 token-efficient skill summaries matching Next.js keywords.",
  },
  {
    id: "scenario-2",
    title: "2. Progressive Disclosure (Metadata)",
    tag: "TOKEN EFFICIENCY",
    description:
      "Agent inspects metadata and compatibility without retrieving bulky prompts.",
    tool: "get_skill_metadata",
    params: { id: "nextjs-app-router-architect" },
    expectedOutcome:
      "Returns author, license, tags, and hash without instruction content.",
  },
  {
    id: "scenario-3",
    title: "3. Full Instruction Adoption",
    tag: "PROMPT RETRIEVAL",
    description:
      "Agent downloads the complete markdown instruction body for adoption.",
    tool: "get_skill",
    params: { id: "typescript-strict-engineer" },
    expectedOutcome: "Returns complete Markdown instructions and references.",
  },
  {
    id: "scenario-4",
    title: "4. Human-Gated State Mutation",
    tag: "MUTATION & APPROVAL",
    description:
      "Agent requests to install 'ai-agent-evaluator'. Triggers live human approval modal.",
    tool: "install_skill",
    params: { id: "ai-agent-evaluator" },
    expectedOutcome:
      "Halts for human approval. Succeeds if user clicks Approve, denies if user clicks Deny.",
  },
];

const DEFAULT_TEMPLATES: Record<string, Record<string, unknown>> = {
  search_skills: { query: "TypeScript", limit: 5, category: "all" },
  get_skill_metadata: { id: "webmcp-browser-integration" },
  get_skill: { id: "webmcp-browser-integration" },
  list_my_skills: { favoritesOnly: "false" },
  install_skill: { id: "tailwind-css-tokens" },
  create_collection: {
    name: "Agentic Suite",
    description: "Skills for autonomous browser execution",
  },
};

export function AgentSimulator() {
  const { tools } = useWebMcp();
  const [activeTab, setActiveTab] = useState("scenarios");
  const [selectedTool, setSelectedTool] = useState<string>("search_skills");
  const [customParams, setCustomParams] = useState<string>(
    JSON.stringify(DEFAULT_TEMPLATES.search_skills, null, 2),
  );
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    toolName: string;
    durationMs: number;
    response: unknown;
    timestamp: string;
  } | null>(null);

  const handleToolChange = (toolName: string) => {
    setSelectedTool(toolName);
    const template = DEFAULT_TEMPLATES[toolName] || {};
    setCustomParams(JSON.stringify(template, null, 2));
  };

  const executeScenario = async (scenario: Scenario) => {
    setIsRunning(true);
    const startTime = performance.now();
    const res = await webMcpRegistry.execute(scenario.tool, scenario.params);
    const durationMs = Math.round(performance.now() - startTime);

    setExecutionResult({
      toolName: scenario.tool,
      durationMs,
      response: res,
      timestamp: new Date().toLocaleTimeString(),
    });
    setIsRunning(false);
  };

  const executeCustom = async () => {
    try {
      const parsed = JSON.parse(customParams);
      setIsRunning(true);
      const startTime = performance.now();
      const res = await webMcpRegistry.execute(selectedTool, parsed);
      const durationMs = Math.round(performance.now() - startTime);

      setExecutionResult({
        toolName: selectedTool,
        durationMs,
        response: res,
        timestamp: new Date().toLocaleTimeString(),
      });
    } catch {
      alert("Invalid JSON in parameter editor");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-lg)] space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="accent" size="sm" className="gap-1">
            <Zap className="w-3 h-3" />
            Interactive Agent Simulator
          </Badge>
          <span className="text-[11px] font-mono text-[var(--text-subtle)]">
            Judge & Developer Verification Playground
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
          WebMCP Agent Simulator
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-3xl leading-relaxed">
          Simulate a browser-based AI agent (such as ChatGPT or Chrome WebMCP)
          calling tools against Skill Browser. Test progressive disclosure,
          token-efficient queries, and human-in-the-loop permission prompts in
          real-time.
        </p>
      </div>

      <Tabs
        defaultValue="scenarios"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-[var(--surface-elevated)] p-1">
          <TabsTrigger value="scenarios" className="gap-2 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span>Pre-Built Verification Scenarios</span>
          </TabsTrigger>
          <TabsTrigger value="custom" className="gap-2 text-xs">
            <Terminal className="w-3.5 h-3.5" />
            <span>Manual Tool Playground</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Pre-built Scenarios */}
        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCENARIOS.map((sc) => (
              <Card
                key={sc.id}
                className="bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between"
              >
                <CardHeader className="p-4 pb-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
                      {sc.tag}
                    </span>
                    <Badge
                      variant="neutral"
                      size="sm"
                      className="font-mono text-[10px]"
                    >
                      {sc.tool}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-semibold">
                    {sc.title}
                  </CardTitle>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {sc.description}
                  </p>
                </CardHeader>

                <CardContent className="p-4 pt-2 space-y-3">
                  <div className="p-2.5 bg-[var(--surface-muted)] border border-[var(--border)] rounded text-[11px] font-mono text-[var(--text-subtle)] space-y-1">
                    <span className="text-[var(--text-muted)] block font-semibold">
                      Expected:
                    </span>
                    <span>{sc.expectedOutcome}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => executeScenario(sc)}
                    isLoading={isRunning}
                    className="w-full gap-1.5 text-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Scenario as Agent</span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab 2: Manual Tool Playground */}
        <TabsContent value="custom" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Tool Selection & Payload */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="tool-select"
                  className="text-xs font-mono text-[var(--text-muted)]"
                >
                  Select Registered WebMCP Tool *
                </label>
                <select
                  id="tool-select"
                  value={selectedTool}
                  onChange={(e) => handleToolChange(e.target.value)}
                  className="w-full h-10 px-3 text-xs font-mono bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:border-[var(--accent)] cursor-pointer"
                >
                  {tools.map((t) => (
                    <option key={t.name} value={t.name}>
                      {t.name} (
                      {t.name.startsWith("install") ||
                      t.name.startsWith("create")
                        ? "Mutation"
                        : "Read"}
                      )
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="params-editor"
                  className="text-xs font-mono text-[var(--text-muted)]"
                >
                  Input Parameters (JSON) *
                </label>
                <textarea
                  id="params-editor"
                  rows={8}
                  value={customParams}
                  onChange={(e) => setCustomParams(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-[var(--surface)] text-[var(--text)] border border-[var(--border)] rounded-[var(--radius-md)] focus:outline-none focus:border-[var(--accent)]"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={executeCustom}
                isLoading={isRunning}
                className="w-full gap-2 text-xs"
              >
                <Play className="w-4 h-4" />
                <span>Dispatch Tool Call</span>
              </Button>
            </div>

            {/* Right: Tool Schema Documentation */}
            <div className="lg:col-span-7">
              <Card className="h-full bg-[var(--surface)] border-[var(--border)]">
                <CardHeader className="p-4 pb-2 border-b border-[var(--border-subtle)]">
                  <CardTitle className="text-xs font-mono text-[var(--text-subtle)] uppercase">
                    Tool Definition & Schema
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3 text-xs font-mono">
                  {(() => {
                    const toolDef = tools.find((t) => t.name === selectedTool);
                    if (!toolDef) return null;
                    return (
                      <>
                        <div>
                          <span className="text-[var(--text-muted)]">
                            Name:{" "}
                          </span>
                          <span className="text-[var(--accent)] font-bold">
                            {toolDef.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--text-muted)]">
                            Description:{" "}
                          </span>
                          <span className="text-[var(--text)] font-sans text-xs">
                            {toolDef.description}
                          </span>
                        </div>
                        <div className="space-y-1 pt-2">
                          <span className="text-[var(--text-muted)]">
                            Schema Properties:
                          </span>
                          <pre className="p-3 bg-[var(--surface-muted)] rounded border border-[var(--border)] text-[11px] text-[var(--text-subtle)] overflow-x-auto">
                            {JSON.stringify(toolDef.inputSchema, null, 2)}
                          </pre>
                        </div>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Execution Results Terminal Box */}
      {executionResult && (
        <div className="p-4 bg-[var(--surface)] border border-[var(--accent)] rounded-[var(--radius-lg)] space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
              <span className="font-bold text-[var(--text)]">
                Tool Execution Result: {executionResult.toolName}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[var(--text-subtle)]">
              <span>{executionResult.timestamp}</span>
              <span className="px-1.5 py-0.2 bg-[var(--surface-elevated)] rounded border border-[var(--border)] text-[var(--accent)]">
                {executionResult.durationMs}ms
              </span>
            </div>
          </div>

          <pre className="p-3 bg-[var(--surface-muted)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text)] overflow-x-auto max-h-72">
            {JSON.stringify(executionResult.response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
