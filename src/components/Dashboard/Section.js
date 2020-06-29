import styled from 'styled-components'

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`

const Subtitle = styled.p`
  margin: 1rem 0 0;
  font-size: 1.5rem;
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
`

const AntrianContainer = styled.div`
  & > div {
    margin-bottom: 4rem;
  }
`

export {Container, Subtitle, Title, AntrianContainer}
