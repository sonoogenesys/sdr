import { put, takeEvery, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./OrderActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";
import fileDownload from "js-file-download";
import moment from "moment";

const getAllOrdersApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.ORDERS_URL,
        params: params,
    });
};

function* getAllOrders(action) {
    try {
        let response = yield call(getAllOrdersApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get all orders ", error);
    }
}

const searchAllOrdersApi = (params) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/search`,
        params: params,
    });
};

function* searchAllOrders(action) {
    try {
        let response = yield call(searchAllOrdersApi, action.payload);
        let resData = response?.data;

        resData.pathname = action.payload?.pathname;
        delete action.payload?.pathname;
        resData.filter = Object.assign({}, action.payload);

        delete resData.filter?.limit;
        delete resData.filter?.offset;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get all orders ", error);
    }
}

const invoiceOrdersApi = (params) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/invoice-details`,
        params: params,
    });
};

function* getAllInvoiceOrders(action) {
    try {
        let response = yield call(invoiceOrdersApi, action.payload);
        let resData = response?.data;

        resData.pathname = action.payload?.pathname;
        delete action.payload?.pathname;
        resData.filter = Object.assign({}, action.payload);

        delete resData.filter?.limit;
        delete resData.filter?.offset;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_ORDERS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get all invoice orders ", error);
    }
}

const invoiceDetailsOrdersApi = (params) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/invoice-details-download`,
        params: params,
        contentType: 'application/doc; charset=utf-8',
        responseType: 'arraybuffer',
    });
};

function* invoiceDetailsOrders(action) {
    try {
        let response = yield call(invoiceDetailsOrdersApi, action.payload);
        let resData = response?.data;

        if (response?.status !== 200) {
            yield put({ type: ACTIONS.DOWNLOAD_ALL_INVOICE_ORDERS_FAIL, payload: { filter: action.payload } });
        } else {
            fileDownload(resData, `invoice-details-${moment().format("DD-MM-YYYY")}.xlsx`);
            yield put({ type: ACTIONS.DOWNLOAD_ALL_INVOICE_ORDERS_SUCCESS, payload: { filter: action.payload } });
        }
    } catch (error) {
        console.log("download all invoice orders ", error);
    }
}

const getOrderApi = (id) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/${id}`,
    });
};

function* getOrder(action) {
    try {
        let response = yield call(getOrderApi, action.payload);
        let resData = response?.data;
        resData._id = action.payload

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_ORDER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get order ", error);
    }
}

const getAllBulkOrderApi = (params) => {
    return axios({
        method: "GET",
        url: `${APP_URL.BULKS_URL}/`,
        params: params,
    });
};

function* getAllBulkOrder(action) {
    try {
        let response = yield call(getAllBulkOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_BULK_ORDERS_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_BULK_ORDERS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get bulk order ", error);
    }
}

const getBulkOrderApi = (id) => {
    return axios({
        method: "GET",
        url: `${APP_URL.BULK_URL}/${id}`,
    });
};

function* getBulkOrder(action) {
    try {
        console.log("getBulkOrder", action.payload);
        let response = yield call(getBulkOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            resData._id = action.payload;
            yield put({ type: ACTIONS.FETCH_BULK_ORDER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_BULK_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get bulk order ", error);
    }
}

const trackOrderApi = (data) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/track`,
        params: data,
    });
};

function* trackOrder(action) {
    try {
        let response = yield call(trackOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            let payload = {
                ...resData,
                order_id: action.payload?.order_id,
            };
            yield put({ type: ACTIONS.TRACK_ORDER_FAIL, payload: payload });
        } else {
            yield put({ type: ACTIONS.TRACK_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("track order ", error);
    }
}

const cancelOrderApi = (data) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ORDERS_URL}/cancel`,
        params: data,
    });
};

function* cancelOrder(action) {
    try {
        let response = yield call(cancelOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            resData.order_id = action?.payload?.order_id;
            yield put({ type: ACTIONS.CANCEL_ORDER_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CANCEL_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        showNotification("error", "Error in cancel order");
        console.log("cancel order ", error);
    }
}

const createRtoOrderApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.RTO_ORDER_URL,
        data: data,
    });
};

function* createRtoOrder(action) {
    try {
        let response = yield call(createRtoOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            resData.order_id = action?.payload?.order_id;
            yield put({ type: ACTIONS.CREATE_RTO_ORDER_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CREATE_RTO_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        showNotification("error", "Error in creating rto order");
        console.log("create rto ", error);
    }
}

const orderPayApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.ORDERS_URL + '/pay/',
        data: data
    });
};

function* orderPay(action) {
    try {
        let response = yield call(orderPayApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.ORDER_PAY_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.ORDER_PAY_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("order pay ", error);
    }
}

const raiseDisputeApi = (params) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.RAISE_WEIGHT_DISPUTE_URL}/${params?._id}`,
        data: params?.data,
    });
};

function* raiseDispute(action) {
    try {
        let response = yield call(raiseDisputeApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.RAISE_DISPUTE_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.RAISE_DISPUTE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("raise dispute ", error);
    }
}

const disputeSettleApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.SETTLE_WEIGHT_DISPUTE_URL}/${data?._id}`,
        data,
    });
};

