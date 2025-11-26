// // import {useState} from 'react'
// // import {useEffect} from 'react'
// // import {useParams, Link} from 'react-router-dom'


// // function CountryCard(){
// //     const {code} = useParams()
// //     const [country, setCountry] = useState(null)
// //     const [border, setBorder] = useState([])
// //     const name = decodeURIComponent(document.URL.split("name=")[1]);

// //     useEffect(()=> {
// //         const fetchCountry = async() => {
// //             try{
// //             const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
            

// //             const data = await response.json()
// //             console.log(data[0])
// //             const countryData = data[0]
// //             setCountry(data[0])


// //             if (!countryData.borders || countryData.borders.length === 0){
// //                 setBorder([])
// //                 return
// //             }

// //             const fetchBorder = countryData.borders.map((border) => fetch(`https://restcountries.com/v3.1/alpha/${border}`))
// //             .then((res) => res.json())
// //             .then((data)=> console.log(data))

// //             const borders = await Promise.all(fetchBorder)
// //             setBorder(borders)
// //         }catch(error){
// //             console.error("Error fetching country data: ", error)
// //         }


// //             // await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            
// //             // const borderData = await fetchBorder.json()
// //             // sertBorder(borderData)
// //         }
// //         fetchCountry()
// //     }, [code])

// //    if(!country) return <h2>Loading...</h2>

// //     return(
// //         <>
// //     <Link to='/'>Back</Link>
// //     <h2>{country.name.common}</h2>
// //     <img src={country.flags.png} alt= {country.name.common}/>
// //     <h3>Population: {country.population} </h3>
// //     <h3>Region: {country.region}</h3>
// //     <h3>Capital: {country.capital[0]}</h3>

// //     {border && border.map((b) => (
// //     // <h4>{b}</h4>
// //     console.log({b})
// //        ))}
// //         </>
// //     )
// // }

// // export default CountryCard



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";

// function CountryCard() {
//     const {code} = useParams()
//     const [country, setCountry] = useState(null);
//     const [border, setBorder] = useState([]);

//   useEffect(() => {
//     const fetchCountry = async () => {
//       const response = await fetch(
//         `https://restcountries.com/v3.1/alpha/${code}`
//       );

//       const data = await response.json();
//       console.log(data[0]);
//       setCountry(data[0]);
//     //   const fetchBorder = await fetch(
//     //     `https://restcountries.com/v3.1/name/${name}?fullText=true`
//     //   )
//     //   const borderData = await fetchBorder.json()
//     //   setBorder(borderData)
//     // try 2 ------------------------
//     //   const fetchBorder = country.borders.map((border) => (
//     //   fetch(
//     //     `https://restcountries.com/v3.1/alpha/${border}`
//     //   )
//     //   .then((res => res.json()))
//     //   .then((data => console.log(data)))
//     //   ))
//       // end of try 2 ----------------
//     };
//     fetchCountry();
//   }, [code]);
//   // use another useEffect
// //   useEffect(() => {
// //     const fetchBorder = country.borders.map((border) => (
// //       fetch(
// //         `https://restcountries.com/v3.1/alpha/${border}`
// //       )
// //       .then((res => res.json()))
// //       .then((data => console.log(data)))
// //       ))
// //       fetchBorder();
// //   }, [country]);
//   if(!country) return <h2>Loading...</h2>
//   if(country) {
//     const fetchBorder = country.borders.map((border) => (
//       fetch(
//         `https://restcountries.com/v3.1/alpha/${border}`
//       )
//       .then((res => res.json()))
//       //.then((data => console.log(data)))
//       .then((res => console.log(res[0].name)))
//       //.then(setBorder(prevBorder => [...prevBorder, res]))
//       ))
//   }
//   return (
//     <>
//       <Link to='/'>Back</Link>
//       <h2>{country.name.common}</h2>
//       <img src ={country.flags.png} />
//       <h3>Population: {country.population}</h3>
//       <h3>Region: {country.region}</h3>
//       <h3>Capital: {country.capital}</h3>
//       {country.borders && country.borders.map((country) => (
//         <h4>{country}</h4>
//       ) ) }
//     </>
//   );
// }
// export default CountryCard;

import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import type { Country } from "../types/country";
import {CountryDetail} from "../components/CountryDetail"
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { BackButton } from "./BackButton";


function CountryCard() {
  const {code} =useParams<{code: string}>()
  const [country,setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(true)
  const [borderCountries, setBorderCountries] = useState<Country[]>([])
  const [error, setError] = useState<string | null>(null)


useEffect(()=> {
  const fetchCountry = async () => {
    if(!code) return;

    try{
      setLoading(true)
      setError(null)

      const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      console.log(response)

      if (!response.ok) {
        throw new Error('Country not found')
      }
     
      const data = await response.json()
      const countryData = data[0]
      setCountry(countryData)

      //fetch border countries
      if (countryData.borders && countryData.borders.length > 0) {
        console.log("Borders codes:", countryData.borders);
        const borderPromises = countryData.borders.map(
          (border: string)=> 
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res) => {
          if (!res.ok) throw new Error ('Border country not found')
            return res.json()
        }
      )
        )

      const bordersData = await Promise.all(borderPromises);
        setBorderCountries(bordersData.map((b)=> b[0]))
      }else{
        setBorderCountries([])
      }
    }catch(error){
      setError(error instanceof Error ? error.message: 'An err occurred')

    }finally{
      setLoading(false)
    }
  }
  fetchCountry()
},[code])

if (loading)
  return <LoadingSpinner/>

if(error){
  return (
    <div>
  <BackButton />
  <ErrorMessage message={error}/>
  </div>
  )}

  if (!country) {
    return(
      <div>
    <BackButton />
    <ErrorMessage message="Country not found" />
    </div>
  )
  }

//Render details
  return (
    <div>
    <BackButton />
    <CountryDetail 
    country={country} 
    borderCountries={borderCountries} />
    </div>
  )
}
export default CountryCard