import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./QuotationActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createQuotationApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.QUOTATION_URL,
        data: data,
    });
};

function* createQuotation(action) {
    try {
        let response = yield call(createQuotationApi, action.payload);
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
                quotation: resData.quotation,
            });
        }
    } catch (error) {
        console.log("Create Quotation ", error);
    }
}

const fetchAllQuotationsApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.QUOTATION_URL,
        params: params,
    });
};

function* fetchAllQuotations(action) {
    try {
        let response = yield call(fetchAllQuotationsApi, action.payload);
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
        console.log("Fetch Quotations ", error);
    }
}


const updateQuotationApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.QUOTATION_URL}/${data?._id}`,
        data: data,
    });
};

function* updateQuotation(action) {
    try {
        let response = yield call(updateQuotationApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'QuotationRes')
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
                quotation: resData?.quotation,
            });
        }
    } catch (error) {
        console.log("Update Quotation ", error);
    }
}

const deleteQuotationApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.QUOTATION_URL}/${id}`,
    });
};

function* deleteQuotation(action) {
    try {
        let response = yield call(deleteQuotationApi, action.id);
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
        console.log("Delete 1uotation ", error);
    }
}

function* watchQuotations() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createQuotation);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllQuotations);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateQuotation);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteQuotation);

}

// ACTION WATCHER
export default function* quotationSaga() {
    yield fork(watchQuotations);
}
