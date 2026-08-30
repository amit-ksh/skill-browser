import { z } from "zod";

export const AppErrorCodeSchema = z.enum([
  "SKILL_NOT_FOUND",
  "INVALID_SKILL",
  "INVALID_INPUT",
  "IMPORT_FAILED",
  "SOURCE_UNAVAILABLE",
  "PERMISSION_REQUIRED",
  "PERMISSION_DENIED",
  "WEBMCP_UNAVAILABLE",
  "WEBMCP_REGISTRATION_FAILED",
  "STORAGE_UNAVAILABLE",
  "CONFLICT",
  "INTERNAL_ERROR",
]);

export type AppErrorCode = z.infer<typeof AppErrorCodeSchema>;

export class AppError extends Error {
  readonly code: AppErrorCode;
  readonly details?: Record<string, unknown>;

  constructor(
    code: AppErrorCode,
    message: string,
    details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
  }
}
