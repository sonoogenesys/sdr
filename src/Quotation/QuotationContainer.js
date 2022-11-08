import React, {Component} from 'react';
import moment from "moment";
import QuotationModal from "./ProductSelectModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllQuotationRequest, deleteQuotationRequest} from "./Duck/QuotationActions";
import {connect} from "react-redux";
import PreviewQuotation from "./PreviewQuotation";
import QuotationUpdateModal from "./QuotationUpdateModal";
import TableContainer from "../Utils/TableContainer";
import Tippy from "@tippyjs/react";
import BaseModal from "../Utils/BaseModal";

class QuotationContainer extends Component {
    state = {
        previewQuotationModal: false,
        showQuotationModal: false,
        quotationId: null,
        editQuotationModal: false,
        headingData: [
            "S. No.",
            "Quotation No",
            "Party Name",
            "Date",
            "Amount",
            "Actions"
        ]
    }

    componentDidMount() {
        let { fetchClient, fetchProduct, fetchQuotation } = this.props;
        fetchClient();
        fetchProduct();
        fetchQuotation();
    }

    handleModal = (show = false, show2 = false, invoiceId = null, edit = false, remove = false) => {
        this.setState({
            showQuotationModal: show,
            previewQuotationModal: show2,
            quotationId: invoiceId,
            editQuotationModal: edit,
            removeModal: remove
        });
    };

    cardTemplate = (rowItem) =>{
        return(
            <div onClick={() => this.handleModal(false, true, rowItem?._id)} key={rowItem?._id} className="card m-3" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title text-center" style={{height: '5rem'}}>{rowItem?.billing_address?.name}</h5>
                    <p className="card-text pt-3"><b>Invoice: </b> {rowItem?.invoice_number}</p>
                    <p className="card-text"><b>Date: </b> {moment(rowItem?.invoiceDate).format('DD-MMM-YYYY')}</p>
                    <p className="card-text"><b>Amount: </b> {rowItem?.total_amount.toFixed(2)}</p>
                </div>
            </div>
        )
    }

    renderRowItem = (item, index) => {
        // if(item?.total_amount <= item?.paid_amount){
        //     color = 'green'
        // } else {
        //     color = 'orange'
        // }

        // let pending_amount = (item && item.total_amount) ? Number(item.total_amount- (item.paid_amount ? item.paid_amount : 0)) : 0
        // const textDecoration = color === 'red' ? {textDecoration: "line-through"} : {}
        return (
            <tr key={item?._id}>
                <td onClick={() => this.handleModal(false, true, item?._id)} className={'text-center'}>{index + 1}</td>
                <td onClick={() => this.handleModal(false, true, item?._id)} className={'text-center'}>{item?.invoice_number}</td>
                <td onClick={() => this.handleModal(false, true, item?._id)}>{item?.billing_address?.name}</td>
                <td onClick={() => this.handleModal(false, true, item?._id)} className={'text-center'}>{moment(item?.invoiceDate).format('DD-MMM-YYYY')}</td>
                <td onClick={() => this.handleModal(false, true, item?._id)} className={'text-center'} style={{ width: "10%" }}>₹ {item?.total_amount || 0}</td>
                {/*<td className={'text-center'} style={{ width: "10%"}}>₹ {item?.paid_amount || 0}</td>*/}
                {/*<td className={'text-center'} style={{ width: "10%"}}>₹ {pending_amount || 0}</td>*/}
                {/*<td className={'text-center'} style={{color}}>{item?.gst_amount.toFixed(2)}</td>*/}
                <td className={'text-center'}>
                    {/*<span*/}
                    {/*    // onClick={()=>this.handleModal(false, true, item?._id)}*/}
                    {/*>*/}
                    {/*   <Tippy content="Preview">*/}
                    {/*        <i className="bx bxs-printer"></i>*/}
                    {/*    </Tippy>*/}
                    {/*</span>*/}
                    <span className={'ml-2'}
                          onClick={()=>this.handleModal(false, false, item?._id, true)}
                    >
                       <Tippy content="Edit">
                            <i className="bx bxs-edit"/>
                        </Tippy>
                    </span>
                    <span className={'ml-2'}
                          onClick={() => this.handleModal(false, false, item?._id, false, true)}
                    >
                       <Tippy content="Delete">
                            <i className="fe fe-delete"/>
                        </Tippy>
                    </span>

                </td>
            </tr>
        );
    };

    getFilterUserOrder = () => {
        let { searchText } = this.state;
        let { quotation } = this.props;

        let data = quotation && Object.values(quotation)
        if (searchText) {
            data = data.filter(o=> o && o.billing_address.name.includes(searchText))
        }

        return data || [];
    }

    deleteInvoice = () => {
        let {quotationId} = this.state;
        this.setState({isLoading: true});
        this.props.deleteQuotation(quotationId)
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

    render(){
        let { previewQuotationModal, showQuotationModal, quotationId, editQuotationModal, removeModal } = this.state;
        let invoice = this.getFilterUserOrder();
        let list = !previewQuotationModal && invoice && Array.isArray(invoice) && invoice.length > 0 && invoice;
        return(
            <>
            <div className={'row'}>
                <div className="col-md-12">
                    {previewQuotationModal ? <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-title-left">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleModal(false, false, null)}
                                >
                                    <i className="fe fe-arrow-left mr-2"></i> Back
                                </button>
                            </div>
                            {/*<TextInput value={} onChange={this.handleHeight}/>*/}
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
                                        Quotation List
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Generate Quotation
                                </button>
                            </div>
                        </div>}
                </div>

                {/*{*/}
                {/*    list && list.map(o=>this.cardTemplate(o))*/}
                {/*}*/}
                {previewQuotationModal &&
                    <PreviewQuotation invoice={this.props.quotation[quotationId]}/>
                }
                <QuotationModal
                    // invoiceId={invoiceId}
                    show={showQuotationModal}
                    handelModal={this.handleModal}
                />

                <QuotationUpdateModal
                    quotationId={quotationId}
                    key={quotationId}
                    show={editQuotationModal}
                    handelModal={this.handleModal}
                />

            </div>
                {
                    !previewQuotationModal &&
                    <TableContainer
                        title={"Purchase"}
                        rowData={list ? list : []}
                        renderRow={this.renderRowItem}
                        // filter={{ searchText: this.state.searchText }}
                        // onSearch={this.onSearch}
                        searchPlaceholder={'Search by party'}
                        totalEntries={list && list.length}
                        showFilter={false}
                        // filterOption={["All", "Pending", "Completed", "Rejected"]}
                        headings={this.state.headingData}/>
                }
                <BaseModal
                    closeButton={false}
                    title={"Delete Quotation"}
                    show={removeModal}
                    size={'md'}
                    footerComponent={this.renderFooter}
                >
                    Are you sure to delete this <b>{list && list.find(o=> o && o._id ===quotationId)?.invoice_number} </b>?
                </BaseModal>
            </>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        product: state?.product?.products,
        quotation: state?.quotation?.quotation,
        loading: state?.client?.loading,
        error: state?.client?.error
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (params) => dispatch(fetchAllClientsRequest(params)),
        fetchProduct: (params) => dispatch(fetchAllProductsRequest(params)),
        fetchQuotation: (params) => dispatch(fetchAllQuotationRequest(params)),
        deleteQuotation: (params) => dispatch(deleteQuotationRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuotationContainer);