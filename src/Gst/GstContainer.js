import React from "react";
import {connect} from "react-redux";
import { Form, Row, Card, Col, Table } from "react-bootstrap";
import moment from "moment";
import {fetchAllInvoiceRequest} from "../Invoice/Duck/InvoiceActions";
import {fetchAllPurchaseRequest} from "../Purchase/Duck/PurchaseActions";

class GstContainer extends React.Component {
    state = {
        date: moment.utc().format("YYYY-MM")
    }

    componentDidMount() {
        let {fetchPurchase, fetchInvoice} = this.props;
        fetchPurchase();
        fetchInvoice();
    }

    render() {
        let {invoice, purchase} = this.props;
        let invoiceData = invoice ? Object.values(invoice).filter(o=>o.gst_amount && moment.utc(o.invoiceDate).format("YYYY-MM") === this.state.date) : [];
        let purchaseData = purchase ? Object.values(purchase).filter(o=>o.gst_amount && o.paidDate && moment.utc(o.paidDate).format("YYYY-MM") === this.state.date) : [];

        const gstPurchaseAmount = purchaseData.map(o => o.gst_amount ? Number(o.gst_amount) : 0).reduce((acc, amount) => acc + amount, 0).toFixed(2)
        const totalPurchaseAmount = purchaseData.map(o => o.gst_amount ? Number(o.total_amount) : 0).reduce((acc, amount) => acc + amount, 0).toFixed(2)
        const gstInvoiceAmount = invoiceData.map(o => o.gst_amount ? Number(o.gst_amount) : 0).reduce((acc, amount) => acc + amount, 0).toFixed(2)
        const totalInvoiceAmount = invoiceData.map(o => o.gst_amount ? Number(o.total_amount) : 0).reduce((acc, amount) => acc + amount, 0).toFixed(2)

        return(
            <>
                <div className="row">
                    <div className="col-md-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <div className="page-header">
                                    <div>
                                        <h2 className="main-content-title tx-24 mg-b-5">
                                            GST List
                                        </h2>
                                    </div>
                                </div>
                                <div className="page-title-right">
                                    <Form.Control value={this.state.date} type="month" name='month' onChange={(e)=>this.setState({date: e.target.value})}/>
                                </div>
                        </div>
                    </div>
                </div>

                <div className="site-card-wrapper" >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card style={{padding: 20}} title="Card title" bordered={true}>
                                <h5 style={{color: 'gray'}}>Invoice</h5>
                                <hr/>

                                <table style={{fontSize:15}}>
                                    <tr>
                                        <th>Invoice</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Gst</th>
                                    </tr>
                                    {
                                        invoiceData.map(o=>{
                                            return (
                                                <tr>
                                                    <td>{o.invoice_number}</td>
                                                    <td>{moment.utc(o.invoiceDate).format("DD-MM-YYYY")}</td>
                                                    <td>{Number(o.total_amount).toFixed(2)}</td>
                                                    <td>{Number(o.gst_amount).toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr>
                                        <td><hr/></td>
                                        <td><hr/></td>
                                        <td><hr/></td>
                                        <td><hr/></td>
                                    </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>{totalInvoiceAmount}</td>
                                    <td>{gstInvoiceAmount}</td>
                                </tr>
                                </table>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{padding: 20}} title="Card title" bordered={true}>
                                <h5 style={{color: 'gray'}}>Purchase</h5>
                                <hr/>
                                <table style={{fontSize:15}}>
                                    <tr>
                                        <th>Purchase</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Gst</th>
                                    </tr>
                                    {
                                        purchaseData.map(o=>{
                                            return (
                                                <tr>
                                                    <td>{o.invoice_number}</td>
                                                    <td>{moment.utc(o.invoiceDate).format("DD-MM-YYYY")}</td>
                                                    <td>{Number(o.total_amount).toFixed(2)}</td>
                                                    <td>{Number(o.gst_amount).toFixed(2)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                <tr>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                    <td><hr/></td>
                                </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>{totalPurchaseAmount}</td>
                                        <td>{gstPurchaseAmount}</td>
                                    </tr>
                                </table>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card style={{padding: 20}} title="Card title" bordered={true}>
                                <h5 style={{color: 'gray'}}>GST</h5>
                                <hr/>
                                <Row style={{justifyContent:'space-between', alignItem:'center', padding: 10}}>
                                    <div style={{color: 'gray'}}>Invoice</div>
                                    <div style={{color: 'gray'}}>{gstInvoiceAmount}</div>
                                </Row>
                                <Row style={{justifyContent:'space-between', alignItem:'center', padding: 10}}>
                                    <div style={{color: 'gray'}}>Purchase</div>
                                    <div style={{color: 'gray'}}>{gstPurchaseAmount}</div>
                                </Row>
                                <Row style={{justifyContent:'space-between', alignItem:'center', padding: 10}}>
                                    <div style={{color: 'gray'}}>Pending Gst</div>
                                    <div style={{color: 'gray'}}>{(gstInvoiceAmount - gstPurchaseAmount).toFixed(2)}</div>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        client: state?.client?.clients,
        purchase: state?.purchase?.purchase,
        invoice: state?.invoice?.invoice,
        loading: state?.client?.loading,
        error: state?.client?.error,
        loggedInUser: state?.loggedInUser?.data?.data
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchInvoice: (params) => dispatch(fetchAllInvoiceRequest(params)),
        fetchPurchase: (params) => dispatch(fetchAllPurchaseRequest(params))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GstContainer);