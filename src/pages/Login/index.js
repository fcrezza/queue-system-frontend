import React from 'react'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'

import Layout from '../../layout'
import Input from '../../components/Input'
import Radio from '../../components/Radio'
import {ButtonBlock, BackButton} from '../../components/Button'
import {useAuth} from '../../context/AuthContext'

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

function Loginpage({history}) {
  const {login} = useAuth()
  const [error, setError] = React.useState('')
  const validationSchema = object().shape({
    role: string().oneOf(['mahasiswa', 'dosen']).required(),
    username: string().required(),
    password: string().required(),
  })
  const {errors, handleSubmit, register} = useForm({
    validationSchema,
    reValidateMode: 'onSubmit',
  })
  let errorMessage = null
  if (Object.keys(errors).length !== 0) {
    errorMessage = 'Semua field harus di isi'
  } else if (error) {
    errorMessage = error
  }

  const onSubmit = (data, e) => {
    e.preventDefault()
    const {role, username, password} = data
    login({role, username, password}, (err) => {
      if (err) {
        setError(err)
        return
      }

      history.push('/')
    })
  }

  return (
    <Layout>
      <BackButton to="/" />
      <FormWrapper>
        <Title>Masuk sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioContainer>
            <Radio
              id="mahasiswa"
              label="Mahasiswa"
              value="mahasiswa"
              ref={register}
            />
            <Radio id="dosen" label="Dosen" value="dosen" ref={register} />
          </RadioContainer>
          <Input placeholder="Username" name="username" ref={register} />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            ref={register}
          />
          <ButtonBlock>Masuk</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormWrapper>
    </Layout>
  )
}

export default Loginpage
