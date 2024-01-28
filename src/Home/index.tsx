import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useBreeds from "../hooks/useBreed";
import { CatBreed, CatImage } from "../type";
import useCatImages from "../hooks/useCatImages";
import Modal from "../Modal";
import CatCard from "../Cat/card";
import Button from "../Button";
import Wrapper from "./Wrapper";
import Select from "./Select";

interface HomeProps {
  onSelect: (selectedCat: CatImage) => void;
}

const Home: React.FC<HomeProps> = ({ onSelect }: HomeProps): JSX.Element => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { data: breeds, loading, error: errorBreeds } = useBreeds();
  const breed = breeds?.find((breed) => breed.id === query.get("breed"));
  const [selectedBreed, setSelectedBreed] = useState<CatBreed | null>(
    breed || null
  );

  const {
    data: catImages,
    loading: imageLoading,
    error: errorImage,
    loadMore,
    isAtEnd,
  } = useCatImages(selectedBreed?.id || "");

  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

  /**
   * Handles the change event of the breed selection.
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const newBreed = breeds?.find((breed) => breed.id === e.target.value) || null;
    setSelectedBreed(newBreed);
  };

  useEffect(() => {
    if (breed) {
      setSelectedBreed(breed);
    }
  }, [breed]);

  useEffect(() => {
    setIsErrorModalOpen(Boolean(errorImage || errorBreeds));
  }, [errorImage, errorBreeds]);

  return (
    <div className="container home">
      <h1>Cat Browser</h1>
      <p>Breed</p>
      {!loading && breeds?.length ? (
        <Select onChange={handleChange} value={selectedBreed?.id}>
          <option>Select breed...</option>
          {breeds?.map((breed: CatBreed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </Select>
      ) : null}
      {Boolean(catImages) || "No cats available"}
      {isErrorModalOpen && (
        <Modal
          message="“Apologies but we could not load new cats for you at this time! Miau!”"
        ></Modal>
      )}

      {catImages?.length ? (
        <div>
          <Wrapper>
            {catImages?.map((image) => (
              <CatCard
                key={image.id}
                {...image}
                onCardClick={() =>
                  onSelect({ ...image, breeds: [selectedBreed] })
                }
              />
            ))}
          </Wrapper>
          {isAtEnd || (
            <Button
              $secondary
              className="load-more"
              onClick={() => {
                loadMore();
              }}
              disabled={imageLoading || !selectedBreed}
            >
              {imageLoading ? "Loading cats..." : "Load more"}
            </Button>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
