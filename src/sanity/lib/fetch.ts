import { client } from "./client";

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<QueryResponse | null> {
  // If the project ID hasn't been set up yet, fail gracefully.
  if (client.config().projectId === "placeholder-project-id" || !client.config().projectId) {
    console.warn("Sanity Project ID is missing or set to placeholder. Returning null.");
    return null;
  }

  try {
    const data = await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate: 3600, // Revalidate every hour
        tags,
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching from Sanity:", error);
    return null;
  }
}
