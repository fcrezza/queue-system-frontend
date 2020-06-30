import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Layout from '../../layout'
import Seo from '../../components/Seo'
import {ButtonBlock} from '../../components/Button'
import ilustration from '../../images/ilustration.svg'

const IlustrationImg = styled.img`
  width: 100%;
  display: block;
  margin-top: 8rem;
`

const Link = styled(RouterLink)`
  text-decoration: none;
`

const Title = styled.h1`
  font-size: 3rem;
  margin: 2.5rem 0 1.5rem;
  color: ${({theme}) => theme.main};
`

const Subtitle = styled.p`
  color: ${({theme}) => theme.secondary};
  font-size: 1.8rem;
  margin: 0;
`

const ButtonOutline = styled(ButtonBlock)`
  background: none;
  border: 1px solid ${({theme}) => theme.main};
  color: ${({theme}) => theme.main};
`

const ButtonContainer = styled.div`
  margin-top: 7rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`

function HomePage() {
  return (
    <Layout>
      <Seo />
      <IlustrationImg src={ilustration} alt="" />
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
    </Layout>
  )
}

export default HomePage
