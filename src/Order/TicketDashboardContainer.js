import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import { searchAllOrderRequest, selectOrdersRequest } from "./Duck/OrderActions";
import BreadCrumb from "../Utils/BreadCrumb";
import OrderItem from "./Components/OrderItem";
import CancelOrderModal from "./Components/CancelOrderModal";
import appUrl from "../Constants/AppUrl";
import { showNotification } from "../Utils/CommonFunctions";
import fileDownload from "js-file-download";
import axios from "axios";

class TicketDashboardContainer extends Component {
    constructor(props) {
        super(props);

        let filter = props?.filter;

        this.state = {
            fromDate: (filter?.created_from && moment(filter?.created_from).toDate()) || null,
            toDate: (filter?.created_to && moment(filter?.created_to).toDate()) || null,
            payment_method: filter?.payment_method || "",
            logistic_id: filter?.logistic_id || "",
            goToIndividualOrder: false,
            goToBulkOrderList: false,
            goToIndividualOrderInvoice: false,
            orderId: null,
            error: null,
            showPreviewOfFileId: null,
            allAttachments: [],
            filter: JSON.stringify({ pathname: props?.location?.pathname }),
            showCancelOrderModal: false,
            order: null,
        };

        this.selectDateFrom = this.selectDateFrom.bind(this);
        this.selectDateTo = this.selectDateTo.bind(this);
    }

    componentDidMount() {
        let { printSelection, selectOrders } = this.props;

        this.loadMoreOrders();
        selectOrders && selectOrders(printSelection, false);
    }

