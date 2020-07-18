import React from 'react'
import styled from 'styled-components'
import Layout from '../layout'
import {Button} from './Button'
import errorSVG from '../images/error.svg'

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Illustration = styled.img.attrs({
  alt: '',
  src: errorSVG,
})`
  width: 100%;
`

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${({theme}) => theme.primary};
  margin: 1rem 0;
`

const ErrorMessage = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.4rem;
  margin: 0.5rem 0 1.5rem;
`

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {hasError: false}
  }

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  tryAgain = () => {
    this.setState({
      hasError: false,
    })
  }

  render() {
    const {hasError} = this.state
    const {children} = this.props

    if (hasError) {
      return (
        <Layout>
          <Container>
            <Illustration />
            <Title>Upzzz, ada yang tidak beres ...</Title>
            <ErrorMessage>
              Tidak ada salahnya untuk mencobanya kembali
            </ErrorMessage>
            <Button onClick={this.tryAgain}>Coba lagi</Button>
          </Container>
        </Layout>
      )
    }

    return children
  }
}

export default ErrorBoundary
