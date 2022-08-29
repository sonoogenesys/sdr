import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { connect } from "react-redux";
import { downloadInvoiceOrdersRequest, getAllInvoiceOrdersRequest } from "../Order/Duck/OrderActions";
import TableContainer from "../Utils/TableContainer";
import InvoiceItem from "./Components/InvoiceItem";
import BreadCrumb from "../Utils/BreadCrumb";

class InvoiceDashboard extends Component {

    constructor(props) {
        super(props);

        let filter = props?.filter;

        this.state = {
            fromDate: (filter?.created_from && moment(filter?.created_from).toDate()) || null,
            toDate: (filter?.created_to && moment(filter?.created_to).toDate()) || null,
            orderType: filter?.order_type || 'all',
            logistic_id: filter?.logistic_id || "",

        }
    }

    componentDidMount() {
        this.loadMoreOrders();
    }

    loadMoreOrders = (offset = 0, limit = 100) => {
        let { fromDate, toDate, orderType, payment_method, logistic_id } = this.state;
        let { fetchAllOrders, orderList, orderMeta, location } = this.props;

        if (offset === 0 || orderMeta?.total_count > orderList?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
                order_status: "delivered",
                payment_status: "complete",
            };

            if (fromDate)  params.delivery_from = moment(fromDate).startOf('day').utc().format();
            if (toDate)  params.delivery_to = moment(toDate).endOf('day').utc().format();
            if (orderType && orderType !== "all")  params.order_type = orderType;
            if (logistic_id && logistic_id !== "all")  params.logistic_id = logistic_id;

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

    handleChange = (name) => (e) => {
        let value = e?.target?.value;

        this.setState({
            [name]: value,
        });
    }

    onFilterOrder = () => {
        this.setState({ error: null });
        this.loadMoreOrders();
    }

    onDownloadOrder = () => {
        let { fromDate, toDate, } = this.state;
        let { downloadInvoiceOrders, location } = this.props;

        let params = {
            pathname: location?.pathname,
            order_status: "delivered",
            payment_status: "complete",
        };

        if (fromDate)  params.delivery_from = moment(fromDate).startOf('day').utc().format();
        if (toDate)  params.delivery_to = moment(toDate).endOf('day').utc().format();

        downloadInvoiceOrders && downloadInvoiceOrders(params);
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
        }, this.onFilterOrder);
    }

    onShowPrintPreview = () => {
        let { history } = this.props;
        history.push("/app/ManifestPickup/");
    }

    onDeselectAll = () => {
        let { printSelection, selectOrders } = this.props;
        selectOrders && selectOrders(printSelection, false);
    }

    render() {
        let { orderList, orderMeta, loading, filter, downloading } = this.props;

        let total_amount = orderMeta?.total_amount || 0;
        let total_tax = orderMeta?.total_tax || 0;
        let total_amount_with_tax = orderMeta?.total_amount_with_tax || 0;

        return (
            <>
                 <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Invoice Details
                                    </h2>

                                    <BreadCrumb
                                        title = {['Billing & Wallet', 'Invoice Details']}
                                    />
                                </div>
                            </div>
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
                                <h5 className="mb-0">{parseFloat(total_amount_with_tax).toFixed(2)}</h5>
                                <p className="mb-0">Total Amount with GST</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card ttl_amt">
                            <div>
                                <img src="/images/rupee.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{parseFloat(total_amount).toFixed(2)}</h5>
                                <p className="mb-0">Total Amount</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3">
                        <div className="card flex-row align-items-center common_card ttl_amt">
                            <div>
                                <img src="/images/rupee.png"></img>
                            </div>
                            <div>
                                <h5 className="mb-0">{parseFloat(total_tax).toFixed(2)}</h5>
                                <p className="mb-0">Total GST Amount</p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <h4 className="card-title">Filter</h4>
                            <div className="card-body">
                                <div>
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
                                        {/* <div className="col-md-3 col-sm-3 col-12">
                                            <select
                                                className="form-control"
                                                value={this.state.orderType}
                                                onChange={this.handleChange("orderType")}
                                            >
                                                <option value='all'>All Shipments</option>
                                                <option value='individual'>Individual</option>
                                                <option value='bulk'>Bulk</option>
                                            </select>
                                        </div> */}

                                        {/* <div className="col-md-3 col-sm-3 col-12">
                                            <select
                                                className="form-control"
                                                value={this.state.payment_method}
                                                onChange={this.handleChange("payment_method")}
                                            >
                                                <option value='all'>All Payment Modes</option>
                                                <option value='cod'>COD</option>
                                                <option value='prepaid'>Prepaid</option>
                                            </select>
                                        </div> */}

                                        {/* <div className="col-md-3 col-sm-3 col-12">
                                            <select
                                                className="form-control"
                                                value={this.state.logistic_id}
                                                onChange={this.handleChange("logistic_id")}
                                            >
                                                <option value=''>Select Partner</option>
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
                                        </div> */}

                                        <div className="col">
                                            <div className="filter_btns d-flex align-items-start">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mr-2 btn-icon-text"
                                                    onClick={this.onFilterOrder}
                                                    style={{ width:80 }}
                                                >
                                                    Search
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-secondary btn-icon-text"
                                                    onClick={this.reset}
                                                    style={{ width:80 }}
                                                >
                                                    Reset
                                                </button>


                                            </div>
                                        </div>

                                        {
                                            (orderMeta?.totalCount || orderMeta?.total_count) >= 1 &&
                                            <div className="col-md-4 col-sm-5">
                                                <div className="filter_btns d-flex align-items-start justify-content-end">
                                                    <button
                                                        className="btn btn-link ml-2 btn-icon-text"
                                                        onClick={this.onDownloadOrder}
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
                                </div>
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
                        "No",
                        "Party Name",
                        "Address",
                        "GST No.",
                        "State Name",
                        "Contact Person",
                        "Contact No.",
                        "E-mail",
                        "Invoice No.",
                        "Invoice Date",
                        "AWB No.",
                        "Item Name",
                        "Description",
                        "Amount",
                        "GST @ 18%",
                        "Total with GST",
                        "Narration",
                    ]}
                    showSearch={false}
                    totalEntries={orderMeta?.totalCount || orderMeta?.total_count}
                    rowData={orderList}
                    renderRow={(item, index) => (
                        <InvoiceItem
                            id={item}
                            index={index}
                            showSelect
                            {...this.props}
                        />
                    )}
                    loading={loading}
                    filter={filter}
                    loadMore={this.loadMoreOrders}
                />

            </>
        )

    }

}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;

    let logistics = state.logistics?.data;

    let pathname = location?.pathname;
    let filter = state.order?.filters[pathname];

    let boards = state.order?.boards;
    let mBoard = boards[JSON.stringify(filter || {})];
    let orderList = mBoard?.list;
    let orderMeta = mBoard?.meta;
    let loading = mBoard?.loading;
    let downloading = mBoard?.downloading;

    return {
        filter: filter,
        orderList: orderList,
        orderMeta: orderMeta,
        loading: loading,
        downloading: downloading,
        logistics: logistics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrders: (prams) => dispatch(getAllInvoiceOrdersRequest(prams)),
        downloadInvoiceOrders: (prams) => dispatch(downloadInvoiceOrdersRequest(prams)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDashboard);