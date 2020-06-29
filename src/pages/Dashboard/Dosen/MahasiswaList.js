import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Spinner from '../../../components/Spinner'
import Layout from '../../../layout'
import {BackButton} from '../../../components/Button'
import {Title, Subtitle} from '../../../components/Dashboard/Section'
import {
  ProfileContainer,
  AvatarContainer,
  Avatar,
  ProfileData,
  ProfileHeading,
  ProfileText,
} from '../../../components/Dashboard/Profile'
import {mahasiswaAvatars} from '../../../images/userAvatars'

const Container = styled.div`
  margin-bottom: 4rem;
`

const SearchInput = styled.input`
  background: #f0f0f0;
  color: #222;
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 1.7rem;
  padding: 1.5rem;
`

const Link = styled(RouterLink)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({color}) => color || '#333'};
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

function MahasiswaList({id}) {
  const [list, setList] = useState(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const url = `http://localhost:4000/listMahasiswa/${id}`
    axios
      .get(url)
      .then(({data}) => {
        setList(data)
      })
      .catch((err) => {
        console.log('error from mahasiswaList fetch: ', err)
      })
  }, [])

  const handleChange = ({target}) => {
    setInputValue(target.value)
  }

  if (!list) {
    return <Spinner>Memuat data ... </Spinner>
  }

  const filteredList = list.filter(({fullname}) =>
    fullname.includes(inputValue),
  )

  return (
    <Layout>
      <Container>
        <BackButton to="/" />
      </Container>
      <Container>
        <Title>Daftar Mahasiswa</Title>
        <Subtitle>Daftar mahasiswa yang anda bimbing</Subtitle>
      </Container>
      <Container>
        <SearchInput
          value={inputValue}
          onChange={handleChange}
          placeholder="Cari mahasiswa ..."
        />
      </Container>
      <Container>
        {filteredList.map(({id: mahasiswaID, study, avatar, fullname}) => (
          <ProfileContainer key={mahasiswaID}>
            <AvatarContainer>
              <Avatar src={mahasiswaAvatars[avatar]} alt="" />
            </AvatarContainer>
            <ProfileData>
              <ProfileHeading>{fullname}</ProfileHeading>
              <ProfileText>Mahasiswa {study}</ProfileText>
              <Link to={`/mahasiswa/${mahasiswaID}`}>Selengkapnya →</Link>
            </ProfileData>
          </ProfileContainer>
        ))}
      </Container>
    </Layout>
  )
}

export default MahasiswaList
