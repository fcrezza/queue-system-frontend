import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

import {BackButton} from '../../components/Button'
import {Container, Title as OriginalTitle} from '../../components/Signup'
import {
  dosenMale1,
  dosenMale2,
  dosenMale3,
  dosenFemale1,
  dosenFemale2,
  dosenFemale3,
} from '../../images/dosen'

const images = {
  dosenMale1,
  dosenMale2,
  dosenMale3,
  dosenFemale1,
  dosenFemale2,
  dosenFemale3,
}

const mahasiswaAvatars = {
  male: ['mahasiswaMale1', 'mahasiswaMale2', 'mahasiswaMale3'],
  female: ['mahasiswaFemale1', 'mahasiswaFemale2', 'mahasiswaFemale3'],
}

const Title = styled(OriginalTitle)`
  margin: 3rem 0 1rem;
`

const Subtitle = styled.p`
  color: #333;
  margin: 0 0 3rem;
  font-size: 1.8rem;
`

const SearchInput = styled.input`
  background: #f0f0f0;
  color: #333;
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

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 20px #d9d9d9;
  padding: 2rem;
  border-radius: 5px;
  color: #333;
`

const ItemImage = styled.div`
  img {
    width: 60px;
  }
`

const ItemText = styled.div`
  margin-left: 1.8rem;

  h3 {
    font-size: 1.6rem;
    margin: 0 0 0.5rem;
  }

  p {
    margin: 0;
    font-size: 1.3rem;
  }
`

const ItemButton = styled.button`
  background: transparent;
  border: 1px solid #222;
  color: #222;
  font-size: 1.2rem;
  outline: none;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`

function Step3({data, sendData}) {
  const [dosen, setDosen] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (data.role === 'mahasiswa') {
      axios
        .get(`http://localhost:4000/dosen/${data.prodi}`)
        .then((res) => {
          setDosen(res.data)
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
    return <div>Pastikan kamu terhubung ke internet ...</div>
  }

  if (!dosen && data.role === 'mahasiswa') {
    return <div>yang sabar boss ...</div>
  }

  if (dosen && data.role === 'mahasiswa') {
    return (
      <Container>
        <BackButton to="/signup/step-2" replace />
        <Title>Pilih dosen</Title>
        <Subtitle>
          Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
        </Subtitle>
        <SearchInput placeholder="Cari dosen..." />
        <ListItem>
          {dosen.map((d) => (
            <Item
              key={d.id}
              avatar={d.avatar}
              sendData={sendData}
              id={d.id}
              fakultas={d.fakultas}
              name={d.namaLengkap}
              data={data}
            />
          ))}
        </ListItem>
      </Container>
    )
  }

  return <Redirect to="/signup" />
}

function Item({avatar, sendData, fakultas, name, id, data}) {
  const handleClick = () => {
    const randomNumber = Math.floor(Math.random() * 3)
    const randomAvatar =
      data.gender === 1
        ? mahasiswaAvatars.male[randomNumber]
        : mahasiswaAvatars.female[randomNumber]

    sendData({
      ...data,
      idDosen: id,
      avatar: randomAvatar,
    })
  }

  return (
    <ItemContainer>
      <ItemImage>
        <img src={images[avatar]} alt={`${name} avatar`} />
      </ItemImage>
      <ItemText>
        <h3>{name}</h3>
        <p>{fakultas}</p>
      </ItemText>
      <ItemButton onClick={handleClick}>Pilih</ItemButton>
    </ItemContainer>
  )
}

export default Step3