    loadMoreOrders = (offset = 0, limit = 100) => {
        let { fromDate, toDate, orderType, payment_method, logistic_id, awbNumber } = this.state;
        let { fetchAllOrders, orderList, orderMeta, location } = this.props;

        if (offset === 0 || orderMeta?.total_count > orderList?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
                payment_status: "complete",
                ticket: "raised",
            };

            if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
            if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();
            if (orderType)  params.order_type = orderType;
            if (payment_method && payment_method !== "all")  params.payment_method = payment_method;
            if (logistic_id && logistic_id !== "all")  params.logistic_id = logistic_id;
            if (awbNumber)  params.awb = awbNumber.trim();

            fetchAllOrders && fetchAllOrders(params);
        }
    }

    selectDateFrom = (date) => {
        if(this.state.toDate !== null && moment(date).isAfter(moment(this.state.toDate))){
            // alert('From date should not be greater than to date')
            this.setState({error: 'From date should not be greater than to date'})
            return false
        }
        this.setState({
            fromDate: date,
            error: null
        });
    }
    selectDateTo = (date) => {
        if(this.state.fromDate !== null && moment(date).isBefore(moment(this.state.fromDate))){
            // alert('To date should not be less than from date')
            this.setState({error: 'To date should not be less than from date'})
            return false
        }
        this.setState({
            toDate: date,
            error: null
        });
    }

    handleAWB = (e) => {
        this.setState({awbNumber: e?.target?.value})
    }

    handleOrderType = (e) => {
        this.setState({orderType: e?.target?.value})
    }

    onFilterOrder = () => {
        this.setState({
            error: null,
        });

        this.loadMoreOrders();
    }

    handleChange = (name) => (e) => {
        let value = e?.target?.value;

        this.setState({
            [name]: value
        });
    }

    reset = () => {
        this.setState({
            fromDate: null,
            toDate: null,
            orderType:'',
            payment_method:'',
            logistic_id:'',
            awbNumber:'',
            error: null
        }, () => {
            this.onFilterOrder();
        });
    }

    onShowPrintPreview = () => {
        let { history } = this.props;
        history.push("/app/ShipmentPrintModal/");
    }

    onDeselectAll = () => {
        let { printSelection, selectOrders } = this.props;
        selectOrders && selectOrders(printSelection, false);
    }

    handleCancelOrderModal = (show = false, order) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showCancelOrderModal: show,
            order
        })
    }

    onDownload = () => {
        let { fromDate, toDate, orderType, payment_method, logistic_id, awbNumber } = this.state;

        let params = {
            payment_status: "complete",
            ticket: "raised",
        };

        if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
        if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();
        if (orderType)  params.order_type = orderType;
        if (payment_method && payment_method !== "all")  params.payment_method = payment_method;
        if (logistic_id && logistic_id !== "all")  params.logistic_id = logistic_id;
        if (awbNumber)  params.awb = awbNumber.trim();

        this.setState({ downloading: true });
        axios({
            method: "GET",
            url: `${appUrl.ORDERS_URL}/download`,
            params: params,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => {
            console.log("res.data", res, typeof res.data);
            fileDownload(res.data, `Ticket-List-${moment().format("DD-MM-YYYY")}.xlsx`);
            this.setState({ downloading: false });
        })
        .catch(err => {
            let resData = String.fromCharCode.apply(null, new Uint8Array(err.response.data));
            showNotification("error", resData?.meta?.message || resData?.message || "Error in Download file");
            console.log("onDownloadOrder ", resData);
            this.setState({ downloading: false });
        });
    }

    render() {
        let { orderList, orderMeta, loading, logistics, filter, printSelection, selectOrders } = this.props;
        let { downloading } = this.state;

        let pendingCount = orderMeta?.total_pending_count || 0;
        let totalAmount = orderMeta?.total_amount || 0;
        let individualCount =  orderMeta?.total_individual_count || 0;
        let bulkUploadCount =  orderMeta?.total_bulk_upload_count || 0;
        let bulkOrderCount =  orderMeta?.total_bulk_order_count || 0;
        let ticketRaisedCount = orderMeta?.totalCount || orderMeta?.total_count || 0;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Ticket List
                                    </h2>
                                    <BreadCrumb
                                        title = {['Shipment', 'Ticket List']}
                                    />
                                </div>
                            </div>
                            {/*<div className="page-title-right">*/}
                            {/*    <button*/}
                            {/*        type="button"*/}
                            {/*        className="btn btn-primary my-2 btn-icon-text"*/}
                            {/*        data-toggle="modal"*/}
                            {/*        data-target="#addUserModal"*/}
                            {/*    >*/}
                            {/*        <i className="fe fe-plus mr-2"></i> Add New Order*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card ttl_amt">
                            <div>
                                <img src="/images/rupee.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{parseFloat(totalAmount).toFixed(2)}</h5>
                                <p className="mb-0">Total Amount</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card indivisual_orders">
                            <div>
                                <img src="/images/indivisual.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{individualCount}</h5>
                                <p className="mb-0">Individual Shipments</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card bulk_orders">
                            <div>
                                <img src="/images/bulk.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{bulkUploadCount}({bulkOrderCount})</h5>
                                <p className="mb-0">Bulk Upload</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card pending_orders">
                            <div>
                                <img src="/images/bulk.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{ticketRaisedCount || 0}</h5>
                                <p className="mb-0">Ticket Raised</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card pending_orders">
                            <div>
                                <img src="/images/pending.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{pendingCount}</h5>
                                <p className="mb-0">Pending Orders</p>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <h4 className="card-title">Filter</h4>
                            <div className="card-body">
                                <form>
                                    <div className="row order_filter">
                                        <div className="col-md-2 col-sm-3 col-6 datePicker">
                                            <label>
                                                <DatePicker

                                                    selected={this.state.fromDate}
                                                    onChange={this.selectDateFrom}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    placeholderText="From"
                                                    maxDate={new Date()}
                                                    isClearable
                                                />
                                                {
                                                !this.state.fromDate &&
                                                    <span>
                                                        <i className="bx bx-calendar-alt"></i>
                                                    </span>
                                                }
                                            </label>
                                        </div>
                                        <div className="col-md-2 col-sm-3 col-6 datePicker">
                                            <label>
                                                <DatePicker
                                                    selected={
                                                        this.state.toDate
                                                    }
                                                    onChange={this.selectDateTo}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    placeholderText="To"
                                                    maxDate={new Date()}
                                                    isClearable
                                                />
                                                {
                                                    !this.state.toDate &&
                                                        <span>
                                                            <i className="bx bx-calendar-alt"></i>
                                                        </span>
                                                }
                                            </label>
                                        </div>
                                        <div className="col-md-2 col-sm-3 col-12">
                                            <select className="form-control" placeholder='Order Type' value={this.state.orderType} onChange={this.handleOrderType}>
                                                <option value='all'>All Shipments</option>
                                                <option value='individual'>Individual</option>
                                                <option value='bulk'>Bulk</option>
                                            </select>
                                        </div>

                                        <div className="col-md-3 col-sm-3 col-12">
                                            <select
                                                className="form-control"
                                                value={this.state.payment_method}
                                                onChange={this.handleChange("payment_method")}
                                            >
                                                <option value='all'>All Payment Modes</option>
                                                <option value='cod'>COD</option>
                                                <option value='prepaid'>Prepaid</option>
                                            </select>
                                        </div>

                                        {
                                            logistics?.length &&
                                            <div className="col-md-3 col-sm-3 col-12">
                                                <select
                                                    className="form-control"
                                                    value={this.state.logistic_id}
                                                    onChange={this.handleChange("logistic_id")}
                                                >
                                                    <option value='all'>All Partners</option>
                                                    {
                                                        logistics &&
                                                        logistics.map((cp, index) => (
                                                            <option
                                                                key={index}
                                                                value={cp?._id}
                                                            >{cp?.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        }

                                        {/* <div className="col-md-2 col-sm-3 col-12">
                                            <select className="form-control">
                                                <option>Order by</option>
                                                <option>India</option>
                                                <option>London</option>
                                            </select>
                                        </div> */}
                                        <div className="col-md-3 col-sm-5">
                                            {/* <select className="form-control">
                                                <option>
                                                    AWB
                                                </option>
                                                <option>India</option>
                                                <option>London</option>
                                            </select> */}
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter AWB number"
                                                onChange={this.handleAWB}
                                                value={this.state.awbNumber}
                                                autoComplete='on'
                                            />
                                        </div>
                                        <div className="col-md-3 col-sm-4">
                                            <div className="filter_btns d-flex align-items-start">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mr-2 btn-icon-text"
                                                    onClick={this.onFilterOrder}
                                                    style={{width:80}}
                                                >
                                                    Search
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-icon-text"
                                                    onClick={this.reset}
                                                    style={{width:80}}
                                                >
                                                    Reset
                                                </button>
                                            </div>
                                        </div>

                                        {
                                            // permissions?.report?.user_usage?.download &&
                                            (orderMeta?.totalCount || orderMeta?.total_count) >= 1 &&
                                            <div className="col-md-12 col-sm-12">
                                                <div className="filter_btns d-flex align-items-start justify-content-end">
                                                    <button
                                                        className="btn btn-link ml-2 btn-icon-text"
                                                        onClick={this.onDownload}
                                                        disabled={downloading}
                                                    >
                                                        {
                                                            downloading
                                                            ? (
                                                                <>
                                                                    <i className="bx bx-loader bx-spin"></i>
                                                                    <span>Downloading</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <i className="fa fa-download mr-2" aria-hidden="true" />
                                                                    <span>Download</span>
                                                                </>
                                                            )
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </form>
                                {
                                    this.state.error &&
                                    <div className='mt-1' style={{color:'red'}}>{this.state.error}</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings={[
                        "No.",
                        "AWB Number",
                        "Created by",
                        "Shipment Date",
                        "Payment Mode",
                        "Delivery partner",
                        "Estimated TAT",
                        "Ticket Status",
                        "Status",
                        "Action",
                    ]}
                    showSelectAll={true}
                    totalEntries={orderMeta?.totalCount || orderMeta?.total_count}
                    rowData={orderList}
                    renderRow={(item, index) => (
                        <OrderItem
                            id={item}
                            index={index}
                            showSelect
                            showCancelOrder
                            showTicketStatus
                            handleCancelOrderModal={this.handleCancelOrderModal}
                            {...this.props}
                        />
                    )}
                    showSearch={false}
                    loading={loading}
                    filter={filter}
                    selectedList={printSelection}
                    onSelectAll={selectOrders}
                    actionBtnText={"Label Preview"}
                    showActionBtn={printSelection?.length > 0}
                    onClickAction={this.onShowPrintPreview}
                    onClickDeselectAction={this.onDeselectAll}
                    loadMore={this.loadMoreOrders}
                />

                <CancelOrderModal
                    show={this.state.showCancelOrderModal}
                    onHide={this.handleCancelOrderModal}
                    order={this.state.order}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;
    let pathname = location?.pathname;

    let logistics = state.logistics?.data;

    let orderState = state.order;

    let filter = state.order?.filters[pathname];

    let boards = state.order?.boards;

    let mBoard = boards[JSON.stringify(filter || {})];
    let orderList = mBoard?.list;
    let orderMeta = mBoard?.meta;
    let loading = mBoard?.loading;
    let error = mBoard?.error;

    let printSelection = state.order?.printSelection;

    return {
        filter: filter,
        orderList: orderList,
        orderMeta: orderMeta,
        loading: loading,
        error: error,
        logistics: logistics,
        printSelection: printSelection,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrders: (prams) => dispatch(searchAllOrderRequest(prams)),
        selectOrders: (ids, isSelected) => dispatch(selectOrdersRequest(ids, isSelected)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketDashboardContainer);
