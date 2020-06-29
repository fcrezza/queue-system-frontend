import React, {forwardRef, useState} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background: #f0f0f0;
  border-bottom: ${({isFocus}) =>
    isFocus ? '2px solid #222' : '2px solid #666'};
  transition: border-bottom 0.1s;
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
  color: ${({isFocus}) => (isFocus ? '#222' : '#666')};
  transition: color 0.1s;
`

function Input(props, ref) {
  const {placeholder, onChange, value, name, ...rest} = props
  const [isFocus, setIsFocus] = useState(false)

  const toggleFocus = () => {
    setIsFocus((prevState) => !prevState)
  }

  return (
    <Container isFocus={isFocus}>
      <Label htmlFor={name}>
        <Text isFocus={isFocus}>{placeholder}</Text>
      </Label>
      <InputField
        id={name}
        onChange={onChange}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        value={value}
        name={name}
        ref={ref}
        {...rest}
      />
    </Container>
  )
}

export default forwardRef(Input)
