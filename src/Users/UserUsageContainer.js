import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TableContainer from "../Utils/TableContainer";
import { connect } from "react-redux";
import { fetchAllUsersUsageRequest } from "./Duck/UsersActions";
import UsageItem from "./Components/UsageItem";
import BreadCrumb from "../Utils/BreadCrumb";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import axios from "axios";
import appUrl from "../Constants/AppUrl";
import fileDownload from "js-file-download";
import { showNotification } from "../Utils/CommonFunctions";

class UserUsageContainer extends Component {
    constructor(props) {
        super(props);

        let { filter } = props;

        this.state = {
            searchText: filter?.text || "",
            fromDate: (filter?.created_from && moment(filter?.created_from).toDate()) || null,
            toDate: (filter?.created_to && moment(filter?.created_to).toDate()) || null,
            error: null,
            downloading: false,
        };
    }

    componentDidMount() {
        this.loadMore();
    }

    loadMore = (offset = 0, limit = 100) => {
        let { searchText, fromDate, toDate } = this.state;
        let { location, meta, list, fetchAllUsersUsage } = this.props;
        searchText = searchText.trim();

        if (offset === 0 || meta?.total_count > list?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
            };

            if (searchText) params.text = searchText;
            if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
            if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();

            fetchAllUsersUsage && fetchAllUsersUsage(params);
        }
    }

    selectDateFrom = (date) => {
        if(this.state.toDate !== null && moment(date).isAfter(moment(this.state.toDate))) {
            this.setState({error: 'From date should not be greater than to date'})
            return false
        }

        console.log("date", date);
        this.setState({
            fromDate: date,
            error: null
        });
    }
    selectDateTo = (date) => {
        if(this.state.fromDate !== null && moment(date).isBefore(moment(this.state.fromDate))) {
            this.setState({error: 'To date should not be less than from date'})
            return false
        }
        this.setState({
            toDate: date,
            error: null
        });
    }

    onFilterOrder = () => {
        this.setState({
            error: null,
        });

        this.loadMore();
    }

    onReset = () => {
        this.setState({
            fromDate: null,
            toDate: null,
            orderType:'',
            payment_method:'',
            logistic_id:'',
            error: null,
            searchText: "",
        }, this.onFilterOrder);
    }

    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        }, this.loadMore)
    }

    onDownload = () => {
        let { searchText, fromDate, toDate } = this.state;
        searchText = searchText.trim();

        let params = {};
        if (searchText) params.text = searchText;
        if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
        if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();

        this.setState({ downloading: true });
        axios({
            method: "GET",
            url: `${appUrl.USERS_URL}/usage-download`,
            params: params,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => {
            console.log("res.data", res, typeof res.data);
            fileDownload(res.data, `user-usage-${moment().format("DD-MM-YYYY")}.xlsx`);
            this.setState({ downloading: false });
        })
        .catch(err => {
            showNotification("error", "Error in Download file");
            console.log("onDownloadUsage ", err);
            this.setState({ downloading: false });
        });
    }

    render() {
        let { searchText, downloading } = this.state;
        let { list, meta, loading, filter, loggedInUser } = this.props;

        let totalAmount = meta?.total_amount || 0;
        let individualCount = meta?.total_individual_count || 0;
        let bulkUploadCount = meta?.total_bulk_upload_count || 0;
        let bulkOrderCount = meta?.total_bulk_order_count || 0;

        let permissions = loggedInUser?.role?._id?.permissions || {};

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        User Usage
                                    </h2>

                                    <BreadCrumb
                                        title = {['Reports', 'User Usage']}
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
                                                <ReactDatePicker
                                                    selected={this.state.fromDate}
                                                    onChange={this.selectDateFrom}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    placeholderText="From"
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
                                                <ReactDatePicker
                                                    selected={
                                                        this.state.toDate
                                                    }
                                                    onChange={this.selectDateTo}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                    placeholderText="To"
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
                                                    onClick={this.onReset}
                                                    style={{ width:80 }}
                                                >
                                                    Reset
                                                </button>


                                            </div>
                                        </div>

                                        {
                                            permissions?.report?.user_usage?.download &&
                                            meta?.total_count >= 1 &&
                                            <div className="col-md-4 col-sm-5">
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
                        "User Type",
                        "Name",
                        "Total shipments",
                        "Total amount",
                        { text: "Last shipment date", style: {} },
                        { text: "Created at", style: {} },
                    ]}
                    filter={filter}
                    searchPlaceholder={"Search by name"}
                    defaultSearchText={searchText}
                    onSearch={this.onSearch}
                    totalEntries={meta?.total_count}
                    rowData={list}
                    loadMore={this.loadMore}
                    loading={loading}
                    renderRow={(item, index) => (
                        <UsageItem
                            id={item}
                            index={index}
                            history={this.props.history}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;
    let pathname = location?.pathname;

    let filter = state.users?.filters[pathname];

    let boards = state.users?.usageBoards;

    let mBoard = boards[JSON.stringify(filter || {})];
    let list = mBoard?.list;
    let meta = mBoard?.meta;
    let loading = mBoard?.loading;

    let loggedInUser = state.loggedInUser?.data?.data;

    return {
        filter: filter,
        list: list,
        meta: meta,
        loading: loading,
        loggedInUser: loggedInUser,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersUsage: (params) => dispatch(fetchAllUsersUsageRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUsageContainer);
