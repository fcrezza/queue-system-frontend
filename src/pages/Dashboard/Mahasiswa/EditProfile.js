import React, {useState, useEffect} from 'react'
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

const ButtonBlockExtend = styled(ButtonBlock)`
  background: ${({disabled}) => (disabled ? '#d9d9d9' : '#222')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`

function EditProfile({user, history}) {
  const {register, handleSubmit, setValue, watch} = useForm()
  const [prodi, setProdi] = useState(JSON.parse(localStorage.getItem('prodi')))
  const [genders, setGenders] = useState(
    JSON.parse(localStorage.getItem('gender')),
  )
  const [dosen, setDosen] = useState(null)
  const [dosenDefaultValue, setDosenDefaultValue] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const userProdiInput = watch('study')
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
    if (!prodi) {
      const url = `http://localhost:4000/prodi`
      axios
        .get(url)
        .then(({data}) => {
          setProdi(data)
        })
        .catch((err) => {
          console.log('error form fetch prodi: ', err)
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
    const prodiID = userProdiInput || study.id
    const url = `http://localhost:4000/dosen/${prodiID}`

    axios
      .get(url)
      .then(({data}) => {
        setDosen(
          data.map((d) => {
            const {namaLengkap: nama, ...rest} = d
            return {nama, ...rest}
          }),
        )

        if (prodiID === study.id) {
          const {id: profID} = data.find((p) => p.id === professorID)
          setDosenDefaultValue(profID)
        } else {
          setDosenDefaultValue(data[0].id)
        }
      })
      .catch((err) => {
        console.log('error from fetch dosen: ', err)
      })
  }, [userProdiInput])

  useEffect(() => {
    if (!!dosen && !!prodi && !!genders) {
      setLoading(false)
    }
  }, [dosen, prodi, genders])

  const onSubmit = (formData) => {
    const data = {
      id,
      ...formData,
    }

    axios
      .post('http://localhost:4000/changeMahasiswaProfile', data)
      .then(() => {
        history.push('/profil', {status: 1})
      })
      .catch((err) => {
        console.log('error from post profile change: ', err)
      })
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  const {id: studyDefaultValue} = prodi.find((p) => p.id === study.id)
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
            placeholder="NIM"
            name="nim"
            ref={register}
            defaultValue={nim}
          />
          <Select
            name="study"
            defaultValue={studyDefaultValue}
            placeholder="Prodi"
            setValue={setValue}
            items={prodi}
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
          <Select
            name="professor"
            defaultValue={dosenDefaultValue}
            placeholder="Dosen pembimbing"
            setValue={setValue}
            items={dosen}
          />
          <ButtonBlockExtend>Simpan</ButtonBlockExtend>
        </Form>
        <ErrorMessage error={!!error}>{error}</ErrorMessage>
      </FormContainer>
    </Layout>
  )
}

export default EditProfile
