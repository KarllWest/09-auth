import axiosInstance from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";
import { AxiosResponse } from "axios";

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
  const { data } = await axiosInstance.get("/notes", { params, headers });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getHeaders();
  const { data } = await axiosInstance.get(`/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getHeaders();
  const { data } = await axiosInstance.get("/users/me", { headers });
  return data;
};

export const checkSession = async (): Promise<AxiosResponse> => {
  const headers = await getHeaders();
  return await axiosInstance.get("/auth/session", { headers });
};