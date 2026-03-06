import Link from "next/link";
import { Note } from "@/types/note";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link href={`/notes/${note.id}`}>{note.title}</Link>
          <p>{note.content}</p>
          {note.tag && <span>{note.tag}</span>}
        </li>
      ))}
    </ul>
  );
}
