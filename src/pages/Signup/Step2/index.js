import React from 'react'
import {Redirect} from 'react-router-dom'

import MahasiswaForm from './MahasiswaForm'
import DosenForm from './DosenForm'

function Step2({data, nextStep, sendData}) {
  if (data.role === 'dosen') {
    return <DosenForm data={data} sendData={sendData} />
  }

  if (data.role === 'mahasiswa') {
    return <MahasiswaForm data={data} nextStep={nextStep} />
  }

  return <Redirect to="/signup" />
}



export default Step2
