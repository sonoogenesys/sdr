import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./InvoiceActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createInvoiceApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.INVOICE_URL,
        data: data,
    });
};

function* createInvoice(action) {
    try {
        let response = yield call(createInvoiceApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                invoice: resData.invoice,
            });
        }
    } catch (error) {
        console.log("Create Invoice ", error);
    }
}

const fetchAllInvoicesApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.INVOICE_URL,
        params: params,
    });
};

function* fetchAllInvoices(action) {
    try {
        let response = yield call(fetchAllInvoicesApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.message);
            yield put({
                type: ACTIONS.FETCH_ALL_FAIL,
                payload: resData,
            });
        } else {
            let payload = resData || {};
            payload.isReset = action?.payload?.offset === 0;
            yield put({
                type: ACTIONS.FETCH_ALL_SUCCESS,
                payload: payload,
            });
        }
    } catch (error) {
        console.log("Fetch Invoices ", error);
    }
}


const updateInvoiceApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.INVOICE_URL}/${data?._id}`,
        data: data,
    });
};

function* updateInvoice(action) {
    try {
        let response = yield call(updateInvoiceApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'InvoiceRes')
        if (resData?.success === false) {
            showNotification("error", resData?.message || resData?.message);
            yield put({
                type: ACTIONS.UPDATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.UPDATE_SUCCESS,
                invoice: resData?.invoice,
            });
        }
    } catch (error) {
        console.log("Update Invoice ", error);
    }
}

const deleteInvoiceApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.INVOICE_URL}/${id}`,
    });
};

function* deleteInvoice(action) {
    try {
        let response = yield call(deleteInvoiceApi, action.id);
        let resData = response?.data;

        if (resData?.success === false) {
            yield put({
                type: ACTIONS.DELETE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.DELETE_SUCCESS,
                id: action.id,
            });
        }
    } catch (error) {
        console.log("Delete Invoice ", error);
    }
}

function* watchInvoices() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createInvoice);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllInvoices);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateInvoice);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteInvoice);

}

// ACTION WATCHER
export default function* invoiceSaga() {
    yield fork(watchInvoices);
}
