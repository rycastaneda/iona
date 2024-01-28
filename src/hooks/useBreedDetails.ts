import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { CatImage } from '../type';
import { CatContext } from '../App';
import { useLocation } from 'react-router-dom';

/**
 * Represents the result of the useBreedDetails hook.
 */
interface useBreedDetailsResult {
  data: CatImage | null;
  loading: boolean;
  error: Object | null;
}

/**
 * Custom hook to fetch and manage details for a specific cat breed.
 * @returns {useBreedDetailsResult} The result of the useBreedDetails hook.
 */

const useBreedDetails = (): useBreedDetailsResult => {
  const breedFromContext = useContext(CatContext)
  const location = useLocation();

  const [data, setData] = useState<CatImage | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(breedFromContext) === false);
  const [error, setError] = useState<Object | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.thecatapi.com/v1/images${location.pathname}`
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }

        const result: CatImage | null = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error || null);
        setLoading(false);
      }
    };

    if (!breedFromContext) {
      setLoading(false)
      fetchData();
    } else {
      setData(breedFromContext)
    }
  }, [breedFromContext]);

  return { data, loading, error };
};

export default useBreedDetails;