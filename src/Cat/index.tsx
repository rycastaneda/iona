import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useBreedDetails from '../hooks/useBreedDetails';
import Modal from '../Modal';
import { Card, CardDescription, CardImage } from './card';
import Button from '../Button';

/**
 * Spacer component to add margin.
 */
const Spacer = styled.div`
  margin: 1rem;
`;

/**
 * Cat component displays information about a specific cat breed.
 * It uses the useBreedDetails hook to fetch and manage breed details.
 * @returns {JSX.Element} The Cat component JSX element.
 */
const Cat = (): JSX.Element => {
  const navigate = useNavigate();

  /**
   * Fetch breed details using the useBreedDetails hook.
   */
  const { data, error, loading } = useBreedDetails();

  /**
   * Renders a modal with an error message if an error occurs.
   */
  if (Boolean(error) && !data?.breeds?.length) {
    return <div className="container"><Modal /></div>;
  }

  /**
   * Renders a loading message while data is being fetched.
   */
  if (loading) {
    return <div className="container">Loading</div>;
  }

  return (
    <div className="container">
      <Card>
        <Spacer>
          <Button
            $primary
            onClick={() => navigate('/?breed=' + data?.breeds?.[0].id)}
          >
            Back
          </Button>
        </Spacer>
        <CardImage src={data?.url} alt="" />
        {data?.breeds?.length && (
          <CardDescription className="card-description text-left">
            <h1>{data.breeds[0].name}</h1>
            <h2>Origin: {data.breeds[0].origin}</h2>
            <h3>{data.breeds[0].temperament}</h3>
            <p>{data.breeds[0].description}</p>
          </CardDescription>
        )}
      </Card>
    </div>
  );
};

export default Cat;