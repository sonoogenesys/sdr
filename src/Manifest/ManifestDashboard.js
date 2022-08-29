import React, { Component } from "react";
import BreadCrumb from "../Utils/BreadCrumb";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { connect } from "react-redux";
import { searchAllOrderRequest, selectOrdersRequest } from "../Order/Duck/OrderActions";
import TableContainer from "../Utils/TableContainer";
import OrderItem from "../Order/Components/OrderItem";

class ManifestDashboard extends Component {

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
        let { printSelection, selectOrders } = this.props;

        this.loadMoreOrders();
        selectOrders && selectOrders(printSelection, false);
    }

    loadMoreOrders = (offset = 0, limit = 100) => {
        let { fromDate, toDate, orderType, payment_method, logistic_id } = this.state;
        let { fetchAllOrders, orderList, orderMeta, location } = this.props;

        if (offset === 0 || orderMeta?.total_count > orderList?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
                payment_status: "complete",
            };

            if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
            if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();
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
        history.push("/app/ManifestPickup/");
    }

    onDeselectAll = () => {
        let { printSelection, selectOrders } = this.props;
        selectOrders && selectOrders(printSelection, false);
    }

    render() {
        let { orderList, orderMeta, loading, logistics, filter, printSelection, selectOrders } = this.props;
        let { logistic_id } = this.state;

        return (
            <>
                 <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Manifest
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Manifest
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a href="#">Manifest</a>
                                        </li>
                                    </ol>
                                </div>
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
                                        <div className="col-md-3 col-sm-3 col-12">
                                            <select
                                                className="form-control"
                                                value={this.state.orderType}
                                                onChange={this.handleChange("orderType")}
                                            >
                                                <option value='all'>All Shipments</option>
                                                <option value='individual'>Individual</option>
                                                <option value='bulk'>Bulk</option>
                                            </select>
                                        </div>

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

                                        <div className="col-md-3 col-sm-3 col-12">
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
                        { text: "No.", style: { textAlign: "center" }},
                        "AWB Number",
                        "Created by",
                        "Shipment Date",
                        "Payment Mode",
                        "Delivery partner",
                        "Estimated TAT",
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
                            {...this.props}
                        />
                    )}
                    showSearch={false}
                    loading={loading}
                    filter={filter}
                    loadMore={this.loadMoreOrders}
                    actionBtnText={"Manifest Preview"}
                    showActionBtn={printSelection?.length > 0}
                    onClickAction={this.onShowPrintPreview}
                    onClickDeselectAction={this.onDeselectAll}
                    onSelectAll={selectOrders}
                    selectedList={printSelection}
                />

                {/* <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="d-flex align-items-center pt-3">
                                            <p className="mb-0 ml-2">show</p>
                                            <div className="col-xl-3">
                                                <select
                                                    className="custom-select"
                                                >

                                                </select>
                                            </div>
                                            <p className="mb-0">entries</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped table-bordered dt-responsive nowrap action_icons">
                                    <thead>
                                        <tr>
                                            <th>

                                           <input type="checkbox" name="checkall" id=""/>
                                            </th>
                                            <th>No.</th>
                                            <th>AWB Number</th>
                                            <th>Shipment Date</th>
                                            <th>Payment Mode</th>
                                            <th>Estimated TAT</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="">
                                            <td className="text-center">
                                                <input type="checkbox" name="" id=""/>
                                            </td>
                                            <td>1</td>
                                            <td>ypl00011639
                                                <span className="ml-1 badge badge-warning" style={{
                                                    color: "rgb(255, 255, 255)", fontSize: "12px"}}>
                                                    Bulk</span></td>
                                            <td>23 Mar 2021, 11:16:28 am</td>
                                            <td>cod <span className="ml-1"></span></td>
                                            <td>1 days</td>
                                            <td className="greenColor">PENDING PICKUP</td>
                                            <td><span data-title="Refresh status" className="mr-2">
                                                <i className="dripicons dripicons-clockwise"></i>
                                                </span>
                                                <span className="mr-2" data-title="Invoice">
                                                <i className="mdi mdi-eye"></i></span>
                                            <span className="mr-2" data-title="Order Activity">
                                                <i className="far fa-comment-dots"></i>
                                                </span>
                                                <span data-title="Print" style={{
                                                    color: "rgb(160, 110, 15)", position: "relative", top: "2px", left: "2px"
                                                }}>
                                                    <i className="dripicons dripicons-print"></i>
                                                </span>
                                            </td>
                                         </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> */}

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

    let printSelection = state.order?.printSelection;

    return {
        filter: filter,
        orderList: orderList,
        orderMeta: orderMeta,
        loading: loading,
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


export default connect(mapStateToProps, mapDispatchToProps)(ManifestDashboard);