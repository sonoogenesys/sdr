import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./DepartmentActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createDepartmentApi = (attributes) => {
    return axios({
        method: "POST",
        url: APP_URL.DEPARTMENT_URL,
        data: {
            data: {
                attributes: attributes,
            },
        },
    });
};

function* createDepartment(action) {
    try {
        let response = yield call(createDepartmentApi, action.payload);
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
                department: resData.data,
            });
        }
    } catch (error) {
        console.log("Create Department ", error);
    }
}

const fetchDepartmentApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.DEPARTMENTS_URL,
        params: params,
    });
};

function* fetchDepartments(action) {
    try {
        let response = yield call(fetchDepartmentApi, action.payload);
        let resData = response?.data;
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.FETCH_FAIL,
                payload: resData,
            });
        } else {
            let payload = resData || {};
            payload.isReset = action?.payload?.offset === 0;

            yield put({
                type: ACTIONS.FETCH_SUCCESS,
                payload: payload,
            });
        }
    } catch (error) {
        console.log("Fetch Departments ", error);
    }
}

const updateDepartmentApi = (attributes) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.DEPARTMENT_URL}/${attributes?.id}`,
        data: {
            data: {
                attributes: attributes,
            },
        },
    });
};

function* updateDepartment(action) {
    try {
        let response = yield call(updateDepartmentApi, action.payload);
        let resData = response?.data;

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
                department: resData.data,
            });
        }
    } catch (error) {
        console.log("Update Department ", error);
    }
}

const deleteDepartmentApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.DEPARTMENT_URL}/${id}`,
    });
};

function* deleteDepartment(action) {
    try {
        let response = yield call(deleteDepartmentApi, action.id);
        let resData = response?.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.DELETE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.DELETE_SUCCESS,
                id: resData?.data?.id,
            });
        }
    } catch (error) {
        console.log("Delete Department ", error);
    }
}

function* watchDepartment() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createDepartment);
    yield takeLatest(ACTIONS.FETCH_REQUEST, fetchDepartments);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateDepartment);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteDepartment);
}

// ACTION WATCHER
export default function* departmentSaga() {
    yield fork(watchDepartment);
}
