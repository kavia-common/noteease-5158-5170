import React from "react";

// PUBLIC_INTERFACE
export function NoteView({
  note,
  onEdit,
  onDelete,
  onBack,
}: {
  note: { id: string; title: string; content: string; updatedAt: string };
  onEdit: () => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="text-primary text-sm px-2 py-1 rounded hover:bg-slate-100 mb-4"
        aria-label="Back"
      >
        ← Back
      </button>
      <div className="p-5 border border-slate-200 rounded bg-slate-50">
        <h2 className="font-bold text-2xl text-primary mb-2">{note.title}</h2>
        <p className="text-slate-700 mb-6 whitespace-pre-line">{note.content}</p>
        <div className="text-xs text-slate-400 mb-5">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </div>
        <div className="flex gap-2">
          <button className="bg-primary hover:bg-accent text-white px-4 py-2 rounded" onClick={onEdit}>
            Edit
          </button>
          <button className="bg-accent hover:bg-primary text-white px-4 py-2 rounded" onClick={() => onDelete(note.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
