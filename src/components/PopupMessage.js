import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation, useHistory} from "react-router-dom";
import closeSVG from "../images/close.svg";

const MessageInfo = styled.div`
  padding: 2rem;
  background: ${({theme, type}) =>
    type === "error" ? theme.pink : theme.skyBlue};
  position: relative;
  margin-bottom: 3rem;
  border-radius: 10px;
`;

const MessageText = styled.p`
  font-size: 1.5rem;
  color: ${({theme}) => theme.primaryLight};
  margin: 0;
`;

const MessageCloseBtn = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 11px;
  right: 14px;

  img {
    display: block;
    width: 13px;
  }
`;

function PopupMessage({isOpen, closePopup, type, children}) {
  const location = useLocation();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (location.state?.status && !isOpen) {
      history.replace(location.pathname, null);
      setOpen(true);
    }
  }, [history, isOpen, location.pathname, location.state]);

  const handleClose = () => {
    if (!closePopup) {
      setOpen(false);
    } else {
      closePopup();
    }
  };

  if (isOpen || open) {
    return (
      <MessageInfo type={type}>
        <MessageCloseBtn onClick={handleClose}>
          <img src={closeSVG} alt="" />
        </MessageCloseBtn>
        <MessageText>{children}</MessageText>
      </MessageInfo>
    );
  }

  return null;
}

export default PopupMessage;
