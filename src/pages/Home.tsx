// import { useEffect, useState } from "react";
// import {Link} from 'react-router-dom'

// function Home() {
//   const [countries, setCountries] = useState([]);
//   useEffect(() => {
//     const fetchCountry = async () => {
//       try {
//         const response = await fetch(
//           "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3,borders"
//         );

//         const data = await response.json();
//         console.log(data);

//         setCountries(data);
        

//         // .then(res => res.json())
//         // .then(data => setCountries(data))
//         // console.log(countries);}
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCountry();
//     // console.log(countries);
//   }, []);

//   return (
//     <>
//       <h2>All Countries</h2>
//       {countries &&
//         countries.map((country) => (
//             <Link to={`/country/${country.cca3}`}>
//                 <div>
//                 <img src={country.flags.png} alt={country.name.common}/>
//                 <h3>{country.name.common}</h3>
//                 </div>
//             </Link>
//         //   return <li> {country.name.common}</li>;
//         ))}
//     </>
//   );
// }

// export default Home;


import CountryList from '../components/CountryList'

function Home() {
  return <CountryList />
}

export default Home;