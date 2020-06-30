import React from 'react'
import styled from 'styled-components'
import OverlayScrollbar from '../../../components/Dashboard/OverlayScrollbar'
import Layout from '../../../layout'
import {BackButton} from '../../../components/Button'
import {dosenAvatars} from '../../../images/userAvatars'

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AvatarContainer = styled.div`
  border-radius: 50%;
  width: 120px;
  height: 120px;
`

const Avatar = styled.img`
  display: block;
  width: 100%;
`

const UserStatusIcon = styled.div`
  border-radius: 50%;
  background: ${({status}) => (status ? 'green' : 'yellow')};
  width: 8px;
  height: 8px;
`

const UserStatusMessage = styled.p`
  color: #333;
  font-size: 1.4rem;
  margin: 0 0.7rem 0 0;
`

const UserStatusMessageContainer = styled.div`
  display: flex;
  align-items: center;
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
function Professor({professor}) {
  const {
    username,
    avatar,
    status,
    fullname,
    nip,
    faculty,
    gender,
    address,
  } = professor

  return (
    <Layout>
      <BackButton to="/" />
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src={dosenAvatars[avatar]} alt={`${fullname} avatar`} />
        </AvatarContainer>
        <Username>@{username}</Username>
        <UserStatusMessageContainer>
          <UserStatusMessage>{status ? 'online' : 'offline'}</UserStatusMessage>
          <UserStatusIcon status={status} />
        </UserStatusMessageContainer>
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
              <AtributeText>{faculty.name}</AtributeText>
            </OverlayScrollbar>
          </AtributeValue>
        </AtributeItem>
        <AtributeItem>
          <AtributeName>
            <AtributeText>Jenis kelamin</AtributeText>
          </AtributeName>
          <AtributeValue>
            <OverlayScrollbar>
              <AtributeText>{gender.name}</AtributeText>
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
    </Layout>
  )
}

export default Professor
