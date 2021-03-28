import React from "react";
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";
import Layout from "../layout";
import Seo from "../components/Seo";
import {Button} from "../components/Button";
import NotFoundSVG from "../images/404.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
const Link = styled(RouterLink)`
  text-decoration: none;
  margin-top: 2rem;
`;

const Illustration = styled.img.attrs({
  src: NotFoundSVG
})`
  width: 100%;
  min-width: 300px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${({theme}) => theme.primary};
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  color: ${({theme}) => theme.primaryLight};
  margin: 0.5rem;
`;

function NotFound() {
  return (
    <Layout>
      <Seo title="404 | Halaman Tidak Dapat Ditemukan" />
      <Container>
        <Illustration />
        <Title>HALAMAN TIDAK DAPAT DITEMUKAN</Title>
        <Text>Apakah url yang dimasukan benar?</Text>
        <Text>Halaman saat ini mengkin tidak tersedia</Text>
        <Button as={Link} to="/">
          Kembali ke halaman utama
        </Button>
      </Container>
    </Layout>
  );
}

export default NotFound;
