export default async function InterceptedNoteModal({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Intercepted Modal for Note {id}</h1>
      {/* Сюди пізніше додасте компонент Modal та NotePreview */}
    </div>
  );
}