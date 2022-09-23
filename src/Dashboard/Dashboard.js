import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from "../Utils/BreadCrumb";
import BaseTable from '../Utils/BaseTable';
import { fetchDashboardRequest } from './Duck/DashboardActions';
import moment from 'moment';
import { Badge } from 'react-bootstrap';
// import FilePreviewModal from '../FilePreview/filePreviewModal';
// import FilePreviewWrapper from '../FilePreview/filePreviewWrapper';
// import {Tab,Tabs} from 'react-bootstrap';
import CounterContainer from './Components/CounterContainer';
// import DashboardChart from './Components/DashboardChart';
// import { getCurrentMonthOfWeek } from '../Utils/CommonFunctions';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        showPreviewOfFileId: null,
        fromDate: null,
        toDate: null,
    }
   }
    componentDidMount() {
        // let { fetchDashboard } = this.props;
        // fetchDashboard && fetchDashboard();
        this.loadDashBoard();
    }

    loadDashBoard = () => {
        let { fetchDashboard } = this.props;
        fetchDashboard && fetchDashboard();
    }


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
        let { dashboard, data, loading, logistics, plans, planOrder, delivered_order_weeks, confirm_order_weeks, last_four_weeks_deliver_orders } = this.props;
console.log(dashboard)
        let {pending_invoice, completed_invoice, rejected_invoice, total_amount, pending_amount, completed_amount, rejected_amount} = dashboard
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
                        counter_key={"total_invoice"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Total Invoice"}
                        counter={dashboard ? (Number(pending_invoice) + Number(completed_invoice) + Number(rejected_invoice)) : 0}
                    />
                    <CounterContainer
                        counter_key={"pending_invoice"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Pending Invoice"}
                        counter={dashboard ? Number(pending_invoice) : 0}
                    />
                    <CounterContainer
                        counter_key={"completed_invoice"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Completed Invoice"}
                        counter={dashboard ? Number(completed_invoice) : 0}
                    />
                    <CounterContainer
                        counter_key={"rejected_invoice"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Rejected Invoice"}
                        counter={dashboard ? Number(rejected_invoice) : 0}
                    />
                    <CounterContainer
                        counter_key={"total_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Total Amount"}
                        counter={dashboard ? (Number(pending_amount) + Number(completed_amount) + Number(rejected_amount)) : 0}

                    />
                    <CounterContainer
                        counter_key={"pending_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Pending Amount"}
                        counter={dashboard ? (Number(pending_amount)) : 0}
                    />
                    <CounterContainer
                        counter_key={"completed_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Completed Amount"}
                        counter={dashboard ? (Number(completed_amount)) : 0}
                    />

                    <CounterContainer
                        counter_key={"rejected_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Rejected Amount"}
                        counter={dashboard ? (Number(rejected_amount)) : 0}
                    />

                    {/*<CounterContainer*/}
                    {/*    counter_key={"order_receive"}*/}
                    {/*    containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}*/}
                    {/*    name={"Received Order"}*/}
                    {/*    counter={0}*/}
                    {/*    {...this.props}*/}
                    {/*/>*/}
                    {/*<CounterContainer*/}
                    {/*    counter_key={"order_progress"}*/}
                    {/*    containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}*/}
                    {/*    name={"In-progress Order"}*/}
                    {/*    counter={0}*/}
                    {/*    {...this.props}*/}
                    {/*/>*/}
                    {/*<CounterContainer*/}
                    {/*    counter_key={"order_complete"}*/}
                    {/*    containerClassName={"dashboard_two common_grid_css bg-white p-3 br-5 mb-3"}*/}
                    {/*    name={"Completed Order"}*/}
                    {/*    counter={0}*/}
                    {/*    {...this.props}*/}
                    {/*/>*/}
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
                                {/*<DashboardChart*/}
                                {/*    datasets={[*/}
                                {/*        {*/}
                                {/*            label: "Total Orders",*/}
                                {/*            backgroundColor: "#1B98F5",*/}
                                {/*            data: confirm_order_weeks,*/}
                                {/*        },*/}
                                {/*        {*/}
                                {/*            label: "Order Completed",*/}
                                {/*            backgroundColor: "#1FAA59",*/}
                                {/*            data: delivered_order_weeks,*/}
                                {/*        },*/}
                                {/*    ]}*/}
                                {/*/>*/}
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
                                {/*<DashboardChart*/}
                                {/*    labels={["Week 1", "Week 2", "Week 3", "Week 4"]}*/}
                                {/*    datasets={[*/}
                                {/*        {*/}
                                {/*            label: "Invoice",*/}
                                {/*            backgroundColor: "#1B98F5",*/}
                                {/*            data: last_four_weeks_deliver_orders,*/}
                                {/*        },*/}
                                {/*    ]}*/}
                                {/*    displayLegend={false}*/}
                                {/*/>*/}
                            </div>

                        </div>
                    </div>
                </div>

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dashboard: state?.dashboard?.dashboard
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: (params) => dispatch(fetchDashboardRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
