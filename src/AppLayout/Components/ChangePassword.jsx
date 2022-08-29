import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseModal from "../../Utils/BaseModal";
import { isValidPassword, showNotification } from "../../Utils/CommonFunctions";
import TextInput from "../../Utils/TextInput";
import APP_URL from "../../Constants/AppUrl";

const ChangePassword = ({ show = false, handleClose = () => {}, ...props }) => {
    const [state, setState] = useState({
        new_password: "",
        confirm_password: "",
        old_password_err: "",
        new_password_err: "",
        confirm_password_err: "",
        isLoading: false,
    });

    const preload = () => {
        if (show === false) {
            setState({
                new_password: "",
                confirm_password: "",
            });
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
    }, [show])

    const handleChange = (name) => (event) => {
        let value = event?.target?.value;

        setState({
            ...state,
            [name]: value,
        });
    };

    const hasError = () => {
        let { new_password, confirm_password } = state;

        let new_password_err = "";
        let confirm_password_err = "";
        let isErrorHit = false;

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
            new_password_err,
            confirm_password_err,
        });

        return isErrorHit;
    };

    const onSubmit = () => {
        if (!hasError()) {
            let { new_password } = state;
            let params = {
                password: new_password,
            };

            setState({
                ...state,
                isLoading: true,
            });

            axios({
                method: "POST",
                url: APP_URL.RESET_GLOBAL_PASSWORD_URL,
                data: params,
            })
            .then(res => {
                let resData = res.data;

                if (resData?.meta?.success !== true && resData?.meta?.status !== 200) {
                    showNotification("error", resData?.meta?.message || resData?.message);
                } else {
                    showNotification("success", resData?.meta?.message || resData?.message);
                }

                handleClose();
            })
            .catch(err => {
                console.log("change global password error", err);
                setState({
                    ...state,
                    isLoading: false,
                });
                showNotification("error", "Error in updating global password");
                handleClose();
            });
        }
    };

    const {
        new_password,
        confirm_password,
        new_password_err,
        confirm_password_err,
        isLoading,
    } = state;

    return (
        <BaseModal
            show={show}
            title={"Change Global Password"}
            handleClose={handleClose}
        >
            <div className="row">
                <div className="col-md-12">
                    <form className="needs-validation" noValidate>
                        <div className="row">
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
                            <div className="col-lg-12 text-center pb-2 pt-2">
                                <div className="button-items">
                                    <button
                                        type="button"
                                        className="btn  btn-primary"
                                        onClick={onSubmit}
                                        disabled={isLoading}
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

export default ChangePassword;
