
// import {Country}=(named export)--file looks like--> export interface Country { ... }, so you need {}
// import type {Country} =(named export type only)--Do not import any other than type. export type Country = { ... }, so you need {}
// import Country =(default import), you do not need {}
import { Link } from 'react-router-dom';
import type {Country} from '../types/country'

//props is data passed into a React component from a parent component
// pass these data and use it there
interface CountryDetailProps {
    country: Country;
    borderCountries: Country[]

}

export function CountryDetail({country, borderCountries}: CountryDetailProps) {
    // country.name.nativeName= ex: jpn:->key, common->value
//   jpn: { common: "日本" },
//   eng: { common: "Japan" }
// } This is object
    const nativeName = country.name.nativeName 

    // Object.values takes the values of an object and return them as an array,common->values in array/ [0] is  { common: "日本" }
    // [
    //     { common: "日本" },
    //     { common: "Japan" }
    //   ]
    // overall this means =(“If nativeName exists, get the FIRST nativeName’s common field.”)
    // ?.common=(if object exists, get .common, if not return undefined)
    // {common: "日本"}?.common or undefined
    ? Object.values(country.name.nativeName)[0]?.common
    : country.name.common

    const currencies = country.currencies
    // .join=(join them into a single string separated by commas)
    ?Object.values(country.currencies).map(c=> c.name).join(',')
    : 'N/A'

    const language = country.languages
? Object.values(country.languages).join(',')
: "N/A"



return (
    <div>
    <img
    src={country.flags.png}
    alt={`Flag of {country.name.common}`}
    />


    <div>
        <h2>{country.name.common}</h2>
        <p>Native Name: {nativeName}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Sub Region: {country.subregion || 'N/A'}</p>
        <p>Capital: {country.capital?.[0] || 'N/A'}</p>
        <p>Top Level Domain: {country.tld}</p>
        <p>Currencies: {currencies}</p>
        <p>Languages: {language}</p>
    </div>
    
    {borderCountries.length > 0 && (
        <div>
    <h1>Border Countries: </h1>
    {borderCountries.map(border => (
        <Link
        key={border.cca3}
        to={`/country/${border.cca3}`}
        >
            {border.name.common}
        </Link>
    ))}
    </div>
    )}
    </div>
)}

export default CountryDetail