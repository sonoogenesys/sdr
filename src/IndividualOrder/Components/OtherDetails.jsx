import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import TextInput from "../../Utils/TextInput";

const OtherDetails = ({
    heading = "Other Details",
    details = {},
    handelChange,
    eventKey = "0",
    disabled = false,
}) => {

    handelChange = disabled ? (name) => undefined : handelChange;

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
                                    labelText={"Reseller Name"}
                                    value={details?.resellerName}
                                    onChange={handelChange("resellerName")}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Company Name"}
                                    value={details?.companyName}
                                    onChange={handelChange("companyName")}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Ewaybill No"}
                                    value={details?.eWayBillNo}
                                    onChange={handelChange("eWayBillNo")}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Latitude"}
                                    value={details?.latitude}
                                    onChange={handelChange("latitude")}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Longitude"}
                                    value={details?.longitude}
                                    onChange={handelChange("longitude")}
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

export default OtherDetails;
