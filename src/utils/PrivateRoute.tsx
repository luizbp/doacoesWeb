import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "./isAuthenticated";

export const PrivateRoute = ({ component, ...rest }: any) => {
  let isLogged = isAuthenticated()
  const routeComponent = (props: any) =>
  isLogged ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  return <Route {...rest} render={routeComponent} />;
};
