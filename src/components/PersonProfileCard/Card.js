// TODO: this file should be deleted

import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  box-shadow: ${({theme}) => `0px 0px 20px ${theme.solidGray}`};
  background: ${({theme}) => theme.secondary};
  padding: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
`;

const AvatarContainer = styled.div`
  border-radius: 10px;
  width: 60px;
  min-width: 50px;
  overflow: hidden;
`;

const CardAvatar = styled.img`
  width: 100%;
  display: block;
`;

const ContentContainer = styled.div`
  margin-left: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const ContentText = styled.p`
  margin: 0;
  font-size: 1.3rem;
  color: ${({theme}) => theme.primaryLight};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContentHeading = styled.h3`
  font-size: 1.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0 0.5rem;
  color: ${({theme}) => theme.primary};
`;

const CardButton = styled.button`
  background: transparent;
  border: ${({theme}) => `1px solid ${theme.primary}`};
  color: ${({theme}) => theme.primary};
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.8rem 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
`;

export {Container, Content, Avatar, Button};
