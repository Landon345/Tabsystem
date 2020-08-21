import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";

function ProtectedAdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated() && Auth.isAdmin()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedAdminRoute;
