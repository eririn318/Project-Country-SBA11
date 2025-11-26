import { useState, useEffect } from "react";

//<T> means you don't know what type yet
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // use async when it will take time(fetching data) and it will return a promise
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);

        // if it does not fetch, go to Error
        if (!response.ok) {
          //status is object from fetching data/get status number to find out what error it is
          //status comes from server (ex:404 → not found)
          //throw new Error=(stop here and jump to catch hook block )
          //and this message will not display just jump to catch message
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        //from new Error, you decide error 404 and this error message will display
        //instanceof=(if err is a real Error object=>returns true/checking the type of error)
        setError(err instanceof Error ? err.message : "An error occured");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
