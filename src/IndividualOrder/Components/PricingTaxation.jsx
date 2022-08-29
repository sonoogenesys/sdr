import React from "react";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import TextInput from "../../Utils/TextInput";

const PricingTaxation = ({
    heading = "Pricing & Taxation",
    details = {},
    handelChange,
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
                                    labelText={"Total Discount (Per Order)"}
                                    value={details?.totalDiscount}
                                    onChange={handelChange("totalDiscount")}
                                    errorText={details?.totalDiscountError}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Shipping Charges(Per Order)"}
                                    value={details?.shippingCharges}
                                    onChange={handelChange("shippingCharges")}
                                    errorText={details?.shippingChargesError}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"COD Charges(Per Order)"}
                                    value={details?.codCharges}
                                    onChange={handelChange("codCharges")}
                                    errorText={details?.codChargesError}
                                    disabled={disabled}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Gift Wrap Charges(Per Order)"}
                                    value={details?.giftWrapCharges}
                                    onChange={handelChange("giftWrapCharges")}
                                    errorText={details?.giftWrapChargesError}
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

export default PricingTaxation;
