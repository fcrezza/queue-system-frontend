import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import {useSocket} from '../../../context/SocketContext'
import Layout from '../../../layout'
import Devider from '../../../components/Dashboard/Devider'
import Spinner from '../../../components/Spinner'
import {BackButton, Button} from '../../../components/Button'
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
import {
  Title,
  Subtitle,
  Container,
  AntrianContainer,
} from '../../../components/Dashboard/Section'
import {dosenAvatars, mahasiswaAvatars} from '../../../images/userAvatars'
import nullSVG from '../../../images/null.svg'

const StatusIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({status}) => (status ? 'green' : 'yellow')};
  margin-left: auto;
`

const Link = styled(RouterLink)`
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  outline: none;
  color: inherit;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`

const ButtonExtend = styled(Button)`
  background: ${({disabled}) => (disabled ? '#666' : '#222')};
  cursor: ${({disabled}) => (disabled ? 'default' : 'pointer')};
`

const Null = styled.div`
  text-align: center;

  & > button,
  img {
    margin: auto;
  }

  img {
    display: block;
  }

  p {
    color: #333;
    margin: 2rem 0;
    font-size: 1.6rem;
  }
`

function generateStatusMessage(id, activeQueue, indexQueue) {
  let message = ''

  if (typeof activeQueue === 'object') {
    if (activeQueue.id === id) {
      message = 'Sedang bimbingan'
    } else if (activeQueue.id !== id) {
      message = `Menunggu ${indexQueue} antrian`
    }
  } else if (!activeQueue && indexQueue) {
    message = `Menunggu ${indexQueue} antrian`
  } else {
    message = 'Menunggu dipanggil'
  }

  return message
}

function Antrian(props) {
  const socket = useSocket()
  const [active, setActive] = useState(null)
  const [antrian, setAntrian] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState('')
  const {
    id,
    professorID,
    professorName,
    professorAvatar,
    professorStatus,
  } = props

  useEffect(() => {
    socket.emit('getAntrian', professorID)

    socket.on('new-data', (data, dosenID) => {
      const isInAntrian = data.find((x) => x.id === id)
      if (isInAntrian && professorID === dosenID) {
        const indexQueue = data.indexOf(isInAntrian)
        const filterActiveAntrian = data.filter((a) => a.status === 'active')
        const filterAntrian = data.filter((a) => a.status === 'pending')
        if (filterActiveAntrian.length) {
          setActive(filterActiveAntrian[0])
        }
        setAntrian(filterAntrian)
        setStatusMessage(
          generateStatusMessage(id, filterActiveAntrian[0], indexQueue),
        )
      } else {
        setAntrian(null)
        setActive(null)
      }
    })
  }, [])

  useEffect(() => {
    if (!antrian) {
      setLoading(false)
    }
  }, [antrian])

  const requestBimbingan = () => {
    if (professorStatus) {
      socket.emit('requestBimbingan', {id, professorID})
      return
    }

    window.alert('offline!')
  }

  const cancelQueue = () => {
    if (active?.id !== id) {
      const {time} = antrian.find((a) => a.id === id)
      socket.emit('out', {id, time, professorID})
    }
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <Container>
        <BackButton to="/" />
      </Container>
      <Container>
        <Title>Dosen pembimbing</Title>
      </Container>
      <DarkProfileContainer>
        <AvatarContainer>
          <Avatar
            src={dosenAvatars[professorAvatar]}
            alt={`${professorName} avatar`}
          />
        </AvatarContainer>
        <DarkProfileData>
          <ProfileHeading>Dosen pembimbing</ProfileHeading>
          <ProfileText>{professorName}</ProfileText>
          <Link to="/dosen-pembimbing">Selengkapnya →</Link>
        </DarkProfileData>
        <StatusIcon status={professorStatus} />
      </DarkProfileContainer>
      <Container>
        <div>
          <Title>Antrian</Title>
          <Subtitle>{statusMessage}</Subtitle>
        </div>
        <div>
          <ButtonExtend onClick={cancelQueue} disabled={!antrian && !active}>
            Batal
          </ButtonExtend>
        </div>
      </Container>
      <AntrianContainer>
        {active ? (
          <div>
            <ProfileContainer>
              <AvatarContainer>
                <Avatar
                  src={mahasiswaAvatars[active.avatar]}
                  alt={`${active.fullname} avatar`}
                />
              </AvatarContainer>
              <ProfileData>
                <ProfileHeading>Sedang bimbingan ...</ProfileHeading>
                <ProfileText>{active.fullname}</ProfileText>
                <ProfileText>{active.study.name}</ProfileText>
              </ProfileData>
            </ProfileContainer>
            <Devider />
          </div>
        ) : null}
        {antrian ? (
          antrian.map(({fullname, id: studentID, avatar, study}) => {
            return (
              <ProfileContainer key={studentID}>
                <AvatarContainer>
                  <Avatar
                    src={mahasiswaAvatars[avatar]}
                    alt={`${fullname} avatar`}
                  />
                </AvatarContainer>
                <ProfileData>
                  <ProfileHeading>{fullname}</ProfileHeading>
                  <ProfileText>Mahasiswa {study}</ProfileText>
                </ProfileData>
              </ProfileContainer>
            )
          })
        ) : (
          <Null>
            <img src={nullSVG} alt="" />
            <p>Kamu belum melakukan bimbingan</p>
            <Button onClick={requestBimbingan}>Mulai mengantri</Button>
          </Null>
        )}
      </AntrianContainer>
    </Layout>
  )
}

export default Antrian

// {
// 					antrian: filterAntrian,
// 					statusMessage: ,
// 					isActive: filterActiveAntrian[0]?.id === id,
// 				}
