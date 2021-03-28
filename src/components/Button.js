import React from "react";
import styled, {css} from "styled-components";
import {useHistory} from "react-router-dom";
import {lighten, darken} from "polished";

import {BackArrow} from "./Icon";
import logoutSVG from "../images/logout.svg";

const BaseButton = styled.button`
  background: none;
  padding: 0;
  border: 0;
  cursor: pointer;
  outline: 0;
  border-radius: 5px;
  text-align: center;
  width: auto;

  &:focus,
  &:active {
    box-shadow: ${({theme}) => `0 0 0 3px ${lighten(0.5, theme.primary)}`};
  }
`;

const outline = css`
  background: transparent;
  border: 1px solid ${({theme}) => theme.primary};
  color: ${({theme}) => theme.primary};

  &:hover,
  &:focus,
  &:active {
    background: ${({theme}) => darken(0.05, theme.secondary)};
  }
`;

const StyledButton = styled(BaseButton)`
  color: ${({theme}) => theme.secondary};
  padding: ${({size}) => (size === "small" ? ".8rem 1rem" : "1.2rem 1.6rem")};
  font-size: ${({size}) => (size === "small" ? "1.2rem" : "1.5rem")};
  display: ${({block}) => (block ? "block" : "inline-block")};
  font-weight: 700;
  background: ${({disabled, theme}) =>
    disabled ? theme.primaryLight : theme.primary};
  cursor: ${({disabled}) => (disabled ? "default" : "pointer")};

  &:hover,
  &:focus,
  &:active {
    background: ${({theme}) => lighten(0.05, theme.primary)};
  }

  ${({variant}) => (variant === "outline" ? outline : null)}
`;

const StyledIconButton = styled(BaseButton)`
  font-size: 1.5rem;

  * {
    display: block;
  }
`;

export function Button(props) {
  const {type, children, onClick, block, variant, as, ...rest} = props;

  return (
    <StyledButton
      as={as}
      type={type || "button"}
      onClick={onClick}
      variant={variant}
      block={block ? "true" : "false"}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

export function IconButton({type, children, onClick}) {
  return (
    <StyledIconButton type={type || "button"} onClick={onClick}>
      {children}
    </StyledIconButton>
  );
}

export function BackButton() {
  const {goBack, length, push} = useHistory();
  const handleClick = length > 2 ? goBack : () => push("/");

  return (
    <IconButton onClick={handleClick}>
      <BackArrow />
    </IconButton>
  );
}

// TODO: this should be deleted
const ButtonBlock = styled(StyledButton)`
  width: 100%;
`;

// TODO: this should be moved
const LogoutBtn = styled(BaseButton)`
  img {
    display: block;
  }
`;

// TODO: this should be moved
function LogoutButton({onClick}) {
  return (
    <LogoutBtn onClick={onClick}>
      <img src={logoutSVG} alt="" />
    </LogoutBtn>
  );
}

// TODO: this should be deleted
export {ButtonBlock, LogoutButton};
