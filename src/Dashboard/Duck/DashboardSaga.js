import { put, takeLatest, call, fork, takeEvery } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./DashboardActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const fetchDashboardApi = (data) => {
    return axios({
        method: "GET",
        url: APP_URL.GLOBAL_DASHBOARD_URL,
        params: data,
    });
};

function* fetchDashboard(action) {
    try {
        let response = yield call(fetchDashboardApi, action.payload);
        let resData = response?.data;

        resData.pathname = action.payload?.pathname;
        delete action.payload?.pathname;
        resData.filter = action.payload;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("fetch dashboard ", error);
    }
}

function* refreshCounter(action) {
    try {
        let response = yield call(fetchDashboardApi, action.payload);
        let resData = response?.data;
        resData.counter_key = action.payload?.counter_key;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.REFRESH_COUNTER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.REFRESH_COUNTER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("refresh counter ", error);
    }
}

function* watchDashboard() {
    yield takeLatest(ACTIONS.FETCH_REQUEST, fetchDashboard);
    yield takeEvery(ACTIONS.REFRESH_COUNTER_REQUEST, refreshCounter);
}

// ACTION WATCHER
export default function* dashboardSaga() {
    yield fork(watchDashboard);
}
