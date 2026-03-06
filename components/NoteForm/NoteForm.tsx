"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, resetDraft } = useNoteStore();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      resetDraft();
      router.back();
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(draft);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={draft.title}
        onChange={(e) => setDraft({ title: e.target.value })}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={draft.content}
        onChange={(e) => setDraft({ content: e.target.value })}
        placeholder="Content"
        required
      />
      <select
        name="tag"
        value={draft.tag}
        onChange={(e) => setDraft({ tag: e.target.value })}
      >
        <option value="">Select tag</option>
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>
      <button type="button" onClick={() => router.back()}>
        Cancel
      </button>
      <button type="submit" disabled={isPending}>
        Save
      </button>
    </form>
  );
}
