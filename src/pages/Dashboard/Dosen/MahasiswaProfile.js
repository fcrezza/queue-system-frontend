import React, {useState, useEffect} from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import Spinner from '../../../components/Spinner'
import {BackButton} from '../../../components/Button'
import Layout from '../../../layout'
import {mahasiswaAvatars} from '../../../images/userAvatars'

const Container = styled.div`
  margin-bottom: 4rem;
`

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Avatar = styled.img`
  display: block;
`

const Username = styled.h2`
  font-size: 2.1rem;
  margin: 1rem 0;
  color: #333;
`

const ProfileAtributeContainer = styled.div`
  margin-top: 3rem;
  box-shadow: 0px 0px 20px #d9d9d9;
  border-radius: 20px;
  padding: 2rem;
`

const AtributeItem = styled.div`
  border-bottom: 0.1px solid #d9d9d9;
  padding: 1rem 0;
  display: flex;
  color: #333;
`

const AtributeName = styled.div`
  border-right: 0.1px solid #d9d9d9;
  flex: 1;
`

const AtributeText = styled.p`
  margin: 0.5rem 0;
  font-size: 1.3rem;
`

const AtributeValue = styled.div`
  flex: 1;
  margin-left: 1rem;
  white-space: nowrap;
  min-width: 0;
`

function MahasiswaProfile({match}) {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const url = `http://localhost:4000/mahasiswa/${match.params.id}`
    axios
      .get(url)
      .then(({data}) => {
        setProfile(data)
      })
      .catch((err) => {
        console.log('error from profileMahasiswa fetch: ', err)
      })
  }, [])

  if (!profile) {
    return <Spinner>Memuat data ...</Spinner>
  }

  const {
    nim,
    avatar,
    username,
    fullname,
    study,
    gender,
    address,
    semester,
    professor,
  } = profile

  return (
    <Layout>
      <Container>
        <BackButton to="/mahasiswa" />
      </Container>
      <ProfileHeader>
        <Avatar src={mahasiswaAvatars[avatar]} alt={`${fullname} avatar`} />
        <Username>@{username}</Username>
      </ProfileHeader>
      <ProfileAtributeContainer>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Nama lengkap</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{fullname}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>NIM</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{nim}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Prodi</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{study}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Semester</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{semester}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Jenis kelamin</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{gender}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Alamat</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{address}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Dosen pembimbing</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{professor}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
      </ProfileAtributeContainer>
    </Layout>
  )
}

function OverlayScrollbar({children}) {
  const options = {
    scrollbars: {autoHide: 'leave', autoHideDelay: 200},
    overflowBehavior: {y: 'hidden'},
  }

  return (
    <OverlayScrollbarsComponent options={options}>
      {children}
    </OverlayScrollbarsComponent>
  )
}

export default MahasiswaProfile
