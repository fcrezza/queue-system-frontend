import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import {useSocket} from '../../../context/SocketContext'
import Layout from '../../../layout'
import Spinner from '../../../components/Spinner'
import Devider from '../../../components/Dashboard/Devider'
import {BackButton, Button} from '../../../components/Button'
import {
  Title,
  Subtitle,
  FlexContainer,
  AntrianContainer,
} from '../../../components/Dashboard/Section'
import {
  ProfileContainer,
  AvatarContainer,
  Avatar,
  ProfileData,
  ProfileHeading,
  ProfileText,
} from '../../../components/Dashboard/Profile'
import {mahasiswaAvatars} from '../../../images/userAvatars'
import nullSVG from '../../../images/null.svg'

const ControlContainer = styled(FlexContainer)`
  align-items: center;
`

const Wrapper = styled.div`
  margin-bottom: 4rem;
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

function Antrian({id}) {
  const socket = useSocket()
  const [queue, setQueue] = useState(null)
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    socket.emit('getQueue', id)
    socket.on('newData', (data, profID) => {
      const filterActiveQueue = data.filter((a) => a.status === 'active')[0]
      const filterPendingQueue = data.filter((a) => a.status === 'pending')
      if (profID === id) {
        if (filterActiveQueue) {
          setActive(filterActiveQueue)
        }

        setQueue(filterPendingQueue)
      }
    })
  }, [])

  useEffect(() => {
    if (queue) {
      setLoading(false)
    }
  }, [queue])

  const NextQueue = () => {
    socket.emit('nextQueue', active, queue[0], id)
    setActive(null)
  }

  if (loading) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <Wrapper>
        <BackButton to="/" />
      </Wrapper>
      <Wrapper>
        <Title>Antrian</Title>
        <Subtitle>
          Manage antrian mahasiswa yang akan melakukan bimbingan
        </Subtitle>
      </Wrapper>
      <ControlContainer>
        <Subtitle>{queue?.length} mahasiswa menunggu</Subtitle>
        <Button onClick={NextQueue} disabled={!queue.length && !active}>
          Next
        </Button>
      </ControlContainer>
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
                <ProfileHeading>{active.fullname}</ProfileHeading>
                <ProfileText>Mahasiswa {active.study}</ProfileText>
                <Link to={`/students/${active.id}`}>Lihat profil →</Link>
              </ProfileData>
            </ProfileContainer>
            <Devider />
          </div>
        ) : null}
        {queue.map((x) => {
          return (
            <ProfileContainer key={x.id}>
              <AvatarContainer>
                <Avatar
                  src={mahasiswaAvatars[x.avatar]}
                  alt={`${x.fullname} avatar`}
                />
              </AvatarContainer>
              <ProfileData>
                <ProfileHeading>{x.fullname}</ProfileHeading>
                <ProfileText>Mahasiswa {x.study}</ProfileText>
                <Link to={`/students/${x.id}`}>Lihat profil →</Link>
              </ProfileData>
            </ProfileContainer>
          )
        })}
        {!queue.length && !active ? <NoQueue /> : null}
      </AntrianContainer>
    </Layout>
  )
}

export default Antrian

function NoQueue() {
  return (
    <Null>
      <img src={nullSVG} alt="" />
      <p>Belum ada yang mengantri</p>
    </Null>
  )
}
