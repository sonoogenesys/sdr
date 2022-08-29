import axios from "axios";
import React, { useEffect, useState } from "react";
import appUrl from "../../Constants/AppUrl";
import BaseModal from "../../Utils/BaseModal";
import { showNotification, validateEmail, validateMobile } from "../../Utils/CommonFunctions";
import TextInput from "../../Utils/TextInput";

const ApplyNow = ({ show = false, handleClose = () => {}, jobTitle = "" }) => {

    const [state, setState] = useState({
        name: "",
        email: "",
        number: "",
        nameErr: "",
        emailErr: "",
        numberErr: "",
        resume: null,
        isLoading: false,
    });

    let { name, email, number, resume, nameErr, emailErr, numberErr, isLoading } = state;

    const preload = () => {
        if (!show) {
            setState({
                name: "",
                email: "",
                number: "",
                nameErr: "",
                emailErr: "",
                numberErr: "",
                resume: null,
                isLoading: false,
            });
        }
    }

    useEffect(() => {
        preload();
    }, [show])

    const handleFile = (event) => {
        let file = event?.target?.files[0];

        if(file){
            let extension = file.name?.split('.')?.[file.name.split('.').length-1]
            if(extension === 'pdf' || extension === 'doc' || extension === 'docx') {
                setState({
                    ...state,
                    resume: file,
                });
            }else{
                showNotification("error", "Upload pdf, doc, docx format file only!");
            }
        }
    }

    const handleChange = (name) => (event) => {
        let value = event?.target?.value;

        if (name === "number") {
            value = value?.replace(/[^0-9]/g, '');
        }

        setState({
            ...state,
            [name]: value,
            nameErr: "",
            emailErr: "",
            numberErr: "",
        });
    }

    const hasError = () => {
        let isErrorHit = false;

        let nameErr = "";
        let emailErr = "";
        let numberErr = "";

        if (!name) {
            isErrorHit = true;
            nameErr = "Please enter full name";
        }

        if (!email) {
            isErrorHit = true;
            emailErr = "Please enter email id";
        } else if (!validateEmail(email)) {
            isErrorHit = true;
            emailErr = "Please enter valid email id";
        }

        if (!number) {
            isErrorHit = true;
            numberErr = "Please enter contact number";
        } else if (!validateMobile(number)) {
            isErrorHit = true;
            numberErr = "Please enter valid contact number";
        }

        if (!resume) {
            showNotification("warning", "Please choose a file!");
        }

        setState({
            ...state,
            nameErr,
            emailErr,
            numberErr,
        });

        return isErrorHit;
    }

    const onSubmit = () => {
        if (!hasError()) {
            setState({
                ...state,
                isLoading: true,
            });

            name = name.trim();
            email = email.trim();
            number = number.trim();

            let formData = new FormData();
            formData.set("name", name);
            formData.set("email", email);
            formData.set("number", number);
            formData.set("resume", resume);
            formData.set("job_title", jobTitle);

            axios({
                method: "POST",
                url: appUrl.CAREER_APPLY_NOW_URL,
                data: formData,
            })
            .then(res => {
                let resData = res.data;
                let resMeta = resData?.meta || resData;

                if (resMeta?.success !== true || resMeta?.status !== 200) {
                    showNotification("error", resMeta?.message);
                    setState({
                        ...state,
                        isLoading: false,
                    });
                } else {
                    showNotification("success", resMeta?.message);
                    handleClose();
                }
            })
            .catch(err => {
                console.log("career apply now ", err);
            });
        }
    }

    return (
        <BaseModal show={show} title={"Apply Now"} handleClose={handleClose}>
            <form action="#">
                <div className="row">
                    <div className="col-lg-12">
                        <TextInput
                            containerClassName={"form-group"}
                            labelText={"Full Name"}
                            placeholder={" "}
                            value={name}
                            onChange={handleChange("name")}
                            errorText={nameErr}
                            isRequired={true}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextInput
                            containerClassName={"form-group"}
                            labelText={"Email Id"}
                            placeholder={" "}
                            value={email}
                            onChange={handleChange("email")}
                            errorText={emailErr}
                            isRequired={true}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="col-lg-6">
                        <TextInput
                            containerClassName={"form-group"}
                            labelText={"Contact Number"}
                            placeholder={" "}
                            value={number}
                            onChange={handleChange("number")}
                            errorText={numberErr}
                            isRequired={true}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="col-lg-12">
                        <div
                            className="form-group"
                            style={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                        >
                            <label htmlFor="">Upload Resume</label>
                            <div className="upload_img position-relative mt-0">
                                <input
                                    type="file"
                                    name=""
                                    id=""
                                    className="fileupload"
                                    onChange={handleFile}
                                />
                                <div
                                    className="upload_banner"
                                    style={{ height: "90px" }}
                                >
                                    <span>
                                        <i
                                            className="fa fa-upload"
                                            aria-hidden="true"
                                        ></i>
                                    </span>
                                    <p>Choose file</p>
                                </div>

                                {
                                    resume && <div className='mt-3'>
                                        <span>
                                            <i className="fas fa-file-pdf" style={{fontSize:18}} aria-hidden="true"></i>
                                            <span style={{fontSize:16, marginLeft:8}}>{resume?.name}</span>
                                        </span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button
                            type="button"
                            className="btn btn-primary text-white"
                            onClick={onSubmit}
                            disabled={isLoading}
                        >
                            {
                                isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm"></span>
                                        <span className="visually-hidden"> Sending...</span>
                                    </>
                                ) : "Submit"
                            }
                        </button>
                    </div>
                </div>
            </form>
        </BaseModal>
    );
};

export default ApplyNow;
