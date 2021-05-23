import React from "react";
import {useSelect} from "downshift";

import Label from "../Label";
import {
  SelectContainer,
  SelectButton,
  ButtonText,
  Menu,
  ItemsContainer,
  Item
} from "./utils";

function Select({items, name, defaultValue, placeholder, setValue}) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items,
    defaultSelectedItem: items.find(item => item.id === defaultValue),
    itemToString: item => (item ? item.nama : ""),
    onSelectedItemChange: change => {
      setValue(name, change.selectedItem.id);
    }
  });
  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{placeholder}</Label>
      <SelectButton {...getToggleButtonProps()} type="button">
        <ButtonText>{selectedItem ? selectedItem.nama : ""}</ButtonText>
        <ButtonText>▾</ButtonText>
      </SelectButton>
      <Menu {...getMenuProps()}>
        <ItemsContainer>
          {isOpen &&
            items.map((item, index) => (
              <Item
                isSelected={highlightedIndex === index}
                key={[item.nama, index].join("-")}
                {...getItemProps({item, index})}
              >
                {item.nama}
              </Item>
            ))}
        </ItemsContainer>
      </Menu>
    </SelectContainer>
  );
}

export function ControlledSelect(props) {
  const {selectedItemID, items, name, placeholder, setValue} = props;
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items,
    selectedItem: items.find(item => item.id === selectedItemID) || -1,
    itemToString: item => (item ? item.nama : ""),
    onSelectedItemChange: change => {
      setValue(name, change.selectedItem.id);
    }
  });

  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{placeholder}</Label>
      <SelectButton {...getToggleButtonProps()} type="button">
        <ButtonText>{selectedItem ? selectedItem.nama : ""}</ButtonText>
        <ButtonText>▾</ButtonText>
      </SelectButton>
      <Menu {...getMenuProps()}>
        <ItemsContainer>
          {isOpen &&
            items.map((item, index) => (
              <Item
                isSelected={highlightedIndex === index}
                key={[item.nama, index].join("-")}
                {...getItemProps({item, index})}
              >
                {item.nama}
              </Item>
            ))}
        </ItemsContainer>
      </Menu>
    </SelectContainer>
  );
}

export function SelectV2(props) {
  const {onChange, value, items, label, error} = props;
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    items,
    initialSelectedItem: value,
    itemToString: item => (item ? item.name : ""),
    onSelectedItemChange: change => onChange(change.selectedItem)
  });

  return (
    <SelectContainer>
      <Label {...getLabelProps()}>{label}</Label>
      <SelectButton {...getToggleButtonProps({error})} type="button">
        <ButtonText>{selectedItem ? selectedItem.name : ""}</ButtonText>
        <ButtonText>▾</ButtonText>
      </SelectButton>
      <Menu {...getMenuProps()}>
        <ItemsContainer>
          {isOpen &&
            items.map((item, index) => (
              <Item
                isSelected={highlightedIndex === index}
                key={[item.name, index].join("-")}
                {...getItemProps({item, index})}
              >
                {item.name}
              </Item>
            ))}
        </ItemsContainer>
      </Menu>
    </SelectContainer>
  );
}

export default Select;
