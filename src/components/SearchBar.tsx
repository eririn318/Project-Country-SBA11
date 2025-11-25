import type { ChangeEvent } from "react";
import { BackButton } from "./BackButton";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void
    placeholder?: string
}

export function SearchBar({value, onChange, placeholder = "Search..."}:SearchBarProps) {

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div>
          
            <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            // aria-label is an HTML attribute used to improve accessibility for people using screen readers.
            // aria-label="Search countries" 
            />
        </div>

    
    )
}