// import React from 'react'
import styled from 'styled-components'

const ProfileContainer = styled.div`
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  box-shadow: 0px 0px 20px #d9d9d9;
  margin-bottom: 5rem;
`

const DarkProfileContainer = styled(ProfileContainer)`
  background: #222;
  margin-bottom: 5rem;
`

const AvatarContainer = styled.div`
  margin-right: 2rem;
  display: flex;
  align-items: center;
  width: 90px;
  justify-content: center;
`

const Avatar = styled.img`
  display: block;
  width: 80%;
`

const ProfileData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > * {
    margin: 0;
  }
`

const DarkProfileData = styled(ProfileData)`
  color: #fff;
`

const ProfileHeading = styled.h3`
  font-size: 1.8rem;
`

const ProfileText = styled.p`
  font-size: 1.3rem;

  &:not(:last-child) {
    margin: 1.3rem 0;
  }
`

// function LightProfile({avatar, idNumber, fullname, campus, children}) {
// 	return (
// 		<ProfileContainer>
// 			<AvatarContainer>
// 				<Avatar src={avatar} alt="avatar" />
// 			</AvatarContainer>
// 			<ProfileData>
// 				<ProfileName>{fullname}</ProfileName>
// 				<ProfileText>{campus}</ProfileText>
// 				<ProfileText>{idNumber}</ProfileText>
// 			</ProfileData>
// 			{children}
// 		</ProfileContainer>
// 	)
// }

// function DarkProfile({avatar, fullname, campus, idNumber, children}) {
// 	return (
// 		<DarkProfileContainer>
// 			<AvatarContainer>
// 				<Avatar src={avatar} alt="avatar" />
// 			</AvatarContainer>
// 			<DarkProfileData>
// 				<ProfileName>{fullname}</ProfileName>
// 				<ProfileText>{campus}</ProfileText>
// 				<ProfileText>{idNumber}</ProfileText>
// 			</DarkProfileData>
// 			{children}
// 		</DarkProfileContainer>
// 	)
// }

// export {LightProfile, DarkProfile}

export {
  ProfileContainer,
  DarkProfileContainer,
  AvatarContainer,
  Avatar,
  ProfileData,
  DarkProfileData,
  ProfileHeading,
  ProfileText,
}
