export const noteStore = {
  notes: [] as Note[],
  addNote(note: Note) {
    this.notes.push(note);
  },
  getNotes() {
    return this.notes;
  },
};

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};