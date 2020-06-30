import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {object, string, number} from 'yup'
import {useHistory} from 'react-router-dom'
import useError from '../../../hooks/useError'
import Select from '../../../components/Signup/Select'
import Input from '../../../components/Input'
import Layout from '../../../layout'
import Spinner from '../../../components/Spinner'
import {Button, BackButton} from '../../../components/Button'
import {Container, Form, Title, ErrorMessage} from '../../../components/Form'

const dosenAvatars = {
  male: ['dosenMale1', 'dosenMale2', 'dosenMale3'],
  female: ['dosenFemale1', 'dosenFemale2', 'dosenFemale3'],
}

const validationSchema = (faculties, genders) =>
  object().shape({
    nip: number()
      .transform((value) => (value ? parseInt(value, 10) : undefined))
      .required('NIP harus di isi'),
    fullname: string().required('Nama lengkap harus di isi'),
    address: string().required('Alamat harus diisi'),
    faculty: number()
      .oneOf(faculties.map((value) => value.id))
      .required('fakultas harus di isi'),
    gender: number()
      .oneOf(genders.map((value) => value.id))
      .required('Jenis kelamin harus diisi'),
  })

function DosenForm({sendData, cacheFormData}) {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [faculties, setFaculties] = useState(
    JSON.parse(localStorage.getItem('faculties')) || [],
  )
  const [genders, setGenders] = useState(
    JSON.parse(localStorage.getItem('genders')) || [],
  )
  const {register, errors, handleSubmit, setValue} = useForm({
    reValidateMode: 'onSubmit',
    validationSchema: validationSchema(faculties, genders),
  })
  const {errorMessage, setError} = useError(errors)

  useEffect(() => {
    if (faculties.length && genders.length) {
      setLoading(false)
    }
  }, [faculties, genders])

  useEffect(() => {
    register({name: 'gender'})
    register({name: 'faculty'})
  }, [])

  useEffect(() => {
    if (!faculties.length) {
      axios
        .get('http://localhost:4000/faculties')
        .then(({data}) => {
          setFaculties(data)
          localStorage.setItem('faculties', JSON.stringify(data))
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.message)
          } else {
            setError('Gagal memuat fakultas')
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
        .catch((err) => {
          if (err.response) {
            setError(err.response.data.message)
          } else {
            setError('Gagal memuat jenis kelamin')
          }
        })
    }
  }, [])

  const onSubmit = async (formData) => {
    const url = 'http://localhost:4000/checkUserByIdentity'
    try {
      await axios.post(url, {
        userIdentity: formData.nip,
        role: 'professor',
      })
      const randomNumber = Math.floor(Math.random() * 3)
      const randomAvatar =
        cacheFormData.gender === 1
          ? dosenAvatars.male[randomNumber]
          : dosenAvatars.female[randomNumber]
      await sendData({
        ...cacheFormData,
        ...formData,
        avatar: randomAvatar,
      })
      history.push('/')
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message)
        return
      }

      setError(error)
    }
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <BackButton to="/signup" />
      <Container>
        <Title>Data diri dosen</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Nomor induk pegawai"
            type="number"
            name="nip"
            ref={register}
          />
          <Input placeholder="Nama lengkap" name="fullname" ref={register} />
          <Input placeholder="Alamat" name="address" ref={register} />
          <Select
            name="faculty"
            placeholder="Fakultas"
            setValue={setValue}
            items={faculties}
          />
          <Select
            name="gender"
            placeholder="Jenis kelamin"
            setValue={setValue}
            items={genders}
          />
          <Button>Daftar</Button>
        </Form>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </Container>
    </Layout>
  )
}

export default DosenForm
