import React from "react";
import styled from "styled-components";
import {Link as RouterLink} from "react-router-dom";

import Layout from "../layout";
import Seo from "../components/Seo";
import {Button} from "../components/Button";
import ilustrationSVG from "../images/ilustration.svg";

export const Ilustration = styled.img`
  width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  margin: 3rem 0 1.5rem;
  color: ${({theme}) => theme.primary};
  text-transform: capitalize;
`;

export const Subtitle = styled.p`
  color: ${({theme}) => theme.primaryLight};
  font-size: 1.6rem;
  margin: 0;
  text-transform: capitalize;
`;

export const ButtonGroup = styled.div`
  margin-top: 4rem;

  a:first-child {
    margin-bottom: 2rem;
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
`;

function Landing() {
  return (
    <Layout>
      <Seo />
      <Ilustration
        src={ilustrationSVG}
        alt="ilustration image"
        width="250"
        height="300"
      />
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

export default Landing;
