import styled from "styled-components";

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: ${({theme}) => theme.error};
  margin-top: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
  color: ${({theme}) => theme.primary};
`;

const Container = styled.div`
  margin-top: 4rem;
`;

const Form = styled.form`
  & > * {
    margin-bottom: 3.5rem;
  }
`;

export {RadioContainer, ErrorMessage, Title, Container, Form};
