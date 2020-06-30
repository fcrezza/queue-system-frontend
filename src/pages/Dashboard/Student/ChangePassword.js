import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import Layout from '../../../layout'
import Input from '../../../components/Input'
import {BackButton, ButtonBlock} from '../../../components/Button'

const FormContainer = styled.div`
  margin-top: 3rem;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0 0 3rem;
`

const Form = styled.form`
  & > * {
    margin-bottom: 3.5rem;
  }
`

const ErrorMessage = styled.p`
  font-size: 1.4rem;
  color: #ff304f;
  margin-top: 2rem;
  display: ${({error}) => (error ? 'block' : 'none')};
`

const ButtonBlockExtend = styled(ButtonBlock)`
  background: ${({disabled}) => (disabled ? '#d9d9d9' : '#222')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`

function ChangePassword({id, role, history}) {
  const {handleSubmit, register, watch} = useForm()
  const [error, setError] = useState(null)
  const oldPassword = watch('oldPassword') || ''
  const newPassword = watch('newPassword') || ''
  const buttonDisable = oldPassword.length < 8 || newPassword.length < 8
  const onSubmit = (formData) => {
    const data = {
      id,
      role,
      ...formData,
    }

    axios
      .post('http://localhost:4000/changePassword', data)
      .then(() => {
        history.push('/profile', {status: 1})
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message)
        }
      })
  }

  return (
    <Layout>
      <BackButton to="/profile" />
      <FormContainer>
        <Title>Ganti password</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Password lama"
            type="password"
            name="oldPassword"
            ref={register}
          />
          <Input
            placeholder="Password baru"
            type="password"
            name="newPassword"
            ref={register}
          />
          <ButtonBlockExtend disabled={buttonDisable}>
            Ganti password
          </ButtonBlockExtend>
        </Form>
        <ErrorMessage error={!!error}>{error}</ErrorMessage>
      </FormContainer>
    </Layout>
  )
}

export default ChangePassword
