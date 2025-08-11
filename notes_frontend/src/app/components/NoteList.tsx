import React from "react";

// PUBLIC_INTERFACE
export function NoteList({
  notes,
  onSelect,
  onCreate,
}: {
  notes: Array<{ id: string; title: string; updatedAt: string }>;
  onSelect: (id: string) => void;
  onCreate: () => void;
}) {
  return (
    <div>
      <header className="mb-5 flex items-center justify-between">
        <div className="text-2xl font-semibold text-primary">Notes</div>
        <button className="bg-accent hover:bg-primary text-white px-4 py-2 rounded" onClick={onCreate}>
          + New
        </button>
      </header>
      <ul className="space-y-4">
        {notes.length === 0 && (
          <div className="text-slate-400">No notes found. Create your first note!</div>
        )}
        {notes.map((note) => (
          <li
            key={note.id}
            className="rounded border border-slate-200 px-5 py-4 cursor-pointer hover:shadow transition group"
            onClick={() => onSelect(note.id)}
          >
            <div className="font-semibold text-lg text-primary group-hover:text-accent transition">
              {note.title}
            </div>
            <div className="text-xs text-slate-400 mt-1">
              Last updated: {new Date(note.updatedAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
