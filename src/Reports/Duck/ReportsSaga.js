import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./ReportsActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const getAllReportsApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.REPORTS_URL,
        params: params,
    });
};

function* getAllReports(action) {
    try {
        let response = yield call(getAllReportsApi, action.payload);
        let resData = response?.data;
        resData.type = action.payload?.type;

        console.log("resData", resData);

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_ALL_REPORTS_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_REPORTS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get all reports ", error);
    }
}

const getReportApi = (id) => {
    return axios({
        method: "GET",
        url: `${APP_URL.REPORTS_URL}/${id}`,
    });
};

function* getReport(action) {
    try {
        let response = yield call(getReportApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);

            resData._id = action.payload
            yield put({ type: ACTIONS.FETCH_ONE_REPORT_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_ONE_REPORT_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get all reports ", error);
    }
}

const remitReportOrdersApi = (data) => {
    return axios({
        method: "POST",
        url: `${APP_URL.REPORTS_URL}/remit-orders`,
        data: data,
    });
};

function* remitReportOrders(action) {
    try {
        let response = yield call(remitReportOrdersApi, action.payload);
        let resData = response?.data;
        resData.report_id = action?.payload?.report_id;
        resData.awb_numbers = action?.payload?.awb_numbers;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.REMIT_REPORT_ORDERS_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_ONE_REPORT_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("get remit report orders ", error);
    }
}

function* watchOrder() {
    yield takeLatest(ACTIONS.FETCH_ALL_REPORTS_REQUEST, getAllReports);
    yield takeLatest(ACTIONS.FETCH_ONE_REPORT_REQUEST, getReport);
    yield takeLatest(ACTIONS.REMIT_REPORT_ORDERS_REQUEST, remitReportOrders);
}

// ACTION WATCHER
export default function* reportSaga() {
    yield fork(watchOrder);
}
