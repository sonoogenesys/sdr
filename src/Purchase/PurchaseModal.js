import React, { Component, } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import SelectBox from '../Utils/SelectBox'
import City from './city.json';
import Form from "react-bootstrap/Form";
import {createPurchaseRequest} from "./Duck/PurchaseActions";
import {createProductRequest} from "../Product/Duck/ProductsActions";
import {createClientRequest} from "../Client/Duck/ClientsActions";
import moment from "moment";

class PurchaseModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            selectedState: {value: "Haryana", label: "Haryana"},
            selectedCity: {value: "Gurugram", label: "Gurugram"},
            shipping_name: null,
            shipping_address: null,
            shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            selectedTransport: null,
            selectedReverse: {value: "no", label: "no"},
            lrNo: null,
            total_amount: null,
            paid_amount: null,
            vehicle: null,
            supply: null,
            invoiceDate: moment().format("YYYY-MM-DD"),
            packing: null,
            insurance: null,
            freight: null,
            discount: null,
            invoice_number: null,
            items: {}
        };
    }


    componentDidUpdate(preProps) {
        // if(this.state.invoice_number === "00 /2022-23" && this.props.invoice && Object.keys(this.props.invoice).length > 0){
        //     this.setState({invoice_number: `0${Object.keys(this.props.invoice).length + 1} /2022-23`})
        // }
        console.log(this.props.loading, preProps.loading, this.state.isLoading)
        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            if (!this.props.error) {
                this.onClickClose();
            }
        }
    }



    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            isLoading: false,
            selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            // selectedState: null,
            // selectedCity: null,
            shipping_name: null,
            shipping_address: null,
            shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            total_amount: null,
            paid_amount: null,
            selectedTransport: null,
            // selectedReverse: null,
            lrNo: null,
            vehicle: null,
            supply: null,
            invoiceDate: moment().format("YYYY-MM-DD"),
            packing: null,
            insurance: null,
            freight: null,
            discount: null,
            invoice_number: null,
            items: {}
        });

        handelModal(false, false, null);
    };

    onClickSave = () => {
        this.setState({isLoading: true})
        let {
            selectedState,
            selectedCity,
            shipping_name,
            shipping_address,
            shipping_gst,
            billing_name,
            billing_address,
            billing_gst,
            selectedTransport,
            selectedReverse,
            lrNo,
            vehicle,
            supply,
            total_amount,
            paid_amount,
            invoiceDate,
            packing,
            insurance,
            freight,
            discount,
            // items,
            invoice_number
        }
         = this.state;
        let {createInvoice, createProduct} = this.props;

        let params = {
            // selectedState: selectedState,
            // selectedCity: selectedCity,
            party_address: {
                name: shipping_name,
                address: shipping_address,
                gst: shipping_gst,
            },
            // selectedTransport: selectedTransport,
            // selectedReverse: selectedReverse,
            // lrNo: lrNo,
            // vehicle: vehicle,
            // supply: supply,
            invoiceDate: invoiceDate,
            // packing: packing,
            // insurance: insurance,
            // freight: freight,
            // discount: discount,
            // items: items,
            total_amount: total_amount,
            paid_amount: paid_amount,
            invoice_number: invoice_number
        }
        // Object.keys(items).map(o=>{
        //     if(o.includes("sel")){
        //         let params = items[o]
        //         createProduct(params)
            // }
        // })
        let {loggedInUser} = this.props;
        const isAdmin = loggedInUser && loggedInUser.role_id === "admin";
        if(isAdmin) {

            createInvoice(params)
        }
        setTimeout(()=>this.onClickClose(), 5000)

    };

    renderFooter = () => {
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
                    ) : "Generate Invoice"
                    }
                </button>
            </>
        );
    };

    handleChange = (name) => (event) => {
        let { client } = this.props;
        let value;
        if(Array.isArray(event)){
            value = event
        } else {
            value = event?.value ? event: event.target.value
        }
        this.setState({
            [name]: value,
        });
        if(name === "addShipping"){
            this.setState({selectedShipping: {}})
        }

        if(name === "selectedShipping") {
            let shipping_name = client[event.value].name
            let shipping_address = client[event.value].address
            let shipping_gst = client[event.value].gstin
            this.setState({shipping_name, shipping_address, shipping_gst})
        }
    };

    render() {
        let {
            show,
            client,
            product
        } = this.props;
        let {
            selectedShipping,
            invoiceDate,
            shipping_name,
            shipping_address,
            shipping_gst,
            invoice_number,
            total_amount,
            paid_amount
        } = this.state;
        let title = "Add New Purchase";

        return (
            <BaseModal
                show={show}
                size={"xl"}
                handleClose={this.onClickClose}
                title={title}
                footerComponent={this.renderFooter}
            >
                <form>
                    <div className="row">
                        <div className="col-xl-3 col-3 col-md-3">
                            <label className={"text-capitalize"}>Invoice Date</label>
                            <Form.Control value={invoiceDate} onChange={this.handleChange("invoiceDate")} type="date" name='date_of_birth' className={"text-capitalize"} />
                        </div>

                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Invoice Number"}
                                value={invoice_number}
                                onChange={this.handleChange("invoice_number")}

                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Invoice Amount With GST"}
                                value={total_amount}
                                onChange={this.handleChange("total_amount")}

                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Paid Amount"}
                                value={paid_amount}
                                onChange={this.handleChange("paid_amount")}

                            />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-xl-12 col-12 col-md-12">
                            <SelectBox searchable labelText={"Purchase from"} options={client && Object.values(client).length > 0 && Object.values(client).map(o=> {
                                return {
                                    value: o._id,
                                    label: o.name + o.address
                                }
                            })} value={selectedShipping} onChange={this.handleChange("selectedShipping")}/>
                        </div>
                    </div>

                    { selectedShipping && <div className={'row'}>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Party Name"}
                                value={shipping_name}
                                onChange={this.handleChange("shipping_name")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Party Address"}
                                value={shipping_address}
                                onChange={this.handleChange("shipping_address")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                                <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Party GST"}
                                value={shipping_gst}
                                onChange={this.handleChange("shipping_gst")}
                            />
                            </div>
                    </div> }
                </form>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        product: state?.product?.products,
        invoice: state?.invoice?.invoice,
        loading: state?.client?.loading,
        error: state?.client?.error,
        loggedInUser: state?.loggedInUser?.data?.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (params) => dispatch(createClientRequest(params)),
        createProduct: (params) => dispatch(createProductRequest(params)),
        createInvoice: (params) => dispatch(createPurchaseRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseModal);
