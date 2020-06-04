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
	color: #555;
	display: block;
`

const SelectButton = styled.button`
	margin-left: 1rem;
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
	background: #fff;
	position: absolute;
	width: 100%;
	top: 100%;
	box-shadow: 0px 0px 20px #d9d9d9;
`

const Item = styled.div`
	padding: 1.5rem 1rem;
	font-size: 1.4rem;
	background: ${({isSelected}) => (isSelected ? '#bde4ff' : null)};

	&:not(:last-child) {
		border-bottom: 1px solid #333;
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
		defaultSelectedItem: defaultValue,
		onSelectedItemChange: (change) => {
			setValue(name, change.selectedItem)
		},
	})

	return (
		<SelectContainer>
			<Label {...getLabelProps()}>{placeholder}</Label>
			<SelectButton {...getToggleButtonProps()} type="button">
				<ButtonText>{selectedItem || ''}</ButtonText>
				<ButtonText>▾</ButtonText>
			</SelectButton>
			<Menu {...getMenuProps()}>
				<ItemsContainer>
					{isOpen &&
						items.map((item, index) => (
							<Item
								isSelected={highlightedIndex === index}
								key={[item, index].join('-')}
								{...getItemProps({item, index})}
							>
								{item}
							</Item>
						))}
				</ItemsContainer>
			</Menu>
		</SelectContainer>
	)
}

export default Select