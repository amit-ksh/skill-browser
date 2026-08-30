export interface PendingApprovalRequest {
  approvalId: string;
  toolName: string;
  title: string;
  description: string;
  params: Record<string, unknown>;
  createdAt: string;
  expiresAt: string;
  status: "pending" | "approved" | "denied" | "expired";
}

type ApprovalResolver = (approved: boolean) => void;

class MutationApprovalManager {
  private pendingQueue: Map<
    string,
    { request: PendingApprovalRequest; resolve: ApprovalResolver }
  > = new Map();

  async requestApproval(
    toolName: string,
    title: string,
    description: string,
    params: Record<string, unknown>,
  ): Promise<boolean> {
    const approvalId = `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000).toISOString(); // 5 min TTL

    const request: PendingApprovalRequest = {
      approvalId,
      toolName,
      title,
      description,
      params,
      createdAt: now.toISOString(),
      expiresAt,
      status: "pending",
    };

    return new Promise((resolve) => {
      this.pendingQueue.set(approvalId, { request, resolve });

      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("webmcp-approval-requested", { detail: request }),
        );
      }
    });
  }

  resolveApproval(approvalId: string, approved: boolean) {
    const entry = this.pendingQueue.get(approvalId);
    if (!entry) return;

    entry.request.status = approved ? "approved" : "denied";
    entry.resolve(approved);
    this.pendingQueue.delete(approvalId);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("webmcp-approval-resolved", {
          detail: { approvalId, approved },
        }),
      );
    }
  }

  getPendingRequests(): PendingApprovalRequest[] {
    return Array.from(this.pendingQueue.values()).map((e) => e.request);
  }
}

export const mutationApprovalManager = new MutationApprovalManager();
