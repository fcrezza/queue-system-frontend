import React, {useState} from "react";
import useSWR from "swr";
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";
import Spinner from "../../../components/Spinner";
import Layout from "../../../layout";
import {BackButton} from "../../../components/Button";
import {Title, Subtitle} from "../../../components/Dashboard/Section";
import PersonProfileCard from "../../../components/PersonProfileCard";
import studentAvatars from "../../../images/students";
import Seo from "../../../components/Seo";

const Container = styled.div`
  margin-bottom: 4rem;
`;

const ListContainer = styled.div`
  & > div {
    margin-bottom: 2.5rem;
  }
`;

const Link = styled(RouterLink)`
  text-decoration: none;
  padding: 0.6rem 0.8rem;
`;

const SearchInput = styled.input`
  background: ${({theme}) => theme.gray};
  color: ${({theme}) => theme.primaryLight};
  border-radius: 10px;
  border: none;
  width: 100%;
  font-size: 1.4rem;
  padding: 1.5rem;
`;

function MahasiswaList({id, fullname}) {
  const {data: list} = useSWR(`/professors/${id}/students`);
  const [inputValue, setInputValue] = useState("");

  if (!list) {
    return <Spinner>Memuat data ... </Spinner>;
  }

  const filteredList = list.filter(l => {
    const input = inputValue.toLowerCase();
    const name = l.fullname.toLowerCase();
    return name.includes(input);
  });

  return (
    <Layout>
      <Seo title={`Daftar mahasiswa | ${fullname}`} />
      <Container>
        <BackButton />
      </Container>
      <Container>
        <Title>Daftar Mahasiswa</Title>
        <Subtitle>Daftar mahasiswa yang anda bimbing</Subtitle>
      </Container>
      <Container>
        <SearchInput
          value={inputValue}
          onChange={({target}) => setInputValue(target.value)}
          placeholder="Cari mahasiswa ..."
        />
      </Container>
      <ListContainer>
        {filteredList.map(l => {
          const {id: studentID, study, avatar, fullname: studentName} = l;

          return (
            <PersonProfileCard.Container key={studentID}>
              <PersonProfileCard.Avatar
                src={studentAvatars[avatar]}
                alt={`${studentName} avatar`}
              />
              <PersonProfileCard.Content fullname={studentName} study={study} />
              <PersonProfileCard.Button as={Link} to={`/students/${studentID}`}>
                Lihat
              </PersonProfileCard.Button>
            </PersonProfileCard.Container>
          );
        })}
      </ListContainer>
    </Layout>
  );
}

export default MahasiswaList;
