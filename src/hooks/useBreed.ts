import { useState, useEffect } from 'react';
import { CatBreed } from '../type';

/**
 * Represents the result of the useBreeds hook.
 */
interface UseBreedsResult {
    /**
     * Array of cat breeds or null if data is not yet loaded.
     */
    data: CatBreed[] | null;
  
    /**
     * Indicates whether the data is currently being loaded.
     */
    loading: boolean;
  
    /**
     * Any error that occurred during data fetching, or null if no error.
     */
    error: Object | null;
  }
  
  /**
   * Custom React hook for fetching cat breeds data from a specified URL.
   *
   * @param url - The URL to fetch cat breeds data from. Defaults to 'https://api.thecatapi.com/v1/breeds'.
   * @returns An object containing cat breeds data, loading state, and error information.
   */

const useBreeds = (url = 'https://api.thecatapi.com/v1/breeds'): UseBreedsResult => {

  const [data, setData] = useState<CatBreed[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Object | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }

        const result: CatBreed[] = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error || null);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useBreeds;