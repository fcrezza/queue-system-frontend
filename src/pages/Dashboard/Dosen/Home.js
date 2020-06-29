import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Layout from '../../../layout'
import {Title, Container} from '../../../components/Dashboard/Section'
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

const Preference = styled.div`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`

const PreferenceImage = styled.img`
  display: block;
  width: 100%;
`

const PreferenceLink = styled(RouterLink)`
  text-decoration: none;
`

function Home({greetingMessage, fullname, facultyName, avatar}) {
  return (
    <Layout>
      <Container>
        <Title>{greetingMessage}</Title>
        <PreferenceLink to="/profile">
          <Preference>
            <PreferenceImage src={dosenAvatars[avatar]} alt="" />
          </Preference>
        </PreferenceLink>
      </Container>
      <DarkProfileContainer>
        <AvatarContainer>
          <Avatar src={dosenAvatars[avatar]} alt={`${fullname} avatar`} />
        </AvatarContainer>
        <DarkProfileData>
          <ProfileHeading>{fullname}</ProfileHeading>
          <ProfileText>Dosen fakultas {facultyName}</ProfileText>
          <Link to="/profile" color="#f8f8f8">
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
          <Link to="/mahasiswa">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar src={queueSVG} alt="" />
        </AvatarContainer>
        <ProfileData>
          <ProfileHeading>Antrian</ProfileHeading>
          <ProfileText>Manage antrian mahasiswa</ProfileText>
          <Link to="/antrian">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
    </Layout>
  )
}

export default Home
