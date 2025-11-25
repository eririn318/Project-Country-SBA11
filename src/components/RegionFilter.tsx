import type {ChangeEvent} from 'react'

// child can not state itself, but it calls onChange to let the parent update it
interface RegionFilterProps {
    value:string
    // This function(onChange) receives a string and returns nothing (void).
    onChange: (value:string) => void
}

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

export function RegionFilter({ value, onChange }: RegionFilterProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    };

return(
    <div>
        <select
        value={value}
        onChange={handleChange}
        aria-label="Filter by region"
        >
            <option value="">Filter by Region</option>
            {regions.map(region => (
                <option key={region} value={region}>{region}</option>
            ))}
            </select></div>
        )
            }







