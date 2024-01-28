import styled from "styled-components";

interface ButtonProps {
  $primary?: boolean;
  $secondary?: boolean;
}

const Button = styled.button<ButtonProps>`
  border-radius: 3px;
  border: none;
  color: white;
  padding: 0.75em 1em;
  display: inline-block;

  background: ${(props) => {
    if (props.$primary) {
      return '#007bff';
    }
    if (props.$secondary) {
      return '#218838';
    }
    return 'transparent';
  }};
`;

export default Button;