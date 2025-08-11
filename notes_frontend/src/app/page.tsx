"use client";
import { useEffect, useState } from "react";
import { NoteList } from "./components/NoteList";
import { NoteView } from "./components/NoteView";
import { NoteForm } from "./components/NoteForm";
import { SearchBar } from "./components/SearchBar";

// PUBLIC_INTERFACE
export default function Home() {
  type Note = {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
  };
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"list" | "view" | "edit" | "create" | "search">("list");
  const [search, setSearch] = useState<string>("");

  // Simulate notes fetch (replace with backend API call)
  useEffect(() => {
    // TODO: Connect to backend/database (REST API)
    setNotes([
      { id: "1", title: "Welcome to NoteEase", content: "This is your first note. Feel free to edit or delete.", updatedAt: new Date().toISOString() },
      { id: "2", title: "Try searching notes", content: "You can use the search feature to quickly find notes by title or content.", updatedAt: new Date().toISOString() },
    ]);
  }, []);

  const selectNote = (id: string) => {
    setSelectedId(id);
    setMode("view");
  };

  const startEdit = () => setMode("edit");
  const startCreate = () => {
    setSelectedId(null);
    setMode("create");
  };

  const handleDelete = (id: string) => {
    setNotes((prev: Note[]) => prev.filter((note) => note.id !== id));
    setMode("list");
  };

  const handleSave = (note: { id?: string; title: string; content: string }) => {
    if (note.id) {
      // Editing
      setNotes((prev: Note[]) =>
        prev.map((n) => (n.id === note.id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n))
      );
      setSelectedId(note.id);
      setMode("view");
    } else {
      // Creating
      const id = (Date.now() + Math.floor(Math.random() * 1000)).toString();
      setNotes((prev: Note[]) => [
        ...prev,
        { ...note, id, updatedAt: new Date().toISOString() }
      ]);
      setSelectedId(id);
      setMode("view");
    }
  };

  const handleSearch = (q: string) => {
    setSearch(q);
    setMode("search");
  };

  // Filter notes for search
  const filteredNotes: Note[] = search.length > 0
    ? notes.filter((n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.content.toLowerCase().includes(search.toLowerCase())
      )
    : notes;

  // Routing simulation (could use router for multi-page)
  if (mode === "create") {
    return (
      <NoteForm
        onSave={handleSave}
        onCancel={() => setMode("list")}
        mode="create"
      />
    );
  }
  if (mode === "edit" && selectedId) {
    const note = notes.find((n) => n.id === selectedId);
    if (!note) return <div>Note not found.</div>;
    return (
      <NoteForm
        note={note}
        onSave={handleSave}
        onCancel={() => setMode("view")}
        mode="edit"
      />
    );
  }
  if (mode === "view" && selectedId) {
    const note = notes.find((n) => n.id === selectedId);
    if (!note) return <div>Note not found.</div>;
    return (
      <NoteView
        note={note}
        onEdit={startEdit}
        onDelete={handleDelete}
        onBack={() => setMode("list")}
      />
    );
  }
  if (mode === "search") {
    return (
      <div>
        <SearchBar onSearch={handleSearch} initialValue={search} />
        <NoteList
          notes={filteredNotes}
          onSelect={selectNote}
          onCreate={startCreate}
        />
      </div>
    );
  }
  // Default mode: list
  return (
    <div>
      <SearchBar onSearch={handleSearch} initialValue={search} />
      <NoteList
        notes={notes}
        onSelect={selectNote}
        onCreate={startCreate}
      />
    </div>
  );
}
