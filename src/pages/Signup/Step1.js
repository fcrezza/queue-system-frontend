import React from 'react'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'
import {object, string} from 'yup'

import Radio from '../../components/Radio'
import Input from '../../components/Input'
import {Button, BackButton} from '../../components/Button'
import {
  ErrorMessage,
  Container,
  Form,
  FormWrapper,
  Title,
} from '../../components/Signup'

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
`

function Step1({data, nextStep}) {
  const validationSchema = object().shape({
    role: string().oneOf(['mahasiswa', 'dosen']).required(),
    username: string().required('Username harus di isi'),
    password: string()
      .min(8, ({min}) => {
        return `Password minimal mengandung ${min} karakter`
      })
      .required('Password harus di isi'),
  })
  const {register, errors, handleSubmit} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema,
  })
  let errorMessage = null

  if (Object.keys(errors).length !== 0) {
    errorMessage = errors[Object.keys(errors)[0]].message
  }

  return (
    <Container>
      <BackButton to="/" />
      <FormWrapper>
        <Title>Daftar sebagai</Title>
        <Form onSubmit={handleSubmit((formData) => nextStep(formData, 2))}>
          <RadioContainer>
            <Radio
              id="mahasiswa"
              label="Mahasiswa"
              value="mahasiswa"
              ref={register}
              defaultChecked={data.role === 'mahasiswa' || true}
            />
            <Radio
              id="dosen"
              label="Dosen"
              value="dosen"
              ref={register}
              defaultChecked={data.role === 'dosen'}
            />
          </RadioContainer>
          <Input
            placeholder="Username"
            name="username"
            defaultValue={data.username || ''}
            ref={register}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            defaultValue={data.password || ''}
            ref={register}
          />
          <Button type="submit">Lanjut</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormWrapper>
    </Container>
  )
}

export default Step1
