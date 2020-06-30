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
  FlexContainer,
  AntrianContainer,
} from '../../../components/Dashboard/Section'
import {dosenAvatars, mahasiswaAvatars} from '../../../images/userAvatars'
import nullSVG from '../../../images/null.svg'

const Container = styled.div`
  margin: 3rem 0;
`

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

function Queue(props) {
  const socket = useSocket()
  const [active, setActive] = useState(null)
  const [queue, setQueue] = useState(null)
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
    socket.emit('getQueue', professorID)

    socket.on('newData', (data, profID) => {
      const isInQueue = data.find((x) => x.id === id)
      if (isInQueue && professorID === profID) {
        const indexQueue = data.indexOf(isInQueue)
        const filterActiveQueue = data.filter((a) => a.status === 'active')
        const filterPendingQueue = data.filter((a) => a.status === 'pending')
        if (filterActiveQueue.length) {
          setActive(filterActiveQueue[0])
        }
        setQueue(filterPendingQueue)
        setStatusMessage(
          generateStatusMessage(id, filterActiveQueue[0], indexQueue),
        )
      } else {
        setQueue(null)
        setActive(null)
      }
    })
  }, [])

  useEffect(() => {
    if (!queue) {
      setLoading(false)
    }
  }, [queue])

  const requestBimbingan = () => {
    if (professorStatus) {
      socket.emit('requestQueue', {id, professorID})
      return
    }

    window.alert('professor offline!')
  }

  const cancelQueue = () => {
    if (active?.id !== id) {
      const {time} = queue.find((a) => a.id === id)
      socket.emit('outFromQueue', {id, time, professorID})
    }
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <BackButton to="/" />
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
          <Link to="/professor">Selengkapnya →</Link>
        </DarkProfileData>
        <StatusIcon status={professorStatus} />
      </DarkProfileContainer>
      <FlexContainer>
        <div>
          <Title>Antrian</Title>
          <Subtitle>{statusMessage}</Subtitle>
        </div>
        <div>
          <ButtonExtend onClick={cancelQueue} disabled={!queue && !active}>
            Batal
          </ButtonExtend>
        </div>
      </FlexContainer>
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
        {queue ? (
          queue.map(({fullname, id: studentID, avatar, study}) => {
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

export default Queue
