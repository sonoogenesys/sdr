import React from "react";
import CheckUserAuthentication from "../Utils/CheckUserAuthentication";
import { Redirect, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RedirectPath = (props) => {
    let path = <Redirect to="/login" />;
    if (localStorage.getItem("jwt")) {
        let token = jwtDecode(localStorage.getItem("jwt"));
        if (token?.user?.id) {
            path = <Redirect to="/app/dashboard" {...props} />;
        }
    }
    return (
        <Route
            {...props}
            render={(props) =>
                CheckUserAuthentication() ? (
                    path
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default RedirectPath;
