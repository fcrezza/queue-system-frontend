import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
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
import Preference from '../../../components/Dashboard/Preference'
import {Title, FlexContainer} from '../../../components/Dashboard/Section'
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
  color: ${({color, theme}) => color || theme.main};
  outline: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
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
  const welcomeMessage = `Halo, ${fullname.slice(0, fullname.indexOf(' '))}`
  const {textMainLight} = useContext(ThemeContext)

  return (
    <Layout>
      <FlexContainer>
        <Title>{welcomeMessage}</Title>
        <Preference avatar={mahasiswaAvatars[avatar]} />
      </FlexContainer>
      <DarkProfileContainer>
        <AvatarContainer>
          <Avatar src={mahasiswaAvatars[avatar]} alt={`${fullname} avatar`} />
        </AvatarContainer>
        <DarkProfileData>
          <ProfileHeading>{fullname}</ProfileHeading>
          <ProfileText>Mahasiswa {study}</ProfileText>
          <Link color={textMainLight} to="/profile">
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
          <Link to="/professor">Selengkapnya →</Link>
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
          <Link to="/queue">Selengkapnya →</Link>
        </ProfileData>
      </ProfileContainer>
    </Layout>
  )
}

export default Home
