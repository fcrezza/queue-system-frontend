import React, {useContext} from 'react'
import {ThemeContext} from 'styled-components'
import Layout from '../../../layout'
import Seo from '../../../components/Seo'
import professorAvatars from '../../../images/professors'
import studentPNG from '../../../images/student.png'
import queuePNG from '../../../images/queue.png'
import {Header, Menu} from '../../../components/Dashboard'
import Copyright from '../../../components/Copyright'

function Home({fullname, facultyName, avatar}) {
  const {pink, orange} = useContext(ThemeContext)

  return (
    <Layout relative>
      <Seo title={`Dashboard | ${fullname}`} />
      <Header
        avatar={professorAvatars[avatar]}
        fullname={fullname}
        study={facultyName}
      />
      <Menu.Container>
        <Menu.Item
          link="/students"
          bg={studentPNG}
          text="Mahasiswa"
          color={orange}
        />
        <Menu.Item link="/queue" bg={queuePNG} text="Antrian" color={pink} />
      </Menu.Container>
      <Copyright />
    </Layout>
  )
}

export default Home
