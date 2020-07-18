import React from 'react'
import useSWR from 'swr'
import Spinner from '../../../components/Spinner'
import Profile from '../../../components/Profile'
import Seo from '../../../components/Seo'
import Layout from '../../../layout'
import studentAvatars from '../../../images/students'
import {generateStudentData} from '../../../utils/profileData'

function StudentProfile({match}) {
  const {data: student} = useSWR(`/students/${match.params.id}`)
  const studentData = student && generateStudentData(student)

  if (!studentData) {
    return <Spinner>Memuat data ...</Spinner>
  }

  return (
    <Layout>
      <Seo title={`Profile | ${student.fullname}`} />
      <Profile.Navigation />
      <Profile.Header
        name={student.username}
        src={studentAvatars[student.avatar]}
        alt={`${student.fullname} avatar`}
      />
      <Profile.Body items={studentData} />
    </Layout>
  )
}

export default StudentProfile
