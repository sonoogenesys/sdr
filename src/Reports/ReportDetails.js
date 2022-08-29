import React, { Component } from 'react';
import BreadCrumb from '../Utils/BreadCrumb';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import TableContainer from '../Utils/TableContainer';
import { fetchOneReportRequest, remitOrderRequest } from './Duck/ReportsActions';
import fileDownload from 'js-file-download';
import { showNotification } from '../Utils/CommonFunctions';
import appUrl from '../Constants/AppUrl';
import axios from 'axios';

class ReportDetails extends Component {

    state = {
        searchText: "",
    };

    componentDidMount() {
        let { reportId, report, getReport } = this.props;
        if (reportId && !report) {
            getReport && getReport(reportId);
        }
    }

    remitOrders = (awb_numbers = [], remitAll = false) => {
        let { remitOrder, reportId } = this.props;
        remitOrder && remitOrder({ report_id: reportId, awb_numbers: awb_numbers });
    }

    renderRow = (item, index) => {
        let orderStatus = Array.isArray(item?.orderStatus) && item.orderStatus.length > 0 && item.orderStatus[0]?.scan_detail.find(o=> o.status.toLowerCase().search("delivered") !== -1);
        let delivered_date = orderStatus && orderStatus?.updated_date;
        let canRemit = item?.vendor_name && item?.account_number && item?.ifsc_code;

        return (
            item && (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{item?.ewaybill_number}</td>
                    <td style={{ letterSpacing: 1 }}>{item?.order_date && moment(item?.order_date).format("DD-MM-YY, hh:mm:ss:a")}</td>
                    <td style={{ letterSpacing: 1 }}>{delivered_date && moment(delivered_date).format("DD-MM-YY")}</td>
                    <td>{item?.vendor_name}</td>
                    <td>{item?.account_number}</td>
                    <td>{item?.ifsc_code}</td>
                    <td>{parseFloat(item?.amount).toFixed(2)}</td>

                    <td className='font-weight-bold' style={{ textAlign:'center' }}>
                        {
                            item?.loading
                            ? <div className="d-flex align-items-center justify-content-center">
                                <span className="spinner-border spinner-border-sm text-primary mr-2" style={{ color: "#495057" }}></span>
                                <span className="visually-hidden text-primary" style={{ fontSize: 14 }}> Remitting...</span>
                            </div>
                            : item?.action_done
                                ? <div className='greenColor'>Remitted</div>
                                : (
                                    <button
                                        className="btn btn-primary view_btn"
                                        disabled={!canRemit}
                                        onClick={() => {
                                            if (!canRemit) {
                                                showNotification("error", "Vendor account details is not available");
                                                return;
                                            }
                                            this.remitOrders(item?.ewaybill_number && [item?.ewaybill_number]);
                                        }}
                                    >Remit</button>
                                )
                        }
                    </td>
                </tr>
            )
        );
    };

    onGoBack = () => {
        this.props.history.goBack();
    }

    onDownloadAttachment = () => {
        let { report } = this.props;
        let attachment = report?.attachments

        let id = attachment?._id;
        let filename = attachment?.filename;

        axios({
            method: 'GET',
            url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${id}`,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => fileDownload(res.data, filename))
        .catch(err => {
            showNotification("error", "Error in downloading attachment");
            console.log("Download Attachment ", err);
        });
    }

    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        });
    }

    render() {
        let { searchText } = this.state;
        let { report, loggedInUser } = this.props;
        let order = report?.order_ids || [];

        if (searchText && report?.order_ids?.length > 0) {
            order = report?.order_ids?.filter(o => o?.ewaybill_number?.includes(searchText));
        }

        let awb_numbers = order?.map(o => o?.vendor_name && o?.account_number && o?.ifsc_code && !o?.loading && !o?.action_done && o?.ewaybill_number);
        awb_numbers = awb_numbers?.filter(awb_number => awb_number);

        let permissions = loggedInUser?.role?._id?.permissions || {};

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Report Details
                                    </h2>
                                    <BreadCrumb
                                        title = {['Reports', 'Report Details']}
                                    />
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button className="btn btn-primary my-2 btn-icon-text" onClick={this.onGoBack} >
                                    <i className="fa fa-arrow-circle-left mr-2"></i> Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="uploaded_doc d-flex align-items-center pl-2 pt-1">
                                        <i className="mdi mdi-file-excel" style={{'fontSize': '40px', 'color': '#1d7044',}} aria-hidden="true"></i>
                                        <h5 className="mt-2">{report?.attachments?.filename}</h5>

                                        {
                                            permissions?.report?.cod?.download &&
                                            report?.attachments?._id &&
                                            <span className={"btn-link ml-2"} style={{fontSize:14}} data-title="download" onClick={this.onDownloadAttachment}>
                                                <i
                                                    className="fa fa-download ml-2"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        }
                                    </div>

                                </div>

                                {
                                    Array.isArray(awb_numbers) && awb_numbers.length > 0 &&
                                    <div className="col-md-6 d-flex align-items-center justify-content-end ">
                                        <button
                                            className="btn btn-primary mr-3"
                                            onClick={() => this.remitOrders(awb_numbers, true)}
                                        >
                                            Remit All
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings = {[
                        "No.",
                        "AWB Number",
                        "Shipment date",
                        "Delivery date",
                        "Vendor name",
                        "Account number",
                        "IFSC code",
                        "Remittance amount",
                        "Action",
                    ]}
                    // showSearch={false}
                    totalEntries={order?.length}
                    rowData={order}
                    renderRow={this.renderRow}
                    onSearch={this.onSearch}
                    searchPlaceholder={"Search by AWB Number"}
                />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let reportId = match?.params?.id;

    let reports = state.report?.reports || {};
    let report = reportId && reports[reportId];

    let loggedInUser = state.loggedInUser?.data?.data;

    console.log("loggedInUser");

    return {
        reportId: reportId,
        report: report,
        loggedInUser: loggedInUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getReport: (id) => dispatch(fetchOneReportRequest(id)),
        remitOrder: (params) => dispatch(remitOrderRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetails)
