import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Country } from "../types/country";
import { CountryDetail } from "../components/CountryDetail";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { BackButton } from "./BackButton";

function CountryCard() {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      if (!code) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error("Country not found");
        }

        const data = await response.json();
        const countryData = data[0];
        setCountry(countryData);

        //fetch border countries
        if (countryData.borders && countryData.borders.length > 0) {
          console.log("Borders codes:", countryData.borders);
          const borderPromises = countryData.borders.map((border: string) =>
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then(
              (res) => {
                if (!res.ok) throw new Error("Border country not found");
                return res.json();
              }
            )
          );

          const bordersData = await Promise.all(borderPromises);
          setBorderCountries(bordersData.map((b) => b[0]));
        } else {
          setBorderCountries([]);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An err occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading) return <LoadingSpinner />;

  if (error) {
    return (
      <div>
        <BackButton />
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!country) {
    return (
      <div>
        <BackButton />
        <ErrorMessage message="Country not found" />
      </div>
    );
  }

  //Render details
  return (
    <div>
      <BackButton />
      <CountryDetail country={country} borderCountries={borderCountries} />
    </div>
  );
}
export default CountryCard;
