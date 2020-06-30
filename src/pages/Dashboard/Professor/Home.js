import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Layout from '../../../layout'
import Preference from '../../../components/Dashboard/Preference'
import {Title, FlexContainer} from '../../../components/Dashboard/Section'
import {
  ProfileContainer,
  DarkProfileContainer,
  AvatarContainer,
  Avatar,
  ProfileData,
  DarkProfileData,
  ProfileHeading,
  ProfileText,
} from '../../../components/Dashboard/Profile'
import {mahasiswaAvatars, dosenAvatars} from '../../../images/userAvatars'
import queueSVG from '../../../images/queue.svg'

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

function Home({greetingMessage, fullname, facultyName, avatar}) {
  const theme = useContext(ThemeContext)
  return (
    <Layout>
      <FlexContainer>
        <Title>{greetingMessage}</Title>
        <Preference avatar={dosenAvatars[avatar]} />
      </FlexContainer>
      <DarkProfileContainer>
        <AvatarContainer>
          <Avatar src={dosenAvatars[avatar]} alt={`${fullname} avatar`} />
        </AvatarContainer>
        <DarkProfileData>
          <ProfileHeading>{fullname}</ProfileHeading>
          <ProfileText>Dosen fakultas {facultyName}</ProfileText>
          <Link to="/profile" color={theme.textMainLight}>
            Selengkapnya →
          </Link>
        </DarkProfileData>
      </DarkProfileContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar src={mahasiswaAvatars.mahasiswaMale3} alt="" />
        </AvatarContainer>
        <ProfileData>
          <ProfileHeading>Mahasiwa Bimbingan</ProfileHeading>
          <ProfileText>List mahasiswa yang dibimbing</ProfileText>
          <Link to="/students">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar src={queueSVG} alt="" />
        </AvatarContainer>
        <ProfileData>
          <ProfileHeading>Antrian</ProfileHeading>
          <ProfileText>Manage antrian mahasiswa</ProfileText>
          <Link to="/queue">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
    </Layout>
  )
}

export default Home
