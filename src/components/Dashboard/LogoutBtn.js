import React from 'react'
import styled from 'styled-components'
import logoutSVG from '../../images/logout.svg'

const Button = styled.button`
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;

  img {
    display: block;
  }
`

function LogoutBtn({onClick}) {
  return (
    <Button onClick={onClick}>
      <img src={logoutSVG} alt="" />
    </Button>
  )
}

export default LogoutBtn
