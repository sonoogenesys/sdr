import React, { Component } from "react";
import TextInput from "../Utils/TextInput";
import BreadCrumb from "../Utils/BreadCrumb";
import { showNotification, validatePanNumber } from "../Utils/CommonFunctions";
import { connect } from "react-redux";
import { getLoggedInUser, updateUser } from "../Profile/Duck/ProfileActions";
import appUrl from "../Constants/AppUrl";
import axios from "axios";
import BaseTable from "../Utils/BaseTable";
import fileDownload from "js-file-download";
import FilePreviewModal from '../FilePreview/filePreviewModal'
import FilePreviewWrapper from '../FilePreview/filePreviewWrapper'

class AccountCreation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountHolderName: "",
            accountNumber: "",
            bankName: "",
            ifscCode: "",
            gstNo: "",
            gstAddress: "",
            gstState: "",
            panCardNumber: "",
            aadhaarCardNumber: "",
            aadharFile: null,
            panCardFile: null,
            cancelChequeFile: null,
            accountHolderNameErr: "",
            accountNumberErr: "",
            bankNameErr: "",
            ifscCodeErr: "",
            gstNoErr: "",
            gstAddressErr: "",
            gstStateErr: "",
            panCardNumberErr: "",
            aadhaarCardNumberErr: "",
            isLoading: false,
            showPreviewOfFileId: null,
            allAttachments: [],
        };
        this.imageComp = React.createRef();
    }

    componentWillUnmount(){
        this.imageComp.current && this.imageComp.current.removeEventListener("keydown", this.togglePreview(null));
    }

    togglePreview = (fileId, attachments) => {
        this.setState({showPreviewOfFileId: fileId, allAttachments: attachments})
    }

    componentDidMount() {
        let { userId, getUser } = this.props;
        userId && getUser && getUser(userId);
        this.setDefault();
        this.imageComp.current && this.imageComp.current.addEventListener("keydown", (e) => {
            // press esc to close the preview
            if (e.keyCode === 27) {
                this.togglePreview(null);
            }
        })
    }

    componentDidUpdate(prevProps) {
        let { isLoading } = this.state;
        let { loading, error } = this.props;

        if (prevProps.loading && !loading) {
            if (!error) {
                isLoading && showNotification("success", "A request has been sent for approval.");
                this.setDefault();
            } else {
                error?.message && showNotification("error", error?.message);
                this.setState({
                    isLoading: false,
                });
            }
        }
    }

    setDefault = () => {
        let { bankDetail, attachments } = this.props;

        this.setState({
            accountHolderName: bankDetail?.account_holder,
            accountNumber: bankDetail?.account_number,
            bankName: bankDetail?.ifsc,
            ifscCode: bankDetail?.bank_name,
            ifscCode: bankDetail?.bank_name,
            gstNo: bankDetail?.gst_number,
            gstAddress: bankDetail?.gst_address,
            gstState: bankDetail?.gst_state,
            panCardNumber: bankDetail?.pan_card_number,
            aadhaarCardNumber: bankDetail?.aadhaar_card_number,
            aadharFile: null,
            panCardFile: null,
            cancelChequeFile: null,
            isLoading: false,
        });
    }

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        if (name === "panCardNumber") {
            value = value?.toUpperCase();
        }

        this.setState({
            [name]: value,
        });
    };

    handleChooseFile = (name) => (event) => {
        let file = event?.target?.files[0];

        if(file){
            let extension = file.name?.split('.')?.[file.name.split('.').length-1];
            extension = extension?.toLowerCase();
            if(extension === 'png' || extension === 'jpeg' || extension === 'jpg'){
                this.setState({
                    [name]: file,
                });
            }else{
                showNotification("error", "Upload png, jpeg or jpg format file only!");
            }
        }
    };

    hasError = () => {
        let isFileErrorHit = false;
        let isErrorHit = false;
        let { attachments } = this.props;
        let {
            accountHolderName,
            accountNumber,
            bankName,
            ifscCode,
            gstNo,
            gstAddress,
            gstState,
            panCardNumber,
            aadhaarCardNumber,
            aadharFile,
            panCardFile,
            cancelChequeFile,
        } = this.state;
        let accountHolderNameErr = "";
        let accountNumberErr = "";
        let bankNameErr = "";
        let ifscCodeErr = "";
        let gstNoErr = "";
        let gstAddressErr = "";
        let gstStateErr = "";
        let panCardNumberErr = "";
        let aadhaarCardNumberErr = "";

        if (!accountHolderName) {
            accountHolderNameErr = "Please enter Account Holder Name";
            isErrorHit = true;
        }

        if (!accountNumber) {
            accountNumberErr = "Please enter Account Number";
            isErrorHit = true;
        }

        if (!bankName) {
            bankNameErr = "Please enter Bank Name";
            isErrorHit = true;
        }

        if (!ifscCode) {
            ifscCodeErr = "Please enter IFSC Code";
            isErrorHit = true;
        }

        if (!gstNo) {
            gstNoErr = "Please enter GST Number";
            isErrorHit = true;
        }

        if (!gstAddress) {
            gstAddressErr = "Please enter GST address";
            isErrorHit = true;
        }

        if (!gstState) {
            gstStateErr = "Please enter GST state";
            isErrorHit = true;
        }

        if (!panCardNumber) {
            panCardNumberErr = "Please enter PAN card number";
            isErrorHit = true;
        } else if (!validatePanNumber(panCardNumber)) {
            panCardNumberErr = "Please enter valid PAN card number";
            isFileErrorHit = true;
        }

        // if (!aadhaarCardNumber) {
        //     aadhaarCardNumber = "Please enter Addhar card number";
        //     isErrorHit = true;
        // }

        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");
        if ((!aadharAttachment && !aadharFile) || (!panAttachment && !panCardFile) || (!chequeAttachment && !cancelChequeFile)) {
            isErrorHit = true;
        }

        if (
            !accountHolderName ||
            !accountNumber ||
            !bankName ||
            !ifscCode ||
            !gstNo ||
            !gstAddress ||
            !gstState ||
            !panCardNumber ||
            // !aadhaarCardNumber ||
            isFileErrorHit
        ) {
            showNotification("warning", "Please fill all mandatory fields & choose all files!");
        }


        this.setState({
            accountHolderNameErr,
            accountNumberErr,
            bankNameErr,
            ifscCodeErr,
            gstNoErr,
            gstAddressErr,
            gstStateErr,
            panCardNumberErr,
            aadhaarCardNumberErr,
        });

        return isErrorHit || isFileErrorHit;
    };

    onSubmit = async () => {
        if (!this.hasError()) {
            let { userId, updateBankDetail } = this.props;
            let {
                accountHolderName,
                accountNumber,
                bankName,
                ifscCode,
                gstNo,
                gstAddress,
                gstState,
                panCardNumber,
                aadhaarCardNumber,
                aadharFile,
                panCardFile,
                cancelChequeFile,
            } = this.state;
            this.setState({ isLoading: true });

            accountHolderName = accountHolderName?.trim();
            accountNumber = accountNumber?.trim();
            bankName = bankName?.trim();
            ifscCode = ifscCode?.trim();
            gstNo = gstNo?.trim();
            gstAddress = gstAddress?.trim();
            gstState = gstState?.trim();
            panCardNumber = panCardNumber?.trim();
            aadhaarCardNumber = aadhaarCardNumber?.trim();

            if (aadharFile) {
                let aadharFormData = new FormData();
                aadharFormData.set("model_id", userId);
                aadharFormData.set("onModel", "Aadhar");
                aadharFormData.set("files", aadharFile);

                let aadharUploadRes = await axios.post(appUrl.ATTACHMENTS_UPLOAD, aadharFormData);
                let aadharResData = aadharUploadRes.data;
                let aadharResMeta = aadharResData.meta;

                if (aadharResMeta?.status !== 200 || !aadharResMeta?.success) {
                    this.setState({ isLoading: false });
                    showNotification("error", aadharResMeta?.message);
                    return;
                }
            }

            if (panCardFile) {
                let panCardFormData = new FormData();
                panCardFormData.set("model_id", userId);
                panCardFormData.set("onModel", "Pan");
                panCardFormData.set("files", panCardFile);

                let panUploadRes = await axios.post(appUrl.ATTACHMENTS_UPLOAD, panCardFormData);
                let panResData = panUploadRes.data;
                let panResMeta = panResData.meta;

                if (panResMeta?.status !== 200 || !panResMeta?.success) {
                    this.setState({ isLoading: false });
                    showNotification("error", panResMeta?.message);
                    return;
                }
            }

            if (cancelChequeFile) {
                let chequeFormData = new FormData();
                chequeFormData.set("model_id", userId);
                chequeFormData.set("onModel", "Cheque");
                chequeFormData.set("files", cancelChequeFile);

                let chequeUploadRes = await axios.post(appUrl.ATTACHMENTS_UPLOAD, chequeFormData);
                let chequeResData = chequeUploadRes.data;
                let chequeResMeta = chequeResData.meta;

                if (chequeResMeta?.status !== 200 || !chequeResMeta?.success) {
                    this.setState({ isLoading: false });
                    showNotification("error", chequeResMeta?.message);
                    return;
                }
            }

            let bankObj = {
                _id: userId,
                account_holder: accountHolderName,
                account_number: accountNumber,
                bank_name: bankName,
                ifsc: ifscCode,
                gst_number: gstNo,
                gst_address: gstAddress,
                gst_state: gstState,
                pan_card_number: panCardNumber,
                aadhaar_card_number: aadhaarCardNumber,
            };

            updateBankDetail(bankObj);
        }
        // else {
        //     showNotification("warning", "Please fill all mandatory fields & choose all files!");
        // }
    };

    onDownloadFile = (attachment) => {
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
        })
        .catch(err => {
            showNotification("error", "There is some error while downloading a file");
        });
    }

    renderRow = (_, index) => {
        let { attachments, bankDetail, isBankVerified } = this.props;

        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");

        let showForm = !bankDetail || !aadharAttachment || !panAttachment || !chequeAttachment || !!bankDetail?.verification_reject;

        return(
            <tr
                key={index}
                className={showForm ? "pointer" : ""}
                style={{ whiteSpace: "nowrap" }}
            >
                <td style={{ textAlign: "center" }} >{bankDetail?.account_holder}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.account_number}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.bank_name}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.ifsc}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.gst_number}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.gst_address}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.gst_state}</td>
                {/* <td style={{ textAlign: "center" }}>{bankDetail?.aadhaar_card_number}</td> */}
                <td style={{ textAlign: "center" }}>{bankDetail?.pan_card_number}</td>
                <td style={{ textAlign: "center" }}>
                    <span className="uploaded_ids" data-title={"Preview"} onClick={() => this.togglePreview(aadharAttachment?._id, attachments)}>
                        <img
                            src={"/images/idcard.png"}
                        />
                    </span>
                </td>
                <td style={{ textAlign: "center" }}>
                    <span className="uploaded_ids" data-title={"Preview"} onClick={() => this.togglePreview(panAttachment?._id, attachments)}>
                        <img src="/images/pancard.jpg" />
                    </span>
                </td>
                <td style={{ textAlign: "center" }}>
                    <span className="uploaded_ids" data-title={"Preview"} onClick={() => this.togglePreview(chequeAttachment?._id, attachments)}>
                        <img src="/images/cheque_2.jpg" />
                    </span>
                </td>
                <td style={{ textAlign: "center", color: isBankVerified ? "#07d836" : "#e8b30e" }}>
                    {isBankVerified ? "verified" : "verification pending"}
                </td>
            </tr>
        );
    }

    render() {
        let { attachments, bankDetail, isBankVerified } = this.props;
        let {
            accountHolderName,
            accountNumber,
            bankName,
            ifscCode,
            gstNo,
            gstAddress,
            gstState,
            panCardNumber,
            aadhaarCardNumber,
            aadharFile,
            panCardFile,
            cancelChequeFile,
            accountHolderNameErr,
            accountNumberErr,
            bankNameErr,
            ifscCodeErr,
            gstNoErr,
            gstAddressErr,
            gstStateErr,
            panCardNumberErr,
            aadhaarCardNumberErr,
            isLoading,
        } = this.state;

        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");

        let showForm = !bankDetail || !aadharAttachment || !panAttachment || !chequeAttachment || !!bankDetail?.verification_reject;

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Account Details
                                    </h2>
                                    <BreadCrumb
                                        title={[
                                            "Profile",
                                            "Account Details",
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            {
                                showForm //&& !isBankVerified
                                ? (
                                    <div className="row justify-content-center pt-3 pb-3">
                                        <div className="col-md-11">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"Account Holder"}
                                                            value={accountHolderName}
                                                            errorText={accountHolderNameErr}
                                                            onChange={this.handleChange("accountHolderName")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"Account Number"}
                                                            value={accountNumber}
                                                            errorText={accountNumberErr}
                                                            onChange={this.handleChange("accountNumber")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"Bank Name"}
                                                            value={bankName}
                                                            errorText={bankNameErr}
                                                            onChange={this.handleChange("bankName")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"IFSC Code"}
                                                            value={ifscCode}
                                                            errorText={ifscCodeErr}
                                                            onChange={this.handleChange("ifscCode")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"GST No"}
                                                            value={gstNo}
                                                            errorText={gstNoErr}
                                                            onChange={this.handleChange("gstNo")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"GST ADDRESS"}
                                                            value={gstAddress}
                                                            errorText={gstAddressErr}
                                                            onChange={this.handleChange("gstAddress")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"GST State"}
                                                            value={gstState}
                                                            errorText={gstStateErr}
                                                            onChange={this.handleChange("gstState")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    {/* <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"Aadhar Card Number"}
                                                            value={aadhaarCardNumber}
                                                            errorText={aadhaarCardNumberErr}
                                                            onChange={this.handleChange("aadhaarCardNumber")}
                                                            // isRequired={true}
                                                        />
                                                    </div> */}

                                                    <div className="col-md-3 mt-3">
                                                        <TextInput
                                                            labelText={"PAN Card Number"}
                                                            value={panCardNumber}
                                                            errorText={panCardNumberErr}
                                                            onChange={this.handleChange("panCardNumber")}
                                                            isRequired={true}
                                                        />
                                                    </div>

                                                    <div className="col-md-4 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Aadhar card <span style={{color:'red'}}>*</span>
                                                            </label>
                                                            <div className="upload_remittance position-relative">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={this.handleChooseFile("aadharFile")}
                                                                />
                                                                <div className="upload_banner pt-2 pb-2">
                                                                    <span>
                                                                        <i
                                                                            className="fa fa-upload"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                    <p className="mb-0">
                                                                        Choose file
                                                                    </p>
                                                                </div>

                                                                {
                                                                    (aadharFile || aadharAttachment) &&
                                                                    <div className='mt-3'>
                                                                        <span>
                                                                            <i className="fa fa-file-image" style={{fontSize:18}} aria-hidden="true"></i>
                                                                            <span style={{fontSize:16, marginLeft:8}}>{aadharFile?.name || aadharAttachment?.filename}</span>
                                                                        </span>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Pan card <span style={{color:'red'}}>*</span>
                                                            </label>
                                                            <div className="upload_remittance position-relative">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={this.handleChooseFile("panCardFile")}
                                                                />
                                                                <div className="upload_banner pt-2 pb-2">
                                                                    <span>
                                                                        <i
                                                                            className="fa fa-upload"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                    <p className="mb-0">
                                                                        Choose file
                                                                    </p>
                                                                </div>
                                                                {
                                                                    (panCardFile || panAttachment) &&
                                                                    <div className='mt-3'>
                                                                        <span>
                                                                            <i className="fa fa-file-image" style={{fontSize:18}} aria-hidden="true"></i>
                                                                            <span style={{fontSize:16, marginLeft:8}}>{panCardFile?.name || panAttachment?.filename}</span>
                                                                        </span>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 mt-4">
                                                        <div className="form-group">
                                                            <label htmlFor="">
                                                                Cancel Cheque <span style={{color:'red'}}>*</span>
                                                            </label>
                                                            <div className="upload_remittance position-relative">
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={this.handleChooseFile("cancelChequeFile")}
                                                                />
                                                                <div className="upload_banner pt-2 pb-2">
                                                                    <span>
                                                                        <i
                                                                            className="fa fa-upload"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                    <p className="mb-0">
                                                                        Choose file
                                                                    </p>
                                                                </div>
                                                                {
                                                                    (cancelChequeFile || chequeAttachment) &&
                                                                    <div className='mt-3'>
                                                                        <span>
                                                                            <i className="fa fa-file-image" style={{fontSize:18}} aria-hidden="true"></i>
                                                                            <span style={{fontSize:16, marginLeft:8}}>{cancelChequeFile?.name || chequeAttachment?.filename}</span>
                                                                        </span>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        bankDetail?.verification_reject &&
                                                        <div className="col-md-12 button-items mt-4">
                                                            <strong style={{ fontSize: 15 }}>Verifier's Remark</strong>
                                                            <p style={{ fontSize: 15, color: "#D67D01" }}>{bankDetail?.verification_reject}</p>
                                                        </div>
                                                    }

                                                    <div className="col-md-12 text-center button-items mt-4">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary"
                                                            onClick={this.onSubmit}
                                                            disabled={isLoading}
                                                        >
                                                            {
                                                                isLoading
                                                                ? (
                                                                    <>
                                                                        <span className="spinner-border spinner-border-sm"></span>
                                                                        <span className="visually-hidden">  Uploading...</span>
                                                                    </>
                                                                ) : "Submit"
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{padding:'10px'}}>
                                        {
                                            this.state.showPreviewOfFileId &&
                                                <FilePreviewModal toggleModal={this.togglePreview}>
                                                    <FilePreviewWrapper
                                                        data                = {this.state.allAttachments}
                                                        showPreviewOfFileId = {this.state.showPreviewOfFileId}
                                                        togglePreview       = {this.togglePreview}
                                                    />
                                                </FilePreviewModal>
                                        }
                                        <BaseTable
                                            headingData={[
                                                { text: "Account Holder", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Account Number", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Bank Name", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "IFSC Code", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "GST Number", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "GST Address", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "GST State", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                // { text: "Aadhar Number", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Pan Number", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Aadhar card", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Pan card", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Cancel Cheque", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                                { text: "Status", style: { textAlign: "center", whiteSpace: "nowrap" }},
                                            ]}
                                            rowData={[1]}
                                            renderRowItem={this.renderRow}
                                        />
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let loading = state.loggedInUser.loading;
    let error = state.loggedInUser.error;

    let user = state.loggedInUser?.data?.data;
    let bankDetail = user?.bank_detail;
    let attachments = user?.attachments;
    let isBankVerified = user?.verified?.bank;

    return {
        userId: user?._id,
        bankDetail: bankDetail,
        attachments: attachments,
        isBankVerified: isBankVerified,
        loading: loading,
        error: error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => dispatch(getLoggedInUser(id)),
        updateBankDetail: (params) => dispatch(updateUser(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreation);
