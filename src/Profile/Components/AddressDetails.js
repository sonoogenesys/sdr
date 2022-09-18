import React from "react";
import TextInput from "../../Utils/TextInput";

const AddressDetails = ({
    heading = "Address Details",
    details,
    handelChange,
    isAddressSame,
    sameAddressHandle,
    sameAddressText,
    disabled = false,
    readOnly = false,
    isRequired = false,
    isAlreadyCheck,
    defaultAddress,
    loadingProp,
    moreInfo
}) => {
    disabled = disabled || isAddressSame;
    handelChange = disabled ? (name) => {} : handelChange;

    return (
        <>
            <div className="col-md-12">
                <h4 className="card-title">
                  <div className="d-flex align-items-center justify-content-between">
                    <label>
                        {heading} 
                        </label>
                        { isAlreadyCheck === true &&
                            <span className="pl-2 font-size-13">
                                (Default Address) 
                            </span>
                        }
                        { isAlreadyCheck === false &&
                        <>
                            <button type="button" className="btn  btn-primary" onClick={defaultAddress}
                            disabled={loadingProp}
                            >
                            {
                                loadingProp
                                    ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm"></span>
                                            <span className="visually-hidden">  Updating Default Address...</span>
                                        </>
                                    )
                                    : "Set Default Address"
                            } 
                            </button>
                        </>
                        }
                  </div>
                    {
                        !readOnly && sameAddressHandle &&
                            <div className="d-flex mt-2 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    required=""
                                    checked={isAddressSame}
                                    onChange={sameAddressHandle}
                                />
                                <label className="order_label font-size-13 mt-1">
                                    ({sameAddressText})
                                </label>
                            </div>
                    }
                </h4>
                <div className="card-body">
                    <form className="needs-validation" noValidate>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Address 1"}
                                    isRequired={isRequired}
                                    placeholder={"Enter address 1"}
                                    value={details?.line1}
                                    onChange={handelChange("line1")}
                                    errorText={details?.line1Error}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Address 2"}
                                    isRequired={isRequired}
                                    placeholder={"Enter address 2"}
                                    value={details?.line2}
                                    onChange={handelChange("line2")}
                                    errorText={details?.line2Error}
                                    disabled={disabled}
                                />
                            </div>
                            <div className="col-md-4">
                                <div className="form-group position-relative">
                                    <label className="order_label">
                                        Country {!disabled && isRequired && <span>*</span>}
                                    </label>
                                  
                                    {
                                        !readOnly &&
                                            <select
                                                className={`form-control ${!!details?.countryError && "is-invalid"}`}
                                                value={details?.country || ""}
                                                onChange={handelChange("country")}
                                                disabled={disabled}
                                            >
                                               <option>Select</option>
                                               <option>India</option>
                                            </select>
                                    } 
                                    {
                                        readOnly &&
                                        <p>{details?.country}</p>
                                    }

                                    {
                                        !!details?.countryError &&
                                        <div className="invalid-feedback">{details?.countryError}</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"State"}
                                    isRequired={isRequired}
                                    placeholder={"Enter state"}
                                    value={details?.state}
                                    onChange={handelChange("state")}
                                    errorText={details?.stateError && "Please enter state"}
                                    disabled={disabled}
                                />
                                {/* <div className="form-group position-relative">
                                    <label className="order_label">
                                        State {isRequired && <span>*</span>}
                                    </label>
                                    {
                                        !readOnly &&
                                            <select
                                                className={`form-control ${!!details?.stateError && "is-invalid"}`}
                                                value={details?.state}
                                                onChange={handelChange("state")}
                                                disabled={disabled}
                                            >
                                                <option>Select</option>
                                                <option>Delhi</option>
                                            </select>
                                    }
                                    {
                                        readOnly && <p>{details?.state}</p>
                                    }

                                    {
                                        !!details?.stateError &&
                                        <div className="invalid-feedback">{details?.stateError}</div>
                                    }
                                </div> */}
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"City"}
                                    isRequired={isRequired}
                                    placeholder={"Enter city"}
                                    value={details?.city}
                                    onChange={handelChange("city")}
                                    errorText={details?.stateError && "Please enter city"}
                                    disabled={disabled}
                                />
                                {/* <div className="form-group position-relative">
                                    <label className="order_label">
                                        City {isRequired && <span>*</span>}
                                    </label>
                                    {
                                        !readOnly &&
                                            <select
                                                className={`form-control ${!!details?.cityError && "is-invalid"}`}
                                                value={details?.city}
                                                onChange={handelChange("city")}
                                                disabled={disabled}
                                            >
                                                <option>Select</option>
                                                <option>New Delhi</option>
                                            </select>
                                    }
                                    {
                                        readOnly && <p>{details?.city}</p>
                                    }

                                    {
                                        !!details?.cityError &&
                                        <div className="invalid-feedback">{details?.cityError}</div>
                                    }
                                </div> */}
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    containerClassName={"form-group position-relative"}
                                    labelClassName={"order_label"}
                                    labelText={"Postcode"}
                                    isRequired={isRequired}
                                    placeholder={"Enter postcode"}
                                    value={details?.postcode}
                                    onChange={handelChange("postcode")}
                                    errorText={details?.postcodeError}
                                    disabled={disabled}
                                />
                            </div>
                        </div>

                        {
                            moreInfo &&
                            <div className="row">
                                <div className="col-md-4">
                                    <TextInput
                                        containerClassName={"form-group position-relative"}
                                        labelClassName={"order_label"}
                                        labelText={"Email Id"}
                                        placeholder={"Enter email id"}
                                        value={details?.email}
                                        onChange={handelChange("email")}
                                        errorText={details?.emailError}
                                        disabled={disabled}
                                        isRequired={true}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <TextInput
                                        containerClassName={"form-group position-relative"}
                                        labelClassName={"order_label"}
                                        labelText={"Mobile Number"}
                                        isRequired={true}
                                        placeholder={"Enter mobile number"}
                                        value={details?.mobile_number}
                                        onChange={handelChange("mobile_number")}
                                        errorText={details?.mobileError}
                                        disabled={disabled}
                                    />
                                </div>
                            </div>
                        }

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressDetails;
