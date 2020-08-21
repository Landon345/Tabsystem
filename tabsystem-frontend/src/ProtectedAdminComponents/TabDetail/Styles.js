import styled from "@emotion/styled";
import tabtheme from "../../GlobalStyles/Theme";

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-around;
  justify-content: space-around;
  background-color: ${tabtheme.colors["first100"]};
  min-height: 40px;
  padding: 20px 0px;
  border-radius: 10px;
  color: white;
`;

export const MyTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
`;

export const MyTd = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
export const MyTh = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

export const MyTr = styled.tr`
  background-color: ${(props) => {
    if (props.selected) {
      return tabtheme.colors["first100"];
    } else {
      return tabtheme.colors["first300"];
    }
  }};
`;
