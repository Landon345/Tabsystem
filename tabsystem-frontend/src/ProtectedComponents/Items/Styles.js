import styled from "@emotion/styled";
import tabtheme from "../../GlobalStyles/Theme";

export const MyTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const MyTr = styled.tr`
  background-color: ${(props) => tabtheme.colors["first100"]};
`;
