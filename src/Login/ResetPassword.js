import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isValidPassword, showNotification } from "../Utils/CommonFunctions";
import TextInput from "../Utils/TextInput";
import { connect } from "react-redux";
import axios from "axios";
import appUrl from "../Constants/AppUrl";
import CheckUserAuthentication from "../Utils/CheckUserAuthentication";

class ResetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newPassword: "",
            confirmPassword: "",
            newPasswordErr: "",
            confirmPasswordErr: "",
            isLoading: false,
        };
    }

    hasError = () => {
        let { newPassword, confirmPassword } = this.state;


        let newPasswordErr = "";
        let confirmPasswordErr = "";

        let isErrorHit = false;

        if (!newPassword) {
            isErrorHit = true;
            newPasswordErr = "Please enter new password";
        } else if(!isValidPassword(newPassword)) {
            isErrorHit = true;
            newPasswordErr = "Password at least 4 characters";
        }

        if (!confirmPassword) {
            isErrorHit = true;
            confirmPasswordErr = "Please enter confirm password";
        } else if (
            newPassword &&
            confirmPassword &&
            newPassword !== confirmPassword
        ) {
            isErrorHit = true;
            showNotification(
                "error",
                "New password and Confirm password not same"
            );
        }

        this.setState({
            newPasswordErr,
            confirmPasswordErr,
        });

        return isErrorHit;
    };

    onSubmit = () => {
        if (!this.hasError()) {
            let { token, history, changePasswordSuccess } = this.props;
            let { newPassword } = this.state;
            newPassword = newPassword.trim();

            this.setState({
                isLoading: true,
            });

            let data = {
                password: newPassword,
            }

            if (token) {
                axios.post(appUrl.RESET_PASSWORD_URL, data, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                })
                .then(res => {
                    console.log("res", res);
                    let resData = res.data;
                    let resMeta = resData.meta || resData;

                    if (resMeta?.success !== true || resMeta?.status !== 200) {
                        showNotification("error", resMeta.message);
                        this.setState({ isLoading: true });
                    } else {
                        localStorage.setItem('jwt', resData?.data?.attributes?.value);
                        showNotification("success", resMeta.message);
                        history?.replace("/app/dashboard");
                    }
                })
                .catch(err => {
                    showNotification("error", "There is some error while reset new password");
                    this.setState({ isLoading: false });
                    console.log("restart new password ", err);
                });
            }
        }
    };

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        this.setState({
            [name]: value,
            newPasswordErr: "",
            confirmPasswordErr: "",
        });
    };

    render() {
        let { newPassword, confirmPassword, newPasswordErr, confirmPasswordErr, isLoading } = this.state;

        let isAuthenticated = CheckUserAuthentication();
        if (isAuthenticated) {
            return <Redirect to='/app/dashboard' />
        }

        return (
            <div id="layout-wrapper">
                <div className="pagee main-signin-wrapperr">
                    <div className="row signpages text-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="row row-sm">
                                    <div className="col-lg-6 col-xl-6 d-none d-lg-block text-center  details">
                                        <div className="mt-3 p-2">
                                            <img
                                                src="/images/logo.svg"
                                                className="header-brand-img mb-4"
                                                alt="logo"
                                            />
                                            <div className="clearfix"></div>
                                            <img
                                                src="/images/login_img.svg"
                                                className="ht-100 mb-0"
                                                alt="user"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-6 col-xs-12 col-sm-12 login_form ">
                                        <div className="container-fluid">
                                            <div className="row row-sm">
                                                <div className="card-body mt-2 mb-2">
                                                    <img
                                                        src="images/logo.svg"
                                                        className=" d-lg-none header-brand-img text-left float-left mb-4"
                                                        alt="logo"
                                                    />
                                                    <div className="clearfix"></div>
                                                    <form>
                                                        <h5 className="text-left mb-4 font-20">
                                                            Reset Password
                                                        </h5>
                                                        <p className="mb-3 text-left">
                                                            Enter New Password
                                                            of Your choice to
                                                            connect with Yolojet
                                                            account.
                                                        </p>

                                                        <TextInput
                                                        containerClassName={"form-group text-left"}
                                                            labelText={"New Password"}
                                                            value={newPassword}
                                                            onChange={this.handleChange("newPassword")}
                                                            isPasswordText={true}
                                                            errorText={newPasswordErr}
                                                            disabled={isLoading}
                                                        />

                                                        <TextInput
                                                            containerClassName={"form-group text-left"}
                                                            labelText={"Confirm Password"}
                                                            value={confirmPassword}
                                                            onChange={this.handleChange("confirmPassword")}
                                                            isPasswordText={true}
                                                            errorText={confirmPasswordErr}
                                                            disabled={isLoading}
                                                        />

                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-block"
                                                            onClick={this.onSubmit}
                                                            disabled={isLoading}
                                                        >
                                                            {isLoading ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                    <span className="visually-hidden">Saving...</span>
                                                                </>
                                                            ) : (
                                                                "Reset Password"
                                                            )}

                                                        </button>
                                                        <div className="col-lg-12 text-center pb-4 mt-3">
                                                            <Link to="/login">
                                                                Back to Login
                                                            </Link>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let token = match?.params?.token;

    return {
        token: token,
    };
}

export default connect(mapStateToProps)(ResetPassword);
