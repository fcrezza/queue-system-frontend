import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

const MenuContainer = styled.div`
  margin-top: 280px;
`

const MenuWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -5% 0 0 -5%;
`

const ItemLink = styled(RouterLink)`
  margin: 5% 0 0 5%;
  text-decoration: none;
  width: 45%;
`

const ItemContainer = styled.div`
  height: 200px;
  border-radius: 10px;
  padding: 1.5rem;
  background: ${({color}) => color};
`

const ItemContent = styled.div`
  background: ${({bg}) => `url(${bg})`};
  background-position: right bottom;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
`

const ItemText = styled.h3`
  color: ${({theme}) => theme.primaryLight};
  margin: 0;
  font-size: 1.7rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
`

function Container({children}) {
  return (
    <MenuContainer>
      <MenuWrapper>{children}</MenuWrapper>
    </MenuContainer>
  )
}

function Item({link, color, bg, text, children}) {
  return (
    <ItemLink to={link}>
      <ItemContainer color={color}>
        <ItemContent bg={bg}>
          <ItemText>{text}</ItemText>
          {children}
        </ItemContent>
      </ItemContainer>
    </ItemLink>
  )
}

export {Container, Item}
