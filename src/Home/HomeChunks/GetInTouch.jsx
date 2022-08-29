import React, { useEffect, useState } from 'react';
import BaseModal from '../../Utils/BaseModal';
import { showNotification, validateEmail, validateMobile } from '../../Utils/CommonFunctions';
import axios from 'axios';
import appUrl from '../../Constants/AppUrl';
import TextInput from '../../Utils/TextInput';

import {NavLink} from "react-router-dom"

const GetInTouch = ({
    show = false,
    title = title,
    handleClose = () => {},
    ...props
}) => {

    const [state, setState] = useState({
        isLoading: false,
        name: "",
        number: "",
        email: "",
        company_name: "",
        location: "",
        isAgree: false,
        name_err: "",
        number_err: "",
        email_err: "",
        company_name_err: "",
        location_err: "",
    });

    const { isLoading, name, number, email, company_name, location, isAgree } = state;

    const preload = () => {
        if (!show) {
            setState({
                isLoading: false,
                name: "",
                number: "",
                email: "",
                company_name: "",
                location: "",
                isAgree: false,
                name_err: "",
                number_err: "",
                email_err: "",
                company_name_err: "",
                location_err: "",
            });
        }
    }

    useEffect(() => {
        preload();
    }, [show])

    const handleChange = (name = "", isCheckbox = false) => (event) => {
        let value = isCheckbox ? event.target.checked : event.target.value;

        if (name === "number") {
            value = value.replace(/[^0-9]/g, '');
        }

        setState({
            ...state,
            [name]: value,
            name_err: "",
            number_err: "",
            email_err: "",
            company_name_err: "",
            location_err: "",
        });
    }

    const hasError = () => {
        let isErrorHit = false;
        let name_err = "";
        let number_err = "";
        let email_err = "";
        let company_name_err = "";
        let location_err = "";

        if (!name) {
            name_err = "Please enter your name";
            isErrorHit = true;
        }

        if (!number) {
            number_err = "Please enter your number";
            isErrorHit = true;
        } else if (!validateMobile(number)) {
            number_err = "Please enter valid number";
            isErrorHit = true;
        }

        if (!email) {
            email_err = "Please enter your email";
            isErrorHit = true;
        } else if (!validateEmail(email)) {
            email_err = "Please enter valid email";
            isErrorHit = true;
        }

        if (!company_name) {
            company_name_err = "Please enter your company name";
            isErrorHit = true;
        }

        if (!location) {
            location_err = "Please enter your location";
            isErrorHit = true;
        }

        setState({
            ...state,
            name_err,
            number_err,
            email_err,
            company_name_err,
            location_err,
        })

        return isErrorHit;
    }

    const onSubmit = () => {
        let data = {
            name,
            number,
            email,
            company_name,
            location
        }

        if (!hasError()) {
            setState({
                ...state,
                isLoading: true,
            });

            axios({
                url: appUrl.FEEDBACKS_URL,
                method: "POST",
                data: data,
            })
            .then(res => {
                const resData = res.data;
                const resMeta = resData?.meta;

                if (resMeta?.success && resMeta?.status === 200) {
                    // showNotification("success", resMeta.message);
                    showNotification("success", 'Thanks for reaching out to us. Our executive will get back to you shortly.');
                    handleClose();
                } else {
                    showNotification("error", resMeta.message);
                    setState({
                        ...state,
                        isLoading: false,
                    });
                }
            })
            .catch(err => {
                showNotification("error", "There is some error while sending data!");
                console.log("GET IN TOUCH ", err);
                setState({
                    ...state,
                    isLoading: false,
                });
            });
        }
    }

    return (
        <>
            <BaseModal
                show={show}
                title={title}
                handleClose={handleClose}
            >
            <div className="row">
                <div className="col-lg-12">
                    <form action="#">
                        <div className="row">
                            <div className="col-lg-12">
                                <TextInput
                                    containerClassName={"form-group"}
                                    labelText={"Name"}
                                    placeholder={"Enter your name"}
                                    isRequired={true}
                                    value={name}
                                    onChange={handleChange("name")}
                                    errorText={state.name_err}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <TextInput
                                    containerClassName={"form-group"}
                                    labelText={"Number"}
                                    placeholder={"Enter your number"}
                                    isRequired={true}
                                    value={number}
                                    onChange={handleChange("number")}
                                    errorText={state.number_err}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="col-lg-6">
                                <TextInput
                                    containerClassName={"form-group"}
                                    labelText={"Email"}
                                    placeholder={"Enter your email"}
                                    isRequired={true}
                                    value={email}
                                    onChange={handleChange("email")}
                                    errorText={state.email_err}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <TextInput
                                    containerClassName={"form-group"}
                                    labelText={"Company Name"}
                                    placeholder={"Enter your company name"}
                                    isRequired={true}
                                    value={company_name}
                                    onChange={handleChange("company_name")}
                                    errorText={state.company_name_err}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="col-lg-6">
                                <TextInput
                                    containerClassName={"form-group"}
                                    labelText={"Location"}
                                    placeholder={"Enter your location"}
                                    isRequired={true}
                                    value={location}
                                    onChange={handleChange("location")}
                                    errorText={state.location_err}
                                    disabled={isLoading}
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
                                    <span>I agree to the <NavLink to="/TermsAndConditions" target="_blank">Terms and conditions</NavLink> and <NavLink to="/PrivacyPolicy" target="_blank">Privacy Policy</NavLink></span>
                                </label>
                                </div>
                            </div>
                        </div>
                       <div className="row">
                           <div className="col-lg-12 text-center">
                            <button type="button" className="btn btn-primary text-white" onClick={onSubmit} disabled={isLoading || !isAgree}>
                                {
                                    isLoading
                                    ?
                                    <>
                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                        <span className="visually-hidden">  Saving...</span>
                                    </>
                                    : "Submit"
                                }
                            </button>

                           </div>
                       </div>

                      </form>
                </div>
            </div>
            </BaseModal>
        </>
    )
}

export default GetInTouch
