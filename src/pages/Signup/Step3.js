import React, {useState, useEffect} from "react";
import styled from "styled-components";
import useSWR from "swr";
import {Redirect} from "react-router-dom";
import Layout from "../../layout";
import Spinner from "../../components/Spinner";
import useAsyncError from "../../hooks/useAsyncError";
import Seo from "../../components/Seo";
import PersonProfileCard from "../../components/PersonProfileCard";
import {BackButton} from "../../components/Button";
import {Container, Title as OriginalTitle} from "../../components/Form";
import ProfessorAvatars from "../../images/professors";

const studentAvatars = {
  male: ["studentMale1", "studentMale2", "studentMale3"],
  female: ["studentFemale1", "studentFemale2", "studentFemale3"]
};

const Title = styled(OriginalTitle)`
  margin: 3rem 0 1rem;
`;

const Subtitle = styled.p`
  color: ${({theme}) => theme.primaryLight};
  margin: 0 0 3rem;
  font-size: 1.6rem;
`;

const SearchInput = styled.input`
  background: ${({theme}) => theme.gray};
  color: ${({theme}) => theme.primary};
  border: 0;
  font-size: 1.6rem;
  width: 100%;
  padding: 1.3rem;
  outline: none;
`;

const ListItem = styled.div`
  margin: 5rem 0;

  & > div {
    margin-bottom: 3.5rem;
  }
`;

function Step3({cacheFormData, sendData, history}) {
  const {data: professors, error} = useSWR(
    `/studyPrograms/${cacheFormData.study}/professors`
  );
  const [inputValue, setInputValue] = useState("");
  const setAsyncError = useAsyncError();

  useEffect(() => {
    if (error) {
      setAsyncError(error);
    }
  }, [error, setAsyncError]);

  if (!professors && cacheFormData.role === "student") {
    return <Spinner>Memuat data ...</Spinner>;
  }

  const handleClick = async id => {
    try {
      const randomNumber = Math.floor(Math.random() * 3);
      const randomAvatar =
        cacheFormData.gender === 1
          ? studentAvatars.male[randomNumber]
          : studentAvatars.female[randomNumber];

      await sendData({
        ...cacheFormData,
        idDosen: id,
        avatar: randomAvatar
      });
      history.push("/");
    } catch (err) {
      setAsyncError(err);
    }
  };

  const handleChange = ({target}) => {
    setInputValue(target.value);
  };

  const filteredProfessors = professors.filter(({fullname}) => {
    const inputLowercase = inputValue.toLowerCase();
    const nameLowercase = fullname.toLowerCase();
    return nameLowercase.includes(inputLowercase);
  });

  if (professors && cacheFormData.role === "student") {
    return (
      <Layout>
        <Seo title="Signup step-3 | UNIQUEUE" />
        <BackButton />
        <Container>
          <Title>Pilih dosen</Title>
          <Subtitle>
            Pilih dosen pembimbing kamu untuk dapat melakukan bimbingan
          </Subtitle>
          <SearchInput
            placeholder="Cari dosen..."
            value={inputValue}
            onChange={handleChange}
          />
          <ListItem>
            {filteredProfessors.map(({id, avatar, faculty, fullname}) => (
              <PersonProfileCard.Container key={id}>
                <PersonProfileCard.Avatar
                  src={ProfessorAvatars[avatar]}
                  alt={`${fullname} avatar`}
                />
                <PersonProfileCard.Content
                  fullname={fullname}
                  study={faculty}
                />
                <PersonProfileCard.Button onClick={() => handleClick(id)}>
                  Pilih
                </PersonProfileCard.Button>
              </PersonProfileCard.Container>
            ))}
          </ListItem>
        </Container>
      </Layout>
    );
  }

  return <Redirect to="/signup" />;
}

export default Step3;
