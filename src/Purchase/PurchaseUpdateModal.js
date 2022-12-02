import React, { Component, } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import TextInput from "../Utils/TextInput";
import SelectBox from '../Utils/SelectBox'
import moment from "moment";
import City from './city.json';
import {updateInvoiceRequest, updatePurchaseRequest} from "./Duck/PurchaseActions";
import Form from "react-bootstrap/Form";

class PurchaseUpdateModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            selectedState: null,
            selectedCity: null,
            shipping_name: null,
            shipping_address: null,
            shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            paid_amount: null,
            selectedTransport: null,
            selectedReverse: null,
            lrNo: null,
            vehicle: null,
            supply: null,
            invoiceDate: null,
            packing: null,
            insurance: null,
            freight: null,
            discount: null,
            invoice_number: null,
            total_amount: null,
            items: {},
            _id: null,
            selectedStatus: null
        };
    }

    componentDidMount() {
        let {invoiceId, invoice} = this.props;
        let {_id, paid_amount, selectedStatus} = this.state;
        // if(invoiceId && invoice && invoice[invoiceId]){
        //     let currentInvoice = invoice[invoiceId]
            // if(currentInvoice.total_amount !== paid_amount && selectedStatus && selectedStatus.value === "completed"){
            //     this.setState({paid_amount: currentInvoice.total_amount})
            // }
        // }
        if(invoiceId && invoice && invoice[invoiceId] && !_id) {
            let currentInvoice = invoice[invoiceId]
            this.setState({
                _id: currentInvoice._id,
                // selectedState: currentInvoice.selectedState,
                // selectedCity: currentInvoice.selectedCity,
                shipping_name: currentInvoice?.party_address?.name,
                shipping_address: currentInvoice?.party_address?.address,
                shipping_gst: currentInvoice?.party_address?.gst,
                // billing_name: currentInvoice.billing_address.name,
                // billing_address: currentInvoice.billing_address.address,
                // billing_gst: currentInvoice.billing_address.gst,
                // selectedTransport: currentInvoice.selectedTransport,
                // selectedReverse: currentInvoice.selectedReverse,
                // lrNo: currentInvoice.lrNo,
                total_amount: currentInvoice.total_amount,
                paid_amount: currentInvoice.paid_amount,
                // vehicle: currentInvoice.vehicle,
                // supply: currentInvoice.supply,
                invoiceDate: moment(currentInvoice.invoiceDate).format("YYYY-MM-DD"),
                // packing: currentInvoice.packing,
                // insurance: currentInvoice.insurance,
                // freight: currentInvoice.freight,
                // discount: currentInvoice.discount,
                invoice_number: currentInvoice.invoice_number,
                // items: currentInvoice.items,
                // selectedStatus: { value: currentInvoice.status, label: currentInvoice.status },
                // selectedProduct: Object.keys(currentInvoice.items).map(o=>{
                //     return {value: o, label: currentInvoice.items[o].name}
                // })
            })
            console.log(currentInvoice)
        }
    }
    componentDidUpdate(preProps) {
        let {invoiceId, invoice} = this.props;
        let {_id, paid_amount, selectedStatus} = this.state;
        // if(invoiceId && invoice && invoice[invoiceId]){
        //     let currentInvoice = invoice[invoiceId]
        //     if(currentInvoice.total_amount !== paid_amount && selectedStatus && selectedStatus.value === "completed"){
        //         this.setState({paid_amount: currentInvoice.total_amount})
        //     }
        // }
        if(invoiceId && invoice && invoice[invoiceId] && !_id) {
            let currentInvoice = invoice[invoiceId]
            this.setState({
                _id: currentInvoice._id,
                // selectedState: currentInvoice.selectedState,
                // selectedCity: currentInvoice.selectedCity,
                shipping_name: currentInvoice?.party_address?.name,
                shipping_address: currentInvoice?.party_address?.address,
                shipping_gst: currentInvoice?.party_address?.gst,
                // billing_name: currentInvoice.billing_address.name,
                // billing_address: currentInvoice.billing_address.address,
                // billing_gst: currentInvoice.billing_address.gst,
                // selectedTransport: currentInvoice.selectedTransport,
                // selectedReverse: currentInvoice.selectedReverse,
                // lrNo: currentInvoice.lrNo,
                paid_amount: currentInvoice.paid_amount,
                total_amount: currentInvoice.total_amount,
                // vehicle: currentInvoice.vehicle,
                // supply: currentInvoice.supply,
                invoiceDate: moment(currentInvoice.invoiceDate).format("YYYY-MM-DD"),
                // packing: currentInvoice.packing,
                // insurance: currentInvoice.insurance,
                // freight: currentInvoice.freight,
                // discount: currentInvoice.discount,
                invoice_number: currentInvoice.invoice_number,
                // items: currentInvoice.items,
                // selectedStatus: { value: currentInvoice.status, label: currentInvoice.status },
                // selectedProduct: Object.keys(currentInvoice.items).map(o=>{
                //     return {value: o, label: currentInvoice.items[o].name}
                // })
            })
            console.log(currentInvoice)
        }
    }

    onClickClose = () => {
        let { handelModal } = this.props;
        this.setState({
            _id: null,
            paid_amount: null,
            isLoading: false,
            selectedShipping: null,
            selectedBilling: null,
            selectedProduct: null,
            selectedState: null,
            selectedCity: null,
            shipping_name: null,
            shipping_address: null,
            shipping_gst: null,
            billing_name: null,
            billing_address: null,
            billing_gst: null,
            selectedTransport: null,
            selectedReverse: null,
            lrNo: null,
            vehicle: null,
            supply: null,
            invoiceDate: null,
            packing: null,
            insurance: null,
            freight: null,
            discount: null,
            invoice_number: null,
            total_amount: null,
            items: {},
            selectedStatus: null
        });
        handelModal()

    };

    onClickSave = () => {
        this.setState({isLoading: true})
        let {
            shipping_name,
            shipping_address,
            shipping_gst,
            invoiceDate,
            invoice_number,
            paid_amount,
            total_amount
        }
         = this.state;
        let {updateInvoice, invoiceId} = this.props;

        let params = {
            // status: selectedStatus.value,
            // selectedState: selectedState,
            // selectedCity: selectedCity,
            party_address: {
                name: shipping_name,
                address: shipping_address,
                gst: shipping_gst,
            },
            // billing_address: {
            //     name: billing_name,
            //     address: billing_address,
            //     gst: billing_gst,
            // },
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
            // invoice_number: invoice_number,
            _id: invoiceId,
            // paid_amount: paid_amount,
            total_amount: total_amount,
            paid_amount: paid_amount,
            invoice_number: invoice_number
        }
        console.log('params', params)

        let {loggedInUser} = this.props;
        const isAdmin = loggedInUser && loggedInUser.role_id === "admin";
        if(isAdmin) {

            updateInvoice(params)

        }
        setTimeout(()=>this.onClickClose(), 5000)
    };

    renderFooter = () => {
        let { isLoading, selectedStatus  } = this.state;

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
                    ) : "Save changes"}
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
            product,
            invoiceId
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
        let title = invoice_number + " (" +(moment(invoiceDate).format("DD-MMM-YYYY")) + ")";

        return (
            <BaseModal
                show={show}
                size={"xl"}
                key={invoiceId}
                // dialogClassName="modal-90w"
                handleClose={this.onClickClose}
                title={title}
                footerComponent={this.renderFooter}
            >
                <form key={invoiceId}>
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

                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-12 col-12 col-md-12">*/}
                    {/*        <SelectBox searchable labelText={"Purchase from"} options={client && Object.values(client).length > 0 && Object.values(client).map(o=> {*/}
                    {/*            return {*/}
                    {/*                value: o._id,*/}
                    {/*                label: o.name + o.address*/}
                    {/*            }*/}
                    {/*        })} value={selectedShipping} onChange={this.handleChange("selectedShipping")}/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                   <div className={'row'}>
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
                    </div>



                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*    <SelectBox labelText={"Payment Status"} onChange={this.handleChange("selectedStatus")} value={selectedStatus}*/}
                    {/*               options={[*/}
                    {/*                   {*/}
                    {/*                       value: "pending", label: "pending"*/}
                    {/*                   },*/}
                    {/*                   {*/}
                    {/*                       value: "rejected", label: "rejected"*/}
                    {/*                   },*/}
                    {/*                   {*/}
                    {/*                       value: "completed", label: "completed"*/}
                    {/*                   }*/}
                    {/*               ]}*/}
                    {/*    />*/}
                    {/*    </div>*/}

                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*        <SelectBox searchable value={selectedState} onChange={this.handleChange("selectedState")} labelText={"State"} options={Object.keys(City).map(o=>{*/}
                    {/*            return {*/}
                    {/*                value: o, label: o*/}
                    {/*            }*/}
                    {/*        })}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*        <SelectBox searchable value={selectedCity} onChange={this.handleChange("selectedCity")} labelText={"City"} options={selectedState ? City[selectedState.value].map(o=>{*/}
                    {/*            return {*/}
                    {/*                value: o, label: o*/}
                    {/*            }*/}
                    {/*        }) : []}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*        <SelectBox searchable value={selectedTransport}*/}
                    {/*                   onChange={this.handleChange("selectedTransport")}*/}
                    {/*                   labelText={"Transport Mode"}*/}
                    {/*                   options={[*/}
                    {/*                       {*/}
                    {/*                           value: "By Road (Bus)",*/}
                    {/*                           label: "By Road (Bus)"*/}
                    {/*                       },*/}
                    {/*                       {*/}
                    {/*                           value: "By Road (Rikshaw)",*/}
                    {/*                           label: "By Road (Rikshaw)"*/}
                    {/*                       },*/}
                    {/*                       {*/}
                    {/*                           value: "By Road (MotorCycle)",*/}
                    {/*                           label: "By Road (MotorCycle)"*/}
                    {/*                       },*/}
                    {/*                       {*/}
                    {/*                           value: "By Road (Car)",*/}
                    {/*                           label: "By Road (Car)"*/}
                    {/*                       },*/}
                    {/*                       {*/}
                    {/*                           value: "By Road (Truck)",*/}
                    {/*                           label: "By Road (Truck)"*/}
                    {/*                       },*/}
                    {/*                       {*/}
                    {/*                           value: "Train",*/}
                    {/*                           label: "Train"*/}
                    {/*                       }*/}

                    {/*                   ]}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="row">*/}
                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Advance Amount"}*/}
                    {/*            value={paid_amount}*/}
                    {/*            disabled={selectedStatus && selectedStatus.value === "completed"}*/}
                    {/*            onChange={this.handleChange("paid_amount")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-3 col-3 col-md-3">*/}
                    {/*        <SelectBox onChange={this.handleChange("selectedReverse")} labelText={"Reverse Charge"} value={selectedReverse} options={[*/}
                    {/*            { value: 'yes', label: 'Yes' },*/}
                    {/*            { value: 'no', label: 'No' },*/}
                    {/*        ]}/>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"PO No"}*/}
                    {/*            value={lrNo}*/}
                    {/*            onChange={this.handleChange("lrNo")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Vehicle number"}*/}
                    {/*            value={vehicle}*/}
                    {/*            onChange={this.handleChange("vehicle")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Place of Supply"}*/}
                    {/*            value={supply}*/}
                    {/*            onChange={this.handleChange("supply")}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className={"row"}>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Invoice Number"}*/}
                    {/*            value={invoice_number}*/}
                    {/*            onChange={this.handleChange("invoice_number")}*/}

                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <label className={"text-capitalize"}>Invoice Date</label>*/}
                    {/*        <Form.Control value={invoiceDate} onChange={this.handleChange("invoiceDate")} type="date" name='date_of_birth' className={"text-capitalize"} />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Packing & Forwarding"}*/}
                    {/*            onChange={this.handleChange("packing")}*/}
                    {/*            value={packing}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Insurance charges"}*/}
                    {/*            onChange={this.handleChange("insurance")}*/}
                    {/*            value={insurance}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Freight"}*/}
                    {/*            onChange={this.handleChange("freight")}*/}
                    {/*            value={freight}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="col-xl-2 col-2 col-md-2">*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Discount"}*/}
                    {/*            onChange={this.handleChange("discount")}*/}
                    {/*            value={discount}*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*/!*<div className="row">*!/*/}

                    {/*/!*    <div className="col-xl-4 col-4 col-md-4">*!/*/}
                    {/*/!*        <TextInput*!/*/}
                    {/*/!*            labelClassName={"text-capitalize"}*!/*/}
                    {/*/!*            labelText={"Invoice Number"}*!/*/}
                    {/*/!*            value={invoice_number}*!/*/}
                    {/*/!*            onChange={this.handleChange("invoice_number")}*!/*/}

                    {/*/!*        />*!/*/}
                    {/*/!*    </div>*!/*/}
                    {/*/!*    <div className="col-xl-4 col-4 col-md-4">*!/*/}
                    {/*/!*        <label className={"text-capitalize"}>Invoice Date</label>*!/*/}
                    {/*/!*        <Form.Control value={invoiceDate} onChange={this.handleChange("invoiceDate")} type="date" name='date_of_birth' className={"text-capitalize"} />*!/*/}
                    {/*/!*    </div>*!/*/}
                    {/*/!*</div>*!/*/}
                    {/*<p>Shipping To: </p>*/}
                    {/*<div className={'row'}>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Name"}*/}
                    {/*            value={shipping_name}*/}
                    {/*            onChange={this.handleChange("shipping_name")}*/}
                    {/*        />*/}
                    {/*        </div>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Address"}*/}
                    {/*            value={shipping_address}*/}
                    {/*            onChange={this.handleChange("shipping_address")}*/}
                    {/*        />*/}
                    {/*        </div>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*            <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"GST"}*/}
                    {/*            value={shipping_gst}*/}
                    {/*            onChange={this.handleChange("shipping_gst")}*/}
                    {/*        />*/}
                    {/*        </div>*/}
                    {/*</div>*/}
                    {/*<p>Billing To: </p>*/}
                    {/*<div className={'row'}>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Name"}*/}
                    {/*            value={billing_name}*/}
                    {/*            onChange={this.handleChange("billing_name")}*/}
                    {/*        />*/}
                    {/*        </div>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*        <TextInput*/}
                    {/*            labelClassName={"text-capitalize"}*/}
                    {/*            labelText={"Address"}*/}
                    {/*            value={billing_address}*/}
                    {/*            onChange={this.handleChange("billing_address")}*/}
                    {/*        />*/}
                    {/*        </div>*/}
                    {/*        <div className={"col-xl-4 col-4 col-md-4"}>*/}
                    {/*            <TextInput*/}
                    {/*                labelClassName={"text-capitalize"}*/}
                    {/*                labelText={"GST"}*/}
                    {/*                value={billing_gst}*/}
                    {/*                onChange={this.handleChange("billing_gst")}*/}
                    {/*            />*/}
                    {/*        </div>*/}
                    {/*</div>*/}

                    {/*<div className={"row"}>*/}
                    {/*    <div className="col-xl-11 col-11 col-md-11">*/}
                    {/*        <SelectBox onChange={this.handleChange("selectedProduct")} multiple={true} value={selectedProduct} labelText={"Product"} options={product && Object.values(product).length > 0 && Object.values(product).map(o=> {*/}
                    {/*            return {*/}
                    {/*                value: o._id,*/}
                    {/*                label: o.name + o.description*/}
                    {/*            }*/}
                    {/*        })}/>*/}

                    {/*    </div>*/}
                    {/*    <div className={'col-xl-1 col-1 col-md-1 align-self-center mt-3'}>*/}
                    {/*        <button*/}
                    {/*            type="button"*/}
                    {/*            className="btn border btn-icon-text "*/}
                    {/*            onClick={this.handleChange("addProduct")}*/}
                    {/*        >*/}
                    {/*            <i className="fe fe-plus mr-2"></i>*/}
                    {/*        </button>*/}
                    {/*    </div>*/}

                    {/*</div>*/}
                    {/*{selectedProduct && Array.isArray(selectedProduct) && selectedProduct.map((o, i)=>{*/}
                    {/*    return (*/}
                    {/*        <div className={'row'} key={o.value}>*/}
                    {/*            <div className={"col-xl-5 col-5 col-md-5 text-center"}>*/}
                    {/*                <TextInput*/}
                    {/*                    labelClassName={"text-capitalize"}*/}
                    {/*                    labelText={i === 0 && "Description"}*/}
                    {/*                    value={items[o.value]?.name}*/}
                    {/*                    onChange={this.handleChange(`itemName-${o.value}`)}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-xl-2 col-2 col-md-2"}>*/}
                    {/*                <TextInput*/}
                    {/*                    labelClassName={"text-capitalize"}*/}
                    {/*                    labelText={ i === 0 && "HSN / SAC"}*/}
                    {/*                    // style={{textAlign:'center'}}*/}
                    {/*                    value={items[o.value]?.hsn}*/}
                    {/*                    onChange={this.handleChange(`itemHsn-${o.value}`)}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-xl-2 col-2 col-md-2"}>*/}
                    {/*                <TextInput*/}
                    {/*                    labelClassName={"text-capitalize"}*/}
                    {/*                    labelText={ i === 0 && "UOM"}*/}
                    {/*                    // style={{textAlign:'center'}}*/}
                    {/*                    value={items[o.value].uom}*/}
                    {/*                    onChange={this.handleChange(`itemUom-${o.value}`)}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-xl-1 col-1 col-md-1"}>*/}
                    {/*                <TextInput*/}
                    {/*                    labelText={ i === 0 && "Qty"}*/}
                    {/*                    // style={{textAlign:'center'}}*/}
                    {/*                    value={items[o.value].qty}*/}
                    {/*                    onChange={this.handleChange(`itemQty-${o.value}`)}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*            <div className={"col-xl-2 col-2 col-md-2 text-center"}>*/}
                    {/*                <TextInput*/}
                    {/*                    style={{textAlign:'center'}}*/}
                    {/*                    labelText={ i === 0 && "Rate"}*/}
                    {/*                    value={items[o.value].rate}*/}
                    {/*                    onChange={this.handleChange(`itemRate-${o.value}`)}*/}
                    {/*                />*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}


                </form>
            </BaseModal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        product: state?.product?.products,
        invoice: state?.purchase?.purchase,
        loading: state?.client?.loading,
        error: state?.client?.error,
        loggedInUser: state?.loggedInUser?.data?.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateInvoice: (params) => dispatch(updatePurchaseRequest(params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseUpdateModal);
