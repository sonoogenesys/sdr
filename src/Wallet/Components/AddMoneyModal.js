import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux';
import { showNotification } from '../../Utils/CommonFunctions';
import { fetchWalletRequest } from '../Duck/WalletActions';
import AppUrl, { RAZORPAY_KEY } from '../../Constants/AppUrl';
import axios from 'axios';
import BaseModal from '../../Utils/BaseModal';
import appUrl from '../../Constants/AppUrl';

const AddMoneyModal = ({
    show = false,
    handleClose = () => {},
    loggedInUser,
    fetchWallet,
    addAmounts = [200, 500, 1000, 2000],
    showAddAmountBtn = true,
    preFillAmount = "",
    minAmount = 1,
    maxAmount = 5_00_000,
    userId,
}) => {

    const inputRef = useRef();

    const [state, setState] = useState({
        amount: preFillAmount,
        error: "",
        isLoading: false,
    });

    const preload = () => {
        inputRef?.current?.focus();

        if (show) {
            setState({
                amount: preFillAmount || "",
                error: "",
                isLoading: false,
            });
        }
    }

    useEffect(() => {
        preload();
    }, [show])

    const handleAmount = (event) => {
        if (state.isLoading) {
            return;
        }

        let amount = event?.target?.value;
        amount = amount.replace(/[^0-9]/g, '');

        setState({
            ...state,
            amount: amount,
            error: "",
        });
    }

    const loadRazorPayScript = (src)  => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    const onPaymentFailed = (response) => {
        // console.log("payment failed response", response);
    }

    const hasError = () => {
        let amount = state.amount;
        let err;

        if (!preFillAmount && (!amount || (amount && parseInt(amount) < minAmount))) {
            err = `Minimum amount is ₹ ${minAmount}.`;
        } else if ((amount && parseInt(amount) > maxAmount)) {
            err = `Maximum amount is ₹ ${maxAmount}.`;
        }

        if (err) {
            setState({
                ...state,
                error: err,
            });

            return true;
        }

        return false;
    }

    const initiateRazorpay = async () => {
        let _amount = state.amount.toString();

        if (hasError()) return;

        if(_amount?.trim() !== '' && !isNaN(_amount)){
            handleClose();
        }else{
            return false;
        }

        const res = await loadRazorPayScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            showNotification("error", "Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios({
            method: 'post',
            url: `${AppUrl.WALLET_URL}/add-money`,
            mode: 'cors',
            data:{
                amount: state.amount,
            }
        });

        if (!result) {
            showNotification("error", "Server error. Are you online?");
            return;
        }else{
            setState({ amount: "" });
        }

        const { amount, id, currency, created_at, receipt} = result.data;

        const options = {
            key: RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Yolojet Service",
            description: "Add money to wallet",
            image: "https://i.ibb.co/16FHpMr/logo-1.png",
            order_id: id,
            handler: async function (response) {
                // console.log('------>',response)
                const data = {
                    orderCreationId: id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    amount,
                    created_at,
                    receipt
                };

                const result = await axios.post(`${AppUrl.WALLET_URL}/verify-payment`, data);
                // console.log('result', result.data)
                let resData = result.data;

                let notificationType;
                if (resData?.meta?.status !== 200 || resData?.meta?.success !== true) {
                    notificationType = "error";
                } else {
                    notificationType = "success";
                    fetchWallet && fetchWallet();
                }

                showNotification(notificationType, resData?.meta?.message || resData?.message);
            },
            prefill: {
                name: loggedInUser?.first_name || '',
                email: loggedInUser?.email,
                contact: loggedInUser?.mobile_number || '',
            },
            theme: {
                color: "#a67d01",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', onPaymentFailed);
        paymentObject.open();
    }

    const sendMoney = () => {
        axios({
            method: "POST",
            url: `${appUrl.WALLET_URL}/transfer-money`,
            data: {
                amount: state.amount,
                receiver_id: userId,
            }
        })
        .then(sendMoneyRes => {
            let resData = sendMoneyRes.data;
            let resMeta = resData?.meta || resData;

            if (resMeta?.success !== true && resMeta?.status !== 200) {
                showNotification("error", resMeta?.message);
            } else {
                showNotification("success", resMeta?.message)
            }

            fetchWallet && fetchWallet(userId);
            handleClose();
        })
        .catch(err => {
            showNotification("error", "Error in sending money to user");
            console.log("sendMoney ", err);
        })
    }

    const onAddAmount = (amount = 0) => {
        let newAmount = Number(state.amount) + amount;
        setState({
            ...state,
            amount: newAmount,
            error: "",
        });
    }

    const onProceed = () => {
        let _amount = state.amount.toString();
        if (hasError()) return;

        setState({
            ...state,
            isLoading: true,
        });

        if (userId && loggedInUser?._id !== userId) {
            sendMoney();
        } else {
            initiateRazorpay();
        }
    }

    return (
        <BaseModal
            show={show}
            title={userId && loggedInUser?._id !== userId ? "Send money from your wallet" : "Add money to your wallet"}
            handleClose={!state.isLoading && handleClose}
        >
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-6 m-auto text-center">
                            <div className="text-center mt-4 mb-4">
                                <img src="/images/ca.png" alt=""/>
                            </div>
                            <div className="form-group">
                                <div className="d-flex align-items-center wallet_amt">
                                    <i className="bx bx-rupee"></i>&nbsp;
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className={`form-control font-size-20 text-center ${state.error && "is-invalid"}`}
                                        autoFocus={true}
                                        placeholder={"Amount"}
                                        value={state.amount}
                                        onChange={handleAmount}
                                        disabled={state.isLoading}
                                    />
                                </div>
                                {
                                    state?.error &&
                                    <div className={"mt-1 ml-4"}>
                                        <span className={"redColor"}>{state?.error}</span>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>

                    {
                        showAddAmountBtn && Array.isArray(addAmounts) && addAmounts.length > 0 &&
                        <div className="row justify-content-center">
                            <div className="col-md-12 d-flex justify-content-between text-center mt-1" >
                                {
                                    addAmounts.map((addAmount, index) => (
                                        <button
                                            className={`btn btn-outline-primary ${addAmounts.length === index ? undefined : "mr-1"} flex-fill`}
                                            onClick={() => onAddAmount(addAmount)}
                                            disabled={state.isLoading}
                                        >+ ₹ {addAmount}</button>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    <div className="row">
                        <div className="col-md-12 text-center mt-5">
                            <button
                                className="btn btn-primary btn-lg font-size-18 pl-4 pr-4"
                                variant="secondary"
                                onClick={onProceed}
                                disabled={state.isLoading}
                            >
                                {state.isLoading ? (
                                    <div>
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                        <span className="visually-hidden">Processing...</span>
                                    </div>
                                ) : (
                                    "Proceed"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </BaseModal>
    )
}

const mapStateToProps = (state) => {
    return {
        loggedInUser: state?.loggedInUser?.data?.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchWallet: (id) => dispatch(fetchWalletRequest(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMoneyModal);
