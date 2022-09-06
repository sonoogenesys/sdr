import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signInRequest } from "./Duck/LoginActions";
import { isValidPassword, validateEmail } from "../Utils/CommonFunctions";
import CheckUserAuthentication from '../Utils/CheckUserAuthentication'
import './Components/LoginStyle.css';
import TextInput from '../Utils/TextInput';
import GetInTouch from '../Home/HomeChunks/GetInTouch';

class LoginContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isLoading: false,
            emailError: "",
            passwordError: "",
            error: {},
            showGetinTouchPopup: false
        }
        this.GetinTouch = this.GetinTouch.bind(this);
    }

    componentDidUpdate(preProps) {
        let { isLoading, err } = this.props;

        if (!!err && preProps.isLoading && !isLoading ) {
            this.setState({
                error: err,
                isLoading: false,
            });
        }
    }

    handelChange = (name) => (event) => {
        if (!this.state.isLoading) {
            this.setState({
                [name]: event.target.value,
                emailError: "",
                passwordError: "",
                error: {},
            });
        }
    }

    onSubmit = (event) => {
        let { email, password } = this.state;
        event.preventDefault();

        email = email.trim().toLowerCase();
        this.setState({ isLoading: true });
        if (validateEmail(email) && isValidPassword(password)) {
            this.props.signInRequest({email, password});
        } else {
            let emailError = "";
            let passwordError = "";

            // set email error message
            if (email.length === 0) {
                emailError = "Please enter your email";;
            } else if (!validateEmail(email)) {
                emailError = "Please provide a valid email";
            }

            // set password error message
            if (password.length === 0) {
                passwordError = "Please enter password";
            } else  if (!isValidPassword(password)) {
                passwordError = "Password at least 4 characters";
            }

            this.setState({
                emailError,
                passwordError,
                isLoading: false,
            })
        }
    }

     GetinTouch () {
        this.setState(state => ({
            showGetinTouchPopup: !state.showGetinTouchPopup
          }));

    }

    render() {
        let {email, password, emailError, passwordError, isLoading, error} = this.state;

        let isAuthenticated = CheckUserAuthentication();
        if (isAuthenticated) {
            return <Redirect to='/app/dashboard' />
        }

        return (
          <>
            
            <div id="layout-wrapper">
                <div className="pagee main-signin-wrapperr">
                    <div className="row signpages text-center">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="row row-sm">
                                    <div className="col-lg-6 col-xl-6 d-none d-lg-block text-center  details">
                                        <div className="mt-3 p-2">
                                            <img style={{width: 150, height:100}} src="img/logo.jpeg" className="header-brand-img mb-4" alt="logo" />
                                            <div className="clearfix"></div>
                                            <img src="img/engine.png" className="ht-100 mb-0" alt="user" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xl-6 col-xs-12 col-sm-12 login_form ">
                                        <div className="container-fluid">
                                            <div className="row row-sm">
                                                <div className="card-body mt-2 mb-2">
                                                    <form>
                                                        <h5 className="text-left mb-2 font-20">Signin to Your Account</h5>
                                                        <p className="mb-4 text-muted tx-13 ml-0 text-left">Signin to create, discover and connect with KCS electrical</p>

                                                        <TextInput
                                                            containerClassName={"form-group text-left"}
                                                            labelText={"Email"}
                                                            value={email}
                                                            placeholder={"Enter your email"}
                                                            onChange={this.handelChange("email")}
                                                            errorText={emailError}
                                                        />

                                                        <TextInput
                                                            containerClassName={"form-group text-left"}
                                                            labelText={"Password"}
                                                            value={password}
                                                            placeholder={"Enter your password"}
                                                            onChange={this.handelChange("password")}
                                                            errorText={passwordError}
                                                            isPasswordText={true}
                                                        />

                                                        <button className="btn btn-primary btn-block isLoading" onClick={this.onSubmit} disabled={isLoading} >
                                                            {
                                                                isLoading ?
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                    <span className="visually-hidden">  Loading...</span>
                                                                </>
                                                                : "Sign In"
                                                            }
                                                        </button>

                                                        {
                                                            !!error?.meta?.message &&
                                                            <div className="alert alert-danger" style={{marginTop:10}}>
                                                                {error?.meta?.message}
                                                            </div>
                                                        }
                                                    </form>

                                                    {/*<div className="text-left mt-5 ml-0">*/}
                                                    {/*    <div className="mb-1">*/}
                                                    {/*        <Link to="/ForgetPassword">Forgot Password?</Link>*/}
                                                    {/*    </div>*/}
                                                    {/*    /!*<div>*!/*/}
                                                    {/*    /!*    Don't have an account?*!/*/}
                                                    {/*        /!*<Link to="#" onClick={this.GetinTouch}> Register Here</Link>*!/*/}
                                                    {/*    /!*</div>*!/*/}
                                                    {/*</div>*/}
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
            <GetInTouch 
                show={this.state.showGetinTouchPopup}
                handleClose={this.GetinTouch}
                title="Register with Us"
                />
          </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLoading: state?.token?.loading,
        data: state?.token?.data,
        err: state?.token?.error,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signInRequest: (params) => dispatch(signInRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);