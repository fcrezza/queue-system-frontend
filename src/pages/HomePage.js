import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

import {ButtonBlock} from '../components/Button'
import ilustration from '../images/ilustration.svg'

const Container = styled.div`
  padding: 3rem 2rem;
`

const IlustrationImg = styled.img`
  width: 100%;
  display: block;
  margin-top: 9rem;
`

const Link = styled(RouterLink)`
  text-decoration: none;
  outline: none;
`

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin: 2rem 0 1.5rem;
`

const Subtitle = styled.p`
  color: #333;
  font-size: 1.8rem;
  margin: 0;
`

const ButtonOutline = styled(ButtonBlock)`
  background: none;
  border: 1px solid #222;
  color: #222;
`

const ButtonContainer = styled.div`
  margin-top: 7rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`

function HomePage() {
  return (
    <Container>
      <IlustrationImg src={ilustration} alt="" />
      <Title>Bimbingan tidak perlu ribet</Title>
      <Subtitle>
        Mulai bimbingan dengan sekali tap melalui layar ponselmu
      </Subtitle>
      <ButtonContainer>
        <ButtonOutline as={Link} to="/signup">
          Daftar
        </ButtonOutline>
        <ButtonBlock as={Link} to="/login">
          Masuk
        </ButtonBlock>
      </ButtonContainer>
    </Container>
  )
}

export default HomePage
