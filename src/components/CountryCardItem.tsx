import {Link} from 'react-router-dom'
import type { Country } from '../types/country'

interface CountryCardItemProps {
    country: Country
}

export function CountryCardItem ({country}:CountryCardItemProps ) {
    return (
        <div>
        <Link
        to={`/country/${country.cca3}`}
        >
            <img 
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`} />
    <div>
        <h3>{country.name.common}</h3>
        <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
        <p><span className="font-semibold">Region:</span> {country.region}</p>
        <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
    </div>
        </Link>
        </div>
    )

}