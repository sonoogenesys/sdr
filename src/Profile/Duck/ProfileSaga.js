import { put, takeLatest, call, fork } from 'redux-saga/effects';
import ACTIONS from './ProfileActionTypes';
import AUTH_ACTIONS from '../../Login/Duck/LoginActionsType';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions';

const getOneUserRequest = (id) => {
    return axios({
        method: 'get',
        url: APP_URL.USERS_URL + `/${id}`,
    })
}

function* getOneUser(action) {
    try {
        let userRes = yield call(getOneUserRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success !== true || userData?.meta?.status !== 200) {
            if (userData?.meta?.status === 404) {
                localStorage.clear();
                yield put({ type: AUTH_ACTIONS.LOGOUT_SUCCESS });
            } else {
                yield put({ type: ACTIONS.GET_LOGGEDIN_USER_FAIL, payload: userData });
            }
        } else {
            yield put({ type: ACTIONS.GET_LOGGEDIN_USER_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error("Get on user error!", error);
    }
}

const updateUserApi = (data) => {
    return axios({
        method: 'PUT',
        url: `${APP_URL.USERS_URL}/${data?._id}`,
        data: data,
    });
}

function* updateUser(action) {
    try {
        let userRes = yield call(updateUserApi, action.payload);
        let userData = userRes.data;
        console.log(userData, 'updateUser')
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.UPDATE_USER_FAIL, payload: userData })
        } else {
            yield put({ type: ACTIONS.UPDATE_USER_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error("update user ", error);
    }
}

const changePasswordApi = (data) => {
    return axios({
        method: 'POST',
        url: APP_URL.RESET_PASSWORD_URL,
        data: data,
    });
}

function* changePassword(action) {
    try {
        let res = yield call(changePasswordApi, action.payload);
        let resData = res.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.UPDATE_USER_FAIL, payload: resData });
        } else {
            localStorage.setItem('jwt', resData?.data?.attributes?.value);
            showNotification("success", resData?.meta?.message || resData?.message);

            delete resData?.data;
            yield put({ type: ACTIONS.UPDATE_USER_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.error("change password ", error);
    }
}


const AddAddressRequest = (data) => {
    return axios({
        method: 'POST',
        url: APP_URL.USERS_PICKUP_ADDRESS,
        data : data
    });
}

function* addAddressAction(action) {
    try {
        let userRes = yield call(AddAddressRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.ADD_ADDRESS_FAIL, payload: userData })
        } else {
            yield put({ type: ACTIONS.ADD_ADDRESS_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error("ADD ADDRESS ", error);
    }
}


const updateAddressRequest = (data) => {
    return axios({
        method: 'PUT',
        url: APP_URL.USERS_UPDATE_PICKUP_ADDRESS,
        data : data
    });
}

function* updateAddressAction(action) {
    try {
        let userRes = yield call(updateAddressRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.UPDATE_ADDRESS_FAIL, payload: userData })
        } else {
            yield put({ type: ACTIONS.UPDATE_ADDRESS_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error("update ADDRESS ", error);
    }
}


// ACTION WATCHER
export default function* profileSaga() {
    yield takeLatest(ACTIONS.GET_LOGGEDIN_USER, getOneUser);
    yield takeLatest(ACTIONS.UPDATE_USER_REQUEST, updateUser);
    yield takeLatest(ACTIONS.CHANGE_PASSWORD_REQUEST, changePassword);
    yield takeLatest(ACTIONS.ADD_ADDRESS_REQUEST, addAddressAction);
    yield takeLatest(ACTIONS.UPDATE_ADDRESS_REQUEST, updateAddressAction);
}
