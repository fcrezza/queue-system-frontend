import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import updateLocale from 'dayjs/plugin/updateLocale'
import Preference from './Preference'
import ProfileCard from '../ProfileCard'
import {FlexContainer} from './Section'

const WelcomeMessage = styled.h2`
  font-size: 2.5rem;
  margin: 0;
  color: ${({theme}) => theme.secondary};

  .special {
    font-size: inherit;
    color: ${({theme}) => theme.orange};
  }
`

const HeaderContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  background: ${({theme}) => theme.primaryLight};
  border-radius: 0 0 60px 60px;

  @media screen and (min-width: 500px) {
    border-radius: 0;
  }
`

const HeaderWrapper = styled.div`
  padding: 3rem 2.5rem 4rem;
  max-width: 500px;
  margin: 0 auto;
`

const Time = styled.p`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: ${({theme}) => theme.gray};
`

dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  months: [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ],
})
const now = dayjs().format('MMMM, D')

function Header({fullname, avatar, study}) {
  const surename = fullname.slice(0, fullname.indexOf(' '))

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <FlexContainer>
          <div>
            <Time>{now}</Time>
            <WelcomeMessage>
              <span className="special">Hai, </span>
              {surename}!
            </WelcomeMessage>
          </div>
          <Preference avatar={avatar} />
        </FlexContainer>
        <ProfileCard.Container>
          <ProfileCard.Avatar
            size="large"
            src={avatar}
            alt={`${fullname} avatar`}
          />
          <ProfileCard.Content fullname={fullname} study={study} />
          <ProfileCard.Link to="/profile" />
        </ProfileCard.Container>
      </HeaderWrapper>
    </HeaderContainer>
  )
}

export default Header
