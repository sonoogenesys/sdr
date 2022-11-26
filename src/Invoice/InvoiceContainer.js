import React, { useEffect, useState, useRef } from "react";
import TableComponent from "./tableComponent";
import moment from 'moment'
import InvoiceModal from "./invoiceModal";
import InvoiceUpdateModal from "./invoiceUpdateModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllInvoiceRequest, deleteInvoiceRequest} from "./Duck/InvoiceActions";
import {connect} from "react-redux";
import TableContainer from "../Utils/TableContainer";
import Tippy from "@tippyjs/react";
import TextInput from "../Utils/TextInput";
import BaseModal from "../Utils/BaseModal";

class OrderInvoice extends React.Component {
    state = {
        headingData: [
            // "S. No.",
            "Invoice No",
            "Client Name",
            // "Billing to",
            "Date",
            "Invoice Amount",
            "Advance Amount",
            "Pending Amount",
            "GST Amount",
            "Actions"
        ],
        showInvoiceModal: false,
        previewInvoiceModal: false,
        invoiceId: null,
        screenHeight: 455,
        editInvoiceModal: false,
        removeModal: false,
        showToggleUserStatusModal: false,
        searchText: "",
        isLoading: false
    }
    handleHeight = (e) => {
        this.setState({screenHeight: e.target.value})
    }

    handleModal = (show = false, show2 = false, invoiceId = null, edit = false, remove = false) => {
        this.setState({
            showInvoiceModal: show,
            previewInvoiceModal: show2,
            invoiceId: invoiceId,
            editInvoiceModal: edit,
            removeModal: remove
        });
    };

    componentDidMount() {
        let { client, fetchClient, fetchProduct, fetchInvoice } = this.props;
            fetchClient();
            fetchProduct();
            fetchInvoice();
    }
    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        });
    };

    deleteInvoice = () => {
        let {invoiceId} = this.state;
        this.setState({isLoading: true});
        this.props.deleteInvoice(invoiceId)
        setTimeout(()=>{
            this.setState({isLoading: false})
            this.handleModal();
        }, 2000)
    }

    renderFooter = () => {

        return (
            <>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => this.handleModal()}
                >
                    No
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.deleteInvoice}
                    disabled={this.state.isLoading}
                >
                    {
                        this.state.isLoading
                            ? (
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span className="visually-hidden"> Deleting...</span>
                                </>
                            )
                            : "Yes"
                    }
                </button>
            </>
        );
    };

    getFilterUserOrder = () => {
        let { searchText } = this.state;
        let { invoice } = this.props;

        let data = invoice && Object.values(invoice)
        if (searchText) {
            data = data.filter(o=> o && o.shipping_address.name.toLowerCase().includes(searchText.toLowerCase()))
        }

        return data || [];
    }

    renderRowItem = (item, index) => {
        // let amount = Object.values(item?.items).reduce((accumulator, currentValue)=>accumulator + (currentValue.rate * Number(currentValue.qty)), 0)
        // amount = (amount + Number(item?.packing || 0) + Number(item?.insurance || 0) + Number(item?.freight || 0))  - Number(item?.discount || 0)
        // let grandTotal = parseFloat((amount * 18 / 100) + amount).toFixed(2)
        let color;
        switch (item?.status) {
            case 'pending':
                color = 'orange'
                break;
            case 'completed':
                color = 'green'
                break;
            case 'rejected':
                color = 'red'
                break;
        }
        let pending_amount = (item && item.total_amount) ? Number(item.total_amount- (item.paid_amount ? item.paid_amount : 0)) : 0
        const textDecoration = color === 'red' ? {textDecoration: "line-through"} : {}
        return (
            <tr key={item?._id} style={{...textDecoration, color}}>
                <td className={'text-center'} onClick={()=>this.handleModal(false, true, item?._id)}>{item?.invoice_number}</td>
                <td onClick={()=>this.handleModal(false, true, item?._id)}>{item?.shipping_address.name}</td>
                <td className={'text-center'} onClick={()=>this.handleModal(false, true, item?._id)}>{moment(item?.invoiceDate).format('DD-MMM-YYYY')}</td>
                <td className={'text-center'} style={{ width: "10%" }} onClick={()=>this.handleModal(false, true, item?._id)}>₹ {item?.total_amount}</td>
                <td className={'text-center'} style={{ width: "10%"}} onClick={()=>this.handleModal(false, true, item?._id)}>₹ {item?.paid_amount}</td>
                <td className={'text-center'} style={{ width: "10%"}} onClick={()=>this.handleModal(false, true, item?._id)}>₹ {pending_amount}</td>
                <td className={'text-center'} style={{color}} onClick={()=>this.handleModal(false, true, item?._id)}>{item?.gst_amount}</td>
                <td className={'text-center'}>
                    {/*<span onClick={()=>this.handleModal(false, true, item?._id)}>*/}
                    {/*   <Tippy content="Preview">*/}
                    {/*        <i className="bx bxs-printer"></i>*/}
                    {/*    </Tippy>*/}
                    {/*</span>*/}
                    <span className={'ml-2 z-5'} onClick={()=>this.handleModal(false, false, item?._id, true)}>
                       <Tippy content="Edit">
                            <i className="bx bxs-edit"/>
                        </Tippy>
                    </span>
                    <span className={'ml-2 z-5'} onClick={() => this.handleModal(false, false, item?._id, false, true)}>
                       <Tippy content="Delete">
                            <i className="fe fe-delete"/>
                        </Tippy>
                    </span>

                </td>
            </tr>
        );
    };

    render() {
        let { showInvoiceModal, previewInvoiceModal, invoiceId, screenHeight, editInvoiceModal, removeModal  } = this.state;
        // let invoice = this.props.invoice && (Object.keys(this.props.invoice).length > 0 ? Object.values(this.props.invoice) : []);
        let invoice = this.getFilterUserOrder();
        let totalCount = invoice?.length



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


                {previewInvoiceModal &&
                    <TableComponent screenHeight={screenHeight} invoice={this.props.invoice[invoiceId]}/>
                }
                {
                    !previewInvoiceModal &&
                        <TableContainer
                            title={"Invoice"}
                            rowData={invoice ? invoice : []}
                            renderRow={this.renderRowItem}
                            filter={{ searchText: this.state.searchText }}
                            onSearch={this.onSearch}
                            searchPlaceholder={'Search by clients'}
                            totalEntries={totalCount}
                            showFilter={true}
                            filterOption={["All", "Pending", "Completed", "Rejected"]}
                            headings={this.state.headingData}/>
                }
                <InvoiceModal
                    // invoiceId={invoiceId}
                    show={showInvoiceModal}
                    handelModal={this.handleModal}
                />
                <InvoiceUpdateModal
                    key={invoiceId}
                    invoiceId={invoiceId}
                    show={editInvoiceModal}
                    handelModal={this.handleModal}
                />
                <BaseModal
                    closeButton={false}
                    title={"Delete Invoice"}
                    show={removeModal}
                    size={'md'}
                    footerComponent={this.renderFooter}
                >
                    Are you sure to delete this <b>{invoice?.find(o=> o && o._id ===invoiceId)?.invoice_number} </b>?
                </BaseModal>




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
        deleteInvoice: (params) => dispatch(deleteInvoiceRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInvoice);

