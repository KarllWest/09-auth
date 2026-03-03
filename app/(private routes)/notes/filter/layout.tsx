export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Filter Notes</h1>
      {children}
    </div>
  );
}
