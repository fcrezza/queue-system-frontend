import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 3rem 2.5rem;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`

function Layout({children}) {
  return <Container>{children}</Container>
}

export default Layout
