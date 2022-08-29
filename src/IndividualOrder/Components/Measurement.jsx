import React from "react";
import TextInput from "../../Utils/TextInput";

const Measurement = ({
    heading = "Measurement",
    details,
    handelChange,
    disabled = false,
}) => {

    handelChange = disabled ? (name) => {} : handelChange;

    return (
        <div className="col-md-12">
            <h4 className="mb-0 card-title">{heading}</h4>
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
                                value={details?.length}
                                onChange={handelChange("length")}
                                errorText={details?.lengthError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Breadth (cm)"}
                                isRequired={true}
                                placeholder={"Enter Breadth (cm)"}
                                value={details?.breadth}
                                onChange={handelChange("breadth")}
                                errorText={details?.breadthError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Height (cm)"}
                                isRequired={true}
                                placeholder={"Enter Height (cm)"}
                                value={details?.height}
                                onChange={handelChange("height")}
                                errorText={details?.heightError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Weight Of Shipment(kg)"}
                                isRequired={true}
                                placeholder={"Enter Weight Of Shipment(kg)"}
                                value={details?.weight}
                                onChange={handelChange("weight")}
                                errorText={details?.weightError}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Measurement;
