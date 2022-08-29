import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import appUrl from "../Constants/AppUrl";
import { connect } from "react-redux";
import ACTIONS from "../Order/Duck/OrderActionsType";
import { Redirect } from "react-router-dom";
import TableContainer from "../Utils/TableContainer";
import { fetchAllBulkOrderRequest } from "../Order/Duck/OrderActions";
import fileDownload from 'js-file-download';
import BreadCrumb from "../Utils/BreadCrumb";
import { showNotification } from "../Utils/CommonFunctions";
import ValidationPopUp from './Components/ValidationPopUp'
import Tippy from '@tippyjs/react';

class BulkOrderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            isUploading: false,
            isShowErrorModel: false,
            resMeta: null,
            searchText: "",
            plan: "",
        }
    }

    componentDidMount() {
        this.loadMoreOrders();
    }

    componentDidUpdate(preProps) {
        let { bulkOrderList } = this.props;
        if (preProps.bulkOrderList?.length !== bulkOrderList?.length) {
            this.loadMoreOrders(bulkOrderList?.length);
        }
    }

    loadMoreOrders = (offset = 0, limit = 100) => {
        let { bulkOrderList, bulkOrderMeta, fetchAllOrders } = this.props;
        if (offset === 0 || bulkOrderMeta?.totalCount > bulkOrderList?.length) {
            fetchAllOrders && fetchAllOrders({ offset: offset, limit: limit });
        }
    }

    onChooseFile = (e) => {
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
        let { history, PlanId } = this.props;
        let { file } = this.state;
        if(file){

            this.setState({
                isUploading: true,
            });

            let formData = new FormData();
            formData.set("model_id", 1234567890);
            formData.set("onModel", "Order");
            formData.set("files", file);
            formData.set("plan", PlanId);
            axios.post(`${appUrl.ORDERS_URL}/bulk_upload/logistic`, formData)
            .then(res => {

                let resData =  res?.data;
                let resMeta = resData?.meta || resData;
                let orderId;

                if (resMeta?.success && resMeta?.status === 200) {
                    let bulkOrder = resData?.data;
                    orderId = bulkOrder?._id;
                    this.props.fetchBulkOrderSuccess && this.props.fetchBulkOrderSuccess(resData);

                    history.push(`/app/bulkShipmentList/${orderId}`);
                } else {
                    showNotification("error", resMeta?.message)
                }

                this.setState({
                    orderId: orderId,
                    resMeta: resMeta,
                    isUploading: false,
                    file: null,
                    isShowErrorModel: !resMeta?.success || resMeta?.status !== 200,
                    plan : PlanId
                });

                this.loadMoreOrders();
            })
            .catch(err => {
                this.setState({
                    isUploading: false,
                });

                console.log("upload file ", err);
            });
        }else{
            showNotification("warning", "Please choose a file!");
        }
    }

    handleClose = () => {
        this.setState({
            isShowErrorModel: false,
            resMeta: null,
        });
    }

    onShowDetails = (order) => {
        let { history } = this.props;

        let orderId = order?._id;
        let path = order?.total_payout ? `/app/bulkinvoice/${orderId}` : `/app/bulkShipmentList/${orderId}`;
        history.push(path);

        // if (order?.total_payout) {
        //     this.setState({
        //         orderId: order?._id,
        //         goToBulkOrderInvoice: true,
        //     });
        // } else {
        //     this.setState({
        //         orderId: order?._id,
        //         goToBulkOrderList: true,
        //     });
        // }
    }

    onDownloadOrder = (order) => {
        let attachments = order?.attachments_id;
        let id = attachments?._id;
        let filename = attachments?.filename;
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

    renderRow = (orderId, index) => {
        let { bulkOrders, loggedInUser } = this.props;
        let order = orderId && bulkOrders && bulkOrders[orderId];
        let attachments = order?.attachments_id;
        let permissions = loggedInUser?.role?._id?.permissions || {};
       
        return (
            order && (
                <tr key={`${orderId}_${index}`}>
                    <td style={{textAlign:'center'}}>{index + 1}</td>
                    <td>{attachments?.filename}</td>
                    <td style={{ letterSpacing: 1 }} >{order?.createdAt && moment(order?.createdAt).format("D MMM YYYY, h:mm:ss a")}</td>
                    <td>{order?.total_payout && parseFloat(order?.total_payout).toFixed(2)}</td>
                    <td style={{textAlign:'center'}}>
                        {
                            order?.orders?.length > 0 &&
                            <span onClick={() => this.onShowDetails(order)}>
                            {
                                order?.total_payout
                                ?  <Tippy content="Invoice">
                                    <i className="mdi mdi-eye"></i>
                                </Tippy>
                                : <Tippy content="Make payment">
                                    <i className="bx bxs-pencil"></i>
                                </Tippy>
                            }
                        </span>
                        }

                        {
                            permissions?.order?.bulk_order?.download &&
                            <span onClick={() => this.onDownloadOrder(order)} style={{marginLeft:10}}>
                               <Tippy content="Download file"><i className="bx bxs-download"></i></Tippy> 
                            </span>
                        }
                        
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
        const { file, resMeta, isUploading, orderId, goToBulkOrderList, goToBulkOrderInvoice, searchText, isShowErrorModel } = this.state;
        let { bulkOrders, bulkOrderList, bulkOrderMeta, loading } = this.props;

        // if ((goToBulkOrderList || resMeta?.success) && orderId) {
        //     return <Redirect to={`/app/bulkShipmentList/${orderId}`} />;
        // }

        // if (goToBulkOrderInvoice && orderId) {
        //     return <Redirect to={`/app/bulkinvoice/${orderId}`} />;
        // }

        let totalOrderCount = bulkOrderMeta?.totalCount || 0;
        if (!!searchText) {
            bulkOrderList = bulkOrderList?.filter((id) => {
                let bulkOrder = id && bulkOrders[id];
                let attachments = bulkOrder?.attachments_id;
                let fileName = attachments?.filename?.toLowerCase();

                return fileName?.includes(searchText.toLowerCase()) && id;
            });

            totalOrderCount = bulkOrderList?.length || 0;
        }

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    
                                        <h2 className="main-content-title tx-24 mg-b-5">
                                            Bulk Shipment Upload
                                        </h2>
                                    
                                    <BreadCrumb
                                        title = {['Shipment', 'Bulk Shipment Upload']}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="card">
                            <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                Upload Here
                                <a href={"/BulkFormat.xlsx"}>
                                    <span className={"btn-link"} style={{fontSize:14}}>
                                        Bulk file format
                                        <i
                                            className="fa fa-download ml-2"
                                            aria-hidden="true"
                                        ></i>
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
                                                        onChange={this.onChooseFile}
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
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={this.uploadFile}
                                disabled={isUploading}
                            >
                                {
                                    isUploading ?
                                    <>
                                        <span className="spinner-border spinner-border-sm"></span>
                                        <span className="visually-hidden">  Uploading...</span>
                                    </>
                                    : "Upload"
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {
                    // resMeta && !resMeta?.success &&
                    // <div className="col-xl-12">
                    //     <div className="card">
                    //         <h4 className="card-title">Error Log</h4>
                    //         <div className="card-body">
                    //             <p>{resMeta?.message}</p>
                    //         </div>
                    //     </div>
                    // </div>
                }

                {
                    // bulkOrderMeta?.totalCount > 0 &&
                    <TableContainer
                        headings={[
                            "No.",
                            "File Name",
                            "Uploaded Date",
                            "Total Price(₹)",
                            "Action",
                        ]}
                        filter={{ searchText: searchText }}
                        onSearch={this.onSearch}
                        rowData={bulkOrderList}
                        totalEntries={totalOrderCount}
                        renderRow={this.renderRow}
                        loading={loading}
                    />
                }


                {/* <BaseModel
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
                </BaseModel> */}
                <ValidationPopUp
                    show={isShowErrorModel && resMeta?.errors?.length > 0}
                    handleClose={this.handleClose}
                    error={resMeta?.errors}
                />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    let orderState = state?.order?.bulk;
    let bulkOrders = orderState?.orders;
    let bulkOrderList = orderState?.list;
    let bulkOrderMeta = orderState?.meta;

    let loading = orderState?.loading;
    let error = orderState?.error;

    let loggedInUser = state.loggedInUser?.data?.data;

    return {
        bulkOrders: bulkOrders,
        bulkOrderList: bulkOrderList,
        bulkOrderMeta: bulkOrderMeta,
        loading: loading,
        error: error,
        loggedInUser: loggedInUser,
        PlanId : state.loggedInUser?.data?.data.plan,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllOrders: (params) => dispatch(fetchAllBulkOrderRequest(params)),
        fetchBulkOrderSuccess: (payload) => dispatch({type: ACTIONS.FETCH_BULK_ORDER_SUCCESS , payload})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkOrderContainer);
