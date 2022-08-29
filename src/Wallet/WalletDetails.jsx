import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import BreadCrumb from '../Utils/BreadCrumb'
import BaseModal from '../Utils/BaseModal'
import {connect} from 'react-redux'
import TableContainer from '../Utils/TableContainer';
import axios from 'axios'
import AppUrl from '../Constants/AppUrl'
import moment from 'moment'
import { showNotification } from '../Utils/CommonFunctions';
import { fetchWalletRequest } from './Duck/WalletActions';
import AddMoneyModal from './Components/AddMoneyModal';
import WalletChart from './Components/WalletChart';

class WalletDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal : false,
            showAmountModal: false,
            amount: '',
            transaction: null,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        let { loggedInUser, userId, fetchWallet } = this.props;
        if (userId && loggedInUser?._id !== userId) {
            fetchWallet(userId);
        } else {
            fetchWallet();
        }
    }

    handleShow (transaction){
        this.setState({
            showModal: true,
            transaction: transaction,
        });
      }
    handleClose (){
        this.setState({
            showModal: false,
            transaction: undefined,
        });
    }

    handleAmountModal = (show = false) => {
        show = typeof show === "boolean" && show;
        this.setState({
            showAmountModal: show,
        });
    }

    handleAmount = (e) => {
        let amount = e?.target?.value
        this.setState({amount})
    }

    renderRow = (item, index) => {
        const {transactions} = this.props
        let transaction = item && transactions && transactions[item];
        let created_by = transaction.created_by;

        if (!transaction) return <></>;

        return(
            <tr key={index}>
                <td style={{textAlign:'center'}}>{index+1}</td>
                <td>{created_by?.first_name || created_by?.email}</td>
                <td style={{letterSpacing: 1}} >{moment(transaction?.created_at).format('DD MMM YYYY, h:mm:ss a')}</td>
                <td className={transaction?.type === "credit" && transaction?.payment_status ? "greenColor" : "redColor"} style={{ textAlign: "center" }}>
                    {transaction?.type === "credit" ? '+' : '-'}&nbsp;₹ {parseFloat(transaction?.total || 0).toFixed(2)}
                </td>
                <td style={{ textAlign: "center" }}>
                    {
                        transaction?.payment_status
                        ? <span className="common_status paid">{transaction?.payment_status}</span>
                        : <span className="common_status changeback">Failed</span>
                    }
                </td>
                <td style={{textAlign:'center'}}>
                    <button
                        className="btn btn-primary view_btn"
                        onClick={() => this.handleShow(transaction)}
                    >View Details</button>
                </td>
            </tr>
        )
    }

    onGoBack = () => {
        let { history } = this.props;
        history.replace('/app/users');
    }

    render() {
        const {showAmountModal, transaction} = this.state;
        let {wallet, transactionList = [], userId, loggedInUser } = this.props;
        transactionList = [...(transactionList || [])].reverse();

        let user = wallet?.user_id

        let walletAmount = wallet?.amount || 0;
        walletAmount = parseFloat(walletAmount).toFixed(2)

        let debitAmount = wallet?.debit || 0;
        debitAmount = parseFloat(debitAmount).toFixed(2);

        let creditAmount = wallet?.credit || 0;
        creditAmount = parseFloat(creditAmount).toFixed(2);

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div className="page-header">
                                <div>
                                    <h2 className="main-content-title tx-24 mg-b-5">
                                        Wallet Details
                                    </h2>
                                    <BreadCrumb
                                        title = {['Billing & Wallet', 'Wallet Details']}
                                    />
                                </div>
                            </div>

                            {
                                userId &&
                                <div className="page-title-right">
                                    <button
                                        type="button"
                                        className="btn btn-primary my-2 btn-icon-text"
                                        onClick={this.onGoBack}
                                    >
                                        <i className="fa fa-arrow-circle-left mr-2"></i>
                                        Back
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card pt-3 pb-3 pr-3 pl-3">
                            <p className="d-flex justify-content-between">
                                <span>Main Account</span>
                                <span>Available Balance</span>
                            </p>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h3>{user?.first_name || user?.email}</h3>
                                    {/* <p className="mb-0">789 **** ** 342</p> */}
                                </div>
                                <h3>₹ {walletAmount}</h3>
                            </div>
                            <div className="d-flex justify-content-between wallet_left">
                                <div className="d-flex">
                                    <div>
                                        <span className="fa fa-arrow-down common_arrow"></span>
                                    </div>
                                    <div>
                                        <h5 className="mb-0">
                                            ₹ {creditAmount}
                                        </h5>
                                        <p className="mb-0">
                                            Credit Amt
                                        </p>

                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div>
                                        <span className="fa fa-arrow-up common_arrow"></span>
                                    </div>
                                    <div>
                                        <h5 className="mb-0">
                                            ₹ {debitAmount}
                                        </h5>
                                        <p className="mb-0">
                                            Debit Amt
                                        </p>

                                    </div>
                                </div>
                                <div>
                                    {
                                        loggedInUser?._id &&
                                        <button
                                            type="button"
                                            className="btn btn-primary btn-icon-text" onClick={() => this.handleAmountModal(true)}>
                                            <i className="fe fe-plus mr-1"></i> {(userId && loggedInUser?._id !== userId) ? "Send Money" : "Add Money"}
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="graph p-1 pt-2" style={{ height: 228 }}>
                                <WalletChart userId={userId} />
                            </div>
                            {/* <p className="graph_count text-center">
                                <span><i className="fa fa-circle credit" aria-hidden="true"></i> Credit</span>
                                &nbsp; &nbsp;
                                <span><i className="fa fa-circle debit" aria-hidden="true"></i> Debit</span>
                            </p> */}

                        </div>

                    </div>
                </div>

                <AddMoneyModal
                    show={showAmountModal}
                    handleClose={this.handleAmountModal}
                    userId={userId}
                />

                <TableContainer
                    title='Transactions'
                    baseTableClassName={"table table-striped table-bordered dt-responsive nowrap wallet_table"}
                    headings={[
                        "No.",
                        "Billing Name",
                        "Date",
                        {
                            style: { textAlign: "center" },
                            text: "Amount(₹)",
                        },
                        {
                            style: { textAlign: "center" },
                            text: "Payment Status",
                        },
                        "View Details",
                    ]}

                    totalEntries={transactionList.length}
                    rowData={transactionList}
                    renderRow={this.renderRow}
                    showSearch={false}
                />

                <Modal
                    show={this.state.showModal && !!transaction}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={true}
                    animation={true}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Transaction Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <p className="d-flex align-items-center">
                                    <strong>
                                        Transaction Id
                                    </strong>
                                    <span className="font-weight-bold">:</span>
                                    <span className="theme_icon_color font-weight-bold">
                                        &nbsp; {transaction?.transaction_number || transaction?._id}
                                    </span>
                                </p>
                                <p className="d-flex align-items-center">
                                    <strong>
                                        Date Time
                                    </strong>
                                    <span className="font-weight-bold">:</span>
                                    <span className="theme_icon_color font-weight-bold" style={{ letterSpacing: 1 }} >
                                        &nbsp; {transaction?.created_at && moment(transaction?.created_at).format('DD MMM YYYY, h:mm:ss a')}
                                    </span>
                                </p>
                                {
                                    transaction?.method &&
                                    <p className="d-flex align-items-center">
                                        <strong>
                                            Payment Method
                                        </strong>
                                        <span className="font-weight-bold">:</span>
                                        <span className="theme_icon_color font-weight-bold text-capitalize">
                                            &nbsp; {transaction?.method}
                                        </span>
                                    </p>
                                }
                                {
                                    transaction?.razorpayPaymentId &&
                                    <p className="d-flex align-items-center">
                                        <strong>
                                            Payment Id
                                        </strong>
                                        <span className="font-weight-bold">:</span>
                                        <span className="theme_icon_color font-weight-bold">
                                            &nbsp; {transaction?.razorpayPaymentId}
                                        </span>
                                    </p>
                                }
                                <p className="d-flex align-items-center">
                                    <strong>
                                        Payment Status
                                    </strong>
                                    <span className="font-weight-bold">:</span>
                                    <span className={transaction?.payment_status ? 'greenColor' : 'redColor'}>
                                        &nbsp; {transaction?.payment_status || 'Failed'}
                                    </span>
                                </p>
                                <p className="d-flex align-items-center">
                                    <strong>
                                        Amount
                                    </strong>
                                    <span className="font-weight-bold">:</span>
                                    <span className="theme_icon_color font-weight-bold">
                                        &nbsp; ₹ {parseFloat(transaction?.total || 0).toFixed(2)}
                                    </span>
                                </p>
                                <p>
                                    <strong>
                                        Summary
                                    </strong>
                                    <span className="font-weight-bold">:</span>
                                    <span className="theme_icon_color font-weight-bold">
                                        &nbsp;
                                        {!transaction?.payment_status && <span>Failed to add amount to the wallet!</span>}
                                        {
                                            transaction?.payment_status && transaction?.type === 'credit' &&
                                            <span>{
                                                transaction?.order_id?.rto_init && transaction?.order_id?.ewaybill_number
                                                ? `RTO initiated for the order with AWB ${transaction?.order_id?.ewaybill_number}`
                                                : transaction?.order_id?.weight_dispute?.refund_transaction_id === transaction?._id
                                                    ? `The amount has been reversed for the AWB No ${transaction?.order_id?.ewaybill_number}.`
                                                    : `${transaction?.order_id ? "Cancel order's amount" : "Amount"} successfully added to the wallet!`
                                            }</span>
                                        }
                                        {/* {transaction?.payment_status && transaction?.type === 'debit' && <span>Order placed successfully!</span>} */}
                                        {
                                            transaction?.payment_status && transaction?.type === 'debit' &&
                                            <span>{
                                                transaction?.order_id?.rto_init && transaction?.order_id?.ewaybill_number
                                                ? `RTO initiated for the order with AWB ${transaction?.order_id?.ewaybill_number}`
                                                : transaction?.order_id?.weight_dispute?.transaction_id === transaction?._id
                                                    ? `The amount deducted for AWB No ${transaction?.order_id?.ewaybill_number} due to weight dispute, Please raise dispute in weight Discrepancy panel in case of concern`
                                                    : "Order placed successfully!"
                                            }</span>
                                        }
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                {/* <div className="d-flex justify-content-between pt-2 pb-2 border-bottom">
                                    <h5>
                                        Descrition
                                    </h5>
                                    <h5>Price</h5>
                                </div> */}
                                {/* <div className="d-flex popup_table justify-content-between pt-2 pb-2 border-bottom">
                                        <div className="d-flex">
                                            <div>
                                                <img src="/images/box.png" alt="" />
                                            </div>
                                            <div>
                                                <p className="mb-0 font-weight-bold font-size-18">Persocal Item one</p>
                                                <p className="mb-0 font-size-15">Qty : 1</p>
                                            </div>
                                        </div>
                                    <h6>₹ 120</h6>
                                </div> */}
                                {/* <div className="d-flex popup_table justify-content-between pt-2 pb-2 border-bottom">
                                    <div className="d-flex justify-content-end">
                                        <div>
                                            <img src="/images/box.png" alt="" />
                                        </div>
                                        <div>
                                            <p className="mb-0 font-weight-bold font-size-15">Persocal Item one</p>
                                            <p className="mb-0 font-size-13">Qty : 1</p>
                                        </div>
                                    </div>
                                    <h6>₹ 120</h6>
                                </div> */}
                                {/* <div className="d-flex justify-content-end pt-3 pb-3 border-bottom pop_bill">
                                    <span>Amount</span>
                                    <span className="font-weight-bold"> &nbsp; :  &nbsp; </span>
                                    <strong>₹ {transaction?.amount || 0}</strong>

                                </div>
                                <div className="d-flex justify-content-end pt-3 pb-3 border-bottom pop_bill">
                                    <span>Tax</span>
                                    <span className="font-weight-bold"> &nbsp; :  &nbsp; </span>
                                    <strong>₹ {transaction?.tax || 0}</strong>

                                </div>
                                <div className="d-flex justify-content-end pt-3 pop_bill">
                                    <span>Total</span>
                                    <span className="font-weight-bold"> &nbsp; :  &nbsp; </span>
                                    <strong>₹ {transaction?.total || 0}</strong>

                                </div> */}
                            </div>
                        </div>
                     </Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" className="btn btn-secondary" onClick={this.handleClose}>Close</button>
                    </Modal.Footer>
                </Modal>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let { match } = ownProps;
    let userId = match?.params?.id;

    let loggedInUser = state.loggedInUser?.data?.data;

    console.log("state.loggedInUser", loggedInUser?._id, userId);

    let wallet;
    let transactions;
    let transactionList;
    let rechargeAmount;

    if (userId && loggedInUser?._id !== userId) {
        let dashboard = state.wallet?.wallets[userId];
        wallet = dashboard?.data;
        transactions = dashboard?.transactions;
        transactionList = dashboard?.transactionList;
        rechargeAmount = dashboard?.rechargeAmount;
    } else {
        wallet = state.wallet?.data;
        transactions = state.wallet?.transactions;
        transactionList = state.wallet?.transactionList;
        rechargeAmount = state.wallet?.rechargeAmount;
    }

    return {
        userId: userId,
        loggedInUser: loggedInUser,
        wallet: wallet,
        transactions: transactions,
        transactionList: transactionList,
        rechargeAmount: rechargeAmount,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWallet: (id) => dispatch(fetchWalletRequest(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletDetails)
