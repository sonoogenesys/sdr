import React, { useEffect, useState, useRef } from "react";
import TableComponent from "./tableComponent";
import moment from 'moment'
import InvoiceModal from "./invoiceModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllInvoiceRequest} from "./Duck/InvoiceActions";
import {connect} from "react-redux";
import BaseTable from "../Utils/BaseTable";
import Tippy from "@tippyjs/react";

class OrderInvoice extends React.Component {
    state = {
        headingData: [
            "S. No.",
            "Shipped to",
            "Billing to",
            "Date",
            "Amount",
            "Status",
            "Actions"
        ],
        showInvoiceModal: false,
        previewInvoiceModal: false,
        invoiceId: null
    }

    handleModal = (show = false, show2 = false, invoiceId = null) => {
        this.setState({
            showInvoiceModal: show,
            previewInvoiceModal: show2,
            invoiceId: invoiceId
        });
    };

    componentDidMount() {
        let { client, fetchClient, fetchProduct, fetchInvoice } = this.props;
            fetchClient();
            fetchProduct();
            fetchInvoice();
    }

    render() {
        let { showInvoiceModal, previewInvoiceModal, invoiceId  } = this.state;
        let invoice = this.props.invoice && (Object.keys(this.props.invoice).length > 0 ? Object.values(this.props.invoice) : []);


        const renderRowItem = (item, index) => {
            const price = Object.values(item?.items)?.map(o=>o.rate)
            return (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{item?.shipping_address.name}</td>
                    <td>{item?.billing_address.name}</td>
                    <td>{moment(item?.invoiceDate).format('LLL')}</td>
                    <td style={{ width: "10%" }}>₹ {parseFloat(  price || 0).toFixed(2)}</td>
                    <td>{item?.status}</td>
                    <td>
                    <span onClick={()=>this.handleModal(false, true, item?._id)}>
                       <Tippy content="Preview">
                            <i className="bx bxs-printer"></i>
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
                        </div>
                    </div>
                </div>

                {
                    previewInvoiceModal ? <TableComponent invoice={this.props.invoice[invoiceId]}/> : <BaseTable
                        headingData={this.state.headingData}
                        rowData={invoice ? invoice : []}
                        renderRowItem={renderRowItem}
                    />
                }
                <InvoiceModal
                    show={showInvoiceModal}
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

