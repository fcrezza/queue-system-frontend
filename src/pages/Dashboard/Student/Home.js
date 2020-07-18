import React, {useContext} from 'react'
import styled, {ThemeContext} from 'styled-components'
import Layout from '../../../layout'
import Seo from '../../../components/Seo'
import studentAvatars from '../../../images/students'
import professorPNG from '../../../images/professor.png'
import queuePNG from '../../../images/queue.png'
import chatPNG from '../../../images/chat.png'
import {Header, Menu} from '../../../components/Dashboard'
import Copyright from '../../../components/Copyright'

const ComingSoon = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.2rem;
  margin: 0.5rem 0;
`

function Home({fullname, study, avatar}) {
  const {skyBlue, pink, orange} = useContext(ThemeContext)

  return (
    <Layout>
      <Seo title={`Dashboard | ${fullname}`} />
      <Header
        avatar={studentAvatars[avatar]}
        fullname={fullname}
        study={study}
      />
      <Menu.Container>
        <Menu.Item
          link="/professor"
          bg={professorPNG}
          text="Dosen pembimbing"
          color={orange}
        />
        <Menu.Item link="/queue" bg={queuePNG} text="Antrian" color={pink} />
        <Menu.Item
          link="#comingSoon"
          bg={chatPNG}
          text="Live chat"
          color={skyBlue}
        >
          <ComingSoon>Coming soon ...</ComingSoon>
        </Menu.Item>
      </Menu.Container>
      <Copyright />
    </Layout>
  )
}

export default Home
