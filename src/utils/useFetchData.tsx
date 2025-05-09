import { useState, useEffect } from "react";

export function useFetchData<T>(url: string, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          // const text = await response.text(); // Get raw text response

          // console.log("Raw API Response:", text); // Log the raw response
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
  
      fetchData();
    }, dependencies);  // Dependencies trigger re-fetching
  
    return { data,setData, loading, error };
  }
  