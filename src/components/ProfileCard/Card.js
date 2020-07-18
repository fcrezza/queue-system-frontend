import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import rightArrow from '../../images/right-arrow.svg'

const CardContainer = styled.div`
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  background: ${({theme}) => theme.secondaryLight};
  align-items: center;
  overflow: hidden;
`

const AvatarContainer = styled.div`
  border-radius: 10px;
  width: 80px;
  min-width: 70px;
  overflow: hidden;
`

const AvatarImg = styled.img`
  display: block;
  width: 100%;
`

const CardContent = styled.div`
  color: ${({theme}) => theme.primaryLight};
  overflow: hidden;
  padding: 0 2rem;
`

const CardHeading = styled.h3`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1.8rem;
  margin: 0 0 0.5rem;
`

const CardText = styled.p`
  overflow: hidden;
  margin: 0;
  text-overflow: ellipsis;
  font-size: 1.3rem;
`

const CardLink = styled(RouterLink)`
  text-decoration: none;
  background: ${({theme}) => theme.primary};
  border-radius: 10px;
  padding: 1rem;
  margin-left: auto;

  img {
    display: block;
  }
`

function Container({children}) {
  return <CardContainer>{children}</CardContainer>
}

function Avatar({src, alt}) {
  return (
    <AvatarContainer>
      <AvatarImg src={src} alt={alt} />
    </AvatarContainer>
  )
}

function Content({fullname, study}) {
  return (
    <CardContent>
      <CardHeading>{fullname}</CardHeading>
      <CardText>{study}</CardText>
    </CardContent>
  )
}

function Link({to}) {
  return (
    <CardLink to={to}>
      <img src={rightArrow} alt="" />
    </CardLink>
  )
}

export {Container, Avatar, Content, Link}
