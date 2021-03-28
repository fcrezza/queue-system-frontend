import React from "react";
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";

import Layout from "../layout";
import Seo from "../components/Seo";
import {Button} from "../components/Button";
import ilustrationSVG from "../images/ilustration.svg";

const Ilustration = styled.img`
  width: 80%;
  min-width: 250px;
  height: 300px;
  display: block;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin: 3rem 0 1.5rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

const Subtitle = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.6rem;
  margin: 0;
  text-transform: capitalize;
`;

const ButtonGroup = styled.div`
  margin-top: 4rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`;

const Link = styled(RouterLink)`
  text-decoration: none;
`;

function HomePage() {
  return (
    <Layout>
      <Seo />
      <Ilustration src={ilustrationSVG} alt="" />
      <Title>Bimbingan tidak perlu ribet.</Title>
      <Subtitle>Mulai bimbingan dengan sekali tap, yup semudah itu!</Subtitle>
      <ButtonGroup>
        <Button as={Link} to="/login" block>
          Masuk
        </Button>
        <Button as={Link} to="/signup" variant="outline" block>
          Daftar
        </Button>
      </ButtonGroup>
    </Layout>
  );
}

export default HomePage;
