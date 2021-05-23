import React from "react";
import styled from "styled-components";

import Layout from "../layout";
import {Button} from "./Button";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ErrorMessage = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({theme}) => theme.primary};
  margin: 0 0 3rem;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  tryAgain = () => {
    this.setState({
      hasError: false
    });
  };

  render() {
    const {hasError} = this.state;
    const {children} = this.props;

    if (hasError) {
      return (
        <Layout>
          <Container>
            <ErrorMessage>Upzzz, ada yang tidak beres...</ErrorMessage>
            <Button onClick={this.tryAgain}>Coba lagi</Button>
          </Container>
        </Layout>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
