

import React,{Component} from 'react';
import BreadCrumb from '../Utils/BreadCrumb';
import RemittanceUpload from './Components/RemittanceUpload';
import {connect} from 'react-redux'
import { showNotification } from '../Utils/CommonFunctions';
import TableContainer from '../Utils/TableContainer';
import {fetchAllRemittanceRequest, uploadFile} from './Duck/RemittanceActions'
import moment from 'moment'
import {Link} from 'react-router-dom'
// import FilePreviewModal from '../FilePreview/filePreviewModal'
// import FilePreviewWrapper from '../FilePreview/filePreviewWrapper'
import fileDownload from "js-file-download";
import axios from 'axios'
import appUrl from '../Constants/AppUrl'
class RemittanceProfile extends Component {

    state = {
        showModal : false,
        selectedCourierPartner : '',
        file: null,
        fileErr: null,
        courierErr: null,
        onLoad: false,
        showPreviewOfFileId: null,
        allAttachments: []
    }
    imageComp = React.createRef();

    componentDidMount() {
        this.loadMore();
        this.imageComp.current && this.imageComp.current.addEventListener("keydown", (e) => {
            // press esc to close the preview
            if (e.keyCode === 27) {
                this.togglePreview(null);
            }
        })
    }

    loadMore = (offset = 0, limit = 10) => {
        let { fetchAllRemittance, orderList, remittanceMeta, } = this.props;

        if (offset === 0 || (remittanceMeta?.totalCount || remittanceMeta?.total_count) > orderList?.length) {
            let params = {
                offset,
                limit,
            };

            fetchAllRemittance?.(params);
        }
    }

    componentWillUnmount(){
        this.imageComp.current && this.imageComp.current.removeEventListener("keydown", this.togglePreview(null));
    }

    togglePreview = (fileId, attachments) => {
        this.setState({showPreviewOfFileId: fileId, allAttachments: attachments})
    }

    handleUploadModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    selectCourierPartner = (e) => {
        this.setState({
            selectedCourierPartner: e?.target?.value,
            courierErr:null
        })
    }

    fileUpload = (event) => {
        let file = event?.target?.files[0];

        if(file){
            let extension = file.name?.split('.')?.[file.name.split('.').length-1];
            if(extension === 'xls' || extension === 'xlsx'){
                this.setState({
                    file,
                    fileErr: null
                });
            }else{
                showNotification("error", "Upload xls and xlsx format file only!");
            }
        }
    }

    handleSubmit = () => {
        const {selectedCourierPartner, file} = this.state
        // if(selectedCourierPartner === ''){
        //     this.setState({courierErr: 'Please select a courier partner'})
        //     return false
        // }
        // else
        if(!file){
            this.setState({fileErr: 'Please choose a file', courierErr: null})
            return false
        }
        let formData = new FormData();
        // formData.set("logistic_id", selectedCourierPartner);
        formData.set("model_id", 123456789);
        formData.set("onModel", "Remittance");
        formData.set("files", file);
        this.setState({onLoad: true})
        this.props.uploadFile(formData)
    }

    componentDidUpdate(prevProps){
        let { error } = this.props;

        if(this.state.onLoad && prevProps?.isLoading && !this.props.isLoading) {
            if(!error){
                this.setState({
                    onLoad: false,
                    showModal: false,
                    file: null,
                    selectedCourierPartner: ''
                })
                showNotification('success', 'File uploaded successfully');
            } else {
                this.setState({
                    onLoad: false,
                });
                showNotification('error', error?.meta?.message || error?.message);
            }
        }
    }

    renderRow = (id, index) => {
        let { remittance, users, loggedInUser } = this.props;
        let permissions = loggedInUser?.role?._id?.permissions || {};

        let _remittance = id && remittance && remittance[id];
        let fname = users[_remittance?.createdBy?._id]?.first_name
        let lname = users[_remittance?.createdBy?._id]?.last_name
        let name  = (fname && lname) ? fname + ' ' + lname : fname || lname;


        return (
            _remittance && (
                <tr key={`${id}_${index}`}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    {/* <td className='pointer' onClick={() => this.togglePreview(_remittance?.attachments_id?._id, [_remittance?.attachments_id])}> */}
                    <td
                        className={permissions?.remittance?.confirmation_csv?.download ? 'pointer' : undefined}
                        data-title={permissions?.remittance?.confirmation_csv?.download ? 'Download' : undefined}
                        onClick={() =>
                            permissions?.remittance?.confirmation_csv?.download
                            ? this.downloadAttachment(_remittance?.attachments_id)
                            : undefined
                        }
                    >
                        <div tabIndex="0" ref={this.imageComp} style={{outline:0}}>
                            {_remittance?.attachments_id?.filename}
                        </div>
                    </td>
                    {/* <td>{_remittance?.logistic_id?.name}</td> */}
                    <td>{name || _remittance?.createdBy?.name || _remittance?.createdBy?.email}</td>
                    <td style={{letterSpacing:'0.8px'}}>{moment(_remittance?.createdAt).format("D MMM YYYY, h:mm a")}</td>
                    <td style={{textAlign:'center',letterSpacing:'0.8px'}}>
                        <Link to={`/app/RemittanceEntries/${id}`} className="btn btn-primary view_btn">View Details</Link>
                    </td>
                </tr>
            )
        );
    };

