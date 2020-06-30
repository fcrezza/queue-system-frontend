import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {object, string, number} from 'yup'
import Input from '../../../components/Input'
import Spinner from '../../../components/Spinner'
import Layout from '../../../layout'
import useError from '../../../hooks/useError'
import {Button, BackButton} from '../../../components/Button'
import Select from '../../../components/Signup/Select'
import {Container, Form, Title, ErrorMessage} from '../../../components/Form'

const validationSchema = (studyPrograms, genders) =>
  object().shape({
    nim: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('NIM harus di isi'),
    semester: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('Semester harus diisi'),
    fullname: string().required('Nama lengkap harus di isi'),
    address: string().required('Alamat harus diisi'),
    study: number()
      .oneOf(studyPrograms.map((value) => value.id))
      .required('Prodi harus di isi'),
    gender: number()
      .oneOf(genders.map((value) => value.id))
      .required('Jenis kelamin harus diisi'),
  })

function MahasiswaForm({nextStep, cacheFormData}) {
  const [loading, setLoading] = useState(true)
  const [studyPrograms, setStudyPrograms] = useState(
    JSON.parse(localStorage.getItem('studyPrograms')) || [],
  )
  const [genders, setGenders] = useState(
    JSON.parse(localStorage.getItem('genders')) || [],
  )

  const {register, errors, handleSubmit, setValue} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema: validationSchema(studyPrograms, genders),
  })
  const {errorMessage, setError} = useError(errors)

  useEffect(() => {
    register({name: 'gender'})
    register({name: 'study'})
    setValue('study', cacheFormData.study)
    setValue('gender', cacheFormData.gender)
  }, [])

  useEffect(() => {
    if (!studyPrograms.length) {
      axios
        .get('http://localhost:4000/studyPrograms')
        .then(({data}) => {
          setStudyPrograms(data)
          localStorage.setItem('studyPrograms', JSON.stringify(data))
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message)
          } else {
            setError('Pastikan kamu terhubung internet')
          }
        })
    }
  }, [])

  useEffect(() => {
    if (!genders.length) {
      axios
        .get('http://localhost:4000/genders')
        .then(({data}) => {
          setGenders(data)
          localStorage.setItem('genders', JSON.stringify(data))
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message)
          } else {
            setError('Pastikan kamu terhubung internet')
          }
        })
    }
  }, [])

  useEffect(() => {
    if ((studyPrograms.length, genders.length)) {
      setLoading(false)
    }
  }, [studyPrograms, genders])

  const onSubmit = (formData) => {
    axios
      .post('http://localhost:4000/checkUserByIdentity', {
        userIdentity: formData.nim,
        role: 'student',
      })
      .then(() => {
        nextStep(formData, 3)
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message)
        } else {
          setError('Pastikan kamu mempunyai internet koneksi')
        }
      })
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <BackButton to="/signup" />
      <Container>
        <Title>Data diri mahasiswa</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nomor induk mahasiswa"
            type="number"
            name="nim"
            defaultValue={cacheFormData.nim || ''}
            ref={register}
          />
          <Input
            placeholder="Nama lengkap"
            name="fullname"
            defaultValue={cacheFormData.fullname || ''}
            ref={register}
          />
          <Input
            placeholder="Alamat"
            name="address"
            defaultValue={cacheFormData.address || ''}
            ref={register}
          />
          <Select
            name="gender"
            defaultValue={cacheFormData.gender}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <Select
            name="study"
            defaultValue={cacheFormData.study}
            placeholder="Prodi"
            setValue={setValue}
            items={studyPrograms}
          />
          <Input
            placeholder="Semester"
            type="number"
            name="semester"
            defaultValue={cacheFormData.semester || ''}
            ref={register}
          />
          <Button type="submit">Lanjut</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  )
}

export default MahasiswaForm
