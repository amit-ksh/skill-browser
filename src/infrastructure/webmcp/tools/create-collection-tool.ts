import { AppError } from "@/contracts";
import { createCollection } from "@/domain/services/collection-services";
import { mutationApprovalManager } from "@/infrastructure/security/mutation-approval-manager";
import type { WebMcpToolDefinition, WebMcpToolHandler } from "../types";

export const createCollectionToolDef: WebMcpToolDefinition = {
  name: "create_collection",
  description:
    "Create a new collection in the user's Skillspace to organize skills for specific workflows. Requires human user approval.",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "The name of the new collection (e.g. 'Frontend Pro Suite').",
      },
      description: {
        type: "string",
        description:
          "Optional description of what tasks this collection serves.",
      },
    },
    required: ["name"],
  },
};

export const createCollectionToolHandler: WebMcpToolHandler = async (
  params,
) => {
  const name = params.name as string;
  const description = (params.description as string) || "";

  if (!name || typeof name !== "string") {
    throw new AppError(
      "INVALID_INPUT",
      "Collection parameter 'name' is required.",
    );
  }

  // Request Human-in-the-loop approval
  const approved = await mutationApprovalManager.requestApproval(
    "create_collection",
    `Create Collection "${name}"`,
    `Agent requested to create a new collection "${name}" in your Skillspace.`,
    { name, description },
  );

  if (!approved) {
    throw new AppError(
      "PERMISSION_DENIED",
      `User denied collection creation for '${name}'.`,
    );
  }

  const collection = await createCollection(name, description);

  return {
    status: "completed",
    collection,
  };
};
