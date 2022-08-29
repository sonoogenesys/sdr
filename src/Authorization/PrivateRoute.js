import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckUserAuthentication from "../Utils/CheckUserAuthentication";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        CheckUserAuthentication() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
