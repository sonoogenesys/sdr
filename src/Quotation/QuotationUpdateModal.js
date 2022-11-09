import React, { Component, } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import SelectBox from '../Utils/SelectBox'
import Form from "react-bootstrap/Form";
import {updateQuotationRequest} from "./Duck/QuotationActions";
import moment from "moment";

class QuotationUpdateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            // selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            // selectedState: {value: "Haryana", label: "Haryana"},
            // selectedCity: {value: "Gurugram", label: "Gurugram"},
            // shipping_name: null,
            // shipping_address: null,
            // shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            // selectedTransport: null,
            // selectedReverse: {value: "no", label: "no"},
            // lrNo: null,
            // vehicle: null,
            // supply: null,
            invoiceDate: null,
            // packing: null,
            // insurance: null,
            // freight: null,
            // discount: null,
            invoice_number: null,
            items: {},
            conditions:null,
            name: null,
            subject: null,
            site_address: null
        };
    }

    componentDidMount() {
        let {quotationId, quotation} = this.props;
        let {_id} = this.state;

        if(quotationId && quotation && quotation[quotationId] && !_id) {
            let currentquotation = quotation[quotationId]
            this.setState({
                _id: currentquotation._id,
                billing_name: currentquotation.billing_address.name,
                billing_address: currentquotation.billing_address.address,
                billing_gst: currentquotation.billing_address.gst,
                invoiceDate: moment(currentquotation.invoiceDate).format("YYYY-MM-DD"),
                invoice_number: currentquotation.invoice_number,
                items: currentquotation.items,
                subject: currentquotation.subject,
                name: currentquotation.name,
                conditions: currentquotation.conditions,
                site_address: currentquotation.site_address,
                selectedProduct: Object.keys(currentquotation.items).map(o=>{
                    return {value: o, label: currentquotation.items[o].name}
                }),
            })
            console.log(currentquotation)
        }
    }


    componentDidUpdate(preProps) {
        // if(this.state.invoice_number === "00 /2022-23" && this.props.quotation && Object.keys(this.props.quotation).length > 0){
        //     this.setState({invoice_number: `0${Object.keys(this.props.quotation).length + 1} /2022-23`})
        // }
        console.log(this.props.loading, preProps.loading, this.state.isLoading)
        if (!this.props.loading && preProps.loading && this.state.isLoading) {
            if (!this.props.error) {
                this.onClickClose();
            }
        }
    }



    onClickClose = () => {
        let { handelModal, quotation_length } = this.props;
        this.setState({
            isLoading: false,
            // selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            // selectedState: null,
            // selectedCity: null,
            // shipping_name: null,
            // shipping_address: null,
            // shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            // selectedTransport: null,
            // selectedReverse: null,
            // lrNo: null,
            // vehicle: null,
            // supply: null,
            invoiceDate: null,
            // packing: null,
            // insurance: null,
            // freight: null,
            // discount: null,
            invoice_number: null,
            items: {},
            conditions:null,
            name: null,
            subject: null,
            site_address: null
        });

        handelModal(false, false, null);
    };

    onClickSave = () => {
        this.setState({isLoading: true})
        let {
            billing_name,
            billing_address,
            billing_gst,
            invoiceDate,
            items,
            invoice_number,
            name,
            subject,
            conditions,
            site_address
        }
         = this.state;
        let {updateQuotation, quotationId} = this.props;

        let params = {
            billing_address: {
                name: billing_name,
                address: billing_address,
                gst: billing_gst,
            },
            invoiceDate: invoiceDate,
            items: items,
            invoice_number: invoice_number,
            name: name,
            subject: subject,
            conditions: conditions,
            site_address: site_address,
            _id: quotationId,
        }
        // Object.keys(items).map(o=>{
        //     if(o.includes("sel")){
        //         let params = items[o]
        //         createProduct(params)
        //     }
        // })
        updateQuotation(params)
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
                    ) : "Update Quotation"
                    }
                </button>
            </>
        );
    };

    handleChange = (name) => (event) => {
        let { product, client } = this.props;
        let {items, selectedProduct, selectedShipping, selectedBilling} = this.state;
        let value;
        console.log(event, items)
        if(Array.isArray(event)){
            value = event
        } else {
            value = event?.value ? event: event.target.value
        }
        this.setState({
            [name]: value,
        });
        if(name === "addBilling"){
            this.setState({selectedBilling: {}})
        }
        if(name === "addProduct") {
            selectedProduct = selectedProduct ? selectedProduct : []
            let selectedItems = {};
            let o = {
                value: "sel_" + selectedProduct.length
            }
            selectedProduct.push({value: o.value, label: "Product-" + selectedProduct.length})

            selectedProduct.map(o=>{
                selectedItems[o.value] = {};
                if(items[o.value] === undefined){
                    items[o.value] = {};
                }
                if(product[o.value] === undefined){
                    product[o.value] = {}
                }
                console.log('----->',selectedItems[o.value].gst)

                selectedItems[o.value].name = items[o.value].name ? items[o.value].name : product[o.value].name;
                selectedItems[o.value].hsn = items[o.value].hsn ? items[o.value].hsn : product[o.value].hsn;
                selectedItems[o.value].uom = items[o.value].uom ? items[o.value].uom : product[o.value].uom;
                selectedItems[o.value].qty = items[o.value].qty ? items[o.value].qty : product[o.value].qty;
                selectedItems[o.value].sRate = items[o.value].sRate ? items[o.value].sRate : product[o.value].rate;
                selectedItems[o.value].eRate = items[o.value].eRate ? items[o.value].eRate : product[o.value].eRate;
                // selectedItems[o.value].gst = items[o.value].gst !== undefined ? items[o.value].gst : product[o.value].gst;
            })
            this.setState({items: selectedItems, selectedProduct: selectedProduct})
        }
        if(name === "selectedProduct") {
            let selectedItems = {};
            event.map((o)=>{
                selectedItems[o.value] = {};
                if(items[o.value] === undefined){
                    items[o.value] = {};
                }
                if(product[o.value] === undefined){
                    product[o.value] = {}
                }
                selectedItems[o.value].name = items[o.value].name ? items[o.value].name : product[o.value].name;
                selectedItems[o.value].hsn = items[o.value].hsn ? items[o.value].hsn : product[o.value].hsn;
                selectedItems[o.value].uom = items[o.value].uom ? items[o.value].uom : product[o.value].uom;
                selectedItems[o.value].qty = items[o.value].qty ? items[o.value].qty : product[o.value].qty;
                selectedItems[o.value].sRate = items[o.value].sRate ? items[o.value].sRate : product[o.value].rate;
                selectedItems[o.value].eRate = items[o.value].eRate ? items[o.value].eRate : product[o.value].eRate;
                // selectedItems[o.value].gst = items[o.value].gst !== undefined ? items[o.value].gst : product[o.value].gst;
            })
            this.setState({items: selectedItems})
        }
        if(name.includes("item")){
            console.log('+++>',name)
            let index = name.split("-")[1];
            if(name.includes("Name")){
                items[index].name = value
            } else if (name.includes("Hsn")) {
                items[index].hsn = value
            } else if (name.includes("Uom")) {
                items[index].uom = value
            } else if (name.includes("Qty")) {
                items[index].qty = value
            } else if (name.includes("Supply")) {
                items[index].sRate = value
            } else if (name.includes("Erection")) {
                items[index].eRate = value
            }

            this.setState({items})
        }

        console.log(selectedBilling)
        if(name === "selectedBilling") {
            let billing_name = client[event.value].name
            let billing_address = client[event.value].address
            let billing_gst = client[event.value].gstin
            this.setState({billing_name, billing_address, billing_gst})
        }
    };

    render() {
        let {
            show,
            product
        } = this.props;
        let {
            selectedProduct,
            invoiceDate,
            items,
            billing_name,
            billing_address,
            billing_gst,
            invoice_number,
            name,
            subject,
            conditions,
            site_address
        } = this.state;
        let title = invoice_number + " (" +(moment(invoiceDate).format("DD-MMM-YYYY")) + ")";


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
                        <div className="col-xl-2 col-2 col-md-2">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Quotation number"}
                                value={invoice_number}
                                onChange={this.handleChange("invoice_number")}
                            />
                        </div>
                        <div className="col-xl-2 col-2 col-md-2">
                            <label className={"text-capitalize"}>Quotation Date</label>
                            <Form.Control value={invoiceDate} onChange={this.handleChange("invoiceDate")} type="date" name='date_of_birth' className={"text-capitalize"} />
                        </div>
                        <div className="col-xl-2 col-2 col-md-2">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"name"}
                                value={name}
                                onChange={this.handleChange("name")}
                            />
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"subject"}
                                value={subject}
                                onChange={this.handleChange("subject")}
                            />
                        </div>
                    </div>

                    <div className={'row'}>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Billing Name"}
                                value={billing_name}
                                onChange={this.handleChange("billing_name")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Billing Address"}
                                value={billing_address}
                                onChange={this.handleChange("billing_address")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                                <TextInput
                                    labelClassName={"text-capitalize"}
                                    labelText={"Billing GST"}
                                    value={billing_gst}
                                    onChange={this.handleChange("billing_gst")}
                                />
                            </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-xl-12 col-12 col-md-12"}>
                                <TextInput
                                    labelClassName={"text-capitalize"}
                                    labelText={"Site Address"}
                                    value={site_address}
                                    onChange={this.handleChange("site_address")}
                                />
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className="col-xl-11 col-11 col-md-11">
                            <SelectBox searchable onChange={this.handleChange("selectedProduct")} multiple={true} value={selectedProduct} labelText={"Product"} options={product && Object.values(product).length > 0 && Object.values(product).map(o=> {
                                return {
                                    value: o._id,
                                    label: o.name
                                }
                            })}/>

                        </div>
                        <div className={'col-xl-1 col-1 col-md-1 align-self-center text-align-right mt-3'}>
                            <button
                                type="button"
                                className="btn border btn-icon-text "
                                onClick={this.handleChange("addProduct")}
                            >
                                <i className="fe fe-plus mr-2"></i>
                            </button>
                        </div>

                    </div>
                    {selectedProduct && Array.isArray(selectedProduct) && selectedProduct.map((o, i)=>{
                        return (
                            <div className={'row'} key={o.value}>
                                <div className={"col-xl-5 col-5 col-md-5 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={i === 0 && "Description"}

                                        value={items[o.value]?.name}
                                        onChange={this.handleChange(`itemName-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-1 col-1 col-md-1 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={ i === 0 && "HSN"}
                                        style={{textAlign:'center'}}
                                        value={items[o.value]?.hsn}
                                        onChange={this.handleChange(`itemHsn-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-1 col-1 col-md-1 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={ i === 0 && "UOM"}
                                        style={{textAlign:'center'}}
                                        value={items[o.value].uom}
                                        onChange={this.handleChange(`itemUom-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-1 col-1 col-md-1 text-center"}>
                                    <TextInput
                                        labelText={ i === 0 && "Qty"}
                                        style={{textAlign:'center'}}
                                        value={items[o.value].qty}
                                        onChange={this.handleChange(`itemQty-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-2 col-2 col-md-2 text-center"}>
                                    <TextInput
                                        style={{textAlign:'center'}}
                                        labelText={ i === 0 && "Supply Rate"}
                                        value={items[o.value].sRate}
                                        onChange={this.handleChange(`itemSupplyRate-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-2 col-2 col-md-2 text-center"}>
                                    <TextInput
                                        style={{textAlign:'center'}}
                                        labelText={ i === 0 && "Erection Rate"}
                                        value={items[o.value].eRate}
                                        onChange={this.handleChange(`itemErectionRate-${o.value}`)}
                                    />
                                </div>
                                {/*<div className={"col-xl-2 col-2 col-md-2 align-self-center text-center mt-3"}>*/}
                                {/*<Form.Check*/}
                                {/*    type="switch"*/}
                                {/*    onChange={this.handleChange(`itemGST-${o.value}`)}*/}
                                {/*    id={o.value}*/}
                                {/*    label={"Non GST"}*/}
                                {/*    // label="non GST"*/}
                                {/*    // onClick={(event)=>console.log(event.target)}*/}
                                {/*/>*/}
                                {/*</div>*/}
                            </div>
                        )
                    })}

                    <div className="row">

                        <div className="col-xl-12 col-12 col-md-12">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Terms and conditions"}
                                value={conditions}
                                rows="7"
                                cols="50"
                                onChange={this.handleChange("conditions")}
                            />
                        </div>
                    </div>
                </form>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        // quotation: state?.quotation?.quotation,
        product: state?.product?.products,
        quotation: state?.quotation?.quotation,
        quotation_length: Object.values(state?.quotation?.quotation).length,
        loading: state?.client?.loading,
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateQuotation: (params) => dispatch(updateQuotationRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationUpdateModal);
