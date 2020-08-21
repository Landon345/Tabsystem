import React from "react";
import { withRouter } from "react-router-dom";
import { NavbarStyle, NavbarLink } from "./Styles";
import { Box } from "@chakra-ui/core";
import Auth from "../../Auth";

function Navbar(props) {
  return (
    <div>
      <MyLinks history={props.history} />
    </div>
  );
}
export default withRouter(Navbar);

function MyLinks(props) {
  if (localStorage.getItem("admin")) {
    return (
      <div>
        <NavbarStyle back="first100">
          <NavbarLink
            onClick={() => {
              Auth.logout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                props.history.push("/login");
              });
            }}
          >
            Logout
          </NavbarLink>
          <NavbarLink href="/register">Register</NavbarLink>
          <NavbarLink href="/tabs">Tabs</NavbarLink>
          <NavbarLink href="/createcategory">Categories</NavbarLink>
          <NavbarLink href="/commonitem">Common Items</NavbarLink>
          <NavbarLink href="/dashboard">Dashboard</NavbarLink>
        </NavbarStyle>
      </div>
    );
  }
  if (localStorage.getItem("token")) {
    return (
      <div>
        <NavbarStyle back="first100">
          <NavbarLink
            onClick={() => {
              Auth.logout(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                props.history.push("/login");
              });
            }}
          >
            Logout
          </NavbarLink>
          <NavbarLink href="/mytabs">Tabs</NavbarLink>
          <NavbarLink href="/mydashboard">Dashboard</NavbarLink>
        </NavbarStyle>
      </div>
    );
  }
  return (
    <div>
      <NavbarStyle back="first100">
        <Box color="fourth100" mx="20px">
          TabSystem
        </Box>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/login">Login</NavbarLink>
      </NavbarStyle>
    </div>
  );
}
