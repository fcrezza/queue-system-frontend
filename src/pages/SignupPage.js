import React from 'react'
import styled from 'styled-components'

import Input from '../components/Input'
import Radio from '../components/Radio'
import {ButtonBlock, BackButton} from '../components/Button'

const Container = styled.div`
  padding: 3rem 2rem;
`

const Form = styled.form`
  & > * {
    margin-bottom: 3.5rem;
  }
`

const FormWrapper = styled.div`
  margin-top: 5rem;
`

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 3rem;
`

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: #ff304f;
  margin-top: 2rem;
`

function SignupPage() {
  return (
    <Container>
      <BackButton to="/" />
      <FormWrapper>
        <Title>Daftar sebagai</Title>
        <Form>
          <RadioContainer>
            <Radio id="mahasiswa" label="Mahasiswa" />
            <Radio id="dosen" label="Dosen" />
          </RadioContainer>
          <Input placeholder="Nomor induk mahasiswa" type="number" />
          <Input placeholder="Username" />
          <Input placeholder="Nama lengkap" />
          <Input placeholder="Alamat" />
          <Input placeholder="Semester" type="number" />
          <Input placeholder="Prodi" />
          <Input placeholder="Jenis kelamin" />
          <Input placeholder="Password" type="password" />
          <ButtonBlock>DAFTAR</ButtonBlock>
        </Form>
        <ErrorMessage>Username dan password tidak cocok</ErrorMessage>
      </FormWrapper>
    </Container>
  )
}

export default SignupPage