function* disputeSettle(action) {
    try {
        let response = yield call(disputeSettleApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.DISPUTE_SETTLE_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.DISPUTE_SETTLE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("dispute settle ", error);
    }
}

// const getAllCodReportsApi = (params) => {
//     return axios({
//         method: "GET",
//         url: APP_URL.REPORTS_URL,
//         params: params,
//     });
// };

// function* getAllCodOrder(action) {
//     try {
//         let response = yield call(getAllCodReportsApi, action.payload);
//         let resData = response?.data;

//         if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
//             showNotification("error", resData?.meta?.message || resData?.message);
//             yield put({ type: ACTIONS.FETCH_ALL_COD_REPORTS_FAIL, payload: resData });
//         } else {
//             resData.isReset = (action.payload?.offset || 0) === 0;
//             yield put({ type: ACTIONS.FETCH_ALL_COD_REPORTS_SUCCESS, payload: resData });
//         }
//     } catch (error) {
//         console.log("get all cod reports ", error);
//     }
// }

function* watchOrder() {
    yield takeEvery(ACTIONS.SEARCH_ALL_ORDERS_REQUEST, searchAllOrders);
    yield takeLatest(ACTIONS.FETCH_ALL_ORDERS_REQUEST, getAllOrders);
    yield takeLatest(ACTIONS.FETCH_ALL_INVOICE_ORDERS_REQUEST, getAllInvoiceOrders);
    yield takeLatest(ACTIONS.DOWNLOAD_ALL_INVOICE_ORDERS_REQUEST, invoiceDetailsOrders);
    yield takeLatest(ACTIONS.FETCH_ORDER_REQUEST, getOrder);
    yield takeLatest(ACTIONS.FETCH_BULK_ORDER_REQUEST, getBulkOrder);
    yield takeLatest(ACTIONS.FETCH_ALL_BULK_ORDERS_REQUEST, getAllBulkOrder);
    yield takeLatest(ACTIONS.CANCEL_ORDER_REQUEST, cancelOrder);
    yield takeLatest(ACTIONS.CREATE_RTO_ORDER_REQUEST, createRtoOrder);
    yield takeLatest(ACTIONS.TRACK_ORDER_REQUEST, trackOrder);
    yield takeLatest(ACTIONS.ORDER_PAY_REQUEST, orderPay);
    // yield takeLatest(ACTIONS.FETCH_ALL_COD_REPORTS_REQUEST, getAllCodOrder);
    yield takeLatest(ACTIONS.RAISE_DISPUTE_REQUEST, raiseDispute);
    yield takeLatest(ACTIONS.DISPUTE_SETTLE_REQUEST, disputeSettle);
}

// ACTION WATCHER
export default function* orderSaga() {
    yield fork(watchOrder);
}
