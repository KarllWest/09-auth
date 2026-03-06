"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";

export default function NoteDetailsClient({ id }: { id: string }) {
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading note</p>;

  return (
    <div>
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
      {note?.tag && <span>{note.tag}</span>}
    </div>
  );
}
