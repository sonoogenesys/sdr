import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from "../Utils/BreadCrumb";
import BaseTable from '../Utils/BaseTable';
import { fetchDashboardRequest } from './Duck/DashboardActions';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
import FilePreviewModal from '../FilePreview/filePreviewModal';
import FilePreviewWrapper from '../FilePreview/filePreviewWrapper';
// import {Tab,Tabs} from 'react-bootstrap';

import DatePicker from "react-datepicker";
import CounterContainer from './Components/CounterContainer';
import DashboardChart from './Components/DashboardChart';
import { getCurrentMonthOfWeek } from '../Utils/CommonFunctions';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        showPreviewOfFileId: null,
        fromDate: null,
        toDate: null,
    }

        this.selectDateFrom = this.selectDateFrom.bind(this);
        this.selectDateTo = this.selectDateTo.bind(this);
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
            [name]: value
        });
    }


    componentDidMount() {
        // let { fetchDashboard } = this.props;
        // fetchDashboard && fetchDashboard();
        this.loadDashBoard();
    }

    loadDashBoard = () => {
        let { fromDate, toDate, orderType, payment_method, logistic_id, plan } = this.state;
        let { fetchDashboard, location } = this.props;

        let params = {
            pathname: location?.pathname,
        };

        if (fromDate)  params.created_from = moment(fromDate).startOf('day').utc().format();
        if (toDate)  params.created_to = moment(toDate).endOf('day').utc().format();
        if (orderType && orderType !== "all")  params.order_type = orderType;
        if (payment_method && payment_method !== "all")  params.payment_method = payment_method;
        if (logistic_id && logistic_id !== "all")  params.logistic_id = logistic_id;
        if (plan && plan !== "all")  params.plan = plan;

        fetchDashboard && fetchDashboard(params);
    }

    // onShowOrderSummary = (id, bulkId) => {
    //     let { history } = this.props;

    //     let path = bulkId ? `/app/bulkShipmentList/${bulkId}` : `/app/individualShipment/${id}`;
    //     history.push(path);
    // }

    // onRefreshOrder = (e, order) => {
    //     e.stopPropagation();
    //     let { _id, ewaybill_number } = order;
    //     let { trackOrder } = this.props;

    //     if (_id && ewaybill_number && trackOrder) {
    //         trackOrder({
    //             order_id: _id,
    //             airwaybilno: ewaybill_number,
    //         });
    //     }
    // }

    // onShowOrderInvoice = (e, id) => {
    //     e.stopPropagation();
    //     let { history } = this.props;
    //     history.push(`/app/individualinvoice/${id}`);
    // }

    // onShowTicket = (e, id) => {
    //     e.stopPropagation();

    //     let { history } = this.props;
    //     history.push(`/app/orderActivity/${id}`);
    // }

    // togglePreview = (fileId, attachments) => {
    //     this.setState({showPreviewOfFileId: fileId, allAttachments: attachments})
    // }

    renderRow = (order, index) => {
        let transaction = order?.transaction_id;
        let orderStatus = Array.isArray(order?.orderStatus) && order.orderStatus.length > 0 && order.orderStatus[0];
        let scanDetail = Array.isArray(orderStatus?.scan_detail) && orderStatus?.scan_detail?.length > 0 && orderStatus.scan_detail[orderStatus.scan_detail.length - 1];
        let comments = order?.comments || [];
        let mLogistic;

        let orderRowBg;
        if (scanDetail?.status_description == "UNDELIVERED") {
            orderRowBg = "#f8d7da";
        } else if (comments?.length > 0) {
            orderRowBg = "#fff3cd";
        }

        if ((transaction || order?.ewaybill_number) && Array.isArray(order?.available_logistic) && order?.available_logistic?.length > 0) {
            mLogistic = order?.available_logistic[0];
        }

        return (
            order && (
                <tr
                    key={index}
                    // className={!order?.bulk_id ? "pointer" : ""}
                    style={{ background: orderRowBg }}
                    // onClick={(!order?.bulk_id) ? (() => this.onShowOrderSummary(order?._id)) : undefined}
                >
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{order?.ewaybill_number} <Badge className='ml-1' style={{color:'#fff', fontSize:12}} variant={(order?.bulk_id) ? 'warning' : 'primary'}> {(order?.bulk_id) ? 'Bulk' : 'Individual'}</Badge></td>
                    <td style={{ letterSpacing: 1 }} >{order?.order_date && moment(order.order_date).format("D MMM YYYY, h:mm:ss a")}</td>
                    <td style={{textTransform:order?.payment_method === 'cod' ? 'uppercase' : 'capitalize'}}>
                        {order?.payment_method} <span className="ml-1">{order?.action_done ? <i className="fas fa-check-double" /> : order?.sent_to_am && <i className="fas fa-check" />}</span>
                    </td>

                    <td>{mLogistic?.price?.day ? `${mLogistic?.price?.day} days` : "-"}</td>
                    <td style={{textTransform:'lowercase'}} className={order?.ewaybill_number || order?.isLoading ? 'greenColor' : 'redColor'}>
                        {
                            order?.isLoading
                            ? "Checking..."
                            : order?.ewaybill_number
                                ? (order?.latest_order_status || scanDetail?.status)
                                : 'payment pending'
                        }
                    </td>
                    {/* <td style={{textAlign:'center'}}>

                        {
                            !order?.bulk_id && !transaction &&
                            <span className='mr-2' data-title='Make payment' >
                                <i className="bx bxs-pencil"></i>
                            </span>
                        }

                        {
                            order?.bulk_id && !transaction &&
                            <span data-title='Make payment' onClick={() => this.onShowOrderSummary(order?._id, order?.bulk_id)} className='mr-2' >
                                <i className="bx bxs-pencil"></i>
                            </span>
                        }

                        {
                            transaction &&
                            <span data-title='Refresh status' onClick={order?.isLoading ? undefined : (e) => this.onRefreshOrder(e, order)} className='mr-2' style={{position:'relative',top:2}}>
                                {
                                    order?.isLoading
                                    ? <i className="bx bx-loader bx-spin"></i>
                                    : <i className="dripicons dripicons-clockwise"></i>
                                }
                            </span>
                        }

                        {
                            transaction &&
                            <span onClick={(e) => this.onShowOrderInvoice(e, order?._id)} className='mr-2' data-title="Invoice">
                                <i className="mdi mdi-eye"></i>
                            </span>
                        }
                        {
                            transaction &&
                            <span  className='mr-2' onClick={(e) => this.onShowTicket(e, order?._id)} data-title="Order Activity">
                                <i className="far fa-comment-dots"></i>
                            </span>
                        }

                        <span
                            data-title='Print'
                            style={{color:'#a06e0f',position:'relative',top:'2px',left:'2px'}}
                            onClick={(e) => {
                                e.stopPropagation()
                                this.togglePreview('603e1853b938c5789c7fcf99', [{_id:'603e1853b938c5789c7fcf99', filename:'Dispatch Label.png'}])
                            }}
                        >
                            <i className="dripicons dripicons-print"></i>
                        </span>
                    </td> */}
                </tr>
            )
        );
    };

    onFilter = () => {
        this.setState({
            error: null,
        }, this.loadDashBoard);
    }

    onReset = () => {
        this.setState({
            fromDate: null,
            toDate: null,
            orderType:'',
            payment_method:'',
            logistic_id:'',
            plan:'',
            awbNumber:'',
            error: null
        }, this.loadDashBoard);
    }

    render() {
        let { data, loading, logistics, plans, planOrder, delivered_order_weeks, confirm_order_weeks, last_four_weeks_deliver_orders } = this.props;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24">
                                        Dashboard
                                    </h2>
                                    <BreadCrumb
                                        title={[
                                            "Dashboard",
                                            "Dashboard",
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row align-items-start dashboard-grid">

                    <CounterContainer
                        counter_key={"raised_order"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Raised Order"}
                        counter={0}
                        {...this.props}
                    />

                    <CounterContainer
                        counter_key={"order_receive"}
                        containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Received Order"}
                        counter={0}
                        {...this.props}
                    />
                    <CounterContainer
                        counter_key={"order_progress"}
                        containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"In-progress Order"}
                        counter={0}
                        {...this.props}
                    />
                    <CounterContainer
                        counter_key={"order_complete"}
                        containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Completed Order"}
                        counter={0}
                        {...this.props}
                    />
                </div>


                <div className="row">
                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="d-flex card-title">
                                <h4 className="">
                                    Total Query Summary
                                </h4>
                            </div>

                            <div
                                className="border-0 m-4 justify-content-end"
                                style={{ height: 250 }}
                            >
                                <DashboardChart
                                    datasets={[
                                        {
                                            label: "Total Orders",
                                            backgroundColor: "#1B98F5",
                                            data: confirm_order_weeks,
                                        },
                                        {
                                            label: "Order Completed",
                                            backgroundColor: "#1FAA59",
                                            data: delivered_order_weeks,
                                        },
                                    ]}
                                />
                            </div>

                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="card">
                            <div className="d-flex card-title">
                                <h4 className="">
                                    Invoive
                                </h4>
                            </div>

                            <div
                                className="border-0 m-4 justify-content-end"
                                style={{ height: 250 }}
                            >
                                <DashboardChart
                                    labels={["Week 1", "Week 2", "Week 3", "Week 4"]}
                                    datasets={[
                                        {
                                            label: "Invoice",
                                            backgroundColor: "#1B98F5",
                                            data: last_four_weeks_deliver_orders,
                                        },
                                    ]}
                                    displayLegend={false}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                {
                    this.state.showPreviewOfFileId &&
                        <FilePreviewModal toggleModal={this.togglePreview}>
                            <FilePreviewWrapper
                                data                = {this.state.allAttachments}
                                showPreviewOfFileId = {this.state.showPreviewOfFileId}
                                togglePreview       = {this.togglePreview}
                            />
                        </FilePreviewModal>
                }

            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { location } = ownProps;
    let pathname = location?.pathname;

    // let dashboard = state.dashboard;
    // let dashboardData = dashboard?.data;
    // let loading = dashboard?.loading;

    let filter = state.dashboard?.filters[pathname];
    let boards = state.dashboard?.boards;

    let mBoard = boards[JSON.stringify(filter || {})];
    let dashboardData = mBoard?.data;
    let loading = !dashboardData && mBoard?.loading;

    let logistics = state.logistics?.data;

    // let total_week = moment().endOf("month").week() - moment().startOf("month").week() + 1;
    let total_week = getCurrentMonthOfWeek();
    let confirm_order_weeks = [... new Array(total_week)].map((_, i) => (dashboardData?.confirm_order_weeks?.count?.[i+1] || 0));

    // let month_start_week = moment().startOf("month").week();
    let delivered_order_weeks = [... new Array(total_week)].map((_, i) => (dashboardData?.delivered_order_weeks?.count?.[i+1] || 0));

    // let last_four_week_start = moment().subtract(4, "week").week() + 1;
    let weeks_order_invoice = dashboardData?.last_four_weeks_deliver_orders?.count || {};
    let last_four_weeks_deliver_orders = [... new Array(4)].map((_, i) =>
        (weeks_order_invoice?.[i + 1] ? parseFloat(weeks_order_invoice?.[i + 1] || 0).toFixed(2) : 0)
    );

    return {
        data: dashboardData,
        loading: loading,
        logistics: logistics,
        plans: state?.plan?.plans,
        planOrder: state?.plan?.planOrder,
        confirm_order_weeks: confirm_order_weeks,
        delivered_order_weeks: delivered_order_weeks,
        last_four_weeks_deliver_orders: last_four_weeks_deliver_orders
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: (params) => dispatch(fetchDashboardRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
