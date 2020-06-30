import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import OverlayScrollbar from '../../../components/Dashboard/OverlayScrollbar'
import Layout from '../../../layout'
import {useAuth} from '../../../context/AuthContext'
import {BackButton} from '../../../components/Button'
import LogoutButton from '../../../components/Dashboard/LogoutBtn'
import PopupMessage from '../../../components/Dashboard/PopupMessage'
import {FlexContainer} from '../../../components/Dashboard/Section'
import {mahasiswaAvatars} from '../../../images/userAvatars'

const Link = styled(RouterLink)`
  text-decoration: none;
  outline: none;
  color: ${({theme}) => theme.main};
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
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

const EditBtn = styled(Link)`
  font-size: 1.4rem;
`

const Container = styled.div`
  margin-top: 3rem;
  box-shadow: 0px 0px 20px #d9d9d9;
  border-radius: 20px;
  padding: 2rem;
`

const AtributeContainer = styled.div`
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

const ChangePasswordLink = styled(Link)`
  font-size: 1.8rem;
`

function Profile({user, match, location, history, professorName}) {
  const {logout} = useAuth()
  const {
    username,
    semester,
    study,
    avatar,
    address,
    nim,
    fullname,
    gender,
  } = user
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (location.state?.status) {
      setOpen(true)
      history.replace(match.url, null)
    }
  }, [])

  const closePopup = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <Layout>
      <FlexContainer>
        <BackButton to="/" />
        <LogoutButton onClick={handleLogout} />
      </FlexContainer>
      {open ? <PopupMessage onClick={closePopup} /> : null}
      <ProfileHeader>
        <Avatar src={mahasiswaAvatars[avatar]} alt={`${fullname} avatar`} />
        <Username>@{username}</Username>
        <EditBtn to={`${match.path}/edit`}>Edit Profil</EditBtn>
      </ProfileHeader>
      <Container>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Nama lengkap</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{fullname}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>NIM</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{nim}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Prodi</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{study.name}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Semester</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{semester}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Jenis kelamin</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{gender.name}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Alamat</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{address}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
        <AtributeContainer>
          <AtributeName>
            <AtributeText>Dosen pembimbing</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{professorName}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeContainer>
      </Container>
      <Container>
        <ChangePasswordLink to={`${match.url}/change-password`}>
          Ubah password →
        </ChangePasswordLink>
      </Container>
    </Layout>
  )
}

export default Profile
