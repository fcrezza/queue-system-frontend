import styled from "styled-components";
import {lighten} from "polished";

export const SelectContainer = styled.div``;

export const Menu = styled.div`
  position: relative;
`;

export const ItemsContainer = styled.div`
  background: ${({theme}) => theme.secondaryLight};
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  top: 100%;
  border-radius: 5px;
  box-shadow: ${({theme}) => `0px 0px 20px ${lighten(0.7, theme.primary)}`};
`;

export const Item = styled.div`
  padding: 1.5rem 1rem;
  font-size: 1.4rem;
  background: ${({isSelected, theme}) => (isSelected ? theme.gray : null)};

  &:not(:last-child) {
    border-bottom: ${({theme}) => `1px solid ${theme.gray}`};
  }
`;

export const ButtonText = styled.div`
  font-size: 1.6rem;
  color: ${({theme}) => theme.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: hidden;
`;

export const SelectButton = styled.button`
  background: ${({theme}) => theme.gray};
  padding-left: 1rem;
  width: 100%;
  padding: 1.5rem;
  border: 0;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  outline: 0;
  box-shadow: ${({theme, error}) =>
    error ? `0 0 0 3px ${lighten(0.1, theme.error)}` : null};

  &:focus {
    box-shadow: ${({theme, error}) =>
      error
        ? `0 0 0 3px ${lighten(0.1, theme.error)}`
        : `0 0 0 3px ${lighten(0.5, theme.primary)}`};
  }

  & > ${ButtonText}:last-child {
    font-size: 1.6rem;
  }
`;
