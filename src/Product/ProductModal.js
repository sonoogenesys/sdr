import React, { Component } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import {
    createProductRequest,
    updateProductRequest
} from "./Duck/ProductsActions";

class ProductModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            // description: "",
            hsn: "",
            uom: "",
            rate: "",
            file: "",
            image: "",
            isLoading: false
        };
    }

    componentDidMount() {
        let { product } = this.props;
        if (!!product) {
            this.setProductDetails();
        }
    }

    componentDidUpdate(preProps) {
        let { product, productId } = this.props;

        if (!!product && preProps?.productId !== productId) {
            this.setProductDetails();
        }

        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            if (!this.props.error) {
                this.onClickClose();
            }
        }
    }

    setProductDetails = () => {
        const { product, productId } = this.props;
        let currentProduct = product[productId]
        this.setState({
            name: currentProduct?.name || "",
            // description: currentProduct?.description || "",
            hsn: currentProduct?.hsn || "",
            uom: currentProduct?.uom || "",
            rate: currentProduct?.rate || "",
            image: currentProduct?.image || "",
        });
    };


    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            name: "",
            // description: "",
            hsn: "",
            uom: "",
            rate: "",
            file: "",
            image: "",
            isLoading: false
        });

        typeof handelModal === "function" && handelModal();
    };

    onClickSave = () => {
        let { productId, createProduct, updateProduct } = this.props;

        let {
            name,
            description,
            hsn,
            uom,
            rate,
            file,
            isLoading
        } = this.state;

            this.setState({
                isLoading: true,
            });

            name = name?.trim();
            description = description?.trim();
            hsn = hsn?.trim();
            uom = uom?.trim();
            rate = rate;
            let params;
            if(file){
                params = new FormData();
                params.set("files", file);
                params.set("name", name);
                // params.set("description", description);
                params.set("hsn", hsn);
                params.set("uom", uom);
                params.set("rate", rate);
                if(productId){
                    params._id =  productId
                }

            } else {
                params =
                    {
                    _id: productId,
                    name,
                    description,
                    hsn: hsn,
                        uom, rate
                };
            }


            if (!productId) {
                createProduct(params);
                this.onClickClose();
                // fetchClient();
            } else {
                updateProduct(params);
                this.onClickClose();
                // fetchClient()
            }
        this.setState({
            isLoading: false,
        });
    };

    renderFooter = () => {
        let { productId } = this.props;
        let { isLoading } = this.state;

        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.onClickClose}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClickSave}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span className="visually-hidden"> Saving...</span>
                        </>
                    ) : !productId ? (
                        "Add Product"
                    ) : (
                        "Save changes"
                    )}
                </button>
            </>
        );
    };

    handelChange = (name) => (event) => {
        let value = event.target.value
        this.setState({
            [name]: value,
        });
    };

    onChange = (event) => {
        let file = this.refs.file.files[0];
        let reader = new FileReader();
        let url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                image: [reader.result],
                file: event?.target?.files?.[0]
            })
        }.bind(this);
        console.log(url) // Would see a path?
    }

    render() {
        let {
            show,
            productId
        } = this.props;

        let {
            name,
            description,
            hsn,
            uom,
            rate,
            image
        } = this.state;
        let title = !productId ? "Add New Product" : "Edit Product";

        return (
            <BaseModal
                show={show}
                handleClose={this.onClickClose}
                title={title}
                footerComponent={this.renderFooter}
            >
                <form>
                    <div className="row">
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"name"}
                                value={name}
                                onChange={this.handelChange("name")}
                            />
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"hSN/SAC"}
                                value={hsn}
                                onChange={this.handelChange("hsn")}
                            />
                        </div>
                    </div>
                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-12 col-12 col-md-12">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Description"}*/}
                    {/*            value={description}*/}
                    {/*            cols={"4"}*/}
                    {/*            onChange={this.handelChange("description")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="row">

                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"uom"}
                                value={uom}
                                onChange={this.handelChange("uom")}

                            />
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"rate"}
                                value={rate}
                                onChange={this.handelChange("rate")}
                            />
                        </div>
                    </div>

                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-12 col-12 col-md-12">*/}
                    {/*        <input ref="file" type="file" onChange={this.onChange}/>*/}
                    {/*        {image && <img src={image} style={{width:'100%', height: 150}}/>}*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </form>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state?.product?.products,
        loading: state?.product?.loading,
        error: state?.product?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createProduct: (params) => dispatch(createProductRequest(params)),
        updateProduct: (params) => dispatch(updateProductRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
