import styled from "styled-components";

const ErrorMessage = styled.p`
  font-size: 1.6rem;
  color: ${({theme}) => theme.error};
`;

export default ErrorMessage;
