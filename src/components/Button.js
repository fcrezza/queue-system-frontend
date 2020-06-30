import React from 'react'
import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'
import backArrowImg from '../images/back-arrow.svg'

const Link = styled(RouterLink)`
  text-decoration: none;
`

export const Button = styled.button`
  background: ${({theme}) => theme.main};
  color: ${({theme}) => theme.textMainLight};
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

export function BackButton({to, ...rest}) {
  return (
    <Link to={to} {...rest}>
      <img src={backArrowImg} alt="" />
    </Link>
  )
}
