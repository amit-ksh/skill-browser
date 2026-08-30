"use client";

import { AlertCircle, Bot, Check, ShieldAlert, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  mutationApprovalManager,
  type PendingApprovalRequest,
} from "@/infrastructure/security/mutation-approval-manager";

export function ApprovalDialog() {
  const [activeRequest, setActiveRequest] =
    useState<PendingApprovalRequest | null>(null);

  useEffect(() => {
    const handleRequested = (e: Event) => {
      const customEvent = e as CustomEvent<PendingApprovalRequest>;
      if (customEvent.detail) {
        setActiveRequest(customEvent.detail);
      }
    };

    const handleResolved = () => {
      setActiveRequest(null);
    };

    window.addEventListener("webmcp-approval-requested", handleRequested);
    window.addEventListener("webmcp-approval-resolved", handleResolved);

    return () => {
      window.removeEventListener("webmcp-approval-requested", handleRequested);
      window.removeEventListener("webmcp-approval-resolved", handleResolved);
    };
  }, []);

  const handleApprove = () => {
    if (!activeRequest) return;
    mutationApprovalManager.resolveApproval(activeRequest.approvalId, true);
    setActiveRequest(null);
  };

  const handleDeny = () => {
    if (!activeRequest) return;
    mutationApprovalManager.resolveApproval(activeRequest.approvalId, false);
    setActiveRequest(null);
  };

  if (!activeRequest) return null;

  return (
    <Dialog
      isOpen={!!activeRequest}
      onClose={handleDeny}
      title={
        <div className="flex items-center gap-2 text-[var(--warning)]">
          <ShieldAlert className="w-5 h-5" />
          <span>Agent Mutation Approval Required</span>
        </div>
      }
      description="A browser AI agent is requesting permission to mutate your local Skillspace."
      footer={
        <div className="flex items-center justify-between w-full">
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeny}
            className="gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Deny Request</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleApprove}
            className="gap-1.5 bg-[var(--success)] hover:bg-[var(--success)]/90 text-white"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Approve & Execute</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-4 py-2 text-xs">
        {/* Header Summary */}
        <div className="p-3.5 bg-[var(--surface-muted)] border border-[var(--border)] rounded-[var(--radius-md)] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text)]">
              <Bot className="w-4 h-4 text-[var(--accent)]" />
              <span>{activeRequest.title}</span>
            </div>
            <Badge variant="warning" size="sm">
              {activeRequest.toolName}
            </Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            {activeRequest.description}
          </p>
        </div>

        {/* Parameters Preview */}
        <div className="space-y-1">
          <span className="font-mono text-[var(--text-subtle)]">
            Tool Request Payload:
          </span>
          <pre className="p-3 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-sm)] font-mono text-[11px] text-[var(--text)] overflow-x-auto">
            {JSON.stringify(activeRequest.params, null, 2)}
          </pre>
        </div>

        {/* Security Alert Notice */}
        <div className="flex items-start gap-2 text-[11px] text-[var(--text-subtle)] pt-1">
          <AlertCircle className="w-4 h-4 text-[var(--warning)] shrink-0 mt-0.5" />
          <span>
            Human-in-the-loop protection is active. The agent cannot proceed
            with mutations until you explicitly approve or deny this request.
          </span>
        </div>
      </div>
    </Dialog>
  );
}
