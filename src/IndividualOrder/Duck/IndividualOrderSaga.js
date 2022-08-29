import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./IndividualOrderActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createIndividualOrderApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.ORDERS_URL + "/logistic",
        data: data,
    });
};

function* createIndividualOrder(action) {
    try {
        let response = yield call(createIndividualOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CREATE_ORDER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.CREATE_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Create Individual order ", error);
        showNotification('error', error)
    }
}

const updateIndividualOrderApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.ORDERS_URL}/${data?._id}`,
        data: data,
    });
};

function* updateIndividualOrder(action) {
    try {
        let response = yield call(updateIndividualOrderApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.UPDATE_ORDER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.UPDATE_ORDER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Update Individual order ", error);
    }
}

function* watchIndividualOrder() {
    yield takeLatest(ACTIONS.CREATE_ORDER_REQUEST, createIndividualOrder);
    yield takeLatest(ACTIONS.UPDATE_ORDER_REQUEST, updateIndividualOrder);
}

// ACTION WATCHER
export default function* individualOrderSaga() {
    yield fork(watchIndividualOrder);
}
