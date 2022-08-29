import React, { Component } from 'react';
import { connect } from 'react-redux';

import TableContainer from '../Utils/TableContainer';
import BreadCrumb from '../Utils/BreadCrumb';
import WeightDisputeCSVItem from './Components/WeightDisputeCSVItem';
import WeightDisputeUpload from './Components/WeightDisputeUpload';
import WeightDisputeErrorPopUp from './Components/WeightDisputeErrorPopUp';

import { fetchAllWeightDisputeCsvRequest } from './Duck/WeightDisputeActions';

class WeightDisputeCSV extends Component {

    state = {
        showUploadFileModal : false,
        showUploadErrorModal : false,
        errors: null,
    }

    componentDidMount() {
        this.loadMore();
    }

    componentDidUpdate(preProps) {
        const { isUploading, uploadingError } = this.props;
        if (preProps?.isUploading && !isUploading && uploadingError) {
            this.setState({
                showUploadErrorModal: true,
                errors: uploadingError?.errors,
                logistic_id: uploadingError?.logistic_id,
            });
        }

    }

    loadMore = (offset = 0, limit = 100) => {
        const { fetchAllWeightDisputeCsv, list, meta, location } = this.props;

        if (offset === 0 || meta?.total_count > list?.length) {
            let params = {
                pathname: location?.pathname,
                offset: offset,
                limit: limit,
            };

            fetchAllWeightDisputeCsv?.(params);
        }
    }

    handleUploadModal = (show = false) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showUploadFileModal: show,
        });
    }

    handleUploadErrorModal = (show = false) => {
        show = typeof show === "boolean" && show;
        this.setState(preState => ({
            showUploadErrorModal: show,
            errors: show ? preState?.errors : null,
        }));
    }

    render() {
        const { list, meta, loading, } = this.props
        const { showUploadFileModal, showUploadErrorModal, errors, logistic_id } = this.state;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Weight Dispute Upload
                                    </h2>
                                    <BreadCrumb
                                        title = {['Weight Discrepancy', 'Weight Dispute Upload']}
                                    />
                                </div>
                            </div>
                            <div className="page-title-right">
                                <a
                                    href={"/WeightDisputeCSV_Sample.xlsx"}
                                    className="btn btn-primary btn-icon-text mr-2"
                                >
                                    <i className="fa fa-download mr-2" aria-hidden="true" />
                                    <span>Sample File</span>
                                </a>

                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={() => this.handleUploadModal(true)}
                                >
                                    <i className="dripicons dripicons-upload mr-2" style={{lineHeight: 0}}></i>
                                    <span>Upload Here</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <TableContainer
                    headings={[
                        "No.",
                        "File name",
                        "Logistic partner",
                        "Uploaded by",
                        "Uploaded date",
                        "Action"
                    ]}
                    showSearch={false}
                    totalEntries={meta?.totalCount || meta?.total_count}
                    rowData={list}
                    loading={loading}
                    renderRow={(item, index) => (
                        <WeightDisputeCSVItem
                            id={item}
                            index={index}
                        />
                    )}
                />

                <WeightDisputeUpload
                    show={showUploadFileModal}
                    handleClose={this.handleUploadModal}
                />

                <WeightDisputeErrorPopUp
                    show={showUploadErrorModal}
                    errors={errors}
                    logistic_id={logistic_id}
                    handleClose={this.handleUploadErrorModal}
                />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { location } = ownProps;
    const pathname = location?.pathname;

    const filter = state.weightDispute?.filters?.[pathname];

    const boards = state.weightDispute?.boards;
    const mBoard = boards[JSON.stringify(filter || {})];
    const list = mBoard?.list;
    const meta = mBoard?.meta;
    const loading = mBoard?.loading;
    const error = mBoard?.error;

    const isUploading = state.weightDispute?.loading;
    const uploadingError = state.weightDispute?.error;

    const loggedInUser = state?.loggedInUser?.data?.data;

    return {
        loggedInUser: loggedInUser,
        list: list,
        meta: meta,
        loading: loading,
        error: error,
        isUploading: isUploading,
        uploadingError: uploadingError,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllWeightDisputeCsv: (params) => dispatch(fetchAllWeightDisputeCsvRequest(params)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WeightDisputeCSV)
