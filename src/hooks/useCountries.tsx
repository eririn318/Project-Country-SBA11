import { useState, useEffect } from "react";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(true);
  //null=(no value yet/start with no error yet)
  const [error, setError] = useState(null);

  useEffect(() => {
    // async makes your function automatically return a Promise
    // await pauses inside that function until the Promise resolves
    const fetchCountries = async () => {
      try {
        setLoading(true);
        // await =(wait here until the server replies.)
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca3,borders"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        // This takes the messy raw HTTP response and turns it into JavaScript object data.
        const data = await response.json();

        //Now UI know the countries
        setCountries(data);
      } catch (error) {
        // if Error, 'Failed to fetch countries', if other error, 'An Error occurred'
        setError(error instanceof Error ? error.message : "An Error occurred");
      } finally {
        // no matter success or error, stop loading
        setLoading(false);
      }
    };
    // call function fetchCountries
    fetchCountries();
  }, []);

  useEffect(() => {
    // result = countries =(useState initial value [], after loaded will become with all data)
    // ... = (creates a new array, so you don’t mutate the original accidentally.)
    let result = [...countries];

    if (searchTerm) {
      //filter when searchTerm is not empty
      result = result.filter((country) =>
        //country.name.common = {data from fetch  country.name(object).common(object of name)}
        //check if the country’s common name contains the search term (case-insensitive)
        country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedRegion) {
      // filter when selectedRegion is selected
      result = result.filter((country) => country.region === selectedRegion);
    }

    // change setFilteredCountries by each result(by region or by search)
    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, countries]);

  // The return statement sends all these values out of the hook,
  // so your component can use them.

  // Without return, your components would have no access to the values your hook calculated.
  return {
    // The filtered list of countries your UI should display.
    countries: filteredCountries,

    // Boolean: true.false-whether fetch is still loading
    loading,

    // Error message if something went wrong
    error,

    // state+setter for search input
    searchTerm,

    // used to filter by country name
    setSearchTerm,

    // state+setter for region dropdown
    selectedRegion,

    // updates the chosen region for filtering
    setSelectedRegion,
  };
}
