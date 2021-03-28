import styled from "styled-components";

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: ${({theme}) => theme.error};
`;

export default ErrorMessage;
