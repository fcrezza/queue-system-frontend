import React from 'react'
import styled from 'styled-components'

import {BackButton, Button} from '../components/Button'
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

  .radio-container {
    display: flex;
    align-items: center;
    margin-left: auto;
  }

  .radio-container input[type='radio'] {
    visibility: hidden;
  }

  .check {
    cursor: pointer;
    display: block;
    position: relative;
    border: 3px solid #aaaaaa;
    border-radius: 100%;
    height: 25px;
    width: 25px;
  }

  .check::before {
    display: block;
    content: '';
    border-radius: 100%;
    height: 9px;
    width: 9px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .radio-container input[type='radio']:checked ~ .check::before {
    background: #222;
  }

  .radio-container input[type='radio']:checked ~ .check {
    border-color: #222;
  }
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0px -10px 10px #f0f0f0;
  padding: 1.5rem;
  text-align: right;
`

function SignVerification() {
  return (
    <Container>
      <BackButton to="/signup/mahasiswa" replace />
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
      <Footer>
        <Button disabled>Lanjut</Button>
      </Footer>
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
      <div className="radio-container">
        <input type="radio" id="radio1" name="dosen" />
        <label htmlFor="radio1" className="check" />
      </div>
    </List>
  )
}

export default SignVerification
