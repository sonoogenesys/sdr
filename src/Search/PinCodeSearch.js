import React, { Component } from "react";
import { connect } from "react-redux";
import { validateNumber } from "../Utils/CommonFunctions";
import TextInput from "../Utils/TextInput";
import { searchPartnerRequest } from "./Duck/SearchActions";
import { getLoggedInUser } from "../Profile/Duck/ProfileActions";

class PinCodeSearch extends Component {
    constructor(props) {
        super(props);
        let data = props?.data;

        this.state = {
            paymentMethod: data?.payment_method || "prepaid",
            pickupPinCode: data?.source || "",
            shippingPinCode: data?.destination || "",
            sellingPrice: data?.selling_price || "",
            length: data?.length || "",
            breadth: data?.breadth || "",
            height: data?.height || "",
            weight: data?.weight || "",
            pickupPinCodeErr: "",
            shippingPinCodeErr: "",
            lengthErr: "",
            breadthErr: "",
            heightErr: "",
            weightErr: "",
            isLoading: false,
            plan :"",
        };
    }

    componentDidUpdate(preProps) {
        let { loading, error} = this.props;

        if (this.state.isLoading && preProps.loading && !loading) {
            this.setState({
                isLoading: false,
            });

         
            !error && this.props.history.push("/app/searchCourierPartnerList");
        }
    }

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        if (name !== "paymentMethod") {
            if (
                name === "pickupPinCode" ||
                name === "shippingPinCode"
            ) {
                value = value.replace(/[^0-9]/g, '');
            } else if (
                name === "sellingPrice" ||

                name === "length" ||
                name === "breadth" ||
                name === "height" ||
                name === "weight"
            ) {
                value = value.replace(/[^0-9.]/g, '');
            }
        }

