import React, { Component } from "react";
import BreadCrumb from "../Utils/BreadCrumb";
import DisApprovedModal from "./Components/DisApprovedModal";
import TableContainer from "../Utils/TableContainer";
import { connect } from "react-redux";
import appUrl from "../Constants/AppUrl";
import ApprovedModal from "./Components/ApprovedModal";
import { showNotification } from "../Utils/CommonFunctions";
import fileDownload from "js-file-download";
import axios from "axios";
import FilePreviewModal from '../FilePreview/filePreviewModal'
import FilePreviewWrapper from '../FilePreview/filePreviewWrapper'
import { fetchAllAccountsDetails } from "./Duck/RemittanceActions";
import Tippy from '@tippyjs/react';
import AccountDetailsModal from "./Components/AccountDetailsModal";

const options = {
    settings: {

        disablePanzoom: false,
        overlayColor: 'rgba(30, 30, 30, 0.9)',
        usingPreact: true
      },
      thumbnails: {
        showThumbnails : false
      },
      buttons: {
          showAutoplayButton: false,
          showNextButton: false,
          showPrevButton: false,
          showThumbnailsButton: false,
        },
  }
class AccountListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDisApprovedModal: false,
            showApproveModal: false,
            showAccountDetailsModal: false,
            userId: null,
            showPreviewOfFileId: null,
            allAttachments: [],
            searchText: "",
        };
        this.imageComp = React.createRef();
    }

    componentDidMount() {
        this.loadMoreUsersBankDetails();
        this.imageComp.current && this.imageComp.current.addEventListener("keydown", (e) => {
            // press esc to close the preview
            if (e.keyCode === 27) {
                this.togglePreview(null);
            }
        })
    }

    componentWillUnmount(){
        this.imageComp.current && this.imageComp.current.removeEventListener("keydown", this.togglePreview(null));
    }

    // componentDidUpdate(preProps) {
    //     let { usersList } = this.props;

    //     if (preProps.usersList?.length !== usersList?.length) {
    //         this.loadMoreUsersBankDetails(usersList?.length || 0);
    //     }
    // }

    togglePreview = (fileId, attachments) => {
        this.setState({showPreviewOfFileId: fileId, allAttachments: attachments})
    }

    loadMoreUsersBankDetails = (offset = 0, limit = 100) => {
        let { usersList, usersMeta, getAllUsersBankDetail  } = this.props;
        let { searchText } = this.state;

        if (offset === 0 || usersMeta?.totalCount > usersList?.length) {
            let params = {
                offset: offset,
                limit: limit,
            }

            if (searchText) params.text = searchText;
            typeof getAllUsersBankDetail === "function" && getAllUsersBankDetail(params);
        }
    }

    handleDisApprovedModal = (show = false, userId) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showDisApprovedModal: show,
            userId: userId,
        });
    };

    handleApprovedModal = (show = false, userId) =>  {
        show = typeof show === "boolean" && show;
        this.setState({
            showApproveModal: true,
            userId: userId,
        });
    }

    handleAccountDetailsModal = (show = false, userId) =>  {
        console.log("handleAccountDetailsModal");
        show = typeof show === "boolean" && show;
        this.setState({
            showAccountDetailsModal: true,
            userId: userId,
        });
    }

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

    DisplayLightBox = () => {
        this.setState({
            lightboxDisplay: true,
        });
    }

    handleClose (){
        this.setState({
            lightboxDisplay: false,
        });
    }

    onSearch = (text = "") => {
        this.setState({
            searchText: text.trim(),
        }, this.loadMoreUsersBankDetails);
    }

    renderRow = (item, index) => {
        let { users } = this.props;
        let user = item && users && users[item];
        let bankDetail = user?.bank_detail;
        let isBankVerified = user?.verified?.bank;

        let attachments = user?.attachments;
        let aadharAttachment = attachments?.find(attach => attach?.onModel === "Aadhar");
        let panAttachment = attachments?.find(attach => attach?.onModel === "Pan");
        let chequeAttachment = attachments?.find(attach => attach?.onModel === "Cheque");
        return(
            <tr
                key={`${item}_${index}`}
                style={{ whiteSpace: "nowrap" }}
            >
                <td style={{ textAlign: "center" }}>{index+1}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.account_holder}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.account_number}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.bank_name}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.ifsc}</td>
                <td style={{ textAlign: "center" }}>{bankDetail?.gst_number}</td>
                <td style={{ textAlign: "center" }}>
                    <Tippy content={bankDetail?.gst_address}>
                        <p style={{ width: 500, overflow: "hidden", textOverflow: "ellipsis", }}>
                        {bankDetail?.gst_address}
                        </p>
                    </Tippy>
                </td>
                <td style={{ textAlign: "center" }}>{bankDetail?.gst_state}</td>
                {/* <td style={{ textAlign: "center" }}>{bankDetail?.aadhaar_card_number}</td> */}
                <td style={{ textAlign: "center" }}>{bankDetail?.pan_card_number}</td>
                <td style={{ textAlign: "center" }}>
                    <div tabIndex="0" ref={this.imageComp} style={{outline:0}}>
                        {/* <span className="uploaded_ids" data-title={"Download"} onClick={() => this.onDownloadFile(aadharAttachment)}> */}
                        <span className="uploaded_ids" onClick={() => this.togglePreview(aadharAttachment?._id, attachments)}>
                            <Tippy content="Preview">
                            <img
                                src={"/images/idcard.png"}
                            />
                            </Tippy>
                        </span>
                    </div>
                </td>
                <td style={{ textAlign: "center" }}>
                <span className="uploaded_ids" onClick={() => this.togglePreview(panAttachment?._id, attachments)}>
                         <Tippy content="Preview">
                            <img src="/images/pancard.jpg" />
                            </Tippy>
                    </span>
                </td>
                <td style={{ textAlign: "center" }}>
                    <span className="uploaded_ids" onClick={() => this.togglePreview(chequeAttachment?._id, attachments)}>
                        <Tippy content="Preview">
                        <img src="/images/cheque_2.jpg" />
                        </Tippy>
                    </span>
                </td>
                <td style={{ textAlign: "center", color: isBankVerified ? "#07d836" : "#e8b30e" }}>
                    {isBankVerified ? "verified" : bankDetail?.verification_reject ? "Re-upload" : "verification pending"}
                </td>
                <td style={{ textAlign: "center" }}>
                    {
                        !isBankVerified && !bankDetail?.verification_reject
                        ? (
                            <>
                                 <span
                                    className="mr-2"
                                    onClick={() => this.handleApprovedModal(true, item)}

                                >
                                    <Tippy content="Approve">
                                     <i
                                        className="mdi mdi-thumb-up font-size-24"
                                        aria-hidden="true"
                                    />
                                    </Tippy>
                                </span>
                                <span
                                    onClick={() => this.handleDisApprovedModal(true, item)}
                                >
                                    <Tippy content="Disapprove">
                                    <i
                                        className="mdi mdi-thumb-down font-size-24"
                                        aria-hidden="true"
                                    />
                                    </Tippy>
                                </span>
                            </>
                        ) : (
                            <>
                                {
                                    isBankVerified &&
                                    <Tippy content="Edit">
                                        <span
                                            className="mr-2 pointer"
                                            onClick={() => this.handleAccountDetailsModal(true, item)}
                                        >
                                            <i className="bx bxs-pencil" />
                                        </span>
                                    </Tippy>
                                }

                                {
                                    !isBankVerified &&
                                    <Tippy content="Can't take action">
                                        <span className="mr-2">-</span>
                                    </Tippy>
                                }
                            </>
                        )
                    }
                </td>
            </tr>
        );
    }

    render() {
        let { userId, showApproveModal, showDisApprovedModal, showAccountDetailsModal } = this.state;
        let { usersList, usersMeta, loading } = this.props;
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Account List
                                    </h2>
                                    <BreadCrumb
                                        title={[
                                            "Remittance",
                                            "Account List",
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                <div className="row">
                    <div className="col-lg-12 acclist-height">
                        <TableContainer
                            headings={[
                                { text: "No.", style: { textAlign: "center" }},
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
                                { text: "Action", style: { textAlign: "center", whiteSpace: "nowrap" }},
                            ]}
                            searchPlaceholder={"Search by Account Holder or Number"}
                            onSearch={this.onSearch}
                            rowData={usersList}
                            totalEntries={usersMeta?.totalCount}
                            renderRow={this.renderRow}
                            loadMore={this.loadMoreUsersBankDetails}
                            loading={loading}

                        />
                    </div>
                </div>
                <ApprovedModal
                    show={userId && showApproveModal}
                    userId={userId}
                    handleClose={this.handleApprovedModal}
                />

                <DisApprovedModal
                    show={userId && showDisApprovedModal}
                    userId={userId}
                    handleClose={this.handleDisApprovedModal}
                />

                <AccountDetailsModal
                    show={userId && showAccountDetailsModal}
                    userId={userId}
                    handleClose={this.handleAccountDetailsModal}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    let accounts = state.remittance.accounts;

    let users = accounts?.users;
    let filter = accounts?.filter;

    let mDashboard = accounts[filter];

    let usersList = mDashboard?.list;
    let usersMeta = mDashboard?.meta;

    let loading = mDashboard?.loading;
    let error = mDashboard?.error;

    return {
        users: users,
        usersList: usersList,
        usersMeta: usersMeta,
        loading: loading,
        error: error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllUsersBankDetail: (params) => dispatch(fetchAllAccountsDetails(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountListing);
