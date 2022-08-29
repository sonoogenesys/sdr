import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import TableContainer from "../Utils/TableContainer";
import { connect } from "react-redux";
import { fetchUserUsageRequest } from "./Duck/UsersActions";
import { searchAllOrderRequest } from "../Order/Duck/OrderActions";
import UsageOrderItem from "./Components/UsageOrderItem";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

class UsageDetailsContainer extends Component {

    constructor(props) {
        super(props);

        let filter = props?.filter;

        this.state = {
            fromDate: (filter?.created_from && moment(filter?.created_from).toDate()) || null,
            toDate: (filter?.created_to && moment(filter?.created_to).toDate()) || null,
            error: null,
            filter: JSON.stringify({ pathname: props?.location?.pathname }),
            order: null,
        };
    }

    componentDidMount() {
        let { userId, fetchUserUsageRequest } = this.props;
        if (userId && fetchUserUsageRequest) {
            fetchUserUsageRequest(userId);
        }

        this.loadMore();
    }

    loadMore = (offset = 0, limit = 100) => {
        let { fromDate, toDate } = this.state;
        let { userId, fetchAllOrders, list, meta, location } = this.props;

        if (offset === 0 || meta?.total_count > list?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
                payment_status: "complete",
                created_by: userId,
            };

            if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
            if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();

            fetchAllOrders && fetchAllOrders(params);
        }
    }

    selectDateFrom = (date) => {
        if(this.state.toDate !== null && moment(date).isAfter(moment(this.state.toDate))) {
            this.setState({error: 'From date should not be greater than to date'})
            return false
        }
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

    onGoBack = () => {
        let { history } = this.props;
        history.replace('/app/userusage');
    }

    render() {
        let { mUser = {}, list, meta, loading, filter } = this.props;

        let totalAmount = meta?.total_amount || 0;
        let individualCount = meta?.total_individual_count || 0;
        let bulkUploadCount = meta?.total_bulk_upload_count || 0;
        let bulkOrderCount = meta?.total_bulk_order_count || 0;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        {mUser?.first_name} Usage Report
                                    </h2>
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left mr-2"></i>Back
                                </button>
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
                                <form>
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
                        "Shipment Date",
                        "Payment Mode",
                        "Delivery partner",
                        "Estimated TAT",
                        "Action",
                    ]}
                    showSearch={false}
                    filter={filter}
                    totalEntries={meta?.totalCount || meta?.total_count}
                    rowData={list}
                    loadMore={this.loadMore}
                    loading={loading}
                    renderRow={(item, index) => (
                        <UsageOrderItem
                            id={item}
                            index={index}
                            history={this.props.history}
                            showOrderDetails={false}
                            showStatus={false}
                            showRefresh={false}
                            showCancel={false}
                            showTicket={false}
                            showCreateRTO={false}
                        />
                    )}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { location, match } = ownProps;

    let pathname = location?.pathname;
    let userId = match?.params?.id;

    let usages = state.users?.usages;
    let mUser = userId && usages && usages[userId];

    let filter = state.order?.filters[pathname];
    let boards = state.order?.boards;

    let mBoard = boards[JSON.stringify(filter || {})];
    let list = mBoard?.list;
    let meta = mBoard?.meta;
    let loading = mBoard?.loading;

    return {
        filter: filter,
        userId: userId,
        mUser: mUser,
        list: list,
        meta: meta,
        loading: loading,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserUsageRequest: (id) => dispatch(fetchUserUsageRequest(id)),
        fetchAllOrders: (prams) => dispatch(searchAllOrderRequest(prams)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsageDetailsContainer);
