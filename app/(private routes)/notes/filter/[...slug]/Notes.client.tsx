"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNotes } from "@/lib/api/clientApi";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

interface NotesClientProps {
  tag: string;
}

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", { tag, page, search: debouncedSearch }],
    queryFn: () => fetchNotes({ tag, page, search: debouncedSearch }),
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div>
      <Link href="/notes/action/create">Create New Note</Link>
      <SearchBox value={search} onChange={handleSearchChange} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {data && (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
