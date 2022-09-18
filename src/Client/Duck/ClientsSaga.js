import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./ClientsActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createClientApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.CLIENT_URL,
        data: data,
    });
};

function* createClient(action) {
    try {
        let response = yield call(createClientApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                client: resData.client,
            });
        }
    } catch (error) {
        console.log("Create Client ", error);
    }
}

const fetchAllClientsApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.CLIENT_URL,
        params: params,
    });
};

function* fetchAllClients(action) {
    try {
        let response = yield call(fetchAllClientsApi, action.payload);
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
        console.log("Fetch Clients ", error);
    }
}


const updateClientApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.CLIENT_URL}/${data?._id}`,
        data: data,
    });
};

function* updateClient(action) {
    try {
        let response = yield call(updateClientApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'ClientRes')
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
                client: resData?.client,
            });
        }
    } catch (error) {
        console.log("Update Client ", error);
    }
}

const deleteClientApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.CLIENT_URL}/${id}`,
    });
};

function* deleteClient(action) {
    try {
        let response = yield call(deleteClientApi, action.id);
        let resData = response?.data;

        if (resData?.success === false) {
            yield put({
                type: ACTIONS.DELETE_FAIL,
                payload: resData,
            });
        } else {
            yield put({
                type: ACTIONS.UPDATE_SUCCESS,
                id: action.id,
            });
        }
    } catch (error) {
        console.log("Delete Client ", error);
    }
}

function* watchClients() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createClient);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllClients);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateClient);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteClient);

}

// ACTION WATCHER
export default function* clientsSaga() {
    yield fork(watchClients);
}
