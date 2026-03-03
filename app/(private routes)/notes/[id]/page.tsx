export default async function NotePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <div>
      <h1>Сторінка нотатки {id}</h1>
    </div>
  );
}