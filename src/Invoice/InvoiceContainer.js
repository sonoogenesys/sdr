import React, { useEffect, useState, useRef } from "react";
import TableComponent from "./tableComponent";
import moment from 'moment'
import InvoiceModal from "./invoiceModal";
import InvoiceUpdateModal from "./invoiceUpdateModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllInvoiceRequest} from "./Duck/InvoiceActions";
import {connect} from "react-redux";
import BaseTable from "../Utils/BaseTable";
import Tippy from "@tippyjs/react";
import TextInput from "../Utils/TextInput";

class OrderInvoice extends React.Component {
    state = {
        headingData: [
            "S. No.",
            "Invoice No",
            "Shipped to",
            "Billing to",
            "Date",
            "Amount",
            "Status",
            "Actions"
        ],
        showInvoiceModal: false,
        previewInvoiceModal: false,
        invoiceId: null,
        screenHeight: 455,
        editInvoiceModal: false
    }
    handleHeight = (e) => {
        this.setState({screenHeight: e.target.value})
    }

    handleModal = (show = false, show2 = false, invoiceId = null, edit = false) => {
        this.setState({
            showInvoiceModal: show,
            previewInvoiceModal: show2,
            invoiceId: invoiceId,
            editInvoiceModal: edit
        });
    };

    componentDidMount() {
        let { client, fetchClient, fetchProduct, fetchInvoice } = this.props;
            fetchClient();
            fetchProduct();
            fetchInvoice();
    }

    render() {
        let { showInvoiceModal, previewInvoiceModal, invoiceId, screenHeight, editInvoiceModal  } = this.state;
        let invoice = this.props.invoice && (Object.keys(this.props.invoice).length > 0 ? Object.values(this.props.invoice) : []);


        const renderRowItem = (item, index) => {

            let amount = Object.values(item?.items).reduce((accumulator, currentValue)=>accumulator + (currentValue.rate * Number(currentValue.qty)), 0)
            amount = (amount + Number(item?.packing || 0) + Number(item?.insurance || 0) + Number(item?.freight || 0))  - Number(item?.discount || 0)
            let grandTotal = parseFloat((amount * 18 / 100) + amount).toFixed(2)

            return (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td style={{textAlign:'center'}}>{item?.invoice_number}</td>
                    <td>{item?.shipping_address.name}</td>
                    <td>{item?.billing_address.name}</td>
                    <td>{moment(item?.invoiceDate).format('DD-MMM-YYYY')}</td>
                    <td style={{ width: "10%" }}>₹ {grandTotal}</td>
                    <td>{item?.status}</td>
                    <td>
                    <span onClick={()=>this.handleModal(false, true, item?._id)}>
                       <Tippy content="Preview">
                            <i className="bx bxs-printer"></i>
                        </Tippy>
                    </span>
                    <span className={'ml-2'} onClick={()=>this.handleModal(false, false, item?._id, true)}>
                       <Tippy content="Edit">
                            <i className="bx bxs-edit"/>
                        </Tippy>
                    </span>

                    </td>
                </tr>
            );
        };

        return (
            <>

                <div className="row">
                    <div className="col-md-12">
                        {previewInvoiceModal ? <div className="page-title-box d-flex align-items-center justify-content-between">
                                <div className="page-title-left">
                                    <button
                                        type="button"
                                        className="btn btn-primary my-2 btn-icon-text"
                                        onClick={() => this.handleModal(false, false, null)}
                                    >
                                        <i className="fe fe-arrow-left mr-2"></i> Back
                                    </button>
                                </div>
                                <TextInput value={screenHeight} onChange={this.handleHeight}/>
                                <div className="page-title-right">
                                    <button
                                        type="button"
                                        className="btn btn-primary my-2 btn-icon-text"
                                        onClick={window.print}
                                    >
                                        <i className="fe fe-printer mr-2"></i> Print
                                    </button>
                                </div>
                            </div> :
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Invoice List
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Generate Invoice
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>


                {previewInvoiceModal ?
                    <TableComponent screenHeight={screenHeight} invoice={this.props.invoice[invoiceId]}/>
                    :  <BaseTable
                    headingData={this.state.headingData}
                    rowData={invoice ? invoice : []}
                    renderRowItem={renderRowItem}
                />}
                <InvoiceModal
                    invoiceId={invoiceId}
                    show={showInvoiceModal}
                    handelModal={this.handleModal}
                />
                <InvoiceUpdateModal
                    invoiceId={invoiceId}
                    show={editInvoiceModal}
                    handelModal={this.handleModal}
                />




            </>
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
        fetchClient: (params) => dispatch(fetchAllClientsRequest(params)),
        fetchProduct: (params) => dispatch(fetchAllProductsRequest(params)),
        fetchInvoice: (params) => dispatch(fetchAllInvoiceRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInvoice);