    downloadAttachment = (attachment) => {
        let id = attachment?._id;
        let filename = attachment?.filename;

        axios({
            method: 'GET',
            url: `${appUrl.ATTACHMENTS_DOWNLOAD}/${id}`,
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

    render() {
        const {logistics, orderList, remittanceMeta, isLoading} = this.props
        const {showModal, selectedCourierPartner, courierErr, fileErr, file, onLoad} = this.state
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Confirmation CSV
                                    </h2>
                                    <BreadCrumb
                                        title = {['Remittance', 'Confirmation CSV']}
                                    />
                                </div>
                            </div>
                            <div className="page-title-right">
                                <a
                                    href={"/CSV_Sample.xlsx"}
                                    className="btn btn-primary btn-icon-text mr-2"
                                >
                                    <i className="fa fa-download mr-2" aria-hidden="true" />
                                    <span>Sample File</span>
                                </a>

                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.handleUploadModal}
                                >
                                    <i className="dripicons dripicons-upload mr-2" style={{lineHeight: 0}}></i>
                                    <span>Upload Here</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <h4 className="card-title">Listing</h4>
                            <div className="col-xl-12">
                                <div className="row">
                                    <div className="col-xl-6">
                                        <div className="d-flex align-items-center pt-3">
                                            <p className="mb-0">show</p>
                                            <div className="col-xl-3">
                                                <select className="custom-select">
                                                    <option value="10">
                                                        10
                                                    </option>
                                                    <option value="25">
                                                        25
                                                    </option>
                                                    <option value="50">
                                                        50
                                                    </option>
                                                    <option value="100">
                                                        100
                                                    </option>
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
                                                <th>File Name</th>
                                                <th>Logistic partner</th>
                                                <th>Uploaded by</th>
                                                <th>Uploaded Date</th>
                                                <th>View Details</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>77700009</td>
                                                <td>abc xyz</td>
                                                <td>Tripti Verma</td>
                                                <td>28 feb 2021</td>
                                                <td style={{textAlign:'center'}}>
                                                    <Link to="/app/RemittanceEntries"
                                                        className="btn btn-primary view_btn"
                                                    >View Details</Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div> */}

                {/* {
                    this.state.showPreviewOfFileId &&
                        <FilePreviewModal toggleModal={this.togglePreview}>
                            <FilePreviewWrapper
                                data                = {this.state.allAttachments}
                                showPreviewOfFileId = {this.state.showPreviewOfFileId}
                                togglePreview       = {this.togglePreview}
                            />
                        </FilePreviewModal>
                } */}

                <TableContainer
                    headings={[
                        "No.",
                        "File name",
                        // "Logistic partner",
                        "Uploaded by",
                        "Uploaded date",
                        "Action"
                    ]}
                    showSearch={false}
                    totalEntries={remittanceMeta?.totalCount || remittanceMeta?.total_count}
                    rowData={orderList}
                    renderRow={this.renderRow}
                    loading={isLoading}
                    loadMore={this.loadMore}
                />

                <RemittanceUpload
                    show={showModal}
                    handleClose={this.handleUploadModal}
                    logistics={logistics}
                    selectedCourierPartner={selectedCourierPartner}
                    selectCourierPartner={this.selectCourierPartner}
                    courierErr={courierErr}
                    fileErr={fileErr}
                    handleSubmit={this.handleSubmit}
                    fileUpload={this.fileUpload}
                    onLoad={onLoad}
                    file={file}
                />
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        logistics: state?.logistics?.data,
        remittance: state?.remittance?.remittance,
        orderList: state?.remittance?.orderList,
        remittanceMeta: state?.remittance?.meta,
        users: state?.users?.users,
        isLoading: state?.remittance?.loading,
        error: state?.remittance?.error,
        loggedInUser: state.loggedInUser?.data?.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFile: (params) => dispatch(uploadFile(params)),
        fetchAllRemittance: (params) => dispatch(fetchAllRemittanceRequest(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RemittanceProfile)
