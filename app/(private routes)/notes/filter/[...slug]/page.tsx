import { QueryClient, HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/serverApi";
import NotesClient from "./Notes.client";

export default async function FilterPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const tag = slug[0] ?? "";

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { tag, page: 1, search: "" }],
    queryFn: () => fetchNotes({ tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}