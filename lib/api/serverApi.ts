import axios from "axios";
import { cookies } from "next/headers";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function getHeaders() {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
}

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/notes`, { params, headers });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/users/me`, { headers });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${baseURL}/auth/session`, { headers });
  return data ?? null;
};