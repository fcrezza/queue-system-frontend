import React from 'react'
import axios from 'axios'
import {object, string} from 'yup'
import {useForm} from 'react-hook-form'
import useError from '../../../hooks/useError'
import Layout from '../../../layout'
import Input from '../../../components/Input'
import Seo from '../../../components/Seo'
import {BackButton, ButtonBlock} from '../../../components/Button'
import {Container, Title, Form, ErrorMessage} from '../../../components/Form'

const validationSchema = object().shape({
  oldPassword: string()
    .min(8, ({min}) => {
      return `Password lama minimal mengandung ${min} karakter`
    })
    .required('Password lama harus diisi'),
  newPassword: string()
    .min(8, ({min}) => {
      return `Password baru minimal mengandung ${min} karakter`
    })
    .required('Password baru harus diisi'),
})

function ChangePassword({id, fullname, history}) {
  const {handleSubmit, register, errors, formState} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema,
  })
  const {errorMessage, setError} = useError(errors)
  const {isSubmitting} = formState

  const onSubmit = async (formData) => {
    try {
      await axios.post(
        `http://localhost:4000/professors/${id}/password`,
        formData,
      )
      history.push('/profile', {status: 1})
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message)
      }
    }
  }

  return (
    <Layout>
      <Seo title={`Ganti password | ${fullname}`} />
      <BackButton />
      <Container>
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
          <ButtonBlock disabled={isSubmitting}>Ganti password</ButtonBlock>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  )
}

export default ChangePassword
