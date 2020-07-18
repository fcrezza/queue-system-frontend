import React from 'react'
import styled from 'styled-components'
import nullSVG from '../images/null.svg'

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Image = styled.img.attrs({
  src: nullSVG,
  alt: '',
})`
  display: block;
`

const Message = styled.p`
  color: ${({theme}) => theme.primaryLight};
  margin: 2rem 0;
  font-size: 1.6rem;
`

function NoData({children, message}) {
  return (
    <Container>
      <Image />
      <Message>{message}</Message>
      {children}
    </Container>
  )
}

export default NoData
