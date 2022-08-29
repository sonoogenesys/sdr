import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./RoleActionsType";
import PROFILE_ACTIONS from "../../Profile/Duck/ProfileActionTypes";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";
import jwtDecode from "jwt-decode";

const createRoleApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.ROLE_URL,
        data: data,
    });
};

function* createRole(action) {
    try {
        let response = yield call(createRoleApi, action.payload);
        let resData = response?.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CREATE_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CREATE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Create Role ", error);
    }
}

const fetchAllRolesApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.ROLE_URL,
        params: params,
    });
};

function* fetchAllRoles(action) {
    try {
        let response = yield call(fetchAllRolesApi, action.payload);
        let resData = response?.data;

        resData.filter = Object.assign({}, action.payload);

        delete resData.filter?.limit;
        delete resData.filter?.offset;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_All_FAIL, payload: resData });
        } else {
            resData.isReset = (action.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_All_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch all roles ", error);
    }
}

const fetchRoleApi = (id) => {
    return axios({
        method: "GET",
        url: `${APP_URL.ROLE_URL}/${id}`,
    });
};

function* fetchRole(action) {
    try {
        let response = yield call(fetchRoleApi, action.payload);
        let resData = response?.data;
        resData.role_id = action.payload;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.FETCH_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch role ", error);
    }
}

const updateRoleApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.ROLE_URL}/${data?._id}`,
        data: data,
    });
};

function* updateRole(action) {
    try {
        let response = yield call(updateRoleApi, action.payload);
        let resData = response?.data;
        resData.role_id = action.payload._id;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.UPDATE_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.UPDATE_SUCCESS, payload: resData });

            let user_id = jwtDecode(localStorage.getItem('jwt')).user.id
            yield put({ type: PROFILE_ACTIONS.GET_LOGGEDIN_USER, payload: user_id });
        }
    } catch (error) {
        console.log("Update Role ", error);
    }
}

// const deleteRoleApi = (id) => {
//     return axios({
//         method: "DELETE",
//         url: `${APP_URL.ROLE_URL}/${id}`,
//     });
// };

// function* deleteRole(action) {
//     try {
//         let response = yield call(deleteRoleApi, action.id);
//         let resData = response?.data;

//         if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
//             // TODO: handel fail to delete role
//             console.log("delete role error", resData);
//         } else {
//             yield put({
//                 type: ACTIONS.DELETE_SUCCESS,
//                 id: action.id,
//             });
//         }
//     } catch (error) {
//         console.log("Delete Role ", error);
//     }
// }

function* watchRole() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createRole);
    yield takeLatest(ACTIONS.FETCH_All_REQUEST, fetchAllRoles);
    yield takeLatest(ACTIONS.FETCH_REQUEST, fetchRole);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateRole);
    // yield takeLatest(ACTIONS.DELETE_REQUEST, deleteRole);
}

// ACTION WATCHER
export default function* roleSaga() {
    yield fork(watchRole);
}
