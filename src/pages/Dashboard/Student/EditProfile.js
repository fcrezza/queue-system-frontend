import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import Layout from '../../../layout'
import useError from '../../../hooks/useError'
import Input from '../../../components/Input'
import Select from '../../../components/Profile/Select'
import Spinner from '../../../components/Spinner'
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

function EditProfile({user, history}) {
  const {register, handleSubmit, setValue, watch} = useForm()
  const [studyPrograms, setStudyPrograms] = useState(
    JSON.parse(localStorage.getItem('studyPrograms')),
  )
  const [genders, setGenders] = useState(
    JSON.parse(localStorage.getItem('genders')),
  )
  const [professors, setProfessors] = useState(null)
  const {errorMessage, setError} = useError({})
  const [loading, setLoading] = useState(true)
  const userStudyInput = parseInt(watch('study'), 10)
  const {
    id,
    semester,
    professorID,
    username,
    fullname,
    study,
    address,
    gender,
    nim,
  } = user

  useEffect(() => {
    register({name: 'professor'})
    register({name: 'study'})
    register({name: 'gender'})
    setValue('professor', professorID)
    setValue('study', study.id)
    setValue('gender', gender.id)
  }, [])

  useEffect(() => {
    if (!studyPrograms) {
      const url = `http://localhost:4000/studyPrograms`
      axios
        .get(url)
        .then(({data}) => {
          setStudyPrograms(data)
        })
        .catch((err) => {
          console.log('error form fetch studyPrograms: ', err)
        })
    }
  }, [])

  useEffect(() => {
    if (!genders) {
      const url = 'http://localhost:4000/genders'
      axios
        .get(url)
        .then(({data}) => {
          setGenders(data)
        })
        .catch((err) => {
          console.log('error form fetch genders: ', err)
        })
    }
  }, [])

  useEffect(() => {
    if (userStudyInput) {
      const url = `http://localhost:4000/professorsByStudyProgram/${userStudyInput}`

      axios
        .get(url)
        .then(({data}) => {
          const professorData = data.map((d) => {
            const {fullname: nama, ...rest} = d
            return {nama, ...rest}
          })
          setProfessors(professorData)
          if (userStudyInput !== study.id) {
            setValue('professor', professorData[0].id)
          }
        })
        .catch((err) => {
          console.log('error from fetch dosen: ', err)
        })
    }
  }, [userStudyInput])

  useEffect(() => {
    if (!!professors && !!studyPrograms && !!genders) {
      setLoading(false)
    }
  }, [professors, studyPrograms, genders])

  const onSubmit = (formData) => {
    const data = {
      id,
      ...formData,
    }

    axios
      .post('http://localhost:4000/changeMahasiswaProfile', data)
      .then(() => {
        history.push('/profile', {status: 1})
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message)
        }
      })
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <BackButton to="/profile" />
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
            placeholder="NIM"
            name="nim"
            ref={register}
            defaultValue={nim}
          />
          <Select
            name="study"
            defaultValue={study.id}
            placeholder="Prodi"
            setValue={setValue}
            items={studyPrograms}
          />
          <Input
            placeholder="Semester"
            type="number"
            name="semester"
            ref={register}
            defaultValue={semester}
          />
          <Select
            name="gender"
            defaultValue={gender.id}
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
          <Select
            name="professor"
            defaultValue={professorID}
            placeholder="Dosen pembimbing"
            setValue={setValue}
            items={professors}
          />
          <ButtonBlockExtend>Simpan</ButtonBlockExtend>
        </Form>
        <ErrorMessage error={!!errorMessage}>{errorMessage}</ErrorMessage>
      </FormContainer>
    </Layout>
  )
}

export default EditProfile
