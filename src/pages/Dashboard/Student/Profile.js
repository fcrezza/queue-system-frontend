import React from 'react'
import Layout from '../../../layout'
import PopupMessage from '../../../components/PopupMessage'
import Seo from '../../../components/Seo'
import ProfileComp from '../../../components/Profile'
import {generateStudentData} from '../../../utils/profileData'
import studentAvatars from '../../../images/students'

function Profile({user}) {
  const {username, avatar, fullname} = user

  const profileData = generateStudentData(user)
  return (
    <Layout>
      <Seo title={`Profil | ${fullname}`} />
      <ProfileComp.Navigation owned />
      <PopupMessage>Perubahan berhasil disimpan</PopupMessage>
      <ProfileComp.Header
        src={studentAvatars[avatar]}
        alt={`${fullname} avatar`}
        name={username}
        owned
      />
      <ProfileComp.Body items={profileData} />
      <ProfileComp.ChangePassword />
    </Layout>
  )
}

export default Profile
