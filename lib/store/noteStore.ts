import { create } from "zustand";

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStoreState {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  resetDraft: () => void;
}

const initialDraft: NoteDraft = { title: "", content: "", tag: "" };

export const useNoteStore = create<NoteStoreState>((set) => ({
  draft: initialDraft,
  setDraft: (draft) => set((state) => ({ draft: { ...state.draft, ...draft } })),
  resetDraft: () => set({ draft: initialDraft }),
}));
