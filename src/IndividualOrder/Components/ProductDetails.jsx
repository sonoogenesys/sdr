import React from "react";
import TextInput from "../../Utils/TextInput";

const ProductDetails = ({
    details,
    handelChange = (name) => {},
    disabled = false
}) => {

    handelChange = disabled ? (name) => {} : handelChange;

    return (
        <div className="col-md-12">
            <div className="card-body">
                <form className="needs-validation" noValidate>
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Master SKU"}
                                isRequired={true}
                                value={details?.masterSku}
                                onChange={handelChange("masterSku")}
                                errorText={details?.masterSkuError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Product Name"}
                                isRequired={true}
                                value={details?.name}
                                onChange={handelChange("name")}
                                errorText={details?.nameError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Product Price"}
                                value={details?.price}
                                onChange={handelChange("price")}
                                errorText={details?.priceError}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Product Quantity"}
                                isRequired={true}
                                value={details?.quantity}
                                onChange={handelChange("quantity")}
                                errorText={details?.quantityError}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Tax %"}
                                value={details?.tax}
                                onChange={handelChange("tax")}
                                disabled={disabled}
                            />
                        </div>
                        <div className="col-md-4">
                            <TextInput
                                containerClassName={"form-group position-relative"}
                                labelClassName={"order_label"}
                                labelText={"Selling Price"}
                                isRequired={true}
                                value={details?.sellingPrice}
                                onChange={handelChange("sellingPrice")}
                                errorText={details?.sellingPriceError}
                                disabled={disabled}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductDetails;
