import React from "react";
import styled from "styled-components";
import {darken, lighten} from "polished";

// TODO: this should be deleted
const Label = styled.label`
  width: 100%;
`;

// TODO: this should be deleted
const InputField = styled.input`
  padding-left: 1rem;
  width: 100%;
  border: 0;
  background: transparent;
  outline: none;
  color: ${({theme}) => theme.primary};
  font-size: 1.8rem;
  height: 3.5rem;
`;

// TODO: this should be deleted
const Container = styled.div`
  background: ${({theme}) => theme.gray};
  border-bottom: ${({theme}) => `2px solid ${theme.primaryLight}`};
`;

// TODO: this should be deleted
const Text = styled.div`
  padding: 0.8rem 0 0 1rem;
  font-size: 1.3rem;
  color: ${({theme}) => theme.primaryLight};
`;

// TODO: this should be deleted
function Input(props, ref) {
  const {placeholder, onChange, value, name, ...rest} = props;

  return (
    <Container>
      <Label htmlFor={name}>
        <Text>{placeholder}</Text>
      </Label>
      <InputField
        id={name}
        onChange={onChange}
        value={value}
        name={name}
        ref={ref}
        {...rest}
      />
    </Container>
  );
}

const StyledInput = styled.input`
  padding: 1.5rem;
  width: 100%;
  border: 0;
  border-radius: 5px;
  color: ${({theme}) => theme.primary};
  font-size: 1.6rem;
  background: ${({theme}) => theme.gray};
  outline: 0;
  transition: background 0.2s;

  &:hover {
    background: ${({theme}) => darken(0.025, theme.gray)};
  }

  &:focus {
    box-shadow: ${({theme}) => `0 0 0 3px ${lighten(0.5, theme.primary)}`};
  }
`;

const StyledInputRightElement = styled.div`
  margin-right: 0.5rem;
  width: 4rem;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
`;

const StyledInputGroup = styled.div`
  position: relative;
  width: 100%;

  ${StyledInput} {
    position: relative;
    padding-right: 5.5rem;
  }
`;

export const InputV2 = React.forwardRef((props, ref) => {
  const {placeholder, type, onChange, value, name, ...rest} = props;

  return (
    <StyledInput
      id={name}
      type={type}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
      ref={ref}
      {...rest}
    />
  );
});

export function InputGroup({children}) {
  return <StyledInputGroup>{children}</StyledInputGroup>;
}

export function InputRightElement({children}) {
  return <StyledInputRightElement>{children}</StyledInputRightElement>;
}

export default React.forwardRef(Input);
