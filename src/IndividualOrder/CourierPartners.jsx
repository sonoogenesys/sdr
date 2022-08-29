import React, { Component } from "react";
import { connect } from "react-redux";
import CourierPartnerItem from "./Components/CourierPartnerItem";
import { fetchOrderRequest, selectCourierPartner } from "../Order/Duck/OrderActions";
import { Redirect } from "react-router-dom";

class CourierPartners extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: "",
            isSelected: false,
        };
    }

    componentDidMount() {
        let {match, getOrder, order} = this.props;
        let orderId = match?.params?.id;
        orderId && !order && getOrder && getOrder(orderId);
    }

    componentDidUpdate(preProps) {
        let {order, history} = this.props;

        if (order?._id && order?.transaction_id) {
            history.replace(`/app/individualinvoice/${order._id}`);
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
    }

    handleChange = (name) => (e) => {
        let value = e?.target?.value;

        this.setState({
            [name]: value,
        });
    };

    onSelectCourierPartner = (partner) => {
        let { order, orderId, selectCourierPartner, history } = this.props;

        selectCourierPartner && selectCourierPartner({orderId: orderId, partner: partner, choosePartner: partner});

        let bulk_id = order?.bulk_id;
        let path = bulk_id && !order?.transaction_id ? `/app/bulkShipmentList/${bulk_id}` : `/app/individualinvoice/${orderId}`;
        history.push(path);

        // this.setState({
        //     isSelected: true,
        // });
    }

    render() {
        let { searchText, isSelected } = this.state;
        let { orderId, order, history } = this.props;

        let loading = order?.loading;

        let availableLogistic = order?.available_logistic;
        availableLogistic = [...(availableLogistic?.filter(cp => cp.recommendation) || []), ...(availableLogistic?.filter(cp => !cp.recommendation) || [])];

        // if (isSelected || order?.transaction_id) {
        //     let bulk_id = order?.bulk_id;
        //     // if (bulk_id && !order?.transaction_id) {
        //     //     return <Redirect to={`/app/bulkShipmentList/${bulk_id}`} />;
        //     // } else {
        //     //     return <Redirect to={`/app/individualinvoice/${orderId}`} />;
        //     // }
        // }

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Select Courier Partner
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Shipment</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Courier Partner
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
                                    <i className="fa fa-arrow-circle-left"></i>{" "}
                                    Back
                                </button>
                            </div>

                            {/* <div className="page-title-right">
                                <div className="app-search d-lg-block">
                                    <div className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control bg-white"
                                            placeholder="Search ..."
                                            value={searchText}
                                            onChange={this.handleChange(
                                                "searchText"
                                            )}
                                        />
                                        <span className="fe fe-search"></span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4 className="card-title border-0">Companies</h4>
                                </div>
                                <div className="col-m-3">
                                    <h4 className="card-title border-0">*Price Excluding GST Amount</h4>
                                </div>
                                <div className="col-md-2 ml-1">
                                    <h4 className="card-title border-0">Time </h4>

                                </div>
                            </div>
                        </div>

                        {
                            loading &&
                            <div className="d-flex align-items-center justify-content-center m-5">
                                <samp className="spinner-border mr-2" role="status"></samp>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }

                        {
                            Array.isArray(availableLogistic) &&
                            availableLogistic.map((courierPartner, index) => (
                                <CourierPartnerItem
                                    key={index}
                                    logo={"/images/wow.png"}
                                    name={courierPartner?.name}
                                    // price={courierPartner?.price?.final_pay}
                                    price={courierPartner?.price?.total_value}
                                    cod_charges={courierPartner?.price?.cod_charges}
                                    workingDays={courierPartner?.price?.day}
                                    isSelected={false}
                                    isRecommendation={courierPartner?.recommendation}
                                    isBestPrice={courierPartner?.best_price}
                                    isBestTat={courierPartner?.best_tat}
                                    onClick={() => this.onSelectCourierPartner(courierPartner)}
                                />
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let orderId = match?.params?.id;
    let orders = state?.order?.orders;
    let order = orders && orderId && orders[orderId];

    return {
        orderId: orderId,
        orders: orders,
        order: order,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOrder: (id) => dispatch(fetchOrderRequest(id)),
        selectCourierPartner: (params) => dispatch(selectCourierPartner(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourierPartners);
