import React, { Component } from 'react';
import { connect } from 'react-redux';
import BreadCrumb from "../Utils/BreadCrumb";
import BaseTable from '../Utils/BaseTable';
import { fetchDashboardRequest } from './Duck/DashboardActions';
import moment from 'moment';
import { Badge, Form } from 'react-bootstrap';
import Year from './Components/YearField'
// import FilePreviewModal from '../FilePreview/filePreviewModal';
// import FilePreviewWrapper from '../FilePreview/filePreviewWrapper';
import {Tab,Tabs, Row, Col } from 'react-bootstrap';
import CounterContainer from './Components/CounterContainer';
import DashboardChart from './Components/DashboardChart';
import { Pie } from "react-chartjs-2";
import { getCurrentMonthOfWeek } from '../Utils/CommonFunctions';
import {fetchAllInvoiceRequest} from "../Invoice/Duck/InvoiceActions";

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
        showPreviewOfFileId: null,
        fromDate: null,
        toDate: null,
        year: moment.utc().format('YYYY'),
        date: null // moment.utc().format('YYYY-MM')
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
            let allInvoice = Object.values(invoice).filter(o=> o.status !== "rejected");
            let data = {
                pending: {},
                completed: {},
                // rejected: {}
            };
            allInvoice.length > 0 && allInvoice.map(item=>{
                let date = moment(item?.invoiceDate).format("DD-MMM")
                if(data[item.status][date] === undefined) {
                    data[item.status][date] = {}
                    data[item.status][date].amount = []
                }

                if(item.status === "pending"){
                    data[item.status][date].amount.push(Number(item.total_amount) - Number(item.paid_amount))
                } else {
                    data[item.status][date].amount.push(Number(item.paid_amount))
                }

            })
                let dates = [... new Set(allInvoice.map(o=>moment.utc(o?.invoiceDate).format("DD-MMM")))]
                let pending = [];
                let completed = [];
                let total = [];
                // let rejected = [];
                dates?.map(o=>{
                    let pending_amount = data?.pending[o]?.amount ? data?.pending[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    let completed_amount = data?.completed[o]?.amount ? data?.completed[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    // let rejected_amount = data?.rejected[o]?.amount ? data?.rejected[o]?.amount?.reduce((a, b)=> Number(a) + Number(b), 0) : 0
                    pending.push(pending_amount)
                    completed.push(completed_amount)
                    // rejected.push(rejected_amount)
                    total.push(pending_amount + completed_amount)
                })
            return {labels: dates ? dates : {}, pending,  total, completed}
        }

    }

    setDate = (event) => {
        this.setState({date: event.target.value})
        let { fetchDashboard } = this.props;
        fetchDashboard && fetchDashboard({month: event.target.value});
    }
    setYear = (event) => {
        console.log(event.target.value)
        this.setState({year: event.target.value})

        let { fetchDashboard } = this.props;
        fetchDashboard && fetchDashboard({year: event.target.value});
    }

    render() {
        let { dashboard } = this.props;
        let {date} = this.state;
        let {graph, pending_invoice, completed_invoice, rejected_invoice, pending_amount, completed_amount, query_count, total_purchase_amount, paid_purchase_amount, purchase_count} = dashboard
        let chartData = graph ? graph : this.getGraphData(date)

        return (
            <>

                <div style={{background:'#E5F2FF',borderBottom:'1px solid #B4BBC4',padding:10}}>
                    <Row style={{borderBottom:'1px solid #ECEEF0'}}>
                        <Col style={{color:'#44830e', paddingTop:10}}>
                            <b>Monthly Wise Report</b>
                        </Col>
                        <Col>
                            <Year value={this.state.year} onChange={(e)=>this.setYear(e)}/>
                        </Col>

                        <Col>
                            <Form.Control type="month" name='month' onChange={(e)=>this.setDate(e)}/>
                        </Col>

                    </Row>


                </div>
                <div className="row align-items-start dashboard-grid mt-3">
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
                        name={"Cancelled Invoice"}
                        counter={dashboard ? Number(rejected_invoice) : 0}
                    />
                    <CounterContainer
                        counter_key={"total_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Billing Amount"}
                        counter={dashboard ? (Number(pending_amount) + Number(completed_amount)).toFixed(2) : 0}

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
                        counter_key={"purchase_count"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Total Purchase Invoice"}
                        counter={dashboard && purchase_count ? purchase_count : 0}
                    />
                    <CounterContainer
                        counter_key={"purchase_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Purchase Amount"}
                        counter={dashboard && total_purchase_amount ? (Number(total_purchase_amount).toFixed(2)) : 0}
                    />
                    <CounterContainer
                        counter_key={"purchase_pending_amount"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Purchase Pending Amount"}
                        counter={dashboard && total_purchase_amount ? (Number(total_purchase_amount- (paid_purchase_amount || 0)).toFixed(2)) : 0}
                    /><CounterContainer
                        counter_key={"query"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Purchase Paid Amount"}
                        counter={dashboard && paid_purchase_amount ? (Number(paid_purchase_amount).toFixed(2)) : 0}
                    />
                    <CounterContainer
                        counter_key={"query"}
                        containerClassName={"dashboard_one common_grid_css bg-white p-3 br-5 mb-3"}
                        name={"Total Query"}
                        counter={dashboard && query_count ? (Number(query_count)) : 0}
                    />
                </div>
                <div  style={{background:'#E5F2FF',borderBottom:'1px solid #B4BBC4',padding:20}}>
                    Current Month Report
                </div>

                <div className={'mt-20'} style={{boxShadow: '0px 8px 16px rgba(169, 194, 209, 0.1), 0px 32px 32px rgba(169, 194, 209, 0.15)'}}>
                    <div style={{background:'#fff'}}>
                        <Row style={{padding:20,borderBottom:'1px solid #ECEEF0'}}>
                            <Col style={{color:'#44830e'}}>
                                <b>A.</b> Total tax amount
                            </Col>

                            <Col className={'text-right'}>
                                <b>{dashboard ? dashboard?.invoice_tax_amount?.toFixed(2) : 0}</b>
                            </Col>
                        </Row>
                        <Row style={{padding:20,borderBottom:'1px solid #ECEEF0'}}>
                            <Col style={{color:'#d2691e'}}>
                                <b>B.</b> Paid tax amount
                            </Col>
                            <Col className={'text-right'}>
                                <b>{dashboard ? dashboard?.purchase_tax_amount?.toFixed(2) : 0}</b>
                            </Col>
                        </Row>
                        <Row style={{padding:20,borderBottom:'1px solid #ECEEF0'}}>
                            <Col style={{color:'#DB1F48'}}>
                                <b>C.</b> Pending tax amount
                            </Col>
                            <Col className={'text-right'}>
                                <b>{dashboard ? (dashboard?.invoice_tax_amount - dashboard?.purchase_tax_amount).toFixed(2) : 0}</b>
                            </Col>
                        </Row>
                    </div>

                </div>

                <div style={{background:'#E5F2FF',borderBottom:'1px solid #B4BBC4',padding:20, marginTop: 20}}>
                    Invoice Summary
                </div>

                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="card">

                            {/*<div className="d-flex card-title">*/}
                            {/*    <h4 className="">*/}
                            {/*        Invoice Summary*/}
                            {/*    </h4>*/}
                            {/*</div>*/}
                            {/*<div className={'justify-center'} style={{ width: 500, height: 300 }}>*/}
                            {/*    <Pie data={chartData} />*/}
                            {/*</div>*/}
                            <div
                                className="border-0 m-4 justify-content-end"
                                style={{ height: 250 }}
                            >

                                <DashboardChart
                                    labels={chartData?.labels}
                                    datasets={[
                                        {
                                            label: "Billing",
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
                                        // {
                                        //     label: " Rejected",
                                        //     backgroundColor: "#0d1862",
                                        //     data: chartData?.rejected,
                                        // }
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
