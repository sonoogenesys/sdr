import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { showNotification, validateEmail } from "../Utils/CommonFunctions";
import TextInput from "../Utils/TextInput";
import axios from "axios";
import APP_URL from "../Constants/AppUrl";
import CheckUserAuthentication from "../Utils/CheckUserAuthentication";

class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailErr: "",
            isLoading: false,
        };
    }

    hasError = () => {
        let { email } = this.state;
        let emailErr;
        let isErrorHit = false;

        email = email.trim();
        if (!email) {
            emailErr = "Please enter email";
            isErrorHit = true;
        } else if (!validateEmail(email)) {
            emailErr = "Please enter valid email";
            isErrorHit = true;
        }

        if (emailErr) {
            this.setState({ emailErr });
        }

        return isErrorHit;
    };

    onSubmit = () => {
        if (!this.hasError()) {
            let { email } = this.state;
            email = email.trim();

            this.setState({
                isLoading: true,
            });

            axios({
                method: "POST",
                url: APP_URL.FORGOT_PASSWORD_URL,
                data: {
                    email: email,
                }
            })
            .then(res => {
                let resData = res.data;
                let resMeta = resData?.meta || resData;

                if (resMeta?.success !== true || resMeta?.status !== 200) {
                    showNotification("error", resMeta?.message);
                } else {
                    showNotification("success", resMeta?.message);
                    this.props.history.replace("/login");
                }

                this.setState({ isLoading: false });
            })
            .catch(err => {
                console.log("forgot password", err);
            });
        }
    };

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        this.setState({
            [name]: value,
            emailErr: "",
        });
    };

    render() {
        let { email, emailErr, isLoading } = this.state;

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
                                                src="images/logo.svg"
                                                className="header-brand-img mb-4"
                                                alt="logo"
                                            />
                                            <div className="clearfix"></div>
                                            <img
                                                src="images/login_img.svg"
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
                                                            Forget Password
                                                        </h5>
                                                        <p className="mb-3 text-left">
                                                            Enter the email
                                                            address connect with
                                                            your Yolojet
                                                            account.
                                                        </p>

                                                        <TextInput
                                                            containerClassName={"form-group text-left"}
                                                            labelText={"Email"}
                                                            value={email}
                                                            placeholder={"Enter your email"}
                                                            onChange={this.handleChange("email")}
                                                            errorText={emailErr}
                                                            disabled={isLoading}
                                                        />

                                                        <button
                                                            type="button"
                                                            className="btn btn-primary btn-block"
                                                            onClick={
                                                                this.onSubmit
                                                            }
                                                            disabled={isLoading}
                                                        >
                                                            Submit
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

export default ForgetPassword;
