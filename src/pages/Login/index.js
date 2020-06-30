import React from 'react'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'
import {useAuth} from '../../context/AuthContext'
import useError from '../../hooks/useError'
import Layout from '../../layout'
import Input from '../../components/Input'
import Radio from '../../components/Radio'
import {ButtonBlock, BackButton} from '../../components/Button'
import {
  Container,
  Title,
  ErrorMessage,
  Form,
  RadioContainer,
} from '../../components/Form'

const validationSchema = object().shape({
  role: string().oneOf(['student', 'professor']).required(),
  username: string().required('Field username harus diisi'),
  password: string().required('Field password harus diisi'),
})

function Loginpage({history}) {
  const {login} = useAuth()
  const {errors, handleSubmit, register} = useForm({
    validationSchema,
    reValidateMode: 'onSubmit',
  })
  const {errorMessage, setError} = useError(errors)
  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      await login(data)
      history.push('/')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <Layout>
      <BackButton to="/" />
      <Container>
        <Title>Masuk sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioContainer>
            <Radio
              id="student"
              label="Mahasiswa"
              value="student"
              ref={register}
              defaultChecked
            />
            <Radio
              id="professor"
              label="Dosen"
              value="professor"
              ref={register}
            />
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
      </Container>
    </Layout>
  )
}

export default Loginpage
