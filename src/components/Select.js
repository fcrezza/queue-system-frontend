import React from 'react'
import styled from 'styled-components'
import {useSelect} from 'downshift'

const SelectContainer = styled.div`
  background: ${({theme}) => theme.gray};
  border-bottom: ${({theme}) => `2px solid ${theme.primaryLight}`};
`

const Label = styled.label`
  width: 100%;
  padding: 0.8rem 0 0 1rem;
  font-size: 1.3rem;
  color: ${({theme}) => theme.primaryLight};
  display: block;
`

const SelectButton = styled.button`
  padding-left: 1rem;
  width: 100%;
  height: 3.5rem;
  border: 0;
  text-align: left;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  outline: none;
`

const Menu = styled.div`
  position: relative;
`

const ItemsContainer = styled.div`
  background: ${({theme}) => theme.secondaryLight};
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  top: 100%;
  box-shadow: ${({theme}) => `0px 0px 20px ${theme.solidGray}`};
`

const Item = styled.div`
  padding: 1.5rem 1rem;
  font-size: 1.4rem;
  background: ${({isSelected, theme}) => (isSelected ? theme.skyBlue : null)};

  &:not(:last-child) {
    border-bottom: ${({theme}) => `.1px solid ${theme.solidGray}`};
  }
`

const ButtonText = styled.div`
  font-size: 1.8rem;
  color: ${({theme}) => theme.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: hidden;
`

function Select({items, name, defaultValue, placeholder, setValue}) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    defaultSelectedItem: items.find((item) => item.id === defaultValue),
    itemToString: (item) => (item ? item.nama : ''),
    onSelectedItemChange: (change) => {
      setValue(name, change.selectedItem.id)
    },
  })
  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{placeholder}</Label>
      <SelectButton {...getToggleButtonProps()} type="button">
        <ButtonText>{selectedItem ? selectedItem.nama : ''}</ButtonText>
        <ButtonText>▾</ButtonText>
      </SelectButton>
      <Menu {...getMenuProps()}>
        <ItemsContainer>
          {isOpen &&
            items.map((item, index) => (
              <Item
                isSelected={highlightedIndex === index}
                key={[item.nama, index].join('-')}
                {...getItemProps({item, index})}
              >
                {item.nama}
              </Item>
            ))}
        </ItemsContainer>
      </Menu>
    </SelectContainer>
  )
}

export function ControlledSelect(props) {
  const {selectedItemID, items, name, placeholder, setValue} = props
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    selectedItem: items.find((item) => item.id === selectedItemID) || -1,
    itemToString: (item) => (item ? item.nama : ''),
    onSelectedItemChange: (change) => {
      setValue(name, change.selectedItem.id)
    },
  })

  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{placeholder}</Label>
      <SelectButton {...getToggleButtonProps()} type="button">
        <ButtonText>{selectedItem ? selectedItem.nama : ''}</ButtonText>
        <ButtonText>▾</ButtonText>
      </SelectButton>
      <Menu {...getMenuProps()}>
        <ItemsContainer>
          {isOpen &&
            items.map((item, index) => (
              <Item
                isSelected={highlightedIndex === index}
                key={[item.nama, index].join('-')}
                {...getItemProps({item, index})}
              >
                {item.nama}
              </Item>
            ))}
        </ItemsContainer>
      </Menu>
    </SelectContainer>
  )
}

export default Select
