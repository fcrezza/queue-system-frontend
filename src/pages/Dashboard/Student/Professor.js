import React from "react";
import styled from "styled-components";
import Layout from "../../../layout";
import Profile from "../../../components/Profile";
import Seo from "../../../components/Seo";
import {generateProfessorData} from "../../../utils/profileData";
import prefessorAvatars from "../../../images/professors";

const StatusIcon = styled.div`
  border-radius: 50%;
  background: ${({status, theme}) => (status ? theme.cyan : theme.orange)};
  width: 8px;
  height: 8px;
`;

const StatusMessage = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.4rem;
  margin: 0 0.7rem 0 0;
`;

const ProfessorStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Professor({professor}) {
  const {avatar, status, username, fullname} = professor;
  const profileData = generateProfessorData(professor);

  return (
    <Layout>
      <Seo title={`Profil | ${fullname}`} />
      <Profile.Navigation />
      <Profile.Header
        name={username}
        src={prefessorAvatars[avatar]}
        alt={`${fullname} avatar`}
        active={!!professor.status}
      />
      <ProfessorStatus>
        <StatusMessage>{status ? "online" : "offline"}</StatusMessage>
        <StatusIcon status={status} />
      </ProfessorStatus>
      <Profile.Body items={profileData} />
    </Layout>
  );
}

export default Professor;
