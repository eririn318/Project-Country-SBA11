import type { ChangeEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="">
      <input
        className="border border-1 lg:w-100 pl-3 md:w-50"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        // aria-label is an HTML attribute used to improve accessibility for people using screen readers.
        // aria-label="Search countries"
      />
    </div>
  );
}
