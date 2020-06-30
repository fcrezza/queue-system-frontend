import React from 'react'
import styled from 'styled-components'

const MessageInfo = styled.div`
  padding: 1.5rem;
  background: lightgreen;
  position: relative;
  margin-bottom: 2.5rem;
  border-radius: 10px;
`

const MessageText = styled.p`
  font-size: 1.5rem;
  color: ${({theme}) => theme.textMainLight};
  margin: 0;
`

const MessageCloseBtn = styled.button`
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  border: none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 5px;
  right: 10px;
`

function PopupMessage({onClick}) {
  return (
    <MessageInfo>
      <MessageCloseBtn onClick={onClick}>x</MessageCloseBtn>
      <MessageText>Perubahan berhasil disimpan</MessageText>
    </MessageInfo>
  )
}

export default PopupMessage
