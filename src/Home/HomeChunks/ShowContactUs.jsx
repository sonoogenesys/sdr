import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BaseModal from '../../Utils/BaseModal';
import TextInput from '../../Utils/TextInput';

import {validateEmail, validateMobile} from "../../Utils/CommonFunctions";
import {showNotification} from "../../Utils/CommonFunctions";

const ShowContactUs = ({
    show = false,
    handleClose = () => {},
    ...props
}) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        number: "",
        email: "",
        query: "",
        location: "",
        isAgree: false,
        name_err: "",
        number_err: "",
        email_err: "",
        query_err: "",
    });

    const { isLoading, name, number, email, query, location, isAgree } = state;

    const preload = () => {
        if (!show) {
            setState({
                isLoading: false,
                name: "",
                number: "",
                email: "",
                query: "",
                location: "",
                isAgree: false,
                name_err: "",
                number_err: "",
                email_err: "",
                query_err: ""
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
            query_err: ""
        });
    }

    const hasError = () => {
        let isErrorHit = false;
        let name_err = "";
        let number_err = "";
        let email_err = "";
        let query_err = "";

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

        if (!query) {
            query_err = "Please enter your company name";
            isErrorHit = true;
        }

        setState({
            ...state,
            name_err,
            number_err,
            email_err,
            query_err
        })

        return isErrorHit;
    }

    const onSubmit = () => {

        if (!hasError()) {
            setState({
                ...state,
                isLoading: true,
            });

            const data = JSON.stringify({
                "name": name,
                "email": email,
                "mobile": number,
                "query": query
            });
            console.log(data)
            axios({
                url: "https://www.kcs-electrical.com/api/v1/mail",
                method: "POST",
                data: data,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => {
                showNotification("success", 'Thanks for reaching out to us. Our executive will get back to you shortly.');
                handleClose();
            })
            .catch(err => {
                showNotification("error", "There is some error while sending data!");
                console.log("GET IN TOUCH ", err);
                setState({
                    ...state,
                    isLoading: false,
                });
            });
        } else {
            console.log('-----')
        }
    }

    return (
        <>
            <BaseModal
                show={show}
                title={'Contact Here'}
                size={'lg'}
                handleClose={handleClose}
            >
            <div className="row">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112239.27765807435!2d76.89750291640625!3d28.465165299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19129a8774a9%3A0xa89ae8c88974106f!2sKCS%20Electrical%20Traders%20%26%20Engineering!5e0!3m2!1sen!2sin!4v1661666764704!5m2!1sen!2sin"
                    // className="teamImg"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: "0px", height: 150, width:'100%' }}
                />
                <div className="col-lg-12 text-center">
                    <h1 style={{fontSize: 23}}>KCS Electrical Traders and Engineering</h1>
                    <p style={{fontSize: 14}}>
                        <i className="fa fa-home" aria-hidden="true"/>
                        <span className={"pl-2"}>360(old 79/4) 301-3rd Floor Anamica enclave, Near kalyani hospital, MG road, gurgaon-122001</span>
                    </p>
                    <p>
                        <a href="tel:09810959039">
                            <i className="fa fa-phone" aria-hidden="true" style={{transform:" rotate(75deg)"}}/>
                            <span className="pl-2">+91 - 9810959039</span>
                        </a>
                    </p>
                    <p>
                        <a href="mailto:sales@kcs-electrical.com" >
                            <i className="fa fa-envelope" aria-hidden="true"/>
                            <span className="pl-2">sales@kcs-electrical.com</span>
                        </a>
                    </p>
                </div>
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
                                    labelText={"Query"}
                                    placeholder={"Write your query here"}
                                    isRequired={true}
                                    value={query}
                                    onChange={handleChange("query")}
                                    errorText={state.query_err}
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
                                        <span>I agree to the Terms and conditions and Privacy Policy</span>
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

export default ShowContactUs
