import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import TextInput from "../../Utils/TextInput";
import { postComment } from "../../Comments/Duck/CommentActions";
import { connect } from "react-redux";
import { showNDRDetails, validateMobile } from "../../Utils/CommonFunctions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const MessageModal = ({
    show = false,
    handleModal = () => {},
    orderId = "",
    order = {},
    loading,
    error,
    postOrderComment = (params) => {}
}) => {
    show = show && !!orderId;

    const preProps = useRef(loading);
    const [state, setState] = useState({
        remark: "open",
        title: "",
        message: "",
        customer_first_name: "",
        customer_last_name: "",
        customer_mobile: "",
        customer_address_line1: "",
        customer_pincode: "",
        customer_pincode: "",
        deferred_delivery_date: "",
        isSendSms: false,
        isSendEmail: false,
        isSendNdr: false,
        isLoading: false,
        titleErr: "",
        messageErr: "",
        customer_first_name_err: "",
        customer_last_name_err: "",
        customer_mobile_err: "",
        customer_address_line1_err: "",
        customer_address_line2_err: "",
        customer_pincode_err: "",
        deferred_delivery_date_err: "",
    });

    const preload = () => {
        if (state.isLoading && preProps.current?.loading && !loading) {
            if (!error) {
                handleModal();
            }

            setState({
                ...state,
                isLoading: false,
            });
        }

        if (show === false) {
            setState({
                remark: "open",
            });
        }
    };

    useEffect(() => {
        preload();

        return () => (preProps.current = { loading });
    }, [show, loading]);

    const handleChange = (name, isCheckBox = false) => (event) => {
        let target = event?.target;
        let value = isCheckBox ? target?.checked : (target?.value ?? event);

        if (name === "customer_mobile") {
            value = value?.replace(/[^0-9]/g, '');
        }

        setState({
            ...state,
            [name]: value,
            titleErr: "",
            messageErr: "",
            customer_first_name_err: "",
            customer_last_name_err: "",
            customer_mobile_err: "",
            customer_address_line1_err: "",
            customer_address_line2_err: "",
            customer_pincode_err: "",
            deferred_delivery_date_err: "",
        });
    };

    const onHide = () => {
        handleModal && handleModal();
    };

    let {
        remark,
        title,
        message,
        customer_first_name,
        customer_last_name,
        customer_mobile,
        customer_address_line1,
        customer_address_line2,
        customer_pincode,
        deferred_delivery_date,
        isLoading,
        isSendSms,
        isSendEmail,
        isSendNdr,
        titleErr,
        messageErr,
        customer_first_name_err,
        customer_last_name_err,
        customer_mobile_err,
        customer_address_line1_err,
        customer_address_line2_err,
        customer_pincode_err,
        deferred_delivery_date_err
    } = state;
    const isShowNdrInfo = showNDRDetails(order?.courier_name);

    let hasError = () => {
        let {
            remark,
            title,
            message,
            customer_first_name,
            customer_last_name,
            customer_mobile,
            customer_address_line1,
            customer_address_line2,
            customer_pincode,
            deferred_delivery_date,
            isSendNdr,
        } = state;

        remark = remark?.trim();
        title = title?.trim();
        message = message?.trim();

        let isErrorHit = false;
        let titleError = "";
        let messageError = "";
        let customer_first_name_err = ""
        let customer_last_name_err = ""
        let customer_mobile_err = ""
        let customer_address_line1_err = ""
        let customer_address_line2_err = ""
        let customer_pincode_err = ""

        if (!title || title.length < 0) {
            titleError = "Please enter title";
            isErrorHit = true;
        }

        if (!message || message.length < 0) {
            messageError = "Please enter message";
            isErrorHit = true;
        }

        if (isShowNdrInfo && isSendNdr) {
            customer_first_name = customer_first_name?.trim();
            customer_last_name = customer_last_name?.trim();
            customer_mobile = customer_mobile?.trim();
            customer_address_line1 = customer_address_line1?.trim();
            customer_address_line2 = customer_address_line2?.trim();
            customer_pincode = customer_pincode?.trim();

            if (!customer_first_name || customer_first_name.length < 0) {
                customer_first_name_err = "Please enter first name";
                isErrorHit = true;
            }

            if (!customer_last_name || customer_last_name.length < 0) {
                customer_last_name_err = "Please enter last name";
                isErrorHit = true;
            }

            if (!customer_mobile || customer_mobile.length < 0) {
                customer_mobile_err = "Please enter mobile number";
                isErrorHit = true;
            } else if (!validateMobile(customer_mobile)) {
                customer_mobile_err = "Please enter valid mobile number";
                isErrorHit = true;
            }

            if (!customer_address_line1 || customer_address_line1.length < 0) {
                customer_address_line1_err = "Please enter address line 1";
                isErrorHit = true;
            }

            if (!customer_address_line2 || customer_address_line2.length < 0) {
                customer_address_line2_err = "Please enter address line 2";
                isErrorHit = true;
            }

            if (!customer_pincode || customer_pincode.length < 0) {
                customer_pincode_err = "Please enter pincode";
                isErrorHit = true;
            }

            if (!deferred_delivery_date) {
                deferred_delivery_date_err = "Please select Deferred Delivery Date";
                isErrorHit = true;
            }
        }

        setState({
            ...state,
            titleErr: titleError,
            messageErr: messageError,
            customer_first_name_err,
            customer_last_name_err,
            customer_mobile_err,
            customer_address_line1_err,
            customer_address_line2_err,
            customer_pincode_err,
            deferred_delivery_date_err,
        });

        return isErrorHit;
    };

    const onSendMessage = () => {
        if (hasError()) return;

        setState({
            ...state,
            isLoading: true,
        });

        let commentObj = {
            remark: remark,
            title: title,
            body: message,
            onModel: "Order",
            model_id: orderId,
            sendSms: isSendSms,
            sendMail: isSendEmail,
            sendNdr: isSendNdr,
            customer: isSendNdr ? {
                first_name: customer_first_name,
                last_name: customer_last_name,
                mobile_number: customer_mobile,
            } : undefined,
            address: isSendNdr ? {
                line1: customer_address_line1,
                line2: customer_address_line2,
                pincode: customer_pincode,
            } : undefined,
            deferred_delivery_date: isSendNdr && deferred_delivery_date ? moment(deferred_delivery_date).toString() : undefined,
        };

        orderId && postOrderComment(commentObj);
    };

    return (
        <Modal show={show} onHide={onHide} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>Add Comment</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="col-md">
                    <div>
                        <TextInput
                            labelText={"Title"}
                            value={title}
                            onChange={handleChange("title")}
                            isRequired={true}
                            errorText={titleErr}
                            disabled={isLoading}
                        />

                        <TextInput
                            style={{ height: 150 }}
                            labelText={"Message"}
                            value={message}
                            cols={"3"}
                            isRequired={true}
                            onChange={handleChange("message")}
                            errorText={messageErr}
                            disabled={isLoading}
                        />
                    </div>

                    <div>
                        <label className="text-capitalize">
                            Status
                        </label>
                        <div>
                            <select
                                className="form-control mb-3"
                                value={remark}
                                onChange={handleChange("remark")}
                                disabled={isLoading}
                            >
                                <option value={"open"}>Open</option>
                                <option value={"closed"}>Closed</option>
                                <option value={"resolved"}>Resolved</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex mt-2">
                        <div className="form-group form-check mr-3">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input mt-1"
                                    type="checkbox"
                                    checked={isSendSms}
                                    onChange={handleChange("isSendSms", true)}
                                    disabled={isLoading}
                                />
                                SMS
                            </label>
                        </div>

                        <div className="form-group form-check mr-3">
                            <label className="form-check-label">
                                <input
                                    className="form-check-input mt-1"
                                    type="checkbox"
                                    checked={isSendEmail}
                                    onChange={handleChange("isSendEmail", true)}
                                    disabled={isLoading}
                                />
                                Email
                            </label>
                        </div>

                        {/* {
                            String(order?.latest_order_status)?.trim().toUpperCase() === "UNDELIVERED" && */}
                            <div className="form-group form-check mr-3">
                                <label className="form-check-label">
                                    <input
                                        className="form-check-input mt-1"
                                        type="checkbox"
                                        checked={isSendNdr}
                                        onChange={handleChange("isSendNdr", true)}
                                        disabled={isLoading}
                                    />
                                    NDR
                                </label>
                            </div>
                        {/* } */}
                    </div>

                    {
                        isShowNdrInfo && isSendNdr &&
                        <>
                            <h4 className="mt-2 mb-2">
                                <span>Alternate Customer Details</span>
                            </h4>

                            <div className="row">
                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"First name"}
                                        value={customer_first_name}
                                        onChange={handleChange("customer_first_name")}
                                        isRequired
                                        errorText={customer_first_name_err}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"Last name"}
                                        value={customer_last_name}
                                        onChange={handleChange("customer_last_name")}
                                        isRequired
                                        errorText={customer_last_name_err}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"Mobile Number"}
                                        value={customer_mobile}
                                        onChange={handleChange("customer_mobile")}
                                        isRequired
                                        errorText={customer_mobile_err}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"Address line 1"}
                                        value={customer_address_line1}
                                        onChange={handleChange("customer_address_line1")}
                                        isRequired
                                        errorText={customer_address_line1_err}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"Address line 2"}
                                        value={customer_address_line2}
                                        onChange={handleChange("customer_address_line2")}
                                        isRequired
                                        errorText={customer_address_line2_err}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <TextInput
                                        labelText={"Postcode"}
                                        value={customer_pincode}
                                        onChange={handleChange("customer_pincode")}
                                        isRequired
                                        errorText={customer_pincode_err}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label>
                                        Delivery Date <span style={{color:'red'}}>*</span>
                                    </label>

                                    <div>
                                        <label className="position-relative datePicker">
                                            <DatePicker
                                                className={`form-control ${deferred_delivery_date_err && "is-invalid"}`}
                                                selected={deferred_delivery_date}
                                                onChange={handleChange("deferred_delivery_date")}
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="Delivery Date"
                                                minDate={moment().add(1, "day").toDate()}
                                            />

                                            {
                                                !deferred_delivery_date &&
                                                !deferred_delivery_date_err &&
                                                <span>
                                                    <i className="bx bx-calendar-alt"></i>
                                                </span>
                                            }
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={onHide}
                    disabled={isLoading}
                >
                    Close
                </Button>
                <Button
                    variant="primary"
                    onClick={onSendMessage}
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
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

const mapStateToProps = (state, ownProps) => {
    let { orderId } = ownProps;

    let order = state.order.orders[orderId]
    let mBoard = state.comment?.board[orderId];

    let loading = mBoard?.loading;
    let error = mBoard?.error;

    return {
        orderId: orderId,
        order: order,
        loading: loading,
        error: error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        postOrderComment: (params) => dispatch(postComment(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);
