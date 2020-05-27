import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import backArrowImg from '../images/back-arrow.svg'

export const Button = styled.button`
  background: #222;
  color: #fff;
  padding: 1.2rem 1.8rem;
  border: 0;
  border-radius: 5rem;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  text-align: center;
  font-weight: 700;
`

export const ButtonBlock = styled(Button)`
  width: 100%;
`

const Back = styled(Link)`
  text-decoration: none;
  outline: none;
`

export function BackButton({to}) {
  return (
    <Back to={to}>
      <img src={backArrowImg} alt="" />
    </Back>
  )
}
