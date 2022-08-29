import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import TextInput from "../../Utils/TextInput";

const UserDetails = ({
    heading = "User Details",
    details,
    handelChange = (name) => {},
    eventKey = "0",
    disabled = false,
}) => {
    handelChange = disabled ? (name) => {} : handelChange;

    return (
        <div className="card">
            <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
                <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                    <span>{heading}</span>
                    <i className="fa fa-chevron-down"></i>
                </h4>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={eventKey}>
                <div className="card-body">
                    <form className="needs-validation" noValidate>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"First Name"}
                                    isRequired={true}
                                    placeholder={"Enter first name"}
                                    value={details?.firstName}
                                    onChange={handelChange("firstName")}
                                    errorText={details?.firstNameError}
                                    disabled={disabled}
                                    autoFocus={true}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Last Name"}
                                    isRequired={true}
                                    placeholder={"Enter last name"}
                                    value={details?.lastName}
                                    onChange={handelChange("lastName")}
                                    errorText={details?.lastNameError}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Email Id"}
                                    isRequired={true}
                                    placeholder={"Enter email id"}
                                    value={details?.email}
                                    onChange={handelChange("email")}
                                    errorText={details?.emailError}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Mobile Number"}
                                    isRequired={true}
                                    placeholder={"Enter mobile number"}
                                    value={details?.mobile}
                                    onChange={handelChange("mobile")}
                                    errorText={details?.mobileError}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Alternate Mobile Number"}
                                    placeholder={"Enter alternate mobile number"}
                                    value={details?.alternateMobile}
                                    onChange={handelChange("alternateMobile")}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Accordion.Collapse>
        </div>
    );
};

export default UserDetails;
