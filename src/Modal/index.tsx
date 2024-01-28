import React from 'react';
import styled from "styled-components";

/**
 * Props for the Modal component.
 */
interface ModalProps {
  /**
   * Modal message
   */
  message?: string
}

/**
 * Modal component for displaying a simple modal window.
 *
 * @component
 * @example
 * ```jsx
 * <Modal onClose={() => handleCloseModal()} />
 * ```
 *
 * @param {ModalProps} props - The props for the Modal component.
 * @returns {JSX.Element} JSX.Element
 */

const ModalMask = styled.div`
    position: absolute;
    z-index: 9998;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background: rgba(255,255,255, 0.8);
`

const ModalContainer = styled.div`
  margin: 5rem auto;
  width: 400px;
  background-color: #08395b;
  color: white;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  padding: 1rem;
`

const Modal: React.FC<ModalProps> = ({ message }) => {
  return (
    <ModalMask>
      <ModalContainer>
        {message || "Apologies but we could not load new cats for you at this time! Miau!"}
      </ModalContainer>
    </ModalMask>
  );
};

export default Modal;