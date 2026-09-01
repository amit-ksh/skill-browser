import { z } from "zod";
import {
  SkillsShCatalogError,
  skillsShSkillRepository,
} from "@/infrastructure/repositories/skills-sh-skill-repository";

const QuerySchema = z.object({
  q: z.string().max(120).optional(),
  id: z.string().max(240).optional(),
  page: z.coerce.number().int().min(0).max(10_000).default(0),
  perPage: z.coerce.number().int().min(1).max(100).default(30),
});

function errorResponse(message: string, status: number, code: string) {
  return Response.json({ error: code, message }, { status });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsedQuery = QuerySchema.safeParse({
    q: url.searchParams.get("q") || undefined,
    id: url.searchParams.get("id") || undefined,
    page: url.searchParams.get("page") || undefined,
    perPage: url.searchParams.get("perPage") || undefined,
  });

  if (!parsedQuery.success) {
    return errorResponse("Invalid catalog query.", 400, "INVALID_INPUT");
  }

  const token = process.env.VERCEL_OIDC_TOKEN;
  if (!token) {
    return errorResponse(
      "The live skills.sh catalog requires Vercel OIDC.",
      503,
      "SKILLS_SH_AUTH_REQUIRED",
    );
  }

  try {
    if (parsedQuery.data.id) {
      const skill = await skillsShSkillRepository.get(
        token,
        parsedQuery.data.id,
      );
      return Response.json(skill);
    }

    const result = await skillsShSkillRepository.list(token, {
      query: parsedQuery.data.q,
      page: parsedQuery.data.page,
      perPage: parsedQuery.data.perPage,
    });
    return Response.json(result);
  } catch (error) {
    if (error instanceof SkillsShCatalogError) {
      return errorResponse(error.message, error.status, "SKILLS_SH_ERROR");
    }
    return errorResponse(
      "The live skills.sh catalog is temporarily unavailable.",
      502,
      "SKILLS_SH_ERROR",
    );
  }
}
