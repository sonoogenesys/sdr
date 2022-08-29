import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

import FilePicker from "../../Utils/FilePicker";
import TextInput from "../../Utils/TextInput";

import { showNotification, validatePanNumber } from "../../Utils/CommonFunctions";
import { updateAccountsDetails } from "../Duck/RemittanceActions";

import appUrl from "../../Constants/AppUrl";

class AccountDetailsModal extends Component {
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
    }

    componentDidUpdate(prevProps) {
        let { isLoading } = this.state;
        let { show, loading, error } = this.props;

        if (isLoading && prevProps.loading && !loading) {
            if (!error) {
                isLoading && showNotification("success", "Successfully updated account details");
                this.onClose();
            } else {
                error?.message && showNotification("error", error?.message);
            }

            this.setState({ isLoading: false });
        } else if (!prevProps.show && show) {
            this.setDefault();
        }
    }

    setDefault = () => {
        let { user = {} } = this.props;
        let {
            bank_detail = {},
            attachments = [],
        } = user;

        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");

        this.setState({
            accountHolderName: bank_detail?.account_holder,
            accountNumber: bank_detail?.account_number,
            bankName: bank_detail?.bank_name,
            ifscCode: bank_detail?.ifsc,
            gstNo: bank_detail?.gst_number,
            gstAddress: bank_detail?.gst_address,
            gstState: bank_detail?.gst_state,
            panCardNumber: bank_detail?.pan_card_number,
            aadhaarCardNumber: bank_detail?.aadhaar_card_number,
            aadharAttachment,
            panAttachment,
            chequeAttachment,
            isLoading: false,
        });
    }

    hasError = () => {
        let isFileErrorHit = false;
        let isErrorHit = false;
        let { user = {} } = this.props;
        let {
            attachments = [],
        } = user;
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
            isErrorHit = true;
        }

        // if (!aadhaarCardNumber) {
        //     aadhaarCardNumber = "Please enter Addhar card number";
        //     isErrorHit = true;
        // }

        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");
        if ((!aadharAttachment && !aadharFile) || (!panAttachment && !panCardFile) || (!chequeAttachment && !cancelChequeFile)) {
            isFileErrorHit = true;
        }

        console.log("file", (!aadharAttachment && !aadharFile), (!panAttachment && !panCardFile), (!chequeAttachment && !cancelChequeFile));

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

        console.log("isErrorHit || isFileErrorHit", isErrorHit, isFileErrorHit);
        console.log(
            "File",
            accountHolderNameErr,
            accountNumberErr,
            bankNameErr,
            ifscCodeErr,
            gstNoErr,
            gstAddressErr,
            gstStateErr,
            panCardNumberErr,
            aadhaarCardNumberErr,
        );

        return isErrorHit || isFileErrorHit;
    };

    onSave = async ()  => {
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
    }

    onClose = () => {
        let { handleClose } = this.props;
        handleClose && handleClose();

        this.setState({
            accountHolderNameErr: "",
            accountNumberErr: "",
            bankNameErr: "",
            ifscCodeErr: "",
            gstNoErr: "",
            gstAddressErr: "",
            gstStateErr: "",
            panCardNumberErr: "",
            aadhaarCardNumberErr: "",
        });
    }

    handleChooseFile = (name) => (event) => {
        let file = event?.target?.files[0];

        if(file){
            let extension = file.name?.split('.')?.[file.name.split('.').length - 1];
            extension = extension?.toLowerCase();

            if(
                extension === 'png' ||
                extension === 'jpeg' ||
                extension === 'jpg'
            ) {
                this.setState({
                    [name]: file,
                    accountHolderNameErr: "",
                    accountNumberErr: "",
                    bankNameErr: "",
                    ifscCodeErr: "",
                    gstNoErr: "",
                    gstAddressErr: "",
                    gstStateErr: "",
                    panCardNumberErr: "",
                    aadhaarCardNumberErr: "",
                });
            } else {
                showNotification("error", "Upload png, jpeg or jpg format file only!");
            }
        }
    }

    handleChange = (name) => (event) => {
        let value = event?.target?.value;

        if (name === "panCardNumber") {
            value = value?.toUpperCase();
        }

        this.setState({
            [name]: value,
            accountHolderNameErr: "",
            accountNumberErr: "",
            bankNameErr: "",
            ifscCodeErr: "",
            gstNoErr: "",
            gstAddressErr: "",
            gstStateErr: "",
            panCardNumberErr: "",
            aadhaarCardNumberErr: "",
        });
    };

    render() {
        let { show } = this.props;
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
            aadharAttachment,
            panAttachment,
            chequeAttachment,
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

        return (
            <Modal
                show={show}
                onHide={this.onClose}
                size="lg"
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Account Details</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="row">
                        <div className="col-xl-6">
                            <TextInput
                                labelText={"Account Holder"}
                                value={accountHolderName}
                                onChange={this.handleChange("accountHolderName")}
                                isRequired
                                errorText={accountHolderNameErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"Account Number"}
                                value={accountNumber}
                                onChange={this.handleChange("accountNumber")}
                                isRequired
                                errorText={accountNumberErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"Bank Name"}
                                value={bankName}
                                onChange={this.handleChange("bankName")}
                                isRequired
                                errorText={bankNameErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"IFSC Code"}
                                value={ifscCode}
                                onChange={this.handleChange("ifscCode")}
                                isRequired
                                errorText={ifscCodeErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"GST No"}
                                value={gstNo}
                                onChange={this.handleChange("gstNo")}
                                isRequired
                                errorText={gstNoErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"GST Address"}
                                value={gstAddress}
                                onChange={this.handleChange("gstAddress")}
                                isRequired
                                errorText={gstAddressErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"GST State"}
                                value={gstState}
                                onChange={this.handleChange("gstState")}
                                isRequired
                                errorText={gstStateErr}
                                disabled={isLoading}
                            />
                        </div>

                        <div className="col-xl-6">
                            <TextInput
                                labelText={"PAN Card Number"}
                                value={panCardNumber}
                                onChange={this.handleChange("panCardNumber")}
                                isRequired
                                errorText={panCardNumberErr}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <FilePicker
                                label="Aadhar card"
                                file={aadharFile || aadharAttachment}
                                onChooseFile={this.handleChooseFile("aadharFile")}
                                isRequired
                                acceptInput="image/*"
                            />
                        </div>

                        <div className="col-md-4">
                            <FilePicker
                                label="Pan card"
                                file={panCardFile || panAttachment}
                                onChooseFile={this.handleChooseFile("panCardFile")}
                                isRequired
                                acceptInput="image/*"
                            />
                        </div>

                        <div className="col-md-4">
                            <FilePicker
                                label="Cancel cheque"
                                file={cancelChequeFile || chequeAttachment}
                                onChooseFile={this.handleChooseFile("cancelChequeFile")}
                                isRequired
                                acceptInput="image/*"
                            />
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-secondary ml-2"
                        onClick={this.onClose}
                    >Close</button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.onSave}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm"></span>
                                <span className="visually-hidden"> Saving...</span>
                            </>
                        ) : "Save"}
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps;

    let users = state.remittance?.accounts?.users;
    let user = userId && users && users[userId];

    let loading = user?.loading;
    let error = user?.error;

    return {
        user: user,
        loading: loading,
        error: error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateBankDetail: (params) => dispatch(updateAccountsDetails(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetailsModal);
