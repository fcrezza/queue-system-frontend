import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {Redirect} from 'react-router-dom'
import {object, number, string} from 'yup'

import Input from '../../components/Input'
import {Button, BackButton} from '../../components/Button'
import {
  Container,
  Form,
  FormWrapper,
  Title,
  Select,
  ErrorMessage,
} from '../../components/Signup'

const dosenAvatars = {
  male: ['dosenMale1', 'dosenMale2', 'dosenMale3'],
  female: ['dosenFemale1', 'dosenFemale2', 'dosenFemale3'],
}

function Step2({data, nextStep, sendData}) {
  if (data.role === 'dosen') {
    return <DosenForm data={data} sendData={sendData} />
  }

  if (data.role === 'mahasiswa') {
    return <MahasiswaForm data={data} nextStep={nextStep} />
  }

  return <Redirect to="/signup" />
}

function DosenForm({sendData, data}) {
  const [error, setError] = useState(null)
  const [fakultas, setFakultas] = useState(
    JSON.parse(localStorage.getItem('fakultas')) || [],
  )
  const [gender, setGender] = useState(
    JSON.parse(localStorage.getItem('gender')) || [],
  )
  const validationSchema = object().shape({
    nip: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('NIP harus di isi'),
    fullname: string().required('Nama lengkap harus di isi'),
    alamat: string().required('Alamat harus diisi'),
    fakultas: number()
      .oneOf(fakultas.map((value) => value.id))
      .required('fakultas harus di isi'),
    gender: number()
      .oneOf(gender.map((value) => value.id))
      .required('Jenis kelamin harus diisi'),
  })
  const {register, errors, handleSubmit, setValue} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema,
  })
  let errorMessage = null
  if (Object.keys(errors).length !== 0) {
    errorMessage = errors[Object.keys(errors)[0]].message
  }

  useEffect(() => {
    register({name: 'gender'})
    register({name: 'fakultas'})

    if (fakultas.length === 0) {
      axios
        .get('http://localhost:4000/fakultas')
        .then((res) => {
          setFakultas(res.data)
          localStorage.setItem('fakultas', JSON.stringify(res.data))
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response)
          } else {
            setError({message: 'Pastikan kamu terhubung ke internet'})
          }
        })
    }

    if (gender.length === 0) {
      axios
        .get('http://localhost:4000/genders')
        .then((res) => {
          setGender(res.data)
          localStorage.setItem('gender', JSON.stringify(res.data))
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response)
          } else {
            setError({message: 'Pastikan kamu terhubung ke internet'})
          }
        })
    }
  }, [])

  const onSubmit = (formData) => {
    const randomNumber = Math.floor(Math.random() * 3)
    const randomAvatar =
      data.gender === 1
        ? dosenAvatars.male[randomNumber]
        : dosenAvatars.female[randomNumber]

    sendData({
      ...data,
      ...formData,
      avatar: randomAvatar,
    })
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (fakultas.length === 0 || gender.length === 0) {
    return <div>enteni bos ....</div>
  }

  return (
    <Container>
      <BackButton to="/signup" />
      <FormWrapper>
        <Title>Data diri dosen</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nomor induk pegawai"
            type="number"
            name="nip"
            ref={register}
          />
          <Input placeholder="Nama lengkap" name="fullname" ref={register} />
          <Input placeholder="Alamat" name="alamat" ref={register} />
          <Select
            defaultValue={data.fakultas}
            name="fakultas"
            placeholder="Fakultas"
            setValue={setValue}
            items={fakultas}
          />
          <Select
            name="gender"
            defaultValue={data.gender}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={gender}
          />
          <Button>Daftar</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormWrapper>
    </Container>
  )
}

function MahasiswaForm({nextStep, data}) {
  const [error, setError] = useState(null)
  const [prodi, setProdi] = useState(
    JSON.parse(localStorage.getItem('prodi')) || [],
  )
  const [gender, setGender] = useState(
    JSON.parse(localStorage.getItem('gender')) || [],
  )
  const validationSchema = object().shape({
    nim: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('NIM harus di isi'),
    semester: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('Semester harus diisi'),
    fullname: string().required('Nama lengkap harus di isi'),
    alamat: string().required('Alamat harus diisi'),
    prodi: number()
      .oneOf(prodi.map((value) => value.id))
      .required('Prodi harus di isi'),
    gender: number()
      .oneOf(gender.map((value) => value.id))
      .required('Jenis kelamin harus diisi'),
  })
  const {register, errors, handleSubmit, setValue} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema,
  })
  let errorMessage = null
  if (Object.keys(errors).length !== 0) {
    errorMessage = errors[Object.keys(errors)[0]].message
  }

  useEffect(() => {
    register({name: 'gender'})
    register({name: 'prodi'})

    Object.keys(data).forEach((key) => {
      if (key === 'gender' || key === 'prodi') {
        setValue(key, data[key])
      }
    })

    if (prodi.length === 0) {
      axios
        .get('http://localhost:4000/prodi')
        .then((res) => {
          setProdi(res.data)
          localStorage.setItem('prodi', JSON.stringify(res.data))
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response)
          } else {
            setError({message: 'Pastikan kamu terhubung ke internet'})
          }
        })
    }

    if (gender.length === 0) {
      axios
        .get('http://localhost:4000/genders')
        .then((res) => {
          setGender(res.data)
          localStorage.setItem('gender', JSON.stringify(res.data))
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response)
          } else {
            setError({message: 'Pastikan kamu terhubung ke internet'})
          }
        })
    }
  }, [])

  if (error) {
    return <div>{error.message}</div>
  }

  if (prodi.length === 0 || gender.length === 0) {
    return <div>enteni bos ....</div>
  }

  return (
    <Container>
      <BackButton to="/signup" />
      <FormWrapper>
        <Title>Data diri mahasiswa</Title>
        <Form onSubmit={handleSubmit((formData) => nextStep(formData, 3))}>
          <Input
            placeholder="Nomor induk mahasiswa"
            type="number"
            name="nim"
            defaultValue={data.nim || ''}
            ref={register}
          />
          <Input
            placeholder="Nama lengkap"
            name="fullname"
            defaultValue={data.fullname || ''}
            ref={register}
          />
          <Input
            placeholder="Alamat"
            name="alamat"
            defaultValue={data.alamat || ''}
            ref={register}
          />
          <Select
            name="gender"
            defaultValue={data.gender}
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={gender}
          />
          <Select
            name="prodi"
            defaultValue={data.prodi}
            placeholder="Prodi"
            setValue={setValue}
            items={prodi}
          />
          <Input
            placeholder="Semester"
            type="number"
            name="semester"
            defaultValue={data.semester || ''}
            ref={register}
          />
          <Button type="submit">Lanjut</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </FormWrapper>
    </Container>
  )
}

export default Step2
