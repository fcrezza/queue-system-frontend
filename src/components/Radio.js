import React, {forwardRef} from "react";
import styled from "styled-components";

const RadioWrapper = styled.label`
  align-items: center;
  display: flex;
  position: relative;

  &:first-child {
    margin-right: 3rem;
  }
`;

const RadioInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input[type="radio"] {
    visibility: hidden;
  }

  .check {
    display: block;
    position: absolute;
    border: ${({theme}) => `1px solid ${theme.primary}`};
    border-radius: 100%;
    height: 20px;
    width: 20px;
  }

  .check::before {
    display: block;
    content: "";
    border-radius: 100%;
    height: 8px;
    width: 8px;
    position: absolute;
    top: 5px;
    left: 5px;
  }

  input[type="radio"]:checked ~ .check::before {
    background: ${({theme}) => theme.primary};
  }

  input[type="radio"]:checked ~ .check {
    border-color: ${({theme}) => theme.primary};
  }
`;

const RadioLabel = styled.div`
  position: relative;
  margin-left: 1rem;
  font-size: 1.5rem;
  color: ${({theme}) => theme.primaryLight};
`;

function Radio(props, ref) {
  const {id, label, value, ...rest} = props;

  return (
    <RadioWrapper htmlFor={id}>
      <RadioInput>
        <input
          type="radio"
          id={id}
          value={value}
          name="role"
          ref={ref}
          {...rest}
        />
        <div className="check" />
      </RadioInput>
      <RadioLabel>{label}</RadioLabel>
    </RadioWrapper>
  );
}

export default forwardRef(Radio);
