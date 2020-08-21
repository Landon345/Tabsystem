import styled from "@emotion/styled";
import tabtheme from "../../GlobalStyles/Theme";

export const TabStyleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${tabtheme.colors["first100"]};
  min-height: 150px;
  border-radius: 10px;
  color: white;
`;

export const MyLink = styled.a`
  text-decoration: none;
  color: green;
  background-color: white;
  border: 1px solid green;
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  &:hover {
    background-color: green;
    color: white;
    transition: background-color 0.25s ease;
  }
`;