        this.setState({
            [name]: value,
            pickupPinCodeErr: "",
            shippingPinCodeErr: "",
            lengthErr: "",
            breadthErr: "",
            heightErr: "",
            weightErr: "",
            sellingPriceErr: "",
        });
    };

    hasError = () => {
        let {
            paymentMethod,
            pickupPinCode,
            shippingPinCode,
            sellingPrice,
            length,
            breadth,
            height,
            weight,
        } = this.state;

        let isErrorHit = false;
        let pickupPinCodeErr = "";
        let shippingPinCodeErr = "";
        let sellingPriceErr = "";
        let lengthErr = "";
        let breadthErr = "";
        let heightErr = "";
        let weightErr = "";

        if (!pickupPinCode) {
            pickupPinCodeErr = "Please enter pickup pin code";
            isErrorHit = true;
        }
        if (!shippingPinCode) {
            shippingPinCodeErr = "Please enter shipping pin code";
            isErrorHit = true;
        }
        if (paymentMethod === "cod") {
            if (!sellingPrice) {
                sellingPriceErr = "Please enter Selling Price";
                isErrorHit = true;
            } else if (!validateNumber(sellingPrice)) {
                sellingPriceErr = "Only numeric values are allowed. Selling Price should be more than 0.";
                isErrorHit = true;
            }
        }
        if (!length) {
            lengthErr = "Please enter Length (cm)";
            isErrorHit = true;
        } else if (!validateNumber(length)) {
            lengthErr = "Only numeric values are allowed. Length should be more than 0.";
            isErrorHit = true;
        }

        if (!breadth) {
            breadthErr = "Please enter Breadth (cm)";
            isErrorHit = true;
        } else if (!validateNumber(breadth)) {
            breadthErr = "Only numeric values are allowed. Breadth should be more than 0.";
            isErrorHit = true;
        }

        if (!height) {
            heightErr = "Please enter Height (cm)";
            isErrorHit = true;
        } else if (!validateNumber(height)) {
            heightErr = "Only numeric values are allowed. Length should be more than 0.";
            isErrorHit = true;
        }

        if (!weight) {
            weightErr = "Please enter Weight Of Shipment(kg)";
            isErrorHit = true;
        } else if (!validateNumber(weight)) {
            weightErr = "Only numeric values are allowed. Weight should be more than 0.";
            isErrorHit = true;
        }

        this.setState({
            pickupPinCodeErr,
            shippingPinCodeErr,
            sellingPriceErr,
            lengthErr,
            breadthErr,
            heightErr,
            weightErr,
        });

        return isErrorHit;
    };

    onSearch = () => {
        let { searchPartner, loggedInUser } = this.props;
        let {
            paymentMethod,
            pickupPinCode,
            shippingPinCode,
            sellingPrice,
            length,
            breadth,
            height,
            weight,
        } = this.state;

        if (!this.hasError()) {
            this.setState({ isLoading: true });

            let searchObj = {
                payment_method: paymentMethod,
                source: Number(pickupPinCode),
                destination: Number(shippingPinCode),
                length: Number(length),
                breadth: Number(breadth),
                height: Number(height),
                weight: Number(weight),
                plan : loggedInUser
            };
   
            if (paymentMethod === "cod") searchObj.selling_price = sellingPrice || 0;

            searchPartner && searchPartner(searchObj);
        }
       
    }

    render() {
        let {
            paymentMethod,
            pickupPinCode,
            shippingPinCode,
            sellingPrice,
            length,
            breadth,
            height,
            weight,
            pickupPinCodeErr,
            shippingPinCodeErr,
            sellingPriceErr,
            lengthErr,
            breadthErr,
            heightErr,
            weightErr,
            isLoading,
        } = this.state;

        let {
            loggedInUser,
        } = this.props

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Pin Code Search
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Pin Code
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">Pin Code Search</a>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"row"}>
                    <div className="col-lg-12">

                        <div className="card">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <form className="needs-validation" noValidate>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div
                                                    className="form-group"
                                                    onChange={this.handleChange("paymentMethod")}

                                                >
                                                    <label className="d-block mb-3 order_label">
                                                        Payment Method <span>*</span>
                                                    </label>
                                                    <div className="custom-control custom-radio custom-control-inline">
                                                        <input
                                                            type="radio"
                                                            id="customRadioInline1"
                                                            name="outer-group[0][customRadioInline1]"
                                                            className="custom-control-input"
                                                            value={"cod"}
                                                            checked={paymentMethod === "cod"}
                                                            disabled={isLoading}
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
                                                            checked={paymentMethod === "prepaid"}
                                                            disabled={isLoading}
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="customRadioInline2"
                                                        >
                                                            Prepaid
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="col-md-12">
                                <div className="card-body">
                                    <form className="needs-validation" noValidate>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Pickup Pin Code"}
                                                    isRequired={true}
                                                    value={pickupPinCode}
                                                    onChange={this.handleChange("pickupPinCode")}
                                                    errorText={pickupPinCodeErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Shipping Pin Code"}
                                                    isRequired={true}
                                                    value={shippingPinCode}
                                                    onChange={this.handleChange("shippingPinCode")}
                                                    errorText={shippingPinCodeErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="col-md-12">
                                <h4 className="mb-0 card-title">Product Details</h4>
                                <div className="card-body">
                                    <form className="needs-validation" noValidate>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Length (cm)"}
                                                    isRequired={true}
                                                    placeholder={"Enter Length (cm)"}
                                                    value={length}
                                                    onChange={this.handleChange("length")}
                                                    errorText={lengthErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Breadth (cm)"}
                                                    isRequired={true}
                                                    placeholder={"Enter Breadth (cm)"}
                                                    value={breadth}
                                                    onChange={this.handleChange("breadth")}
                                                    errorText={breadthErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Height (cm)"}
                                                    isRequired={true}
                                                    placeholder={"Enter Height (cm)"}
                                                    value={height}
                                                    onChange={this.handleChange("height")}
                                                    errorText={heightErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <TextInput
                                                    containerClassName={"form-group position-relative"}
                                                    labelClassName={"order_label"}
                                                    labelText={"Weight Of Shipment(kg)"}
                                                    isRequired={true}
                                                    placeholder={"Enter Weight Of Shipment(kg)"}
                                                    value={weight}
                                                    onChange={this.handleChange("weight")}
                                                    errorText={weightErr}
                                                    disabled={isLoading}
                                                />
                                            </div>
                                            {
                                                paymentMethod === "cod" &&
                                                <div className="col-md-4">
                                                    <TextInput
                                                        containerClassName={"form-group position-relative"}
                                                        labelClassName={"order_label"}
                                                        labelText={"Selling Price"}
                                                        isRequired={true}
                                                        value={sellingPrice}
                                                        onChange={this.handleChange("sellingPrice")}
                                                        errorText={sellingPriceErr}
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            }
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-12 text-right my-55">
                        <div className="button-items">

                            <button
                                type="button"
                                className="btn  btn-primary"
                                onClick={this.onSearch}
                                disabled={isLoading}
                            >
                                {
                                    isLoading
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            <span className="visually-hidden">  Searching...</span>
                                        </>
                                    ) : "Search"
                                }
                            </button>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let search = state.search;
    let data = search?.data;
    let loading = search?.loading;
    let error = search?.error;
    console.log(state)
    return {
        data: data,
        loading: loading,
        error: error,
        loggedInUser : state.loggedInUser?.data?.data.plan,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchPartner: (params) => dispatch(searchPartnerRequest(params)),
        getLoggedInUser: (params) => dispatch(getLoggedInUser(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinCodeSearch);
