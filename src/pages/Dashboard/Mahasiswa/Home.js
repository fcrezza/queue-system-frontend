import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import Layout from '../../../layout'
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
import {Title, Container} from '../../../components/Dashboard/Section'
import {dosenAvatars, mahasiswaAvatars} from '../../../images/userAvatars'
import queueSVG from '../../../images/queue.svg'

const StatusIcon = styled.div`
  margin-left: auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({status}) => (status ? 'green' : 'yellow')};
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

function Home(props) {
  const {
    professorName,
    professorStatus,
    professorAvatar,
    fullname,
    study,
    avatar,
  } = props
  const message = `Halo, ${fullname.slice(0, fullname.indexOf(' '))}`

  return (
    <Layout>
      <Container>
        <Title>{message}</Title>
        <PreferenceLink to="/profil">
          <Preference>
            <PreferenceImage src={mahasiswaAvatars[avatar]} alt="" />
          </Preference>
        </PreferenceLink>
      </Container>
      <DarkProfileContainer>
        <AvatarContainer>
          <Avatar src={mahasiswaAvatars[avatar]} alt={`${fullname} avatar`} />
        </AvatarContainer>
        <DarkProfileData>
          <ProfileHeading>{fullname}</ProfileHeading>
          <ProfileText>Mahasiswa {study}</ProfileText>
          <Link color="#fff" to="/profil">
            Selengkapnya →
          </Link>
        </DarkProfileData>
      </DarkProfileContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar
            src={dosenAvatars[professorAvatar]}
            alt={`${professorName} avatar`}
          />
        </AvatarContainer>
        <ProfileData>
          <ProfileHeading>Dosen pembimbing</ProfileHeading>
          <ProfileText>{professorName}</ProfileText>
          <Link to="/dosen-pembimbing">Selengkapnya →</Link>
        </ProfileData>
        <StatusIcon status={professorStatus} />
      </ProfileContainer>
      <ProfileContainer>
        <AvatarContainer>
          <Avatar src={queueSVG} alt="" />
        </AvatarContainer>
        <ProfileData>
          <ProfileHeading>Antrian</ProfileHeading>
          <ProfileText>Lihat antrian secara realtime</ProfileText>
          <Link to="/antrian">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
    </Layout>
  )
}

export default Home
