import React from "react";
import Layout from "../../../layout";
import PopupMessage from "../../../components/PopupMessage";
import Seo from "../../../components/Seo";
import ProfileComp from "../../../components/Profile";
import {generateProfessorData} from "../../../utils/profileData";
import professorAvatars from "../../../images/professors";

function Profile({user}) {
  const {avatar, fullname, username} = user;
  const profileData = generateProfessorData(user);

  return (
    <Layout>
      <Seo title={`Profil | ${fullname}`} />
      <ProfileComp.Navigation owned />
      <PopupMessage>Perubahan berhasil disimpan</PopupMessage>
      <ProfileComp.Header
        src={professorAvatars[avatar]}
        alt={`${fullname} avatar`}
        name={username}
        owned
      />
      <ProfileComp.Body items={profileData} />
      <ProfileComp.ChangePassword />
    </Layout>
  );
}

export default Profile;
