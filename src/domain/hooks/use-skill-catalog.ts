"use client";

import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getSkillCatalog } from "@/infrastructure/api/skills-sh-client";

export const skillCatalogQueries = {
  all: ["skill-catalog"] as const,
  list: (page: number, perPage: number, query: string) =>
    queryOptions({
      queryKey: [...skillCatalogQueries.all, "list", page, perPage, query],
      queryFn: ({ signal }) =>
        getSkillCatalog({ page, perPage, query, signal }),
      placeholderData: keepPreviousData,
    }),
};

function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timeoutId);
  }, [delay, value]);

  return debouncedValue;
}

export function useSkillCatalog({
  page,
  perPage,
  query,
  enabled,
}: {
  page: number;
  perPage: number;
  query: string;
  enabled: boolean;
}) {
  const cleanQuery = query.trim();
  const normalizedQuery = cleanQuery.length >= 2 ? cleanQuery : "";
  const debouncedQuery = useDebouncedValue(
    normalizedQuery,
    cleanQuery.length >= 2 ? 250 : 0,
  );

  const catalogQuery = useQuery({
    ...skillCatalogQueries.list(page, perPage, debouncedQuery),
    enabled,
  });

  return {
    ...catalogQuery,
    isDebouncing: enabled && debouncedQuery !== normalizedQuery,
  };
}
