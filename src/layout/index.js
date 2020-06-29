import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 3rem 2rem;
`

function Layout({children}) {
  return <Container>{children}</Container>
}

export default Layout
