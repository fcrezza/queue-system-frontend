import React from "react";
import {Redirect} from "react-router-dom";
import StudentForm from "./StudentForm";
import ProfessorForm from "./ProfessorForm";

function Step2(props) {
  const {cacheFormData, nextStep, sendData} = props;
  const {role} = cacheFormData;

  if (role === "professor") {
    return <ProfessorForm cacheFormData={cacheFormData} sendData={sendData} />;
  }

  if (role === "student") {
    return <StudentForm cacheFormData={cacheFormData} nextStep={nextStep} />;
  }

  return <Redirect to="/signup" />;
}

export default Step2;
