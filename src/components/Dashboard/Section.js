import styled from 'styled-components'

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 0;
`

const Subtitle = styled.p`
  margin: 0.7rem 0 0;
  font-size: 1.5rem;
`

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
`

const AntrianContainer = styled.div`
  & > div {
    margin-bottom: 3rem;
  }
`

export {FlexContainer, Subtitle, Title, AntrianContainer}
