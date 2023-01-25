import React, { useEffect, useState, useRef } from "react";
import TableComponent from "./tableComponent";
import moment from 'moment'
import PurchaseModal from "./PurchaseModal";
import PurchaseUpdateModal from "./PurchaseUpdateModal";
import {fetchAllClientsRequest} from "../Client/Duck/ClientsActions";
import {fetchAllProductsRequest} from "../Product/Duck/ProductsActions";
import {fetchAllPurchaseRequest, deletePurchaseRequest} from "./Duck/PurchaseActions";
import {connect} from "react-redux";
import TableContainer from "../Utils/TableContainer";
import Tippy from "@tippyjs/react";
import TextInput from "../Utils/TextInput";
import BaseModal from "../Utils/BaseModal";

class OrderPurchase extends React.Component {
    state = {
        headingData: [
            "S. No.",
            // "Unique No",
            "Party Name",
            // "Billing to",
            "Date",
            "Invoice Amount",
            "Paid Amount",
            "Pending Amount",
            "Paid Date",
            "GST",
            "Actions"
        ],
        showPurchaseModal: false,
        previewPurchaseModal: false,
        purchaseId: null,
        screenHeight: 455,
        editPurchaseModal: false,
        removeModal: false,
        showToggleUserStatusModal: false,
        searchText: "",
        isLoading: false
    }
    handleHeight = (e) => {
        this.setState({screenHeight: e.target.value})
    }

    handleModal = (show = false, show2 = false, purchaseId = null, edit = false, remove = false) => {
        this.setState({
            showPurchaseModal: show,
            previewPurchaseModal: show2,
            purchaseId: purchaseId,
            editPurchaseModal: edit,
            removeModal: remove
        });
    };

    componentDidMount() {
        let { client, fetchClient, fetchProduct, fetchPurchase } = this.props;
            fetchClient();
            fetchProduct();
            fetchPurchase();
    }
    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        });
    };

    deletePurchase = () => {
        let {loggedInUser} = this.props;
        const isAdmin = loggedInUser && loggedInUser.role_id === "admin";
        if(isAdmin) {
            let {purchaseId} = this.state;
            this.setState({isLoading: true});
            this.props.deletePurchase(purchaseId)
            setTimeout(() => {
                this.setState({isLoading: false})
                this.handleModal();
            }, 2000)
        }
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
                    onClick={this.deletePurchase}
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
        let { purchase } = this.props;

        let data = purchase && Object.values(purchase)
        if (searchText) {
            data = data.filter(o=> o && o.party_address.name.toLowerCase().includes(searchText.toLowerCase()))
        }

        return data || [];
    }

    renderRowItem = (item, index) => {
        let color;
        if(item?.total_amount <= item?.paid_amount){
            color = 'green'
        } else {
            color = 'orange'
        }

        let pending_amount = (item && item.total_amount) ? Number(item.total_amount- (item.paid_amount ? item.paid_amount : 0)) : 0
        const textDecoration = color === 'red' ? {textDecoration: "line-through"} : {}
        return (
            <tr key={item?._id} style={{...textDecoration, color}}>
                <td className={'text-center'}>{item?.invoice_number}</td>
                <td>{item?.party_address?.name}</td>
                <td className={'text-center'}>{moment(item?.invoiceDate).format('DD-MMM-YYYY')}</td>
                <td className={'text-center'} style={{ width: "10%" }}>₹ {item?.total_amount || 0}</td>
                <td className={'text-center'} style={{ width: "10%"}}>₹ {item?.paid_amount || 0}</td>
                <td className={'text-center'} style={{ width: "10%"}}>₹ {pending_amount || 0}</td>
                <td className={'text-center'}>{item?.paidDate ? moment(item?.paidDate).format('DD-MMM-YYYY') : "-"}</td>
                <td className={'text-center'} style={{color}}>{item?.gst_amount.toFixed(2)}</td>
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

    render() {
        let { showPurchaseModal, previewPurchaseModal, purchaseId, screenHeight, editPurchaseModal, removeModal  } = this.state;
        let purchase = this.getFilterUserOrder();
        let totalCount = purchase?.length

        return (
            <>

                <div className="row">
                    <div className="col-md-12">
                        {previewPurchaseModal ? <div className="page-title-box d-flex align-items-center justify-content-between">
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
                                        Purchase List
                                    </h2>
                                </div>
                            </div>
                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleModal(true)}
                                >
                                    <i className="fe fe-plus mr-2"></i> Generate Purchase
                                </button>
                            </div>
                        </div>}
                    </div>
                </div>


                {previewPurchaseModal &&
                    <TableComponent screenHeight={screenHeight} purchase={this.props.purchase[purchaseId]}/>
                }
                {
                    !previewPurchaseModal &&
                        <TableContainer
                            title={"Purchase"}
                            rowData={purchase ? purchase : []}
                            renderRow={this.renderRowItem}
                            filter={{ searchText: this.state.searchText }}
                            onSearch={this.onSearch}
                            searchPlaceholder={'Search by party'}
                            totalEntries={totalCount}
                            showFilter={false}
                            // filterOption={["All", "Pending", "Completed", "Rejected"]}
                            headings={this.state.headingData}/>
                }
                <PurchaseModal
                    show={showPurchaseModal}
                    handelModal={this.handleModal}
                />
                <PurchaseUpdateModal
                    key={purchaseId}
                    invoiceId={purchaseId}
                    show={editPurchaseModal}
                    handelModal={this.handleModal}
                />
                <BaseModal
                    closeButton={false}
                    title={"Delete Purchase"}
                    show={removeModal}
                    size={'md'}
                    footerComponent={this.renderFooter}
                >
                    Are you sure to delete this <b>{purchase?.find(o=> o && o._id ===purchaseId)?.invoice_number} </b>?
                </BaseModal>




            </>
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        product: state?.product?.products,
        purchase: state?.purchase?.purchase,
        loading: state?.client?.loading,
        error: state?.client?.error,
        loggedInUser: state?.loggedInUser?.data?.data,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (params) => dispatch(fetchAllClientsRequest(params)),
        fetchProduct: (params) => dispatch(fetchAllProductsRequest(params)),
        fetchPurchase: (params) => dispatch(fetchAllPurchaseRequest(params)),
        deletePurchase: (params) => dispatch(deletePurchaseRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPurchase);

