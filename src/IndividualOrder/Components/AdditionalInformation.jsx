import React, { useState } from "react";
import {Accordion, Card} from "react-bootstrap";
import TextInput from "../../Utils/TextInput";

const AdditionalInformation = ({
    heading = "Additional Information",
    details = {},
    handelChange,
    eventKey = "0",
    disabled = false,
    readOnly = false
}) => {

    const [state, setState] = useState({
        isSendNotification: details?.sendNotification
    });

    let { isSendNotification } = state;

    const toggleSendNotification = () => !disabled && setState({ isSendNotification: !isSendNotification });

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
                            {
                                !readOnly &&
                                    <div className="col-md-4">
                                        <div className="form-check position-relative">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={isSendNotification}
                                                placeholder="Enter Send Notification"
                                                required=""
                                                onClick={toggleSendNotification}
                                                onChange={handelChange(
                                                    "sendNotification"
                                                )}
                                            />
                                            <label className="order_label">
                                                Send Notification
                                            </label>
                                        </div>
                                    </div>
                            }
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Comment"}
                                    value={details?.comment}
                                    onChange={handelChange("comment")}
                                    disabled={disabled}
                                    cols="45"
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"HSN Code"}
                                    value={details?.hsnCode}
                                    onChange={handelChange("hsnCode")}
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

export default AdditionalInformation;
