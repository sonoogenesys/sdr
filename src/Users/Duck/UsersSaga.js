import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./UsersActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createUserApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.INVITE_USER_URL,
        data: data,
    });
};

function* createUser(action) {
    try {
        let response = yield call(createUserApi, action.payload);
        let resData = response?.data;
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                user: resData.data,
            });
        }
    } catch (error) {
        console.log("Create user ", error);
    }
}

const fetchAllUsersApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.USERS_URL,
        params: params,
    });
};

function* fetchAllUsers(action) {
    try {
        let response = yield call(fetchAllUsersApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
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
        console.log("Fetch users ", error);
    }
}

const fetchAllCustomersApi = () => {
    return axios({
        method: "GET",
        url: `${APP_URL.USERS_URL}/customer-list`,
    });
};

function* fetchAllCustomers(action) {
    try {
        let response = yield call(fetchAllCustomersApi);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_CUSTOMER_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_ALL_CUSTOMER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch users ", error);
    }
}

const updateUserApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.USERS_URL}/${data?._id}`,
        data: data,
    });
};

function* updateUser(action) {
    try {
        let response = yield call(updateUserApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'userRes')
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.UPDATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.UPDATE_SUCCESS,
                user: resData?.data,
            });
        }
    } catch (error) {
        console.log("Update user ", error);
    }
}

const deleteUserApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.USERS_URL}/${id}`,
    });
};

function* deleteUser(action) {
    try {
        let response = yield call(deleteUserApi, action.id);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
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
        console.log("Delete user ", error);
    }
}

const fetchAllUsersUsageApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.USERS_USAGE_URL,
        params: params,
    });
};

function* fetchAllUsersUsage(action) {
    try {
        let response = yield call(fetchAllUsersUsageApi, action.payload);
        let resData = response?.data;

        resData.pathname = action.payload?.pathname;
        delete action.payload?.pathname;
        resData.filter = Object.assign({}, action.payload);

        delete resData.filter?.limit;
        delete resData.filter?.offset;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message)
            yield put({ type: ACTIONS.FETCH_ALL_USAGE_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_USAGE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch users ", error);
    }
}

function* fetchUserUsage(action) {
    try {
        let response = yield call(fetchAllUsersUsageApi, action.payload);
        let resData = response?.data;
        resData.user_id = action.payload?.user_id;

        console.log("resData", resData);

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message)
            yield put({ type: ACTIONS.FETCH_USER_USAGE_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_USER_USAGE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch users ", error);
    }
}

function* watchUsers() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createUser);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllUsers);
    yield takeLatest(ACTIONS.FETCH_ALL_CUSTOMER_REQUEST, fetchAllCustomers);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateUser);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteUser);
    yield takeLatest(ACTIONS.FETCH_ALL_USAGE_REQUEST, fetchAllUsersUsage);
    yield takeLatest(ACTIONS.FETCH_USER_USAGE_REQUEST, fetchUserUsage);
}

// ACTION WATCHER
export default function* usersSaga() {
    yield fork(watchUsers);
}
