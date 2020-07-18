import styled from 'styled-components'

const Devider = styled.div`
  height: 1px;
  border-bottom: ${({theme}) => `3px dotted ${theme.pink}`};
  margin: 3rem 0;
`

export default Devider
