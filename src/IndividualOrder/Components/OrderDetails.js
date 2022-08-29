import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import TextInput from "../../Utils/TextInput";

const OrderDetails = ({
    heading = "Order Details",
    order = {},
    handelChange = (name) => {},
    eventKey = "0",
    disabled = false,
    readOnly = false
}) => {
    handelChange = disabled ? (name) => {} : handelChange;
    order.paymentMethod = (order?.paymentMethod || "")?.toLowerCase();

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
                        {
                            order?.id &&
                            <div className="row">
                                <div className="col-md-4">
                                    <TextInput
                                        containerClassName={"form-group position-relative"}
                                        labelClassName={"order_label"}
                                        labelText={"Order Id"}
                                        isRequired={true}
                                        value={order?.id}
                                        placeholder={"Enter Order id"}
                                        onChange={handelChange("id")}
                                        disabled={true}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group position-relative">
                                        <label className="order_label">
                                            Order Date
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={order?.date}
                                            placeholder="Enter Order date"
                                            required=""
                                            onChange={handelChange("date")}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <TextInput
                                        containerClassName={"form-group position-relative"}
                                        labelClassName={"order_label"}
                                        labelText={"Channel"}
                                        isRequired={true}
                                        placeholder={"Enter channel"}
                                        value={order?.channel}
                                        onChange={handelChange("channel")}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-md-6">
                                <div
                                    className="form-group"
                                    onChange={handelChange("paymentMethod")}
                                >
                                    <label className="d-block mb-3 order_label">
                                        Payment Method <span>*</span>
                                    </label>
                                    {
                                        !readOnly &&
                                        <>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input
                                                    type="radio"
                                                    id="customRadioInline1"
                                                    name="outer-group[0][customRadioInline1]"
                                                    className="custom-control-input"
                                                    value={"cod"}
                                                    checked={order.paymentMethod === "cod"}
                                                    disabled={disabled}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customRadioInline1"
                                                >
                                                    COD
                                                </label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-inline">
                                                <input
                                                    type="radio"
                                                    id="customRadioInline2"
                                                    name="outer-group[0][customRadioInline1]"
                                                    className="custom-control-input"
                                                    value={"prepaid"}
                                                    checked={order.paymentMethod === "prepaid"}
                                                    disabled={disabled}
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor="customRadioInline2"
                                                >
                                                    Prepaid
                                                </label>
                                            </div>
                                        </>
                                    }
                                    {readOnly && <p>{order?.paymentMethod === 'prepaid' ? 'Prepaid' : 'COD'}</p>}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Accordion.Collapse>
        </div>
    );
};

export default OrderDetails;
