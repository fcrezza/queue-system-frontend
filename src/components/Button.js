import React from "react";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import backArrowImg from "../images/back-arrow.svg";
import logoutSVG from "../images/logout.svg";

const BaseButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
`;

const Button = styled(BaseButton)`
  color: ${({theme}) => theme.secondary};
  padding: 1.2rem 1.8rem;
  border-radius: 10px;
  font-size: 1.4rem;
  display: block;
  text-align: center;
  font-weight: 600;
  background: ${({disabled, theme}) =>
    disabled ? theme.primaryLight : theme.primary};
  cursor: ${({disabled}) => (disabled ? "default" : "pointer")};
  transition: transform 0.2s;

  &:hover {
    transform: ${({disabled}) => !disabled && "scale(0.98)"};
  }
`;

const ButtonBlock = styled(Button)`
  width: 100%;
`;

const BackButtonImg = styled.img.attrs({
  src: backArrowImg,
  alt: ""
})`
  display: block;
`;

const LogoutBtn = styled(BaseButton)`
  img {
    display: block;
  }
`;

function BackButton() {
  const {goBack, length, push} = useHistory();
  const navigate = length > 2 ? goBack : () => push("/");

  return (
    <BaseButton onClick={navigate}>
      <BackButtonImg />
    </BaseButton>
  );
}

function LogoutButton({onClick}) {
  return (
    <LogoutBtn onClick={onClick}>
      <img src={logoutSVG} alt="" />
    </LogoutBtn>
  );
}

export {Button, ButtonBlock, LogoutButton, BackButton};
