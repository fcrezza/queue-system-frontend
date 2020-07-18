import React from 'react'
import styled from 'styled-components'
import {useHistory, Link} from 'react-router-dom'
import {BackButton, LogoutButton} from '../Button'
import OverlayScrollbar from './OverlayScrollbar'
import {useAuth} from '../../context/AuthContext'

const BodyContainer = styled.div`
  margin: 3rem 0 4rem;

  & > div {
    margin-bottom: 2rem;
  }
`

const AttributeContainer = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: ${({theme}) => theme.gray};
  color: ${({theme}) => theme.primaryLight};
`

const AttributeName = styled.p`
  font-size: 1.3rem;
  margin: 0 0 0.6rem;
`

const AttributeValue = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`
const ChangePasswordButton = styled(Link)`
  font-size: 1.6rem;
  color: ${({theme}) => theme.primary};
  font-weight: 600;
  text-decoration: none;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const AvatarContainer = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  border: ${({active, theme}) => active && `5px solid ${theme.cyan}`};
`

const Avatar = styled.img`
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3D(-50%, -50%, 0);
`

const ProfileName = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin: 1.5rem 0;
  color: ${({theme}) => theme.primary};
`

const EditButton = styled(Link)`
  font-weight: 600;
  background: ${({theme}) => theme.primary};
  padding: 1rem 1.6rem;
  border-radius: 10px;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: none;
  color: ${({theme}) => theme.secondary};
`

const NavigationContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6rem;
`

function Navigation({owned}) {
  const history = useHistory()
  const {logout} = useAuth()

  const handleLogout = async () => {
    await logout()
    history.push('/')
  }

  return (
    <NavigationContainer>
      <BackButton />
      {owned && <LogoutButton onClick={handleLogout} />}
    </NavigationContainer>
  )
}

function Header({src, alt, name, owned, active}) {
  return (
    <HeaderContainer>
      <AvatarContainer active={active}>
        <Avatar src={src} alt={alt} />
      </AvatarContainer>
      <ProfileName>{`@${name}`}</ProfileName>
      {owned && <EditButton to="/profile/edit">Edit profil</EditButton>}
    </HeaderContainer>
  )
}

function ChangePassword() {
  return (
    <ChangePasswordButton to="/profile/change-password">
      Ganti password →
    </ChangePasswordButton>
  )
}

function Body({items}) {
  return (
    <BodyContainer>
      {items.map(({name, value}) => (
        <Attribute key={name} name={name} value={value} />
      ))}
    </BodyContainer>
  )
}

function Attribute({name, value}) {
  return (
    <AttributeContainer>
      <AttributeName>{name}</AttributeName>
      <OverlayScrollbar>
        <AttributeValue>{value}</AttributeValue>
      </OverlayScrollbar>
    </AttributeContainer>
  )
}

export {Navigation, Header, Body, ChangePassword}
