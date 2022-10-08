import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./PurchaseActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createPurchaseApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.PURCHASE_URL,
        data: data,
    });
};

function* createPurchase(action) {
    try {
        let response = yield call(createPurchaseApi, action.payload);
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
                purchase: resData.purchase,
            });
        }
    } catch (error) {
        console.log("Create Purchase ", error);
    }
}

const fetchAllPurchaseApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.PURCHASE_URL,
        params: params,
    });
};

function* fetchAllPurchase(action) {
    try {
        let response = yield call(fetchAllPurchaseApi, action.payload);
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
        console.log("Fetch Purchase ", error);
    }
}


const updatePurchaseApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.PURCHASE_URL}/${data?._id}`,
        data: data,
    });
};

function* updatePurchase(action) {
    try {
        let response = yield call(updatePurchaseApi, action.payload);
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
                purchase: resData?.purchase,
            });
        }
    } catch (error) {
        console.log("Update Purchase ", error);
    }
}

const deletePurchaseApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.PURCHASE_URL}/${id}`,
    });
};

function* deletePurchase(action) {
    try {
        let response = yield call(deletePurchaseApi, action.id);
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

function* watchPurchase() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createPurchase);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllPurchase);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updatePurchase);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deletePurchase);

}

// ACTION WATCHER
export default function* purchaseSaga() {
    yield fork(watchPurchase);
}
