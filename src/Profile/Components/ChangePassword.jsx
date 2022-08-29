import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import BaseModal from "../../Utils/BaseModal";
import { isValidPassword, showNotification } from "../../Utils/CommonFunctions";
import TextInput from "../../Utils/TextInput";
import { changePasswordRequest } from "../Duck/ProfileActions";

import {NavLink} from "react-router-dom"

const ChangePassword = ({ show = false, handleClose = () => {}, ...props }) => {
    const [state, setState] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
        old_password_err: "",
        new_password_err: "",
        confirm_password_err: "",
        isAgree: false,
        isLoading: false,
    });

    const preload = () => {
        if (show === false) {
            setState({});
        };

        if (!props?.loading && state.isLoading) {

            if (props?.error) {
                setState({
                    ...state,
                    isLoading: false,
                });
            } else {
                handleClose();
            }
        }
    }

    useEffect(() => {
        preload();
    }, [show, props?.loading])

    const handleChange = (name = "", isCheckbox = false) => (event) => {
        let value = isCheckbox ? event.target.checked : event.target.value;

        setState({
            ...state,
            [name]: value,
        });
    };

    const hasError = () => {
        let { old_password, new_password, confirm_password } = state;

        let old_password_err = "";
        let new_password_err = "";
        let confirm_password_err = "";

        let isErrorHit = false;

        if (!old_password) {
            isErrorHit = true;
            old_password_err = "Please enter old password";
        }

        if (!new_password) {
            isErrorHit = true;
            new_password_err = "Please enter new password";
        } else if(!isValidPassword(new_password)) {
            isErrorHit = true;
            new_password_err = "Password at least 4 characters";
        }

        if (!confirm_password) {
            isErrorHit = true;
            confirm_password_err = "Please enter confirm password";
        }

        if (new_password && confirm_password && new_password !== confirm_password) {
            isErrorHit = true;
            showNotification("error", "New password and Confirm password not same")
        }


        setState({
            ...state,
            old_password_err,
            new_password_err,
            confirm_password_err,
        });

        return isErrorHit;
    };

    const onSubmit = () => {
        if (!hasError()) {
            let { old_password, new_password } = state;
            let params = {
                oldPassword: old_password,
                password: new_password,
            };

            setState({
                ...state,
                isLoading: true,
            });

            props.changePassword && props.changePassword(params);
        }
    };

    const {
        old_password,
        new_password,
        confirm_password,
        old_password_err,
        new_password_err,
        confirm_password_err,
        isAgree,
        isLoading,
    } = state;

    return (
        <BaseModal
            show={show}
            title={"Change Password"}
            handleClose={handleClose}
        >
            <div className="row">
                <div className="col-md-12">
                    <form className="needs-validation" noValidate>
                        <div className="row">
                            <div className="col-lg-12">
                                <TextInput
                                    labelText={"Old Password"}
                                    value={old_password}
                                    onChange={handleChange("old_password")}
                                    disabled={isLoading}
                                    isPasswordText={true}
                                    errorText={old_password_err}
                                    isRequired={true}
                                />
                            </div>
                            <div className="col-lg-12">
                                <TextInput
                                    labelText={"New Password"}
                                    value={new_password}
                                    onChange={handleChange("new_password")}
                                    disabled={isLoading}
                                    isPasswordText={true}
                                    errorText={new_password_err}
                                    isRequired={true}
                                />
                            </div>
                            <div className="col-lg-12">
                                <TextInput
                                    labelText={"Confirm Password"}
                                    value={confirm_password}
                                    onChange={handleChange("confirm_password")}
                                    disabled={isLoading}
                                    isPasswordText={true}
                                    errorText={confirm_password_err}
                                    isRequired={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="form-check">
                                <label className="form-check-label">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        value=""
                                        checked={isAgree}
                                        onChange={handleChange("isAgree", true)}
                                        disabled={isLoading}
                                    />
                                    <span>I agree to the <NavLink to="/TermsAndConditions" target="_blank">Terms and conditions</NavLink></span>
                                </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 text-center pb-2 pt-2">
                                <div className="button-items">
                                    <button
                                        type="button"
                                        className="btn  btn-primary"
                                        onClick={onSubmit}
                                        disabled={isLoading || !isAgree}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm"></span>
                                                <span className="visually-hidden">Saving...</span>
                                            </>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>
    );
};

const mapStateToProps = (state) => {
    let loading = state.loggedInUser?.loading;
    let error = state.loggedInUser?.error;
    return {
        loading: loading,
        error: error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (params) => dispatch(changePasswordRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
