import React, { Component } from "react";
import { connect } from "react-redux";
import { showNotification, validateMobile } from "../Utils/CommonFunctions";
import TextInput from "../Utils/TextInput";
import ChangePassword from "./Components/ChangePassword";

import { getLoggedInUser, updateUser, AddAddress, UpdatePickAddress } from "./Duck/ProfileActions";

import AddressDetails from "../IndividualOrder/Components/AddressDetails";


class EditProfile extends Component {
    constructor(props) {
        super(props);

        let { profile } = this.props;

        this.state = {
            showChangePassModel: false,
            mobile_number: profile?.mobile_number,
            mobile_number_err: "",
            isLoading: false,
            pickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            pickupAddressError: {},
            newPickupAddress: {
                line1: "",
                line2: "",
                country: "",
                state: "",
                city: "",
                postcode: "",
            },
            newPickupAddressError: {},
            isLoadingAddress: false,
            isLoadingupdateAddress: false,
            isLoadingDefaultAddress : false,
            editAddress: false,
            addressCheck : true,
        };
    }

    componentDidUpdate(prevProps) {
        let { profile, loading, error, meta, } = this.props;
        let { isLoading, isLoadingAddress, isLoadingupdateAddress,isLoadingDefaultAddress } = this.state;

        if (prevProps.profile !== profile) {
            this.setDefault();
        }
        if (isLoading && prevProps?.loading && !loading) {
            let message = error?.meta?.message || error?.meta?.message || meta?.message;
            message && showNotification(error ? "error" : "success", message);
        }
        if (isLoadingAddress && prevProps?.loading && !loading) {
            let message = error?.meta?.message || error?.meta?.message || meta?.message;
            message && showNotification(error ? "error" : "success", message);
        }

        if (isLoadingupdateAddress && prevProps?.loading && !loading) {

            let message = error?.meta?.message || error?.meta?.message || meta?.message;
            message && showNotification(error ? "error" : "success", message);
        }

        if (isLoadingDefaultAddress && prevProps?.loading && !loading) {
            let message = error?.meta?.message || error?.meta?.message || meta?.message;
            message && showNotification(error ? "error" : "success", message);
        }
    }

    setDefault = () => {
        let { profile } = this.props;
        this.setState({
            isLoading: false,
            isLoadingAddress: false,
            isLoadingupdateAddress: false,
            isLoadingDefaultAddress : false,
            mobile_number: profile?.mobile_number,
            pickupAddress: {},
            newPickupAddress: {},
        });
    }

