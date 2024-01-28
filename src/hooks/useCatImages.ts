import { useState, useEffect } from 'react';
import { CatImage } from '../type';

/**
 * Represents the result of the useCatImages hook.
 */
interface UseCatImagesResult {
  /**
   * Array of cat breeds or null if data is not yet loaded.
   */
  data: CatImage[] | null;

  /**
   * Indicates whether the data is currently being loaded.
   */
  loading: boolean;

  /**
   * Any error that occurred during data fetching, or null if no error.
   */
  error: Object | null;

  /**
   * Function to load more data from the next page of results.
   */
  loadMore: () => void;

  /**
   * Indicates whether there are no more pages to load.
   */
  isAtEnd: boolean;
}

/**
 * Custom React hook for fetching cat images data from a specified URL.
 *
 * @param {string} breed - The breed of the cat.
 * @returns {UseCatImagesResult} An object containing cat images data, loading state, error information, and a function to load more data.
 */
const useCatImages = (breed: string): UseCatImagesResult => {
  const [data, setData] = useState<CatImage[] | null>(null);
  const [currentBreed, setCurrentBreed] = useState<string>(breed);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Object | null>(null);
  const [page, setPage] = useState<number>(1);
  const [isAtEnd, setIsAtEnd] = useState<boolean>(false);
  console.log('data', data);
  const baseUrl = `https://api.thecatapi.com/v1/images/search?limit=10`;

  useEffect(() => {
    setCurrentBreed(breed);
    setPage(1);
    setData([]);
    setIsAtEnd(false);
  }, [breed]);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentBreed) {
        return;
      }

      try {
        const response = await fetch(`${baseUrl}&breed_id=${currentBreed}&page=${page}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${`${baseUrl}&breed_id=${currentBreed}&page=${page}`}`);
        }

        const result: CatImage[] = await response.json();

        if (data) {
          let atEnd = true;

          result.forEach((breed) => {
            if (!data.find((dataBreed) => breed.id === dataBreed.id)) {
              data.push(breed);
              atEnd = false;
            }
          });
          
          setData([...data]);
          setIsAtEnd(atEnd);
        } else {
          setData(result);
        }

        setLoading(false);
      } catch (error) {
        setError(error || null);
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, page, currentBreed]);

  /**
   * Function to load more data from the next page of results.
   */
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return { data, loading, error, loadMore, isAtEnd };
};

export default useCatImages;