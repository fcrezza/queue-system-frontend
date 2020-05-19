import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #f0f0f0;
  border-bottom: 2px solid #888;
`

const Label = styled.label`
  width: 100%;
`

const InputField = styled.input`
  padding-left: 1rem;
  width: 100%;
  border: 0;
  background: transparent;
  outline: none;
  color: #333;
  font-size: 1.8rem;
  height: 3.5rem;
`

const Text = styled.div`
  padding: 0.8rem 0 0 1rem;
  font-size: 1.3rem;
  color: #555;
`

function Input({placeholder, onChange, value, ...rest}) {
  return (
    <Container>
      <Label htmlFor="inputfield">
        <Text>{placeholder}</Text>
        <InputField
          id="inputfield"
          onChange={onChange}
          value={value}
          {...rest}
        />
      </Label>
    </Container>
  )
}

export default Input
