import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Layout from '../layout'
import Seo from '../components/Seo'
import {ButtonBlock} from '../components/Button'
import Copyright from '../components/Copyright'
import ilustration from '../images/ilustration.svg'

const IlustrationImg = styled.img.attrs({
  src: ilustration,
  alt: '',
})`
  width: 90%;
  min-width: 250px;
  display: block;
  margin: 6rem auto 0;
`

const Link = styled(RouterLink)`
  text-decoration: none;
`

const Title = styled.h1`
  font-size: 2.1rem;
  margin: 2.5rem 0 1.2rem;
  color: ${({theme}) => theme.primary};
`

const Subtitle = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.6rem;
  margin: 0;
`

const ButtonOutline = styled(ButtonBlock)`
  background: none;
  border: 1px solid ${({theme}) => theme.primary};
  color: ${({theme}) => theme.primary};
`

const ButtonContainer = styled.div`
  margin-top: 4rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`

function HomePage() {
  return (
    <Layout>
      <Seo />
      <IlustrationImg />
      <Title>Bimbingan tidak perlu ribet</Title>
      <Subtitle>Mulai bimbingan dengan sekali tap, yup semudah itu!</Subtitle>
      <ButtonContainer>
        <ButtonOutline as={Link} to="/signup">
          Daftar
        </ButtonOutline>
        <ButtonBlock as={Link} to="/login">
          Masuk
        </ButtonBlock>
      </ButtonContainer>
      <Copyright />
    </Layout>
  )
}

export default HomePage
