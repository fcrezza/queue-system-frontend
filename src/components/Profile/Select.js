import React from 'react'
import styled from 'styled-components'
import {useSelect} from 'downshift'

const SelectContainer = styled.div`
  background: #f0f0f0;
  border-bottom: 2px solid #888;
`

const Label = styled.label`
  width: 100%;
  padding: 0.8rem 0 0 1rem;
  font-size: 1.3rem;
  color: ${({isOpen}) => (isOpen ? '#222' : '#666')};
  display: block;
`

const SelectButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border: 0;
  text-align: left;
  padding: 1rem 1rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  outline: none;
`

const Menu = styled.div`
  position: relative;
`

const ItemsContainer = styled.div`
  background: #fff;
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  top: 100%;
  box-shadow: 0px 0px 20px #d9d9d9;
`

const Item = styled.div`
  padding: 1.5rem 1rem;
  font-size: 1.4rem;
  background: ${({isSelected}) => (isSelected ? '#bde4ff' : null)};

  &:not(:last-child) {
    border-bottom: 0.1px solid #d9d9d9;
  }
`

const ButtonText = styled.div`
  font-size: 1.8rem;
  color: #333;
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
      <Label {...getLabelProps({isOpen})}>{placeholder}</Label>
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
