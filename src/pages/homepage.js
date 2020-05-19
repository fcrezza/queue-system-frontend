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

const BaseLink = styled(RouterLink)`
  text-decoration: none;
  outline: none;
`

const Link = styled(BaseLink)`
  font-weight: 700;
  font-size: 1.6rem;
  color: #000;
  position: absolute;
  top: 3rem;
  right: 2rem;
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
  border: 1px solid #000;
  color: #000;
`

const ButtonContainer = styled.div`
  margin-top: 7rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`

function homepage() {
  return (
    <Container>
      <Link to="#sign-up">Daftar</Link>
      <IlustrationImg src={ilustration} alt="" />
      <Title>Bimbingan tidak perlu ribet</Title>
      <Subtitle>
        Mulai bimbingan dengan sekali tap melalui layar ponselmu
      </Subtitle>
      <ButtonContainer>
        <ButtonOutline as={BaseLink} to="#login-dosen">
          Masuk sebagai dosen
        </ButtonOutline>
        <ButtonBlock as={BaseLink} to="#login-mahasiswa">
          Masuk sebagai mahasiswa
        </ButtonBlock>
      </ButtonContainer>
    </Container>
  )
}

export default homepage
