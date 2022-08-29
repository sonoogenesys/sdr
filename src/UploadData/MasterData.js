import React, { Component } from "react";
import axios from "axios";
import BaseModel from "../Utils/BaseModal";
import appUrl from "../Constants/AppUrl";
import BreadCrumb from '../Utils/BreadCrumb'
import moment from "moment";
import { Alert } from "react-bootstrap";
import fileDownload from "js-file-download";
import { showNotification } from "../Utils/CommonFunctions";
import { connect } from "react-redux";

class MasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isUploading: false,
            isShowModel: true,
            resMeta: null,
            attachment: null
        }
    }

    componentDidMount() {
        this.getMasterDataFile();
    }

    getMasterDataFile = () => {
        axios({
            method: "GET",
            url: appUrl.ATTACHMENTS_FILE,
            params: {
                onModel: "Master",
                model_id: 1234567890
            }
        })
        .then(res => {
            let resData = res.data;
            if (resData?.meta?.success === true && resData?.meta?.status === 200) {
                this.setState({
                    attachment: resData.data,
                });
            }
        })
        .catch(err => {
            console.log("getMasterDataFile ", err);
        })
    }

    fileUplaodEvent = (e) => {
        let file = e?.target?.files[0]
        if(file){
            let extension = file.name?.split('.')?.[file.name.split('.').length-1]
            if(extension === 'xls' || extension === 'xlsx'){
                this.setState({file:e?.target?.files[0]})
            }else{
                showNotification("error", "Upload xls or xlsx format file only!");
            }
        }
    }

    uploadFile = (e) => {
        let { file } = this.state;
        if(file){

            this.setState({
                isUploading: true,
            });

            let formData = new FormData();
            formData.set("model_id", 1234567890);
            formData.set("onModel", "Master");
            formData.set("files", file);

            axios.post(`${appUrl.CODES_URL}/upload_master_file`, formData)
            .then(res => {
                let resData = res?.data;
                let resMeta = resData?.meta;
                this.setState({
                    resMeta: resMeta,
                    isShowModel: true,
                    isUploading: false,
                    file: null
                });

                this.getMasterDataFile();
            })
            .catch(err => {
                this.setState({
                    isUploading: false,
                });

                console.log("upload file ", err);
            })
        }else{
            showNotification("warning", "Please choose a file!");
        }
    }

    onDownloadAttachment = () => {
        let { attachment } = this.state
        let id = attachment?._id;
        let filename = attachment?.filename;

        axios({
            method: 'GET',
            url: appUrl.ATTACHMENTS_DOWNLOAD + '/' + id,
            contentType: 'application/doc; charset=utf-8',
            responseType: 'arraybuffer',
        })
        .then(res => {
            fileDownload(res.data, filename);
            
        console.log('==',res)
        })
        .catch(err => {
            console.log("onDownloadOrder ", err);
        });
        
    }

    handleClose = () => {
        this.setState({
            resMeta: null,
            isShowModel: false,
        })
    }

    resetSelection = () => {
        this.setState({
            file: null,
            isUploading: false,
            isShowModel: true,
            resMeta: null
        })
    }


    render() {
        let { loggedInUser } = this.props
        const { file, isShowModel, resMeta, isUploading, attachment } = this.state;

        let permissions = loggedInUser?.role?._id?.permissions || {};
        const {
            upload_data = {},
        } = permissions;
        console.log(attachment, 'attachment')
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Master Data
                                    </h2>
                                    <BreadCrumb
                                        title = {['Upload Data', 'Master Data']}
                                    />
                                </div>
                            </div>
                            {/* <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                >
                                    <i className="fe fe-plus mr-2"></i> Add New
                                    Order
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <h4 className="card-title mb-0 d-flex justify-content-between">
                                Upload Here
                                <a href={"/MasterDataSampleFile.xlsx"}>
                                    <span className={"btn-link"} style={{fontSize:14}}>
                                        Sample File
                                        <i
                                            className="fa fa-download ml-2"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </a>
                            </h4>
                            <div className="card-body">
                                <form
                                    className="needs-validation"
                                    noValidate
                                >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="upload_img">
                                                <div className="file_upload">
                                                    <input
                                                        type="file"
                                                        className="fileupload"
                                                        name="fileupload"
                                                        accept=".xls, .xlsx"
                                                        // multiple
                                                        onChange={this.fileUplaodEvent}
                                                    />
                                                </div>
                                                <div className="upload_banner">
                                                    <span>
                                                        <i
                                                            className="fa fa-upload"
                                                            aria-hidden="true"
                                                        ></i>
                                                    </span>
                                                    <p>Choose file</p>
                                                </div>
                                                {
                                                    file && <div className='mt-3'>
                                                        <span>
                                                            <i className="fa fa-file-excel" style={{fontSize:18}} aria-hidden="true"></i>
                                                            <span style={{fontSize:16, marginLeft:8}}>{file.name}</span>
                                                        </span>
                                                    </div>
                                                }
                                                {/* <div className="image_preview">
                                                    <span className="close_preview">
                                                        X
                                                    </span>
                                                    <div></div>
                                                </div>
                                                <h4 className="file_uploaded">
                                                </h4> */}
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-12 text-right my-55">
                        <div className="button-items">
                        {/* <button className="btn btn-primary btn-block isLoading" onClick={this.onSubmit} disabled={isLoading} >

                            </button> */}
                            <button type="button" className="btn  btn-primary" onClick={this.uploadFile} disabled={isUploading}>
                                {
                                    isUploading ?
                                    <>
                                        <span className="spinner-border spinner-border-sm"></span>
                                        <span className="visually-hidden">  Uploading...</span>
                                    </>
                                    : "Upload"
                                }
                            </button>
                            {/* <button type="button" className="btn btn-white" onClick={this.resetSelection}>
                                Reset
                            </button> */}
                        </div>
                    </div>
                </div>

                {
                    attachment &&
                    <Alert
                        variant={"info"}
                        className={`d-flex justify-content-between flex-wrap ${upload_data?.master?.download && "pointer"}`}
                        onClick={upload_data?.master?.download && this.onDownloadAttachment}
                    >
                        <span data-title='Click to download the file' className="mr-2">{attachment?.filename}</span>
                        <span
                            style={{textDecoration:'underline'}}
                            data-title={upload_data?.master?.download ? 'Click to download the file' : undefined}
                        >Last upload {moment(attachment?.timestamp).format("lll")}</span>
                    </Alert>
                }

                <BaseModel
                    show={isShowModel && resMeta}
                    title={resMeta?.success ? "Upload Successfully" : "Upload Failed"}
                    handleClose={this.handleClose}
                >
                    <p>
                        {
                            resMeta?.success
                            ? "File has been successfully added to the database."
                            : "Failed to upload the file"
                        }
                    </p>
                </BaseModel>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let loggedInUser = state.loggedInUser?.data?.data;

    return {
        loggedInUser: loggedInUser,
    };
};

export default connect(mapStateToProps)(MasterData);
