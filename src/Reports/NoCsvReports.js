import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import BreadCrumb from "../Utils/BreadCrumb";
import { fetchAllReportsRequest } from "./Duck/ReportsActions";
import fileDownload from "js-file-download";
import axios from "axios";
import appUrl from "../Constants/AppUrl";
import { showNotification } from "../Utils/CommonFunctions";
import Tippy from '@tippyjs/react';
class NoCsvReports extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };
    }

    componentDidMount() {
        this.loadMoreReports();
    }

    componentDidUpdate(preProps) {
        let { list } = this.props;
        if (preProps.list?.length !== list?.length) {
            this.loadMoreReports(list?.length);
        }
    }

    loadMoreReports = (offset = 0, limit = 100) => {
        let { list, meta, getAllReports } = this.props;
        if (offset === 0 || meta?.totalCount > list?.length) {
            let params = {
                type: "week",
                offset: offset,
                limit: limit
            };

            getAllReports && getAllReports(params);
        }
    }

    onDownloadReport = (attachment) => {
        let id = attachment?._id;
        let filename = attachment?.filename || "COD Report";

        if (id) {
            axios({
                method: 'GET',
                url: appUrl.ATTACHMENTS_DOWNLOAD + '/' + id,
                contentType: 'application/doc; charset=utf-8',
                responseType: 'arraybuffer',
            })
            .then(res => {
                fileDownload(res.data, filename);
            })
            .catch(err => {
                console.log("onDownloadOrder ", err);
            });
        }
    }

    renderRow = (item, index) => {
        let { reports, loggedInUser } = this.props;
        let report = item && reports && reports[item];
        let attachment = report?.attachments;
        let created_at = attachment?.timestamp;

        let permissions = loggedInUser?.role?._id?.permissions || {};

        return (
            report && (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{attachment?.filename}</td>
                    <td>{created_at ? moment(created_at).format("D MMM YYYY, h:mm:ss a") : "-"}</td>

                    {
                        permissions?.report?.no_csv?.download &&
                        <td style={{textAlign:'center'}}>
                            {
                                attachment &&
                                <span onClick={() => this.onDownloadReport(attachment)} style={{marginLeft:10}}>
                                     <Tippy content="Download file">
                                         <i className="bx bxs-download"></i>
                                     </Tippy>
                                </span>
                            }
                        </td>
                    }
                </tr>
            )
        );
    };

    generateReport = () => {
        this.setState({
            isLoading: true,
        });

        axios({
            method: 'POST',
            url: `${appUrl.REPORTS_URL}/cod-week`,
        })
        .then(res => {
            let resData = res.data;
            let resMeta = resData.meta || resData;

            showNotification(resMeta?.success && resMeta?.status === 200 ? "success" : "error", resMeta?.message);
            resMeta?.success && resMeta?.status === 200 && this.loadMoreReports();

            this.setState({
                isLoading: false,
            });
        })
        .catch(err => {
            console.log("Generate No CSV Report ", err);
        });
    }

    render() {
        let { isLoading } = this.state;
        let { list, meta, loading, loggedInUser } = this.props;
        let permissions = loggedInUser?.role?._id?.permissions || {};

        let totalAmount = meta?.totalAmount || 0;
        let totalCaseCount = meta?.totalCount || 0;

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        No CSV Reports
                                    </h2>
                                    <BreadCrumb
                                        title = {['Reports', 'No CSV Reports']}
                                    />
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.generateReport}
                                    disabled={isLoading}
                                >
                                    {
                                        isLoading
                                        ? <>
                                                <span className="spinner-border spinner-border-sm"></span>
                                                <span className="visually-hidden"> Generating Report...</span>
                                            </>
                                        : "Generate Report"
                                    }
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* <div className="row">
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
                                <h5 className="mb-0">{totalCaseCount}</h5>
                                <p className="mb-0">Total CSV Cases</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                <TableContainer
                    headings={
                        permissions?.report?.no_csv?.download
                        ? [
                            "No.",
                            "File Name",
                            "Created Date",
                            "Action",
                        ] : [
                            "No.",
                            "File Name",
                            { text: "Created Date", style: {} },
                        ]
                    }
                    totalEntries={totalCaseCount}
                    rowData={list}
                    renderRow={this.renderRow}
                    showSearch={false}
                    loading={loading}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let filter = JSON.stringify("week");
    let reports = state.report?.reports || {};
    let dashboard = state.report?.dashboard && state.report?.dashboard[filter] || {};
    let list = dashboard?.list || [];
    let meta = dashboard?.meta || {};
    let loading = dashboard?.loading;
    let error = dashboard?.error;

    let loggedInUser = state.loggedInUser?.data?.data;

    return {
        reports: reports,
        list: list,
        meta: meta,
        loading: loading,
        error: error,
        loggedInUser: loggedInUser,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllReports: (params) => dispatch(fetchAllReportsRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoCsvReports);
