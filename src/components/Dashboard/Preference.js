import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const PreferenceContainer = styled.div`
  border-radius: 50%;
  width: 45px;
  height: 45px;
`

const PreferenceImage = styled.img`
  display: block;
  width: 100%;
`

const PreferenceLink = styled(Link)`
  text-decoration: none;
`

function Preference({avatar}) {
  return (
    <PreferenceLink to="/profile">
      <PreferenceContainer>
        <PreferenceImage src={avatar} alt="preference" />
      </PreferenceContainer>
    </PreferenceLink>
  )
}

export default Preference
