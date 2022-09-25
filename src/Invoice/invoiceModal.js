import React, { Component, } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import SelectBox from '../Utils/SelectBox'
import City from './city.json';
import Form from "react-bootstrap/Form";
import {createInvoiceRequest} from "./Duck/InvoiceActions";
import {createProductRequest} from "../Product/Duck/ProductsActions";
import {createClientRequest} from "../Client/Duck/ClientsActions";
import moment from "moment";

class InvoiceModal extends Component {
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
            vehicle: null,
            supply: null,
            invoiceDate: moment().format("YYYY-MM-DD"),
            packing: null,
            insurance: null,
            freight: null,
            discount: null,
            invoice_number: "00 /2022-23",
            items: {}
        };
    }


    componentDidUpdate(preProps) {
        if(this.state.invoice_number === "00 /2022-23" && this.props.invoice && Object.keys(this.props.invoice).length > 0){
            this.setState({invoice_number: `0${Object.keys(this.props.invoice).length + 1} /2022-23`})
        }
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
            invoice_number: "00 /2022-23",
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
            invoiceDate,
            packing,
            insurance,
            freight,
            discount,
            items,
            invoice_number
        }
         = this.state;
        let {createInvoice, createProduct} = this.props;

        let params = {
            selectedState: selectedState,
            selectedCity: selectedCity,
            shipping_address: {
                name: shipping_name,
                address: shipping_address,
                gst: shipping_gst,
            },
            billing_address: {
                name: billing_name,
                address: billing_address,
                gst: billing_gst,
            },
            selectedTransport: selectedTransport,
            selectedReverse: selectedReverse,
            lrNo: lrNo,
            vehicle: vehicle,
            supply: supply,
            invoiceDate: invoiceDate,
            packing: packing,
            insurance: insurance,
            freight: freight,
            discount: discount,
            items: items,
            invoice_number: invoice_number
        }
        Object.keys(items).map(o=>{
            if(o.includes("sel")){
                let params = items[o]
                createProduct(params)
            }
        })

        createInvoice(params)
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
        let { product, client } = this.props;
        let {items, selectedProduct} = this.state;
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

                selectedItems[o.value].name = items[o.value].name ? items[o.value].name : product[o.value].name + product[o.value].description;
                selectedItems[o.value].hsn = items[o.value].hsn ? items[o.value].hsn : product[o.value].hsn;
                selectedItems[o.value].uom = items[o.value].uom ? items[o.value].uom : product[o.value].uom;
                selectedItems[o.value].qty = items[o.value].qty ? items[o.value].qty : product[o.value].qty;
                selectedItems[o.value].rate = items[o.value].rate ? items[o.value].rate : product[o.value].rate;
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
                // console.log(product[o.value])
                selectedItems[o.value].name = items[o.value].name ? items[o.value].name : product[o.value].name + product[o.value].description;
                selectedItems[o.value].hsn = items[o.value].hsn ? items[o.value].hsn : product[o.value].hsn;
                selectedItems[o.value].uom = items[o.value].uom ? items[o.value].uom : product[o.value].uom;
                selectedItems[o.value].qty = items[o.value].qty ? items[o.value].qty : product[o.value].qty;
                selectedItems[o.value].rate = items[o.value].rate ? items[o.value].rate : product[o.value].rate;
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
            } else if (name.includes("Rate")) {
                items[index].rate = value
            }

            this.setState({items})
        }

        if(name === "selectedShipping") {
            let shipping_name = client[event.value].name
            let shipping_address = client[event.value].address
            let shipping_gst = client[event.value].gstin
            this.setState({shipping_name, shipping_address, shipping_gst})
        }
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
            client,
            product
        } = this.props;
        let {
            selectedShipping,
            selectedProduct,
            selectedBilling,
            selectedState,
            selectedCity,
            selectedTransport,
            selectedReverse,
            lrNo,
            vehicle,
            supply,
            invoiceDate,
            packing,
            insurance,
            freight,
            discount,
            items,
            shipping_name,
            shipping_address,
            shipping_gst,
            billing_name,
            billing_address,
            billing_gst,
            invoice_number
        } = this.state;
        let title = "Add New Invoice";

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
                            <SelectBox searchable value={selectedState} onChange={this.handleChange("selectedState")} labelText={"State"} options={Object.keys(City).map(o=>{
                                return {
                                    value: o, label: o
                                }
                            })}/>
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <SelectBox searchable value={selectedCity} onChange={this.handleChange("selectedCity")} labelText={"City"} options={selectedState ? City[selectedState.value].map(o=>{
                                return {
                                    value: o, label: o
                                }
                            }) : []}/>
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <SelectBox searchable value={selectedTransport}
                                       onChange={this.handleChange("selectedTransport")}
                                       labelText={"Transport Mode"}
                                       options={[
                                           {
                                               value: "By Road (Bus)",
                                               label: "By Road (Bus)"
                                           },
                                           {
                                               value: "By Road (Rikshaw)",
                                               label: "By Road (Rikshaw)"
                                           },
                                           {
                                               value: "By Road (MotorCycle)",
                                               label: "By Road (MotorCycle)"
                                           },
                                           {
                                               value: "By Road (Car)",
                                               label: "By Road (Car)"
                                           },
                                           {
                                               value: "By Road (Truck)",
                                               label: "By Road (Truck)"
                                           },
                                           {
                                               value: "Train",
                                               label: "Train"
                                           },
                                           {
                                               value: "By Road (Crain)",
                                               label: "By Road (Crain)"
                                           }

                                       ]}
                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <SelectBox onChange={this.handleChange("selectedReverse")} labelText={"Reverse Charge"} value={selectedReverse} options={[
                                { value: 'yes', label: 'Yes' },
                                { value: 'no', label: 'No' },
                            ]}/>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"LR/GR No"}
                                value={lrNo}
                                onChange={this.handleChange("lrNo")}
                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Vehicle number"}
                                value={vehicle}
                                onChange={this.handleChange("vehicle")}
                            />
                        </div>
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
                    </div>

                    <div className="row">
                        <div className="col-xl-2 col-2 col-md-2">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Place of Supply"}
                                value={supply}
                                onChange={this.handleChange("supply")}
                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Packing & Forwarding"}
                                onChange={this.handleChange("packing")}
                                value={packing}
                            />
                        </div>
                        <div className="col-xl-3 col-3 col-md-3">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Insurance charges"}
                                onChange={this.handleChange("insurance")}
                                value={insurance}
                            />
                        </div>
                        <div className="col-xl-2 col-2 col-md-2">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Freight"}
                                onChange={this.handleChange("freight")}
                                value={freight}
                            />
                        </div>
                        <div className="col-xl-2 col-2 col-md-2">
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Discount"}
                                onChange={this.handleChange("discount")}
                                value={discount}
                            />
                        </div>
                    </div>

                    <div className={'row'}>
                        <div className="col-xl-6 col-6 col-md-6">
                            <SelectBox searchable labelText={"Shipping To"} options={client && Object.values(client).length > 0 && Object.values(client).map(o=> {
                                return {
                                    value: o._id,
                                    label: o.name + o.address
                                }
                            })} value={selectedShipping} onChange={this.handleChange("selectedShipping")}/>
                        </div>
                        <div className="col-xl-6 col-6 col-md-6">
                            <SelectBox searchable labelText={"Billing to"} options={client && Object.values(client).length > 0 && Object.values(client).map(o=> {
                                return {
                                    value: o._id,
                                    label: o.name + o.address
                                }
                            })} value={selectedBilling} onChange={this.handleChange("selectedBilling")}/>
                        </div>
                    </div>

                    { selectedShipping && <div className={'row'}>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Shipping Name"}
                                value={shipping_name}
                                onChange={this.handleChange("shipping_name")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                            <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Shipping Address"}
                                value={shipping_address}
                                onChange={this.handleChange("shipping_address")}
                            />
                            </div>
                            <div className={"col-xl-4 col-4 col-md-4"}>
                                <TextInput
                                labelClassName={"text-capitalize"}
                                labelText={"Shipping GST"}
                                value={shipping_gst}
                                onChange={this.handleChange("shipping_gst")}
                            />
                            </div>
                    </div> }

                    {/*<div className="row">*/}
                    {/*    */}
                    {/*</div>*/}

                    { selectedBilling && <div className={'row'}>
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
                    </div> }

                    <div className={"row"}>
                        <div className="col-xl-11 col-11 col-md-11">
                            <SelectBox searchable onChange={this.handleChange("selectedProduct")} multiple={true} value={selectedProduct} labelText={"Product"} options={product && Object.values(product).length > 0 && Object.values(product).map(o=> {
                                return {
                                    value: o._id,
                                    label: o.name + (o.description ? o.description : "")
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
                                <div className={"col-xl-4 col-4 col-md-4 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={i === 0 && "Description"}

                                        value={items[o.value]?.name}
                                        onChange={this.handleChange(`itemName-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-2 col-2 col-md-2 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={ i === 0 && "HSN / SAC"}
                                        style={{textAlign:'center'}}
                                        value={items[o.value]?.hsn}
                                        onChange={this.handleChange(`itemHsn-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-2 col-2 col-md-2 text-center"}>
                                    <TextInput
                                        labelClassName={"text-capitalize"}
                                        labelText={ i === 0 && "UOM"}
                                        style={{textAlign:'center'}}
                                        value={items[o.value].uom}
                                        onChange={this.handleChange(`itemUom-${o.value}`)}
                                    />
                                </div>
                                <div className={"col-xl-2 col-2 col-md-2 text-center"}>
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
                                        labelText={ i === 0 && "Rate"}
                                        value={items[o.value].rate}
                                        onChange={this.handleChange(`itemRate-${o.value}`)}
                                    />
                                </div>
                            </div>
                        )
                    })}
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
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createClient: (params) => dispatch(createClientRequest(params)),
        createProduct: (params) => dispatch(createProductRequest(params)),
        createInvoice: (params) => dispatch(createInvoiceRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceModal);
