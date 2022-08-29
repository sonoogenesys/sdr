import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchOrderRequest, orderPayRequest } from "../Order/Duck/OrderActions";
import OrderInvoice from "./Components/OrderInvoice";
import {Modal, Button} from "react-bootstrap";
import axios from "axios";
import APP_URL from "../Constants/AppUrl";
import { showNotification } from "../Utils/CommonFunctions";
import AddMoneyModal from "../Wallet/Components/AddMoneyModal";
import { fetchWalletRequest } from "../Wallet/Duck/WalletActions";
import fileDownload from "js-file-download";

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Order successfully
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Order has been successfully placed
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Ok</Button>
            </Modal.Footer>
        </Modal>
    );
}

class IndividualInvoice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isGoBack: false,
            isLoading: false,
            modalShow: undefined,
            showAmountModal: false,
            rechargeAmount: null,
            downloading: false,
        }
    }

    componentDidMount() {
        let { orderId, order, getOrder, fetchWallet, location } = this.props;
        fetchWallet && fetchWallet();

        if (orderId && !order) {
            getOrder && getOrder(orderId);
        }
        if(location?.state?.from === 'ticket'){
            this.setState({goToTicket: true})
        }
    }

    componentDidUpdate(preProps) {
        let { order, selectedPartner } = this.props;

        if (preProps.order?.loading && !order?.loading && !order?.transaction_id) {
            let courier = order?.available_logistic?.find(c => c?._id === selectedPartner?._id);

            if (!selectedPartner || !courier) {
                this.setState({
                    isGoBack: true,
                });
            }
        }
    }

    onPayNow = () => {
        let { match, selectedPartner, wallet } = this.props;
        let orderId = match?.params?.id;

        let walletAmount = wallet?.amount;
        let totalAmount = selectedPartner?.price?.final_pay;

        // console.log("selectedPartner", selectedPartner);


        if (walletAmount >= totalAmount) {
            this.setState({
                isLoading: true,
            });

            let logistic_id = selectedPartner?._id;
            let data = {
                order_id: orderId,
                logistic_id: logistic_id,
            }

            axios.post(APP_URL.ORDERS_URL + '/pay/', data, {
                headers: {
                    Authorization:  `Bearer ${localStorage.getItem('jwt')}`
                }
            }).then(res=>{
                let resData = res.data;
                let resMeta = resData?.meta || resData;
                if(resMeta?.status === 200){
                    this.setModalShow(true)
                } else {
                    showNotification("error", resMeta?.message);
                    this.setState({
                        isLoading: false,
                    });
                }
            });
        } else {
            let rechargeAmount =  totalAmount - walletAmount;
            rechargeAmount = Math.ceil(rechargeAmount);

            console.log("totalAmount - walletAmount", totalAmount, walletAmount);

            showNotification(
                "error",
                "Unable to pay for your order due to insufficient balance. Please add money to you wallet.",
            );

            setTimeout(() => {
                // showNotification(
                    // "info",
                    // "Click here to add money",
                    // 24000,
                    // () =>  this.handleAmountModal(true, rechargeAmount)
                    this.handleAmountModal(true, rechargeAmount)
                // );
            }, 1000);
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
        // this.setState({
        //     isGoBack: true,
        // });
    }

    setModalShow = (obj)=>{
        this.setState({modalShow: obj})
        // if(obj === false){
        //     return <Redirect to={`/app/dashboard`} />;
        // }
    }

    handleAmountModal = (show = false, rechargeAmount) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showAmountModal: show,
            rechargeAmount: rechargeAmount,
        });
    }

    onDownloadInvoice = (e) => {
        let { downloading } = this.state;
        let { order, orderId } = this.props;

        let params = {
            user_id: order?.created_by?._id,
            order_id: orderId
        }

        if (!downloading) {
            this.setState({ downloading: true });
            axios({
                method: "GET",
                url: APP_URL.ORDER_INVOICE_DOWNLOAD,
                params: params,
                contentType: 'application/doc; charset=utf-8',
                responseType: 'arraybuffer',
            })
            .then(res => {
                console.log("res.data", res);
                fileDownload(res.data, `invoice-${order?.invoice?.invoice_number}.pdf`);
                this.setState({ downloading: false });
            })
            .catch(err => {
                showNotification("error", "Error in Download file");
                console.log("onDownloadOrder ", err);
                this.setState({ downloading: false });
            });
        }
    }

    render() {
        let {isGoBack, isLoading, showAmountModal, rechargeAmount, goToTicket, downloading} = this.state;
        let { order = {}, orderId, selectedPartner } = this.props;
        let courier;
        let {
            rto_init,
            available_logistic,
        } = order;

        console.log("order", order);

        if (order?.transaction_id) {
            courier = order?.available_logistic[0];
        } else {
            courier = order?.available_logistic?.find(c => c?._id === selectedPartner?._id)
        }

        if (isGoBack) {
            if(goToTicket) return <Redirect to={`/app/ticketDashboard`} />;
            else if (order?.transaction_id || order?.error) {
                return <Redirect to={`/app/shipmentList`} />;
            } else {
                return <Redirect to={`/app/courierpartner/${orderId}`} />;
            }
        }
        if(this.state.modalShow === false){
            return <Redirect to={`/app/shipmentList`} />;
        }

        // let delivered_status_info = order?.orderStatus && order.orderStatus[0]?.scan_detail.find(o => o.status>.toLowerCase().search("delivered") !== -1);
        let delivered_status_info = order?.orderStatus &&
            order.orderStatus[0]?.scan_detail.find(o => {
                let order_status = o.status.toLowerCase();

                return (
                    order_status?.match(new RegExp("^delivered", "i")) ||
                    order_status?.match(new RegExp("^rto delivered", "i"))
                );
            });

        let transaction = order?.transaction_id;
        let created_by = order?.created_by;
        let customerDetails = order?.customer_details;
        let billingAddress = customerDetails?.billing_address;
        let shippingAddress = customerDetails?.shipping_address;
        let total = courier?.price?.final_pay
        let price = typeof courier?.price?.total_value === "number" ? courier?.price?.total_value : transaction?.amount;
        let codCharges = courier?.price?.cod_charges;
        let vat = courier?.price?.tax;

        if (transaction && rto_init) {
            let logistic_price = available_logistic[0].price;

            price = (logistic_price?.total_value || 0) * 2;
            codCharges = 0;
            vat = price * 0.18;
            total = price + vat;
        }

        let productDetails = {
            name: order?.order_id + '-' + order?.product_details?.product_name,
            quantity: order?.product_details?.quantity,
            description: order?.product_details?.product_name,
            vat: vat,
            price: price,
            codCharges: codCharges,
            total: total,
        }

        let details = {
            orderId: order?.order_id,
            order_date: order?.order_date,
            billedTo: {
                name: created_by?.first_name ? `${created_by?.first_name} ${created_by?.last_name || ""}` : (created_by?.email || "-"),
                address: `${billingAddress?.line1} ${billingAddress?.line2} ${billingAddress?.city} ${billingAddress?.state} ${billingAddress?.postcode}`,
            },
            shippedTo: {
                name: `${customerDetails?.first_name} ${customerDetails?.last_name || ""}`,
                address: `${shippingAddress?.line1} ${shippingAddress?.line2} ${shippingAddress?.city} ${shippingAddress?.state} ${shippingAddress?.postcode}`,
            },
            orders: [productDetails],
            totalAmount: total,
            paymentMethod: order?.payment_method || 'prepaid',
            email: customerDetails?.email
        };

        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Individual Invoice
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Shipment</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Individual Invoice
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            {
                                !order?.loading &&
                                <div className="page-title-right">
                                    {
                                        delivered_status_info &&
                                        <button
                                            type="button"
                                            className="btn btn-link mr-2 btn-icon-text"
                                            onClick={this.onDownloadInvoice}
                                            disabled={downloading}
                                        >
                                            {
                                                downloading
                                                ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                                        Downloading
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="fa fa-download mr-2" aria-hidden="true" />
                                                        Download Invoice
                                                    </>
                                                )
                                            }
                                        </button>
                                    }

                                    <button
                                        type="button"
                                        className="btn btn-primary my-2 btn-icon-text"
                                        onClick={this.onGoBack}
                                    >
                                        <i className="fa fa-arrow-circle-left"></i>{" "}
                                        Back
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                {
                    order?.loading
                    ? (
                        <div className="d-flex align-items-center justify-content-center m-5">
                            <samp className="spinner-border mr-2" role="status"></samp>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        <OrderInvoice
                            showHeader={true}
                            details={details}
                        />
                    )
                }

                {
                    !order?.transaction_id && courier &&
                    <div className="page-title-right" style={{ textAlign:'right', position:'sticky', bottom:0, background:'#F8F8FB' }}>
                        <button
                            type="button"
                            className="btn btn-primary my-2 btn-icon-text"
                            onClick={this.onPayNow}
                            disabled={isLoading}
                            style={{ width:120 }}
                        >
                            {
                                isLoading
                                ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                        <span className="visually-hidden">  Paying...</span>
                                    </>
                                ) : "Pay"
                            }
                        </button>
                    </div>
                }

                <MyVerticallyCenteredModal
                    show={this.state.modalShow}
                    onHide={() => this.setModalShow(false)}
                />

                <AddMoneyModal
                    show={showAmountModal}
                    handleClose={this.handleAmountModal}
                    preFillAmount={rechargeAmount}
                />
            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let orderId = match?.params?.id;
    let order = orderId && state?.order?.orders[orderId];
    let selectedPartner = state?.order?.selectedPartners[orderId] || {};
    selectedPartner = selectedPartner?.partner;
    let wallet = state.wallet?.data;

    return {
        orderId: orderId,
        order: order,
        selectedPartner: selectedPartner,
        wallet: wallet,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getOrder: (id) => dispatch(fetchOrderRequest(id)),
        orderPay: (params) => dispatch(orderPayRequest(params)),
        fetchWallet: () => dispatch(fetchWalletRequest()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndividualInvoice);
