import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import TableContainer from "../Utils/TableContainer";
import BreadCrumb from "../Utils/BreadCrumb";
import { fetchAllReportsRequest } from "./Duck/ReportsActions";
import axios from "axios";
import appUrl from "../Constants/AppUrl";
import fileDownload from "js-file-download";
import { showNotification } from "../Utils/CommonFunctions";
import { Link } from "react-router-dom";

class CodReports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            isLoading: false,
        }
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
                type: "cod",
                offset: offset,
                limit: limit
            };

            getAllReports && getAllReports(params);
        }
    }

    generateReport = () => {
        this.setState({
            isLoading: true,
        });

        axios({
            method: 'POST',
            url: `${appUrl.REPORTS_URL}/cod-day`,
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
            console.log("Generate COD Report ", err);
        });
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

    showDetails = (id) => {
        this.props.history.push(`/app/reportDetails/${id}`);
    }

    renderRow = (item, index) => {
        let { reports } = this.props;
        let report = item && reports && reports[item];
        let attachment = report?.attachments;
        let created_at = attachment?.timestamp;

        return (
            report && (
                <tr key={index}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{attachment?.filename}</td>
                    <td>{created_at ? moment(created_at).format("D MMM YYYY, h:mm:ss a") : "-"}</td>
                    <td>{report?.total_price && parseFloat(report?.total_price).toFixed(2)}</td>
                    <td style={{textAlign:'center'}}>
                        <button className="btn btn-primary view_btn" onClick={() => this.showDetails(item)} >
                            View Details
                        </button>
                        {/* {
                            attachment &&
                            <span onClick={() => this.onDownloadReport(attachment)} style={{marginLeft:10}} data-title={'Download file'}>
                                <i className="bx bxs-download"></i>
                            </span>
                        } */}
                    </td>
                </tr>
            )
        );
    };

    onSearch = (text) => {
        this.setState({
            searchText: text,
        });
    };

    render() {
        const { searchText, isLoading } = this.state;
        let { list, meta, loading } = this.props;

        let totalCount = meta?.totalCount || 0;
        // if (!!searchText) {
        //     list = list?.filter((id) => {
        //         let codReport = id && reports[id];
        //         let fileName = codReport?.attachments?.filename?.toLowerCase();

        //         return fileName?.includes(searchText.toLowerCase()) && id;
        //     });

        //     totalCount = list?.length || 0;
        // }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        COD Reports
                                    </h2>
                                    <BreadCrumb
                                        title = {['Reports', 'COD Reports']}
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

                <TableContainer
                    headings={[
                        "No.",
                        "File Name",
                        "Created Date",
                        "Total Amount(₹)",
                        "Action",
                    ]}
                    onSearch={this.onSearch}
                    showSearch={false}
                    rowData={list}
                    totalEntries={totalCount}
                    renderRow={this.renderRow}
                    loading={loading}
                />

            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let filter = JSON.stringify("cod");
    let reports = state.report?.reports || {};
    let dashboard = state.report?.dashboard && state.report?.dashboard[filter] || {};
    let list = dashboard?.list || [];
    let meta = dashboard?.meta || {};
    let loading = dashboard?.loading;
    let error = dashboard?.error;

    return {
        reports: reports,
        list: list,
        meta: meta,
        loading: loading,
        error: error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllReports: (params) => dispatch(fetchAllReportsRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodReports);
