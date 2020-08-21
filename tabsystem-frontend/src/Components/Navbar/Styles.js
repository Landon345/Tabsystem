import styled from "@emotion/styled";
import tabtheme from "../../GlobalStyles/Theme";

export const NavbarStyle = styled.div`
  display: flex;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 15px;
  background-color: ${(props) => tabtheme.colors[props.back]};
`;

export const NavbarLink = styled.a`
  text-decoration: none;
  color: white;
  margin: 0px 20px;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.fifth100};
  }
`;
