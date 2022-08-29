import React, { Component } from "react";
import { connect } from "react-redux";
import { Accordion, Card } from "react-bootstrap";
import moment from "moment";
import { showNotification, validateEmail, validateMobile, validateNumber } from "../Utils/CommonFunctions";

import AddressDetails from "./Components/AddressDetails";
import OrderDetails from "./Components/OrderDetails";
import UserDetails from "./Components/UserDetails";
import ProductDetails from "./Components/ProductDetails";
import PricingTaxation from "./Components/PricingTaxation";
import Measurement from "./Components/Measurement";
import AdditionalInformation from "./Components/AdditionalInformation";
import OtherDetails from "./Components/OtherDetails";

import { createOrderRequest, updateOrderRequest } from "./Duck/IndividualOrderActions";
import { fetchOrderRequest } from "../Order/Duck/OrderActions";
import { AddAddress } from "../Profile/Duck/ProfileActions";
import BreadCrumb from "../Utils/BreadCrumb";
import BaseModal from '../Utils/BaseModal'
class IndividualOrderContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {

            order: {
                paymentMethod: "prepaid",
            },
            customer: {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                alternateMobile: "",
            },
            pickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            shippingAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            billingAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            reversePickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            rtoAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            product: {
                masterSku: "",
                name: "",
                price: "",
                quantity: "",
                tax: "",
                sellingPrice: "",
                length: "",
                breadth: "",
                height: "",
                weight: "",
            },
            pricingTaxation: {
                totalDiscount: "",
                shippingCharges: "",
                codCharges: "",
                giftWrapCharges: "",
            },
            additionalInformation: {
                sendNotification: false,
                hsnCode: "",
            },
            otherDetails: {
                resellerName: "",
                companyName: "",
                eWayBillNo: "",
                latitude: "",
                longitude: "",
            },
            isLoading: false,
            isOrderCreated: false,
            goToSelectCourierPartner: false,
            isBillingAndPickupAddressSame: false,
            isRtoAndPickupAddressSame: false,
            isReverseAddShippingAddressSame: false,
            customerError: {},
            pickupAddressError: {},
            shippingAddressError: {},
            billingAddressError: {},
            reversePickupAddressError: {},
            rtoAddressError: {},
            productError: {},
            pricingTaxationError: {},
            showResetModal: false,
            plan :"",
            pickupAddress: {},
            pickupAddressTrue : null,

        };

    }

    componentDidMount() {
        let { match, individualOrder, fetchOrder, loggedInUserAddress = [] } = this.props;
        let {pickupAddressTrue, pickupAddress} = this.state
        let { params } = match;
        let { orderId } = params;

        if (orderId) {
            if (!individualOrder) {
                fetchOrder && fetchOrder(orderId);
            } else {
                this.setDefaultOrder();
            }
        } else {
            let defaultPickupAddress = loggedInUserAddress.find(address => address?.default_address);
            this.setState({
                pickupAddress : defaultPickupAddress,
            });
        }

        // loggedInUserAddress.map((value) => {
        //     if(value.default_address){
        //         pickupAddress = value
        //         pickupAddressTrue = value.default_address
        //     }
        // })
        // if(pickupAddressTrue === true){
        //     this.setState({
        //         pickupAddress : pickupAddress
        //    })
        // }
    }

    componentDidUpdate(prevProps) {
        let {loading, individualOrder, error, history, orderId} = this.props;

        if (prevProps.individualOrder?.loading && !individualOrder?.loading) {
            if (individualOrder.error) {
                history?.replace("/app/shipmentList");
            } else {
                this.setDefaultOrder();
            }
        }

        if (prevProps.loading && !loading) {
            this.setState({
                isLoading: false,
                // goToSelectCourierPartner: error ? false : true,
            });

            if (!error) {
                if (!orderId) {
                    history?.replace(`/app/individualShipment/${individualOrder?._id}`)
                }

                history?.push(`/app/courierpartner/${individualOrder?._id}`);
            }
        }
    }

    handleResetModal = () => {
        this.setState({showResetModal: !this.state.showResetModal})
    }

    hasSameAddress = (address1 = {}, address2 = {}) => {
        if (!address1 || typeof address1 !== "object" || !address2 || typeof address2 !== "object") return false;
        if (!address1.line1 || address1.line1 !== address2.line1) return false;
        if (!address1.line2 || address1.line2 !== address2.line2) return false;
        if (!address1.country || address1.country !== address2.country) return false;
        if (!address1.state || address1.state !== address2.state) return false;
        if (!address1.state || address1.state !== address2.state) return false;
        if (!address1.postcode || address1.postcode !== address2.postcode) return false;

        return true;
    }

    setDefaultOrder = () => {
        let { individualOrder } = this.props;

        let order = {
            paymentMethod: "prepaid",
        };
        let customer = {};
        let pickupAddress = {};
        let shippingAddress = {};
        let billingAddress = {};
        let reversePickupAddress = {};
        let rtoAddress = {};
        let product = {};
        let pricingTaxation = {};
        let additionalInformation = {};
        let otherDetails = {};
        let isBillingAndPickupAddressSame = false;
        let isRtoAndPickupAddressSame = false;
        let isReverseAddShippingAddressSame = false;

        if (typeof individualOrder === "object") {
            let {
                order_id,
                created_at,
                channel,
                payment_method,
            } = individualOrder;
            created_at = moment(created_at).format("YYYY-MM-DD");

            order = {
                id: order_id,
                date: created_at,
                channel: channel,
                paymentMethod: payment_method,
            };

            let {
                first_name,
                last_name,
                email,
                mobile_number,
                alternate_number,
                pickup_address,
                shipping_address,
                billing_address,
                reverse_pickup_address,
                rto_address,
            } = individualOrder.customer_details || {};

            customer = {
                firstName: first_name,
                lastName: last_name,
                email: email,
                mobile: mobile_number,
                alternateMobile: alternate_number,
            }

            pickupAddress = pickup_address;
            shippingAddress = shipping_address;
            billingAddress = billing_address;
            reversePickupAddress = reverse_pickup_address;
            rtoAddress = rto_address;
            isBillingAndPickupAddressSame = this.hasSameAddress(billingAddress, pickupAddress);
            isReverseAddShippingAddressSame = this.hasSameAddress(reversePickupAddress, shippingAddress);
            isRtoAndPickupAddressSame = this.hasSameAddress(rtoAddress, pickupAddress);

            let {
                breadth,
                cod_charges,
                gift_wrap_charges,
                height,
                length,
                master_sku,
                product_name,
                product_price,
                quantity,
                selling_price,
                shipping_charges,
                tax,
                total_discount,
                weight,
            } = individualOrder.product_details || {};

            product = {
                masterSku: master_sku,
                name: product_name,
                price: product_price,
                quantity: quantity,
                tax: tax,
                sellingPrice: selling_price,

                length: length,
                breadth: breadth,
                height: height,
                weight: weight,
            };

            pricingTaxation = {
                codCharges: cod_charges,
                giftWrapCharges: gift_wrap_charges,
                shippingCharges: shipping_charges,
                totalDiscount: total_discount,
            };

            additionalInformation = individualOrder?.additional_information;
            otherDetails = individualOrder?.other_details;
        }

        this.setState({
            order,
            customer,
            pickupAddress,
            shippingAddress,
            billingAddress,
            reversePickupAddress,
            rtoAddress,
            product,
            pricingTaxation,
            additionalInformation,
            otherDetails,
            isBillingAndPickupAddressSame,
            isReverseAddShippingAddressSame,
            isRtoAndPickupAddressSame,
        });
    }

    handelChange = (dataKey) => (name) => (event) => {
        let value = event?.target?.value;
        if (
            name === "mobile" ||
            name === "alternateMobile" ||
            name === "postcode" ||
            name === "quantity"
        ) {
            value = value?.replace(/[^0-9]/g, '');
        } else if (
            name === "price" ||
            name === "quantity" ||
            name === "tax" ||
            name === "sellingPrice" ||
            name === "length" ||
            name === "breadth" ||
            name === "height" ||
            name === "weight" ||
            name === "totalDiscount" ||
            name === "shippingCharges" ||
            name === "codCharges" ||
            name === "giftWrapCharges"
        ) {
            value = value.replace(/[^0-9.]/g, '');
        }

        let data = this.state[dataKey];
        data = {
            ...(data || {}),
            [name]: value
        };

        this.setState({
            [dataKey]: data,
            customerError: {},
            pickupAddressError: {},
            shippingAddressError: {},
            billingAddressError: {},
            reversePickupAddressError: {},
            rtoAddressError: {},
            productError: {},
            pricingTaxationError: {},
        });
    };

    handleSameAddress = (name) => (event) => {
        this.setState({
            [name]: event?.target?.checked,
        })
    }

    hasAddressError = (address) => {
        let addressError = {};

        if (address && typeof address === "object") {
            if (!address.line1) addressError.line1Error = "Please enter address line 1";
            if (!address.line2) addressError.line2Error = "Please enter address line 2";
            if (!address.country) addressError.countryError = "Please select country";
            if (!address.state) addressError.stateError = "Please select state";
            if (!address.city) addressError.cityError = "Please select city";
            if (!address.postcode) addressError.postcodeError = "Please select postcode";

        } else {
            addressError.line1Error = "Please enter address line 1";
            addressError.line2Error = "Please enter address line 2";
            addressError.countryError = "Please select country";
            addressError.stateError = "Please select state";
            addressError.cityError = "Please select city";
            addressError.postcodeError = "Please select postcode";
        }

        return addressError;
    }

    hasError = () => {
        let {
            customer,
            pickupAddress,
            shippingAddress,
            billingAddress,
            reversePickupAddress,
            rtoAddress,
            product,
            pricingTaxation,
            isBillingAndPickupAddressSame,
            isReverseAddShippingAddressSame,
            isRtoAndPickupAddressSame,
        } = this.state;

        let isErrorHit = false;
        let customerError = {};
        let pickupAddressError = {};
        let shippingAddressError = {};
        let billingAddressError = {};
        let reversePickupAddressError = {};
        let rtoAddressError = {};
        let productError = {};
        let pricingTaxationError = {};

        if (customer) {
            if (!customer.firstName) customerError.firstNameError = "Please enter first name";
            if (!customer.lastName) customerError.lastNameError = "Please enter last name";
            if (!customer.email) {
                customerError.emailError = "Please enter email id";
            } else if (!validateEmail(customer.email)) {
                customerError.emailError = "Please enter a valid email id";
            }
            if (!customer.mobile) {
                customerError.mobileError = "Please enter mobile number";
            } else if (!validateMobile(customer.mobile)) {
                customerError.mobileError = "Please enter valid mobile number";
            }
        } else {
            customerError.firstNameError = "Please enter first name";
            customerError.lastNameError = "Please enter last name";
            customerError.emailError = "Please enter email";
            customerError.mobileError = "Please enter mobile number";
        }

        if (product) {
            if (!product.masterSku) productError.masterSkuError = "Please enter Master SKU";
            if (!product.name) productError.nameError = "Please enter Product Name";
            // if (!product.quantity) productError.quantityError = "Please enter Product Quantity";
            // if (!product.length) productError.lengthError = "Please enter Length (cm)";
            // if (!product.breadth) productError.breadthError = "Please enter Breadth (cm)";
            // if (!product.height) productError.heightError = "Please enter Height (cm)";
            // if (!product.weight) productError.weightError = "Please enter Weight Of Shipment(kg)";
            // if (!product.sellingPrice) productError.sellingPriceError = "Please enter Selling Price";

            if (!product?.quantity) {
                productError.quantityError = "Please enter Product Quantity";
            } else if (!validateNumber(product?.quantity)) {
                productError.quantityError = "Only numeric values are allowed. Product Quantity should be more than 0.";
            }

            if (!product?.length) {
                productError.lengthError = "Please enter Length (cm)";
            } else if (!validateNumber(product?.length)) {
                productError.lengthError = "Only numeric values are allowed. Length should be more than 0.";
            }

            if (!product?.breadth) {
                productError.breadthError = "Please enter Breadth (cm)";
            } else if (!validateNumber(product?.breadth)) {
                productError.breadthError = "Only numeric values are allowed. Breadth should be more than 0.";
            }

            if (!product?.height) {
                productError.heightError = "Please enter Height (cm)";
            } else if (!validateNumber(product?.height)) {
                productError.heightError = "Only numeric values are allowed. Height should be more than 0.";
            }

            if (!product?.weight) {
                productError.weightError = "Please enter Weight (cm)";
            } else if (!validateNumber(product?.weight)) {
                productError.weightError = "Only numeric values are allowed. Weight should be more than 0.";
            }

            if (!product?.sellingPrice) {
                productError.sellingPriceError = "Please enter Selling Price";
            } else if (!validateNumber(product?.sellingPrice)) {
                productError.sellingPriceError = "Only numeric values are allowed. Selling Price should be more than 0.";
            }

        } else {
            productError.masterSkuError = "Please enter Master SKU";
            productError.nameError = "Please enter Product Name";
            productError.quantityError = "Please enter Product Quantity";
            productError.lengthError = "Please enter Length (cm)";
            productError.breadthError = "Please enter Breadth (cm)";
            productError.heightError = "Please enter Height (cm)";
            productError.weightError = "Please enter Weight Of Shipment(kg)";
            productError.sellingPriceError = "Please enter Selling Price";
        }

        if (pricingTaxation) {
            if (pricingTaxation?.totalDiscount && !validateNumber(pricingTaxation?.totalDiscount)) {
                pricingTaxationError.totalDiscountError = "Only numeric values are allowed. Total Discount should be more than 0.";
            }

            if (pricingTaxation?.shippingCharges && !validateNumber(pricingTaxation?.shippingCharges)) {
                pricingTaxationError.shippingChargesError = "Only numeric values are allowed. Shipping Charges should be more than 0.";
            }

            if (pricingTaxation?.codCharges && !validateNumber(pricingTaxation?.codCharges)) {
                pricingTaxationError.codChargesError = "Only numeric values are allowed. COD Charges should be more than 0.";
            }

            if (pricingTaxation?.giftWrapCharges && !validateNumber(pricingTaxation?.giftWrapCharges)) {
                pricingTaxationError.giftWrapChargesError = "Only numeric values are allowed. Gift Wrap Charges should be more than 0.";
            }
        }

        pickupAddressError = this.hasAddressError(pickupAddress);
        if (!pickupAddress.email) {
            pickupAddressError.emailError = "Please enter email";
        } else if (!validateEmail(pickupAddress.email)) {
            pickupAddressError.emailError = "Please enter valid email";
        }

        if (!pickupAddress.mobile_number) {
            pickupAddressError.mobileError = "Please enter mobile number";
        } else if (!validateMobile(pickupAddress.mobile_number)) {
            pickupAddressError.mobileError = "Please enter a valid mobile number";
        }

        shippingAddressError = this.hasAddressError(shippingAddress);
        if (!isBillingAndPickupAddressSame) billingAddressError = this.hasAddressError(billingAddress);
        if (!isReverseAddShippingAddressSame) reversePickupAddressError = this.hasAddressError(reversePickupAddress);
        if (!isRtoAndPickupAddressSame) rtoAddressError = this.hasAddressError(rtoAddress);

        isErrorHit = !!(isErrorHit || Object.keys(customerError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(pickupAddressError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(shippingAddressError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(billingAddressError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(reversePickupAddressError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(rtoAddressError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(productError).length > 0);
        isErrorHit = !!(isErrorHit || Object.keys(pricingTaxationError).length > 0);

        this.setState({
            customerError,
            pickupAddressError,
            shippingAddressError,
            billingAddressError,
            reversePickupAddressError,
            rtoAddressError,
            productError,
            pricingTaxationError,
        })

        return isErrorHit;
    };

    onSelectCourierPartner = () => {
        this.setState({
            goToSelectCourierPartner: true,
        });
    }

    onSaveOrder = () => {
        let { loggedInUser, loggedInUserAddress = [] } = this.props;
        let {
            order,
            customer,
            pickupAddress,
            shippingAddress,
            billingAddress,
            reversePickupAddress,
            rtoAddress,
            product,
            pricingTaxation,
            additionalInformation,
            otherDetails,
            isBillingAndPickupAddressSame,
            isRtoAndPickupAddressSame,
            isReverseAddShippingAddressSame,
            pickupAddressTrue
        } = this.state;

        if (this.hasError()) {
            showNotification("error", "Please fill in all the required fields.");
        } else {
            this.setState({
                isLoading: true,
                goToSelectCourierPartner: true,
            });

            if (isBillingAndPickupAddressSame) {
                billingAddress = Object.assign({}, pickupAddress);

                delete billingAddress?.email;
                delete billingAddress?.mobile_number;
            }

            if (isRtoAndPickupAddressSame) {
                rtoAddress = Object.assign({}, pickupAddress);

                delete rtoAddress?.email;
                delete rtoAddress?.mobile_number;
            }

            if (isReverseAddShippingAddressSame) {
                reversePickupAddress = shippingAddress;
            }

            let orderObj = {
                payment_method: order?.paymentMethod,
                first_name: customer?.firstName,
                last_name: customer?.lastName,
                email: customer?.email,
                mobile_number: customer?.mobile,
                alternate_number: customer?.alternateMobile,
                pickup_address: pickupAddress,
                shipping_address: shippingAddress,
                billing_address: billingAddress,
                reverse_pickup_address: reversePickupAddress,
                rto_address: rtoAddress,
                master_sku: product?.masterSku,
                product_name: product?.name,
                product_price: product?.price,
                quantity: product?.quantity,
                tax: product?.tax,
                selling_price: product?.sellingPrice,
                shipping_charges: pricingTaxation?.shippingCharges,
                cod_charges: pricingTaxation?.codCharges,
                gift_wrap_charges: pricingTaxation?.giftWrapCharges,
                total_discount: pricingTaxation?.totalDiscount,
                length: product?.length,
                breadth: product?.breadth,
                height: product?.height,
                weight: product?.weight,
                additional_information: additionalInformation,
                other_details: otherDetails,
                plan: loggedInUser
            };

            if (this.props.orderId) {
                orderObj._id = this.props.orderId;
                this.props.updateOrder(orderObj);
            } else {
                if(!loggedInUserAddress || loggedInUserAddress?.length === 0) {
                    this.props.addAddressProfile([pickupAddress]);
                }
                this.props.createOrder(orderObj);
            }
        }
    };

    onReset = () => {
        this.setState({
            order: {
                paymentMethod: "prepaid",
            },
            customer: {
                firstName: "",
                lastName: "",
                email: "",
                mobile: "",
                alternateMobile: "",
            },
            pickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
                email: "",
                mobile: "",
            },
            shippingAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            billingAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            reversePickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            rtoAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            product: {
                masterSku: "",
                name: "",
                price: "",
                quantity: "",
                tax: "",
                sellingPrice: "",
                length: "",
                breadth: "",
                height: "",
                weight: "",
            },
            pricingTaxation: {
                totalDiscount: "",
                shippingCharges: "",
                codCharges: "",
                giftWrapCharges: "",
            },
            additionalInformation: {
                sendNotification: false,
                comment: "",
                hsnCode: "",
            },
            otherDetails: {
                resellerName: "",
                companyName: "",
                eWayBillNo: "",
                latitude: "",
                longitude: "",
            },
            customerError: {},
            pickupAddressError: {},
            shippingAddressError: {},
            billingAddressError: {},
            reversePickupAddressError: {},
            rtoAddressError: {},
            productError: {},
            pricingTaxationError: {},
            showResetModal: false,
            isBillingAndPickupAddressSame: false,
            isReverseAddShippingAddressSame: false,
            isRtoAndPickupAddressSame: false,
        });
    };

    onGoBack = () => {
        this.props.history.goBack();
    }

    renderFooter = () => {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => this.handleResetModal()}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onReset}
                >
                    Yes
                </button>
            </>
        );
    };

    render() {
        let {
            order,
            customer,
            pickupAddress,
            shippingAddress,
            billingAddress,
            reversePickupAddress,
            rtoAddress,
            product,
            pricingTaxation,
            additionalInformation,
            otherDetails,
            isOrderCreated,
            goToSelectCourierPartner,
            isBillingAndPickupAddressSame,
            isRtoAndPickupAddressSame,
            isReverseAddShippingAddressSame,
            customerError,
            pickupAddressError,
            shippingAddressError,
            billingAddressError,
            reversePickupAddressError,
            rtoAddressError,
            productError,
            pricingTaxationError,
            isLoading,
            pickupAddressTrue,
        } = this.state;
        let { individualOrder, orderId, planOrder, loggedInUser } = this.props;

        if (isBillingAndPickupAddressSame) {
            billingAddress = pickupAddress;
        }

        if (isRtoAndPickupAddressSame) {
            rtoAddress = pickupAddress;
        }

        if (isReverseAddShippingAddressSame) {
            reversePickupAddress = shippingAddress;
        }

        customer = {...(customer || {}), ...(customerError || {})};
        pickupAddress = {...(pickupAddress || {}), ...(pickupAddressError || {})};
        shippingAddress = {...(shippingAddress || {}), ...(shippingAddressError || {})};
        if (!isBillingAndPickupAddressSame) billingAddress = {...(billingAddress || {}), ...(billingAddressError || {})};
        if (!isReverseAddShippingAddressSame) reversePickupAddress = {...(reversePickupAddress || {}), ...(reversePickupAddressError || {})};
        if (!isRtoAndPickupAddressSame) rtoAddress = {...(rtoAddress || {}), ...(rtoAddressError || {})};
        product = {...(product || {}), ...(productError || {})};
        pricingTaxation = {...(pricingTaxation || {}), ...(pricingTaxationError || {})};

        let isDisabled = isLoading || !!individualOrder?.transaction_id;
        let isReadOnly = !!individualOrder?.transaction_id;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Individual Shipment
                                    </h2>
                                    <BreadCrumb
                                        title = {['Shipment', 'Individual Shipment']}
                                    />
                                </div>
                            </div>

                            {
                                orderId &&
                                <div className="page-title-right">
                                    <button
                                        type="button"
                                        className="btn btn-primary my-2 btn-icon-text"
                                        onClick={this.onGoBack}
                                    >
                                        <i className="fa fa-arrow-circle-left"></i>{" "}
                                        Back
                                    </button>
                                </div>
                            }

                        </div>
                    </div>
                </div>

                {
                    individualOrder?.loading ? (
                        <div className="d-flex align-items-center justify-content-center m-5">
                            <samp className="spinner-border mr-2" role="status"></samp>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (

                        <div className={isDisabled ? "row disableAllField" : "row"}>
                            <div className="col-lg-12">
                                <Accordion defaultActiveKey="0">
                                    <OrderDetails
                                        order={order}
                                        handelChange={this.handelChange("order")}
                                        eventKey="0"
                                        disabled={isDisabled}
                                        readOnly={isReadOnly}
                                    />
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <UserDetails
                                        heading={"Customer Details"}
                                        details={customer}
                                        handelChange={this.handelChange("customer")}
                                        eventKey="0"
                                        disabled={isDisabled}
                                    />
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <div className="card">
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                                <span>Address Details</span>
                                                <i className="fa fa-chevron-down"></i>
                                            </h4>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <>
                                                <AddressDetails
                                                    heading={"Pickup Address"}
                                                    details={pickupAddress}
                                                    handelChange={this.handelChange(
                                                        "pickupAddress"
                                                    )}
                                                    disabled={isDisabled}
                                                    readOnly={isReadOnly}
                                                    isRequired={true}
                                                    moreInfo
                                                />
                                                <AddressDetails
                                                    heading={"Shipping Address"}
                                                    details={shippingAddress}
                                                    handelChange={this.handelChange(
                                                        "shippingAddress"
                                                    )}
                                                    disabled={isDisabled}
                                                    readOnly={isReadOnly}
                                                    isRequired={true}

                                                />

                                                <AddressDetails
                                                    heading={"Billing Address"}
                                                    details={billingAddress}
                                                    handelChange={this.handelChange(
                                                        "billingAddress"
                                                    )}
                                                    isAddressSame={isBillingAndPickupAddressSame}
                                                    sameAddressHandle={this.handleSameAddress("isBillingAndPickupAddressSame")}
                                                    sameAddressText={"Same as Pick Up address"}
                                                    disabled={isDisabled}
                                                    readOnly={isReadOnly}
                                                    isRequired={true}

                                                />

                                                <AddressDetails
                                                    heading={"Reverse Pickup Address"}
                                                    details={reversePickupAddress}
                                                    handelChange={this.handelChange(
                                                        "reversePickupAddress"
                                                    )}
                                                    isAddressSame={isReverseAddShippingAddressSame}
                                                    sameAddressHandle={this.handleSameAddress("isReverseAddShippingAddressSame")}
                                                    sameAddressText={"Same as Shipping address"}
                                                    disabled={isDisabled}
                                                    readOnly={isReadOnly}
                                                    isRequired={true}

                                                />

                                                <AddressDetails
                                                    heading={"RTO Address"}
                                                    details={rtoAddress}
                                                    handelChange={this.handelChange("rtoAddress")}
                                                    isAddressSame={isRtoAndPickupAddressSame}
                                                    sameAddressHandle={this.handleSameAddress("isRtoAndPickupAddressSame")}
                                                    sameAddressText={"Same as Pick Up address"}
                                                    disabled={isDisabled}
                                                    readOnly={isReadOnly}
                                                    isRequired={true}

                                                />
                                            </>
                                        </Accordion.Collapse>
                                    </div>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <div className="card">
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
                                            <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                                <span>Product Details</span>
                                                <i className="fa fa-chevron-down"></i>
                                            </h4>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="0">
                                            <>
                                                <ProductDetails
                                                    details={product}
                                                    handelChange={this.handelChange(
                                                        "product"
                                                    )}
                                                    disabled={isDisabled}
                                                />

                                                <Measurement
                                                    heading={"Measurements"}
                                                    details={product}
                                                    handelChange={this.handelChange(
                                                        "product"
                                                    )}
                                                    disabled={isDisabled}
                                                />
                                            </>
                                        </Accordion.Collapse>
                                    </div>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <PricingTaxation
                                        heading={"Pricing & Taxation"}
                                        details={pricingTaxation}
                                        handelChange={this.handelChange(
                                            "pricingTaxation"
                                        )}
                                        disabled={isDisabled}
                                    />
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <AdditionalInformation
                                        heading={"Additional Information (Optional)"}
                                        details={additionalInformation}
                                        handelChange={this.handelChange(
                                            "additionalInformation"
                                        )}
                                        disabled={isDisabled}
                                        readOnly={isReadOnly}
                                    />
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <OtherDetails
                                        heading={"Other Details (Optional)"}
                                        details={otherDetails}
                                        handelChange={this.handelChange("otherDetails")}
                                        disabled={isDisabled}
                                    />
                                </Accordion>
                            </div>

                            <BaseModal
                                show={this.state.showResetModal}
                                handleClose={this.handleResetModal}
                                title={'Confirm'}
                                footerComponent={this.renderFooter}
                            >
                                This will remove all your input data. Are you sure to reset?
                            </BaseModal>

                            <div className="col-xl-12 text-right my-55">
                                <div className="button-items">
                                    {
                                        // orderId && individualOrder && !individualOrder?.transaction_id &&
                                        // <button
                                        //     type="button"
                                        //     className="btn  btn-primary"
                                        //     onClick={this.onSelectCourierPartner}
                                        // >
                                        //     {
                                        //         isLoading
                                        //         ? (
                                        //             <>
                                        //                 <span className="spinner-border spinner-border-sm"></span>
                                        //                 <span className="visually-hidden">  Saving order...</span>
                                        //             </>
                                        //         ) : "Select Courier Partner"
                                        //     }
                                        // </button>
                                    }

                                    {
                                        !individualOrder?.transaction_id &&
                                        <button
                                            type="button"
                                            className="btn  btn-primary"
                                            onClick={this.onSaveOrder}
                                            disabled={isLoading}
                                        >
                                            {
                                                isLoading
                                                ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                        <span className="visually-hidden">  Saving order...</span>
                                                    </>
                                                ) : "Save Order"
                                            }
                                        </button>
                                    }

                                    {
                                        !orderId &&
                                        <button
                                            type="button"
                                            className="btn btn-white"
                                            onClick={this.handleResetModal}
                                        >
                                            Reset
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let { params } = match;
    let { orderId } = params;

    let orders = state?.order?.orders || {};

    let order = orderId && orders[orderId];
    order = order || state?.individualOrder?.data
    return {
        orderId: orderId,
        orders: orders,
        individualOrder: order,
        loading: state?.individualOrder?.loading,
        error: state?.individualOrder?.error,
        planOrder : state?.plan?.planOrder,
        loggedInUser : state.loggedInUser?.data?.data.plan,
        loggedInUserAddress : state.loggedInUser?.data?.data.pickup_address
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: (params) => dispatch(createOrderRequest(params)),
        updateOrder: (params) => dispatch(updateOrderRequest(params)),
        fetchOrder: (id) => dispatch(fetchOrderRequest(id)),
        addAddressProfile: (params) => dispatch(AddAddress(params)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndividualOrderContainer);
