export default function NotesClient({ slug }: { slug: string[] }) {
  return (
    <div>
      <h1>Notes for {slug.join("/")}</h1>
      {/* Сюди потім додасте список нотаток */}
    </div>
  );
}
