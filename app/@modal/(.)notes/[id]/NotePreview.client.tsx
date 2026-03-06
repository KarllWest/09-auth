"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import Modal from "@/components/Modal/Modal";

export default function NotePreviewClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: note, isLoading, isError } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <Modal>
      <button onClick={() => router.back()}>Close</button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading note</p>}
      {note && (
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          {note.tag && <span>{note.tag}</span>}
        </div>
      )}
    </Modal>
  );
}
