import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import appUrl from "../Constants/AppUrl";
import { fetchBulkOrderRequest, orderPayRequest } from "../Order/Duck/OrderActions";
import OrderInvoice from "./Components/OrderInvoice";
import { Modal, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { showNotification } from "../Utils/CommonFunctions";
import { fetchWalletRequest } from "../Wallet/Duck/WalletActions";
import AddMoneyModal from "../Wallet/Components/AddMoneyModal";
import ErrorModal from "./Components/ErrorModal";

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

class BulkInvoice extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isGoBack: false,
            modalShow: null,
            isLoading: false,
            showAmountModal: false,
            rechargeAmount: undefined,
            isShowErrorModal: false,
        }
    }

    componentDidMount() {
        let { match, bulkOrder, fetchOrder, fetchWallet} = this.props;
        let orderId = match?.params?.orderId;

        fetchWallet && fetchWallet();

        if (orderId && !bulkOrder) {
            fetchOrder && fetchOrder(orderId);
        }
    }

    onGoBack = () => {
        this.props.history.goBack();
        // this.setState({
        //     isGoBack: true,
        // });
    }

    onPayNow = () => {
        let { bulkOrder, selectedPartners, wallet, } = this.props;
        let orders = bulkOrder?.orders || [];

        let walletAmount = wallet?.amount;

        let selectedLogisticList = orders?.map(order =>
            order?.available_logistic?.find(c => selectedPartners && c?._id === selectedPartners[order?._id]?.partner?._id)
        );
        selectedLogisticList = selectedLogisticList?.filter(lp => lp !== undefined);

        let totalAmount = bulkOrder?.total_payout || 0;
        if (Array.isArray(selectedLogisticList) && selectedLogisticList.length > 0) {
            if (selectedLogisticList.length === 1) {
                totalAmount = selectedLogisticList[0].price?.final_pay;
            } else {
                totalAmount = selectedLogisticList?.reduce((prev, current) => {
                    let preTotalAmount = prev?.price?.final_pay || prev || 0;
                    let currentPay = current?.price?.final_pay || 0;
                    return(preTotalAmount + currentPay);
                });
            }
        }

        if (walletAmount >= totalAmount) {
            let data = [];
            data = orders?.map((order, index) => {
                let order_id = order?._id;
                let logistic_id = selectedPartners && selectedPartners[order_id]?.partner?._id;

                return {
                    order_id: order_id,
                    logistic_id: logistic_id,
                };
            });

            if (orders?.length > 0 && orders?.length === data?.length) {
                this.setState({
                    isLoading: true,
                })

                axios({
                    method: "POST",
                    url: `${appUrl.ORDERS_URL}/pay/`,
                    data: data,
                }).then(res=>{
                    let resData = res?.data;
                    let resMeta = resData?.meta || resData;
                    let isErrorHit = false;

                    console.log("resMeta", resMeta);

                    if(resMeta.success && resMeta.status === 200){
                        if (Array.isArray(resMeta.failed_transaction) && resMeta.failed_transaction.length > 0) {
                            this.handleErrorModal(true);
                        } else {
                            this.setModalShow(true)
                        }
                    } else {
                        // alert('Failed to pay')
                        showNotification('error', resMeta?.message);
                        if (Array.isArray(resMeta.failed_transaction) && resMeta.failed_transaction.length > 0) {
                            this.handleErrorModal(true);
                        }
                    }

                    this.setState({ isLoading: false, failed_transaction: resMeta.failed_transaction });
                });
            } else {
                console.log("place order data", data);
            }
        } else {
            let rechargeAmount =  totalAmount - walletAmount;
            rechargeAmount = Math.ceil(rechargeAmount);

            showNotification(
                "error",
                "Unable to pay for your order due to insufficient balance. Please add money to you wallet.",
                4000,
            );

            setTimeout(() => {
                // showNotification(
                //     "info",
                //     "Click here to add money",
                //     24000,
                    // () =>  this.handleAmountModal(true, rechargeAmount)
                    this.handleAmountModal(true, rechargeAmount)
            //     );
            }, 1000);
        }
    }

    setModalShow = (obj)=>{
        this.setState({modalShow: obj})
    }

    handleErrorModal = (show = false)=>{
        show = typeof show === "boolean" && show;
        this.setState({ isShowErrorModal: show });
    }

    handleAmountModal = (show = false, rechargeAmount) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showAmountModal: show,
            rechargeAmount: rechargeAmount,
        });
    }

    render() {
        let { modalShow, isLoading, isGoBack, goToWalletPage, showAmountModal, rechargeAmount, isShowErrorModal, failed_transaction } = this.state;
        let { bulkOrder = {}, orderId, selectedPartners } = this.props;
        let { orders, createdAt, error } = bulkOrder;
        let selectedLogisticList = orders?.map(order =>
            order?.available_logistic?.find(c => selectedPartners && c?._id === selectedPartners[order?._id]?.partner?._id)
        );
        selectedLogisticList = selectedLogisticList?.filter(lp => lp !== undefined);

        if(modalShow === false || error){
            return <Redirect to={`/app/shipmentList`} />;
        }

        if(isGoBack || (!bulkOrder?.total_payout && orders && selectedLogisticList && selectedLogisticList?.length !== orders?.length)){
            let redirectTo = bulkOrder?.total_payout ? "/app/bulkShipmentUpload" : `/app/bulkShipmentList/${orderId}`;
            return <Redirect to={redirectTo} />;
        }

        let totalAmount = bulkOrder?.total_payout || 0;
        if (!bulkOrder?.total_payout && Array.isArray(selectedLogisticList) && selectedLogisticList.length > 0) {
            if (selectedLogisticList.length === 1) {
                totalAmount = selectedLogisticList[0].price?.final_pay;
            } else {
                totalAmount = selectedLogisticList?.reduce((prev, current) => {
                    let preTotalAmount = prev?.price?.final_pay || prev || 0;
                    let currentPay = current?.price?.final_pay || current || 0;
                    return(preTotalAmount + currentPay);
                });
            }
        }

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Bulk Invoice
                                    </h2>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Shipment</a>
                                        </li>
                                        <li
                                            className="breadcrumb-item active"
                                            aria-current="page"
                                        >
                                            Bulk Invoice
                                        </li>
                                    </ol>
                                </div>
                            </div>

                            <div className="page-title-right">
                                <button
                                    type="button"
                                    className="btn btn-primary my-2 btn-icon-text"
                                    onClick={this.onGoBack}
                                >
                                    <i className="fa fa-arrow-circle-left"></i>{" "}
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    Array.isArray(orders) &&
                    orders.map((order, index) => {
                        let mPartner = selectedPartners[order?._id]?.partner;
                        let courier;

                        if (order?.transaction_id) {
                            courier = order?.available_logistic[0];
                        } else {
                            courier = order?.available_logistic?.find(c => c?._id === mPartner?._id)
                        }

                        let transaction = order?.transaction_id;
                        let created_by = order?.created_by;
                        let customerDetails = order?.customer_details;
                        let billingAddress = customerDetails?.billing_address;
                        let shippingAddress = customerDetails?.shipping_address;
                        let total = courier?.price?.final_pay
                        let price = typeof courier?.price?.total_value === "number" ? courier?.price?.total_value : transaction?.amount;
                        let codCharges = courier?.price?.cod_charges;
                        let vat = courier?.price?.tax;
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
                            orderId: bulkOrder?.order_id ||bulkOrder?._id,
                            billedTo: {
                                name: created_by?.first_name ? `${created_by?.first_name} ${created_by?.last_name || ""}` : (created_by?.email || "-"),
                                address: `${billingAddress?.line1} ${billingAddress?.line2} ${billingAddress?.city} ${billingAddress?.state} ${billingAddress?.postcode}`,
                            },
                            shippedTo: {
                                name: `${customerDetails?.first_name} ${customerDetails?.last_name || ""}`,
                                address: `${shippingAddress?.line1} ${shippingAddress?.line2} ${shippingAddress?.city} ${shippingAddress?.state} ${shippingAddress?.postcode}`,
                            },
                            orders: [productDetails],
                            totalAmount: parseFloat(totalAmount).toFixed(2),
                            paymentMethod: order?.payment_method || 'prepaid',
                            email: customerDetails?.email,
                            order_date: order?.order_date,
                        };

                        return(
                            <OrderInvoice
                                key={index}
                                showHeader={index === 0}
                                details={details}
                            />
                        );
                    })
                }

                {
                    !bulkOrder?.total_payout &&
                    <div className="page-title-right" style={{textAlign:'right', position:'sticky', bottom:0, background:'#F8F8FB'}}>
                        <button
                            type="button"
                            className="btn btn-primary my-2 btn-icon-text"
                            onClick={this.onPayNow}
                            disabled={isLoading}
                            style={{width:120}}
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

                <ErrorModal
                    show={isShowErrorModal && failed_transaction?.length > 0}
                    handleClose={this.handleErrorModal}
                    error={failed_transaction}
                />

            </>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let orderId = match?.params?.orderId;
    let orders = state?.order?.bulk?.orders;
    let order = (orderId && orders && orders[orderId]);
    let selectedPartners = state?.order?.selectedPartners;
    let wallet = state.wallet?.data;

    return {
        orderId: orderId,
        bulkOrder: order,
        selectedPartners: selectedPartners,
        wallet: wallet,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrder: (id) => dispatch(fetchBulkOrderRequest(id)),
        orderPay: (params) => dispatch(orderPayRequest(params)),
        fetchWallet: () => dispatch(fetchWalletRequest()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkInvoice);
