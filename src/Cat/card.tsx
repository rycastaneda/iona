import React from 'react';
import LinkButton from '../Button/LinkButton';
import styled from 'styled-components';
import { CatImage } from '../type';

interface CatCardProps extends CatImage {
  onCardClick: () => void;
}

/**
 * Wrapper component to control the layout of CatCard.
 */
const Wrapper = styled.div`
  flex: 0 0 25%;
  max-width: 25%;
  padding-right: 15px;
  padding-left: 15px;
`;

/**
 * Styled component representing a card for displaying cat information.
 */
export const Card = styled.div`
  margin-bottom: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 1rem;
  overflow: hidden;
`;

/**
 * Styled component representing an image inside the cat card.
 */
export const CardImage = styled.img`
  width: 100%;
`;

/**
 * Styled component representing the description area inside the cat card.
 */
export const CardDescription = styled.div`
  padding: 1rem 2rem;
  text-align: center;
`;

/**
 * CatCard component represents a card displaying cat information.
 * @param {CatCardProps} props - The properties of the CatCard component.
 * @returns {JSX.Element} The CatCard JSX element.
 */
const CatCard: React.FC<CatCardProps> = ({ id, url, onCardClick }: CatCardProps): JSX.Element => {
  /**
   * Handles the click event on the card.
   * @param {MouseEvent} event - The mouse click event.
   */
  const handleClick = (): void => {
    onCardClick();
  };

  return (
    <Wrapper>
      <Card>
        <CardImage src={url} alt="" />
        <CardDescription>
          <LinkButton to={`/${id}`} onClick={handleClick}>
            View Details
          </LinkButton>
        </CardDescription>
      </Card>
    </Wrapper>
  );
};

export default CatCard;
