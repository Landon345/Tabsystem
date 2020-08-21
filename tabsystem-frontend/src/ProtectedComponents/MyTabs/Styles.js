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

export const MyTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

export const MyTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
