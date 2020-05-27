import React from 'react'
import styled from 'styled-components'

import {BackButton} from '../components/Button'
import dosenMale1 from '../images/dosen/dosen-male-1.svg'

const Container = styled.div`
  padding: 3rem 2rem;
`

const Title = styled.h1`
  font-size: 3rem;
  margin: 3rem 0 1rem;
`

const Subtitle = styled.p`
  color: #333;
  margin: 0 0 3rem;
  font-size: 1.8rem;
`

const SearchInput = styled.input`
  background: #f0f0f0;
  color: #333;
  border: 0;
  font-size: 1.6rem;
  width: 100%;
  padding: 1.3rem;
  outline: none;
`

const ListContainer = styled.div`
  margin: 5rem 0 9rem;

  & > div {
    margin-bottom: 3.5rem;
  }
`

const List = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 20px #d9d9d9;
  padding: 2rem;
  border-radius: 5px;
  color: #333;

  .list-image img {
    width: 60px;
  }

  .list-text {
    margin-left: 1.8rem;
  }

  .list-text h3 {
    font-size: 1.6rem;
    margin: 0 0 0.5rem;
  }

  .list-text p {
    margin: 0;
    font-size: 1.3rem;
  }
`

const Button = styled.button`
  background: transparent;
  border: 1px solid #222;
  color: #222;
  font-size: 1.2rem;
  outline: none;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`

function SignVerification() {
  return (
    <Container>
      <BackButton to="/signup" replace />
      <Title>Pilih dosen</Title>
      <Subtitle>
        Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
      </Subtitle>
      <SearchInput placeholder="Cari dosen..." />
      <ListContainer>
        <DosenItem />
        <DosenItem />
        <DosenItem />
      </ListContainer>
    </Container>
  )
}

function DosenItem() {
  return (
    <List>
      <div className="list-image">
        <img src={dosenMale1} alt="" />
      </div>
      <div className="list-text">
        <h3>Jahn Doe</h3>
        <p>FASTIKOM</p>
      </div>
      <Button>Pilih</Button>
    </List>
  )
}

export default SignVerification
