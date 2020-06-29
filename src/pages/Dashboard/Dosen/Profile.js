import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import {OverlayScrollbarsComponent} from 'overlayscrollbars-react'
import Layout from '../../../layout'
import {useAuth} from '../../../context/AuthContext'
import {BackButton} from '../../../components/Button'
import LogoutBtn from '../../../components/Dashboard/LogoutBtn'
import {Container} from '../../../components/Dashboard/Section'
import {dosenAvatars} from '../../../images/userAvatars'
import 'overlayscrollbars/css/OverlayScrollbars.css'

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

const EditBtn = styled(RouterLink)`
  text-decoration: none;
  color: #333;
  outline: none;
  font-weight: 600;
  font-size: 1.4rem;
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

const ChangePasswordContainer = styled.div`
  box-shadow: 0px 0px 20px #d9d9d9;
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 20px;
`

const ChangePasswordLink = styled(RouterLink)`
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 1.8rem;
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const MessageInfo = styled.div`
  padding: 1.5rem;
  background: lightgreen;
  position: relative;
  margin-bottom: 2.5rem;
  border-radius: 10px;
`

const MessageText = styled.p`
  font-size: 1.5rem;
  color: #f8f8f8;
  margin: 0;
`

const MessageCloseBtn = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 5px;
  right: 10px;
`

function Profile({match, location, history, ...props}) {
  const {logout} = useAuth()
  const {
    username,
    nip,
    fullname,
    avatar,
    address,
    genderName,
    facultyName,
  } = props
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (location.state?.status) {
      setOpen(true)
      history.replace(match.url, null)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <Layout>
      <Container>
        <BackButton to="/" />
        <LogoutBtn onClick={handleLogout} />
      </Container>
      {open ? (
        <MessageInfo>
          <MessageCloseBtn onClick={handleClose}>x</MessageCloseBtn>
          <MessageText>Perubahan berhasil disimpan</MessageText>
        </MessageInfo>
      ) : null}
      <ProfileHeader>
        <Avatar src={dosenAvatars[avatar]} alt={`${fullname} avatar`} />
        <Username>@{username}</Username>
        <EditBtn to={`${match.url}/edit`}>Edit Profil</EditBtn>
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
            <AtributeText>NIP</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{nip}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Fakultas</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{facultyName}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Jenis kelamin</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{genderName}</AtributeText>
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
      </ProfileAtributeContainer>
      <ChangePasswordContainer>
        <ChangePasswordLink to={`${match.url}/change-password`}>
          Ubah password →
        </ChangePasswordLink>
      </ChangePasswordContainer>
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

export default Profile
