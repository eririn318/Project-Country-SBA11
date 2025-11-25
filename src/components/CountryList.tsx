import {useCountries} from '../hooks/useCountries'
import { RegionFilter } from './RegionFilter'
import { SearchBar } from './SearchBar'
import {LoadingSpinner} from './LoadingSpinner'
import {ErrorMessage} from './ErrorMessage'
import { CountryCardItem } from './CountryCardItem'

function CountryList(){
    const {countries, loading, error , searchTerm , setSearchTerm, selectedRegion, setSelectedRegion} = useCountries()

    if (loading) {
        return<LoadingSpinner />
    }

    if (error) {
        return<ErrorMessage message={error} />
    }

    return(
        <>
        <div>
        <SearchBar 
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder='🔍 Search for a country'
        />

        <RegionFilter
        value={selectedRegion}
        onChange={setSelectedRegion}
        />
        </div>

        {countries.length ===0 ? (
            <div>
                <p>No countries found matching your criteria</p>
            </div>
        ):(
            <div>
                {countries.map(country=> (
                    <CountryCardItem key={country.cca3} country={country} />
               ) )}
            </div>
        )}
    </>
    )
}

export default CountryList