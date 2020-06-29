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
  Container,
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

const ControlContainer = styled(Container)`
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
  const [antrian, setAntrian] = useState(null)
  const [active, setActive] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    socket.emit('getAntrian', id)
    socket.on('new-data', (data, dosenID) => {
      const filterActiveAntrian = data.filter((a) => a.status === 'active')[0]
      if (dosenID === id) {
        if (filterActiveAntrian) {
          setActive(filterActiveAntrian)
        }

        setAntrian(data.filter((a) => a.status === 'pending'))
      }
    })
  }, [])

  useEffect(() => {
    if (antrian) {
      setLoading(false)
    }
  }, [antrian])

  const NextQueue = () => {
    console.log({active, antrian, id})
    socket.emit('next', active, antrian[0], id)
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
        <Subtitle>{antrian?.length} mahasiswa menunggu</Subtitle>
        <Button onClick={NextQueue} disabled={!antrian.length && !active}>
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
                <Link to={`/mahasiswa/${active.id}`}>Lihat profil →</Link>
              </ProfileData>
            </ProfileContainer>
            <Devider />
          </div>
        ) : null}
        {antrian.map((x) => {
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
                <Link to={`/mahasiswa/${x.id}`}>Lihat profil →</Link>
              </ProfileData>
            </ProfileContainer>
          )
        })}
        {!antrian.length && !active ? <NoQueue /> : null}
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
