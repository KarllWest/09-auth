import axiosInstance from "./api";
import { User } from "@/types/user";

interface AuthCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export interface Note {
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

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const { data } = await axiosInstance.get("/notes", { params });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.get(`/notes/${id}`);
  return data;
};

export const createNote = async (note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const { data } = await axiosInstance.post("/notes", note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axiosInstance.delete(`/notes/${id}`);
  return data;
};

export const register = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/register", credentials);
  return data;
};

export const login = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
};

export const logout = async (): Promise<void> => {
  await axiosInstance.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  const { data } = await axiosInstance.get("/auth/session");
  return data ?? null;
};

export const getMe = async (): Promise<User> => {
  const { data } = await axiosInstance.get("/users/me");
  return data;
};

export const updateMe = async (
  updates: Partial<Pick<User, "username">>
): Promise<User> => {
  const { data } = await axiosInstance.patch("/users/me", updates);
  return data;
};