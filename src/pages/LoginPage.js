import React from 'react'
import styled from 'styled-components'
import {Switch, Route, useRouteMatch} from 'react-router-dom'

import Input from '../components/Input'
import {ButtonBlock, BackButton} from '../components/Button'

const Container = styled.div`
  padding: 3rem 2rem;
`

const Form = styled.form`
  & > * {
    margin-bottom: 4rem;
  }
`

const FormWrapper = styled.div`
  margin-top: 5rem;
`

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 2rem;
`

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: #ff304f;
  margin-top: 2rem;
`

function LoginDosen() {
  return (
    <FormWrapper>
      <Title>Login dosen</Title>
      <Form>
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <ButtonBlock>Login</ButtonBlock>
      </Form>
      <ErrorMessage>Username dan password tidak cocok</ErrorMessage>
    </FormWrapper>
  )
}

function LoginMahasiswa() {
  return (
    <FormWrapper>
      <Title>Login mahasiswa</Title>
      <Form>
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <ButtonBlock>Login</ButtonBlock>
      </Form>
      <ErrorMessage>Username dan password tidak cocok</ErrorMessage>
    </FormWrapper>
  )
}

function Loginpage() {
  const {path} = useRouteMatch()

  return (
    <Container>
      <BackButton to="/" />
      <Switch>
        <Route path={`${path}/dosen`} component={LoginDosen} />
        <Route path={`${path}/mahasiswa`} component={LoginMahasiswa} />
        <Route render={() => <div>zonk</div>} />
      </Switch>
    </Container>
  )
}

export default Loginpage
