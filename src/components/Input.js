import React, {forwardRef} from "react";
import styled from "styled-components";

const Label = styled.label`
  width: 100%;
`;

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

const Container = styled.div`
  background: ${({theme}) => theme.gray};
  border-bottom: ${({theme}) => `2px solid ${theme.primaryLight}`};
`;

const Text = styled.div`
  padding: 0.8rem 0 0 1rem;
  font-size: 1.3rem;
  color: ${({theme}) => theme.primaryLight};
`;

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

export default forwardRef(Input);
