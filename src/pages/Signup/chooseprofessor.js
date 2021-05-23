import React, {useState} from "react";
import styled from "styled-components";
import useSWR from "swr";
import {Redirect, useHistory} from "react-router-dom";
import {useErrorHandler} from "react-error-boundary";

import Layout from "../../layout";
import Spinner from "../../components/Spinner";
import Seo from "../../components/Seo";
import {BackButton, Button} from "../../components/Button";
import {InputV2} from "../../components/Input";

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({theme}) => theme.primary};
  margin: 3rem 0 1rem;
`;

const Description = styled.p`
  color: ${({theme}) => theme.primaryLight};
  margin: 0 0 3rem;
  font-size: 1.6rem;
  line-height: 30px;
`;

const ListItem = styled.div`
  margin: 5rem 0;

  & > div {
    margin-bottom: 3.5rem;
  }
`;

const Container = styled.div`
  margin-top: 4rem;
`;

const ProfessorItemContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: ${({theme}) => `0px 0px 20px ${theme.solidGray}`};
  background: ${({theme}) => theme.secondary};
  padding: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
`;

const ProfessorAvatarContainer = styled.div`
  border-radius: 10px;
  width: 60px;
  min-width: 50px;
  overflow: hidden;
`;

const ProfessorAvatar = styled.img`
  width: 100%;
  display: block;
`;

const ProfessorContentContainer = styled.div`
  margin: 0 auto 0 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const ProfessorContentText = styled.p`
  margin: 0;
  font-size: 1.4rem;
  color: ${({theme}) => theme.primaryLight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ProfessorContentHeading = styled.h2`
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 0.8rem;
  color: ${({theme}) => theme.primary};
`;

function ChooseProfessor({formData, sendData}) {
  const {data: professors, error} = useSWR(
    formData.study ? `/api/professors?study=${formData.study.id}` : null
  );
  useErrorHandler(error);
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const handleClick = async id => {
    await sendData({
      ...formData,
      gender: formData.gender.id,
      study: formData.study.id,
      professor: id
    });
    history.push("/home");
  };

  const professorList = professors?.filter(({fullname}) => {
    const inputLowercase = inputValue.toLowerCase();
    const nameLowercase = fullname.toLowerCase();
    return nameLowercase.includes(inputLowercase);
  });

  if (!professorList && formData.role === "student") {
    return <Spinner>Memuat data ...</Spinner>;
  }

  if (professors && formData.role === "student") {
    return (
      <Layout>
        <Seo title="Signup - Pilih Dosen Pembimbing | UNIQUEUE" />
        <BackButton />
        <Container>
          <Title>Pilih dosen</Title>
          <Description>
            Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
          </Description>
          <InputV2
            placeholder="Cari dosen"
            value={inputValue}
            onChange={({target}) => setInputValue(target.value)}
          />
          <ListItem>
            {professorList.map(({id, avatar, study, fullname}) => (
              <ProfessorItem
                key={id}
                avatar={avatar}
                fullname={fullname}
                study={study.name}
                onClick={() => handleClick(id)}
              />
            ))}
          </ListItem>
        </Container>
      </Layout>
    );
  }

  return <Redirect to="/signup" />;
}

function ProfessorItem({fullname, onClick, avatar, study}) {
  return (
    <ProfessorItemContainer>
      <ProfessorAvatarContainer>
        <ProfessorAvatar src={avatar} alt={`${fullname} avatar`} />
      </ProfessorAvatarContainer>
      <ProfessorContentContainer>
        <ProfessorContentHeading>{fullname}</ProfessorContentHeading>
        <ProfessorContentText>{study}</ProfessorContentText>
      </ProfessorContentContainer>
      <Button variant="outline" onClick={onClick}>
        Pilih
      </Button>
    </ProfessorItemContainer>
  );
}

export default ChooseProfessor;
