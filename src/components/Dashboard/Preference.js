import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const PreferenceContainer = styled.div`
  border-radius: 10px;
  width: 45px;
  height: 45px;
  overflow: hidden;
  position: relative;
`

const PreferenceImage = styled.img`
  display: block;
  width: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

function Preference({avatar}) {
  return (
    <Link to="/profile">
      <PreferenceContainer>
        <PreferenceImage src={avatar} alt="preference" />
      </PreferenceContainer>
    </Link>
  )
}

export default Preference
