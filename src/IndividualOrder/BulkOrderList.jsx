import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchBulkOrderRequest, selectCourierPartner } from "../Order/Duck/OrderActions";
import BulkOrderListItem from "./Components/BulkOrderListItem";

class BulkOrderList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            goToBulkInvoice: false,
        };
    }

    componentDidMount() {
        let { match, bulkOrder, fetchOrder } = this.props;
        let orderId = match?.params?.orderId;

        if (orderId && !bulkOrder) {
            fetchOrder && fetchOrder(orderId);
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    onPlaceOrder = () => {
        let { history, bulkOrderId } = this.props;
        history.push(`/app/bulkinvoice/${bulkOrderId}`);
        // this.setState({
        //     goToBulkInvoice: true,
        // });
    }

    goToSelectCourierPartner = (id) => {
        let { history } = this.props;
        history.push(`/app/courierpartner/${id}`);
        // this.setState({
        //     orderId: id,
        //     goToSelectCourierPartner: true,
        // });
    }

    handelSelectAll = (name) => (e) => {
        let { bulkOrder, bulkOrderId, selectedPartners, selectCourierPartner, } = this.props;
        let orders = bulkOrder?.orders;
        let isActive = e?.target?.checked;

        orders?.forEach(order => {
            let {
                _id,
                available_logistic,
            } = order;

            if (isActive) {
                let mPartner = available_logistic?.find(logistic => name === "isBestTat" ?  logistic?.best_tat : logistic?.best_price);
                selectCourierPartner({
                    orderId: _id,
                    partner: mPartner,
                    [name]: true,
                    bulkId: bulkOrderId,
                    selectAll: {
                        [name]: true,
                    }
                });
            } else {
                selectCourierPartner({
                    orderId: _id,
                    partner: selectedPartners[_id]?.choosePartner,
                    bulkId: bulkOrderId,
                });
            }
        });
    }

    render() {
        let { searchText, goToBulkInvoice, goToSelectCourierPartner, orderId } = this.state;
        let { bulkOrder, bulkOrderId, selectAll } = this.props;
        let orders = bulkOrder?.orders;
        let { isBestPrice = false, isBestTat = false } = selectAll;

        // if (goToBulkInvoice && bulkOrderId) {
        //     return <Redirect to={`/app/bulkinvoice/${bulkOrderId}`} />;
        // }

        // if (goToSelectCourierPartner && orderId) {
        //     return <Redirect to={`/app/courierpartner/${orderId}`} />;
        // }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Bulk Shipment Listing
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Shipment</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Bulk Shipment Listing
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-1"></i>
                                    Back
                                </button>
                            </div>

                            {/* <div className="page-title-right">
                                <form className="app-search d-lg-block">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control bg-white"
                                            placeholder="Search ..."
                                        />
                                        <span className="fe fe-search"></span>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div style={{position:'sticky', top:'70px', zIndex:1}}>
                    <div className="row">
                        <div className="col-xl-12 col-md-12 bulk_listbg pt-3 pb-2">
                            <div className="row">
                                <div className="col-md-1 text-center">
                                    <h6>Source</h6>
                                </div>
                                <div className="col-md-1 text-center">
                                    <h6>Destination</h6>
                                </div>

                                <div className="col-md-3 text-center">
                                    <h6>Recommended/Choosen Partner</h6>
                                </div>

                                <div className="col-md-3 text-center">
                                    <h6>Best Price</h6>
                                </div>
                                <div className="col-md-4 text-center">
                                    <h6>Shortest Delivery Time</h6>
                                </div>
                            </div>
                        </div>
                    </div>

                    {
                        !bulkOrder?.loading &&
                        <div className="row pt-3 pb-3" style={{background:'#F5F5F9'}}>
                            <div className="col-md-5">
                                *Price Excluding GST Amount
                            </div>
                            <div className="col-md-3 text-center">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-1"
                                        checked={isBestPrice}
                                        onClick={this.handelSelectAll("isBestPrice")}
                                    />
                                    <label className="form-check-label">
                                        Select All
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-4 text-center">
                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-1"
                                        checked={isBestTat}
                                        onClick={this.handelSelectAll("isBestTat")}
                                    />
                                    <label className="form-check-label">
                                        Select All
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {
                    bulkOrder?.loading ? (
                        <div className="d-flex align-items-center justify-content-center m-5">
                            <samp className="spinner-border mr-2" role="status"></samp>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <>
                            {
                                Array.isArray(orders) &&
                                orders.map((order, index) => order && (
                                    <BulkOrderListItem
                                        key={index}
                                        order={order}
                                        goToSelectCourierPartner={this.goToSelectCourierPartner}
                                    />
                                ))
                            }

                            <div className="row" style={{textAlign:'right', position:'sticky', bottom:0, background:'#F8F8FB', flexDirection:'row-reverse'}}>
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onPlaceOrder}
                                >
                                    Place Order
                                </button>
                            </div>
                        </>
                    )
                }

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let orderId = match?.params?.orderId;
    let orders = state?.order?.bulk?.orders;
    let order = orderId && orders && orders[orderId];

    let selectedPartners = state?.order?.selectedPartners;
    let selectAll = state?.order?.selectAll[orderId] || {};

    return {
        bulkOrderId: orderId,
        bulkOrder: order,
        selectedPartners: selectedPartners,
        selectAll: selectAll,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrder: (id) => dispatch(fetchBulkOrderRequest(id)),
        selectCourierPartner: (params) => dispatch(selectCourierPartner(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkOrderList);
