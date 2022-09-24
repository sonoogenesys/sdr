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
import DashboardChart from './Components/DashboardChart';
import { getCurrentMonthOfWeek } from '../Utils/CommonFunctions';
import {fetchAllInvoiceRequest} from "../Invoice/Duck/InvoiceActions";

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
        let { fetchDashboard, fetchInvoice } = this.props;
        fetchInvoice && fetchInvoice();
        fetchDashboard && fetchDashboard();

    }



    getGraphData = () => {
        let {invoice} = this.props;
        if(invoice && Object.keys(invoice).length > 0) {
            let allInvoice = Object.values(invoice).filter(o=> o.status !== "deleted");
            let data = {
                pending: {},
                completed: {},
                rejected: {}
            };
            allInvoice.length > 0 && allInvoice.map(item=>{
                let date = moment.utc(item?.invoiceDate).format("DD-MMM")
                if(data[item.status][date] === undefined) {
                    data[item.status][date] = {}
                    data[item.status][date].amount = []
                }

                if(item.status === "pending"){
                    data[item.status][date].amount.push(Number(item.total_amount) - Number(item.paid_amount))
                } if(item.status === "rejected") {
                    data[item.status][date].amount.push(Number(item.total_amount))
                } else {
                    data[item.status][date].amount.push(Number(item.paid_amount))
                }

            })
                let dates = [... new Set(allInvoice.map(o=>moment.utc(o?.invoiceDate).format("DD-MMM")))]
                let pending = [];
                let completed = [];
                let total = [];
                let rejected = [];
                dates?.map(o=>{
                    let pending_amount = data?.pending[o]?.amount ? data?.pending[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    let completed_amount = data?.completed[o]?.amount ? data?.completed[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    let rejected_amount = data?.rejected[o]?.amount ? data?.rejected[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    pending.push(pending_amount)
                    completed.push(completed_amount)
                    rejected.push(rejected_amount)
                    total.push(pending_amount + completed_amount + rejected_amount)
                })
            return {labels: dates ? dates : {}, pending,  total, completed, rejected}
        }

    }
    render() {
        let { dashboard } = this.props;
        let {pending_invoice, completed_invoice, rejected_invoice, total_amount, pending_amount, completed_amount, rejected_amount} = dashboard
        let chartData = this.getGraphData()
        return (
            <>
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
                        counter={dashboard ? (Number(pending_amount) + Number(completed_amount) + Number(rejected_amount)).toFixed(2) : 0}

                    />
                    <CounterContainer
                        counter_key={"pending_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Pending Amount"}
                        counter={dashboard ? (Number(pending_amount).toFixed(2)) : 0}
                    />
                    <CounterContainer
                        counter_key={"completed_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Raised Amount"}
                        counter={dashboard ? (Number(completed_amount).toFixed(2)) : 0}
                    />

                    <CounterContainer
                        counter_key={"rejected_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Rejected Amount"}
                        counter={dashboard ? (Number(rejected_amount).toFixed(2)) : 0}
                    />
                </div>


                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <div className="d-flex card-title">
                                <h4 className="">
                                    Invoice Summary
                                </h4>
                            </div>

                            <div
                                className="border-0 m-4 justify-content-end"
                                style={{ height: 250 }}
                            >
                                <DashboardChart
                                    labels={chartData?.labels}
                                    datasets={[
                                        {
                                            label: "Total",
                                            backgroundColor: "#1B98F5",
                                            data: chartData?.total,
                                        },
                                        {
                                            label: "Raised",
                                            backgroundColor: "#1FAA59",
                                            data: chartData?.completed,
                                        },
                                        {
                                            label: " Pending",
                                            backgroundColor: "#aa1f2f",
                                            data: chartData?.pending,
                                        },
                                        {
                                            label: " Rejected",
                                            backgroundColor: "#0d1862",
                                            data: chartData?.rejected,
                                        }
                                    ]}

                                />
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
        dashboard: state?.dashboard?.dashboard,
        invoice: state?.invoice?.invoice
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchDashboard: (params) => dispatch(fetchDashboardRequest(params)),
        fetchInvoice: (params) => dispatch(fetchAllInvoiceRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
