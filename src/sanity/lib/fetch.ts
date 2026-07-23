import type { QueryParams } from "next-sanity";
import { client } from "./client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<QueryResponse | null> {
  if (
    client.config().projectId === "placeholder" ||
    !client.config().projectId
  ) {
    console.warn("Sanity Project ID is missing or set to placeholder.");
    return null;
  }
  try {
    const data = await client.fetch<QueryResponse>(query, params, {
      next: { revalidate: 60, tags },
    });
    return data;
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return null;
  }
}
