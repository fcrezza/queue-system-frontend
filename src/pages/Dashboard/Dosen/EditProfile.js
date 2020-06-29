import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Layout from '../../../layout'
import Input from '../../../components/Input'
import Select from '../../../components/Profile/Select'
import Spinner from '../../../components/Spinner'
import {BackButton, ButtonBlock} from '../../../components/Button'
import {Container} from '../../../components/Dashboard/Section'

const FormContainer = styled.div`
  margin-top: 5rem;
`

const Title = styled.h1`
  font-size: 3rem;
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

function EditProfile({user, history}) {
  const {register, handleSubmit, setValue} = useForm()
  const [faculties, setFaculties] = useState(
    JSON.parse(localStorage.getItem('fakultas')),
  )
  const [genders, setGenders] = useState(
    JSON.parse(localStorage.getItem('gender')),
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const {id, gender, username, nip, address, fullname, faculty} = user

  useEffect(() => {
    register('gender')
    register('faculty')
    setValue('gender', gender.id)
    setValue('faculty', faculty.id)
  }, [register])

  useEffect(() => {
    if (faculties && genders) {
      setLoading(false)
    }
  }, [faculties, genders])

  useEffect(() => {
    if (!genders) {
      axios.get('http://localhost:4000/genders').then(({data}) => {
        setGenders(data)
        localStorage.setItem('gender', JSON.stringify(data))
      })
    }
  }, [])

  useEffect(() => {
    if (!faculties) {
      axios.get('http://localhost:4000/fakultas').then(({data}) => {
        setFaculties(data)
        localStorage.setItem('fakultas', JSON.stringify(data))
      })
    }
  }, [])

  const onSubmit = (formData) => {
    const data = {
      id,
      ...formData,
    }
    axios.post('http://localhost:4000/changeDosenProfile', data).then(() => {
      history.push('/profile', {status: 1})
    })
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  const {id: facultyDefaultValue} = faculties.find((f) => f.id === faculty.id)
  const {id: genderDefaultValue} = genders.find((g) => g.id === gender.id)

  return (
    <Layout>
      <Container>
        <BackButton to="/profil" />
      </Container>
      <FormContainer>
        <Title>Ubah profil</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Username"
            name="username"
            ref={register}
            defaultValue={username}
          />
          <Input
            placeholder="Nama Lengkap"
            name="fullname"
            ref={register}
            defaultValue={fullname}
          />
          <Input
            placeholder="NIP"
            name="nip"
            ref={register}
            defaultValue={nip}
          />
          <Select
            name="faculty"
            defaultValue={facultyDefaultValue}
            placeholder="Fakultas"
            setValue={setValue}
            items={faculties}
          />
          <Select
            name="gender"
            defaultValue={genderDefaultValue}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <Input
            placeholder="Alamat"
            name="address"
            ref={register}
            defaultValue={address}
          />
          <ButtonBlock>Simpan</ButtonBlock>
        </Form>
        <ErrorMessage error={!!error}>{error}</ErrorMessage>
      </FormContainer>
    </Layout>
  )
}

export default EditProfile
