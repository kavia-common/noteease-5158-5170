import React, { useState } from "react";

// PUBLIC_INTERFACE
export function SearchBar({
  onSearch,
  initialValue,
}: {
  onSearch: (q: string) => void;
  initialValue?: string;
}) {
  const [search, setSearch] = useState(initialValue || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  return (
    <form className="mb-8 flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border border-slate-300 px-3 py-2 rounded text-slate-700"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="bg-primary px-3 py-2 rounded text-white">
        Search
      </button>
    </form>
  );
}
