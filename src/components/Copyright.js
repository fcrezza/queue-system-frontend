import React from 'react'
import styled from 'styled-components'

const Container = styled.footer`
  font-size: 1.3rem;
  margin-top: 5rem;
  color: ${({theme}) => theme.primaryLight};
  text-align: center;
`

const Link = styled.a`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({theme}) => theme.primary};
  text-decoration: none;
`

function Footer() {
  return (
    <Container>
      Made by{' '}
      <Link
        href="https://twitter.com/fcrezza"
        target="_blank"
        noopener
        noreferrer
      >
        Anang Fachreza
      </Link>
    </Container>
  )
}

export default Footer
