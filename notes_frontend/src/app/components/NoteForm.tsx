import React, { useState } from "react";

// PUBLIC_INTERFACE
export function NoteForm({
  note,
  onSave,
  onCancel,
  mode,
}: {
  note?: { id: string; title: string; content: string };
  onSave: (note: { id?: string; title: string; content: string }) => void;
  onCancel: () => void;
  mode: "edit" | "create";
}) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim().length === 0 || content.trim().length === 0) {
      alert("Title and content are required.");
      return;
    }
    onSave({ id: note?.id, title, content });
  };

  return (
    <div>
      <button
        onClick={onCancel}
        className="text-primary text-sm px-2 py-1 rounded hover:bg-slate-100 mb-4"
        aria-label="Back"
      >
        ← Back
      </button>
      <form
        className="bg-slate-50 border border-slate-200 rounded p-6 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-primary mb-4">
          {mode === "edit" ? "Edit Note" : "New Note"}
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary mb-1" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            type="text"
            autoFocus
            className="w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={120}
            placeholder="Enter note title..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-secondary mb-1" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="w-full min-h-[120px] resize-vertical"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            maxLength={5000}
            placeholder="Type your note here..."
          />
        </div>
        <div className="flex gap-3 mt-8 justify-end">
          <button type="submit" className="bg-primary px-4 py-2 text-white rounded">
            {mode === "edit" ? "Save" : "Create"}
          </button>
          <button type="button" className="bg-accent px-4 py-2 text-white rounded" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
