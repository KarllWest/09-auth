"use client";

import { FormEvent, useState } from "react";

interface NoteFormData {
  title: string;
  content: string;
  tag: string;
}

interface NoteFormProps {
  onSubmit: (data: NoteFormData) => void;
  initialData?: Partial<NoteFormData>;
}

export default function NoteForm({ onSubmit, initialData = {} }: NoteFormProps) {
  const [title, setTitle] = useState(initialData.title ?? "");
  const [content, setContent] = useState(initialData.content ?? "");
  const [tag, setTag] = useState(initialData.tag ?? "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <input
        name="tag"
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag"
      />
      <button type="submit">Save</button>
    </form>
  );
}