    handleChangePassModel = (show = false) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showChangePassModel: show,
        });
    };

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        if (name === "mobile_number") {
            value = value.replace(/[^0-9]/g, '');
        }
        this.setState({
            [name]: value,
            mobile_number_err: "",

        });
    }

    hasError = () => {
        let { mobile_number } = this.state;
        let isErrorHit = false;
        let mobile_number_err = "";

        if (mobile_number && !validateMobile(mobile_number)) {
            mobile_number_err = "Please enter valid mobile number";
            isErrorHit = true;
        }

        this.setState({
            mobile_number_err,

        });
        return isErrorHit;
    }

    saveProfile = () => {
        if (!this.hasError()) {
            let { profile, updateUserProfile } = this.props;
            let { mobile_number } = this.state;
            mobile_number = mobile_number.trim();

            this.setState({
                isLoading: true,
            });

            let userObj = {
                _id: profile?._id,
                mobile_number: mobile_number,
            }
              //DISPATCH ACTION
            updateUserProfile && updateUserProfile(userObj);
        }
    }

    //dataKey > name, isBoolean = false > event drilling
    handelAddressChange = (dataKey) => (name, isBoolean = false) => (event) => {
        let value = isBoolean ? event?.target?.checked : event?.target?.value ;
        let data = this.state[dataKey];
        data = {
            ...(data || {}),
            [name]: value
        };
        this.setState({
            [dataKey]: data,
            pickupAddressError: {},
            newPickupAddressError: {},
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
            if (!address.email) addressError.emailError = "Please select email address";
            if (!address.mobile_number) addressError.mobileError = "Please select mobile number";

        } else {
            addressError.line1Error = "Please enter address line 1";
            addressError.line2Error = "Please enter address line 2";
            addressError.countryError = "Please select country";
            addressError.stateError = "Please select state";
            addressError.cityError = "Please select city";
            addressError.postcodeError = "Please select postcode";
            addressError.emailError = "Please select email address";
            addressError.mobileError = "Please select mobile number";
        }

        return addressError;
    }

    hasErrorAddress = () => {
        let { pickupAddress } = this.state;
        let pickupAddressError = this.hasAddressError(pickupAddress);
        this.setState({
            pickupAddressError
        });
        return Object.keys(pickupAddressError).length > 0
    }

    handlePickupAddress = () => {
        let { addAddressProfile } = this.props;
        let { newPickupAddress } = this.state;

        let newPickupAddressError = this.hasAddressError(newPickupAddress);
        if(Object.keys(newPickupAddressError).length > 0) {
            this.setState({
                newPickupAddressError,
            });
        } else {
            this.setState({
                isLoadingAddress: true,
            });
            //DISPATCH ACTION
            addAddressProfile && addAddressProfile([newPickupAddress]);
        }
    }

    handleEditAddress = (value) => {
        if(value){
            this.setState({
                pickupAddress: value,
           });
        }
    }

    handleUpdatepAddress = (e) => {
        let { updatePickAddress } = this.props
        let { pickupAddress } = this.state;

        if (!this.hasErrorAddress()) {
            this.setState({
                isLoadingupdateAddress: true,
            });

            //DISPATCH ACTION req id asked by api res
            pickupAddress.address_id = pickupAddress._id;
            //DISPATCH ACTION
            updatePickAddress && updatePickAddress([pickupAddress]);
        }
    }

    handleDefaultAddress = (value) => {
       let { updatePickAddress } = this.props
        if(value){
            this.setState({
                isLoadingDefaultAddress: true,
                pickupAddress: value,
           }, () => {
            let { pickupAddress } = this.state;
            pickupAddress.address_id = pickupAddress._id
            pickupAddress.default_address = true
            //DISPATCH ACTION
            updatePickAddress && updatePickAddress([pickupAddress])
           });
        }

    }

    render() {
        let { profile } = this.props;
        let {
            showChangePassModel,
            mobile_number,
            mobile_number_err,
            isLoading,
            isLoadingAddress,
            isLoadingupdateAddress,
            isLoadingDefaultAddress,
            pickupAddress,
            pickupAddressError,
            newPickupAddress,
            newPickupAddressError
        } = this.state;
        let rolePermissions = profile?.role?._id?.permissions

        pickupAddress = { ...(pickupAddress || {}), ...(pickupAddressError || {}) };
        newPickupAddress = { ...(newPickupAddress || {}), ...(newPickupAddressError || {}) };

        let pickAddressArray = profile?.pickup_address;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Edit Profile
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Profile</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Edit Profile
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() =>
                                        this.handleChangePassModel(true)
                                    }
                                >
                                    <i className="fa fa-lock"></i> Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    <div className="d-flex pt-4 pb-5 profile_div align-items-center">
                                        <div className="mr-2 profile-icon">
                                            <i
                                                className="bx bx-user"
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div>
                                            <h4 className="mb-2">
                                                {profile?.first_name} {profile?.last_name || ""}
                                            </h4>
                                            <p className="mb-2">{profile?.role?._id?.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <TextInput
                                                    labelClassName={"text-capitalize"}
                                                    labelText={"Email Id"}
                                                    value={profile?.email}
                                                    disabled={true}
                                                />
                                            </div>


                                            <div className="col-lg-6">
                                                <TextInput
                                                    labelClassName={"text-capitalize"}
                                                    labelText={"Phone No"}
                                                    value={mobile_number}
                                                    onChange={this.handleChange("mobile_number")}
                                                    errorText={mobile_number_err}
                                                    disabled={isLoading}
                                                />
                                            </div>

                                            {
                                                rolePermissions?.core_api_key?.show &&
                                                profile?.core_api_key?.active &&
                                                profile?.core_api_key?.key &&
                                                <div className="col-lg-6">
                                                    <TextInput
                                                        labelClassName={"text-capitalize"}
                                                        labelText={"API Key"}
                                                        value={profile?.core_api_key?.key}
                                                        disabled
                                                    />
                                                </div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                {
                                                    profile?.department?.active && profile?.department?.name &&
                                                    <TextInput
                                                        labelClassName={"text-capitalize"}
                                                        labelText={"Department"}
                                                        placeholder={"Department"}
                                                        value={profile?.department?.name}
                                                        disabled={true}
                                                    />
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 text-right pb-5 pt-3">
                                                <div className="button-items">
                                                    <button
                                                        type="button"
                                                        className="btn  btn-primary"
                                                        onClick={this.saveProfile}
                                                        disabled={isLoading}
                                                    >
                                                        {
                                                            isLoading
                                                                ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm"></span>
                                                                        <span className="visually-hidden">  Saving Profile...</span>
                                                                    </>
                                                                )
                                                                : "Save Profile"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>
                { pickAddressArray && pickAddressArray.map((value, index) => {
                  let pickAddressId = value._id
                  let isDisabled = pickAddressId !== pickupAddress._id;
                 return <div className="row">
                            <div className="col-lg-12">
                                <div className={isDisabled ? "card disableAllField" : "card"}>
                                    <AddressDetails
                                        key={value.id}
                                        heading={`Pickup Address ${index + 1}`}
                                        details={pickAddressId === pickupAddress._id ? pickupAddress : value }
                                        handelChange={this.handelAddressChange('pickupAddress')}
                                        disabled={isDisabled}
                                        isRequired={true}
                                        readOnly={isDisabled}
                                        classvar = "editProfile"
                                        isAlreadyCheck={value.default_address}
                                        defaultAddress = {() => this.handleDefaultAddress(value)}
                                        loadingProp = {isLoadingDefaultAddress}
                                        moreInfo
                                    />
                                    <div className="card-body pt-0">
                                        <div className="w-100 text-right pr-3">
                                            <div className="button-items">
                                                {pickAddressId === pickupAddress._id ?
                                                <button
                                                    type="button"
                                                    className="btn  btn-primary"
                                                    onClick={() => this.handleUpdatepAddress(value)}
                                                    disabled={isLoadingupdateAddress || isLoadingDefaultAddress}
                                                >
                                                    {
                                                        isLoadingupdateAddress
                                                            ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm"></span>
                                                                    <span className="visually-hidden">  Updating Address...</span>
                                                                </>
                                                            )
                                                            : "Update Address"
                                                    }
                                                </button>
                                                    :
                                                <button
                                                    type="button"
                                                    className="btn  btn-primary"
                                                    onClick={() => this.handleEditAddress(value)}
                                                >Edit Address
                                                </button>
                                                 }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                   })}
                     {pickAddressArray && pickAddressArray.length >= 3 ?
                    ''
                    :
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <AddressDetails
                                    heading={"Pickup Address"}
                                    details={newPickupAddress}
                                    handelChange={this.handelAddressChange("newPickupAddress")}
                                    isRequired={true}
                                    moreInfo
                                />
                                <div className="card-body pt-0">
                                    <div className="w-100 text-right pr-3">
                                        <div className="button-items">
                                            <button
                                                type="button"
                                                className="btn  btn-primary"
                                                onClick={this.handlePickupAddress}
                                                disabled={isLoadingAddress}
                                            >
                                                {
                                                    isLoadingAddress
                                                        ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                                <span className="visually-hidden">  Adding Address...</span>
                                                            </>
                                                        )
                                                        : "Add Address"
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     }
                <ChangePassword
                    show={showChangePassModel}
                    handleClose={this.handleChangePassModel}
                />
            </>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let profile = state?.loggedInUser?.data?.data;
    let meta = state?.loggedInUser?.data?.meta;
    let loading = state?.loggedInUser?.loading;
    let error = state?.loggedInUser?.error;

    return {
        profile: profile,
        meta: meta,
        loading: loading,
        error: error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getLoggedInUser: (params) => dispatch(getLoggedInUser(params)),
        updateUserProfile: (params) => dispatch(updateUser(params)),
        addAddressProfile: (params) => dispatch(AddAddress(params)),
        updatePickAddress: (params) => dispatch(UpdatePickAddress(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
