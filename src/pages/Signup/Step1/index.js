import React from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'
import useError from '../../../hooks/useError'
import Layout from '../../../layout'
import Radio from '../../../components/Radio'
import Input from '../../../components/Input'
import {Button, BackButton} from '../../../components/Button'
import {
  ErrorMessage,
  Container,
  Form,
  Title,
  RadioContainer,
} from '../../../components/Form'

const validationSchema = object().shape({
  role: string().oneOf(['student', 'professor']).required(),
  username: string().required('Username harus di isi'),
  password: string()
    .min(8, ({min}) => {
      return `Password minimal mengandung ${min} karakter`
    })
    .required('Password harus di isi'),
})

function Step1({cacheFormData, nextStep}) {
  const {
    role: cacheRole,
    username: cacheUsername,
    password: cachePassword,
  } = cacheFormData
  const {register, errors, handleSubmit} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema,
  })
  const {errorMessage, setError} = useError(errors)

  const onSubmit = async (formData) => {
    const {username, role} = formData
    try {
      await axios.post('http://localhost:4000/checkUsername', {
        username,
        role,
      })

      nextStep(formData, 2)
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      } else {
        setError('Pastikan kamu mempunyai internet koneksi')
      }
    }
  }

  return (
    <Layout>
      <BackButton to="/" />
      <Container>
        <Title>Daftar sebagai</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <RadioContainer>
            <Radio
              id="student"
              label="Mahasiswa"
              value="student"
              ref={register}
              defaultChecked={cacheRole === 'student' || true}
            />
            <Radio
              id="professor"
              label="Dosen"
              value="professor"
              ref={register}
              defaultChecked={cacheRole === 'professor'}
            />
          </RadioContainer>
          <Input
            placeholder="Username"
            name="username"
            defaultValue={cacheUsername || ''}
            ref={register}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            defaultValue={cachePassword || ''}
            ref={register}
          />
          <Button type="submit">Lanjut</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  )
}

export default Step1
