import React from 'react'
import styled from 'styled-components'
import {dosenAvatars} from '../images/userAvatars'

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: 0px 0px 20px #d9d9d9;
  padding: 2rem;
  border-radius: 5px;
`

const ItemImage = styled.img`
  width: 60px;
`

const TextContainer = styled.div`
  margin-left: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Text = styled.p`
  margin: 0;
  font-size: 1.3rem;
  color: ${({theme}) => theme.secondary};
`

const TextHeading = styled.h3`
  font-size: 1.6rem;
  margin: 0 0 0.5rem;
  color: ${({theme}) => theme.main};
`

const ItemButton = styled.button`
  background: transparent;
  border: 1px solid #222;
  color: #222;
  font-size: 1.2rem;
  outline: none;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`

function Item({avatar, faculty, name, handleClick}) {
  return (
    <ItemContainer>
      <ItemImage src={dosenAvatars[avatar]} alt={`${name} avatar`} />
      <TextContainer>
        <TextHeading>{name}</TextHeading>
        <Text>{faculty}</Text>
      </TextContainer>
      <ItemButton onClick={handleClick}>Pilih</ItemButton>
    </ItemContainer>
  )
}

export default Item
