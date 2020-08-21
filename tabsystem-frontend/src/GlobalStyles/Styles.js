import styled from "@emotion/styled";
import tabtheme from "./Theme";

export const MyButton = styled.button`
  display: inline-block;
  cursor: pointer;
  color: ${(props) =>
    tabtheme.colors[props.color] || tabtheme.colors["first100"]};
  background-color: ${(props) =>
    tabtheme.colors[props.bg] || tabtheme.colors["white"]};
  outline: none;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid
    ${(props) => tabtheme.colors[props.color] || tabtheme.colors["first100"]};
  border-radius: 3px;
  display: block;
  &:hover {
    background-color: ${(props) =>
      tabtheme.colors[props.bgh] || tabtheme.colors["second100"]};
    transition: background-color 0.5s ease;
  }
  &:focus {
    border: 2px solid
      ${(props) => tabtheme.colors[props.bcf] || tabtheme.colors["fifth200"]};
    transition: border 0.1s ease;
  }
`;

export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 3px 10px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

export const CategoryAndCommonItemCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${tabtheme.colors["first100"]};
  min-height: 100px;
  padding: 20px 0px;
  border-radius: 10px;
  color: white;
`;
