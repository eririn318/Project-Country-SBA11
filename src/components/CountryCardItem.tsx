import {Link} from 'react-router-dom'
import type { Country } from '../types/country'

interface CountryCardItemProps {
    country: Country
}

export function CountryCardItem ({country}:CountryCardItemProps ) {
    return (
        <>
        <Link
        to={`/country/${country.cca3}`}
        >
            <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`} />
    <div>
        <h3>{country.name.common}</h3>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Capital: {country.capital?.[0] || 'N/A'}</p>
    </div>
        </Link>
        </>
    )

}