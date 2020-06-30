import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Layout from '../../../layout'
import Spinner from '../../../components/Spinner'
import Item from '../../../components/Item'
import useError from '../../../hooks/useError'
import {BackButton} from '../../../components/Button'
import {Container, Title as OriginalTitle} from '../../../components/Form'

const mahasiswaAvatars = {
  male: ['mahasiswaMale1', 'mahasiswaMale2', 'mahasiswaMale3'],
  female: ['mahasiswaFemale1', 'mahasiswaFemale2', 'mahasiswaFemale3'],
}

const Title = styled(OriginalTitle)`
  margin: 3rem 0 1rem;
`

const Subtitle = styled.p`
  color: ${({theme}) => theme.secondary};
  margin: 0 0 3rem;
  font-size: 1.6rem;
`

const SearchInput = styled.input`
  background: ${({theme}) => theme.gray};
  color: ${({theme}) => theme.secondary};
  border: 0;
  font-size: 1.6rem;
  width: 100%;
  padding: 1.3rem;
  outline: none;
`

const ListItem = styled.div`
  margin: 5rem 0;

  & > div {
    margin-bottom: 3.5rem;
  }
`

function Step3({cacheFormData, sendData, history}) {
  const [professors, setProfessors] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const {errorMessage, setError} = useError({})

  useEffect(() => {
    if (cacheFormData.role === 'student') {
      axios
        .get(
          `http://localhost:4000/professorsByStudyProgram/${cacheFormData.study}`,
        )
        .then(({data}) => {
          setProfessors(data)
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message)
          } else {
            setError('Pastikan kamu terhubung ke internet')
          }
        })
    }
  }, [])

  if (!professors && cacheFormData.role === 'student') {
    return <Spinner>Memuat data ...</Spinner>
  }

  const handleClick = async (id) => {
    try {
      const randomNumber = Math.floor(Math.random() * 3)
      const randomAvatar =
        cacheFormData.gender === 1
          ? mahasiswaAvatars.male[randomNumber]
          : mahasiswaAvatars.female[randomNumber]

      await sendData({
        ...cacheFormData,
        idDosen: id,
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

  const handleChange = ({target}) => {
    setInputValue(target.value)
  }

  const filteredProfessors = professors.filter(({fullname}) => {
    const inputLowercase = inputValue.toLowerCase()
    const nameLowercase = fullname.toLowerCase()
    return nameLowercase.includes(inputLowercase)
  })

  if (professors && cacheFormData.role === 'student') {
    return (
      <Layout>
        {errorMessage && alert(errorMessage)}
        <BackButton to="/signup/step-2" replace />
        <Container>
          <Title>Pilih dosen</Title>
          <Subtitle>
            Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
          </Subtitle>
          <SearchInput
            placeholder="Cari dosen..."
            value={inputValue}
            onChange={handleChange}
          />
          <ListItem>
            {filteredProfessors.map(({id, avatar, faculty, fullname}) => (
              <Item
                key={id}
                avatar={avatar}
                handleClick={() => handleClick(id)}
                faculty={faculty}
                name={fullname}
              />
            ))}
          </ListItem>
        </Container>
      </Layout>
    )
  }

  return <Redirect to="/signup" />
}

export default Step3
