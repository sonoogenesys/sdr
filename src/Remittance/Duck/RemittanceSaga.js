import { put, takeLatest, call } from 'redux-saga/effects';
import ACTIONS from './RemittanceActionTypes';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions';

const getAllRemittanceRequest = (params) => {
    return axios({
        method: 'GET',
        url: APP_URL.REMITTANCE_URL,
        params: params,
    });
}

const uploadFileRequest = (data) => {
    return axios({
        method: 'POST',
        url: APP_URL.REMITTANCE_URL+'/upload_file',
        data
    });
}

const updateStatusRequest = (data) => {
    return axios({
        method: 'PUT',
        url: APP_URL.REMITTANCE_URL+'/task/'+data._id,
        data
    });
}

function* getAllRemittance(action) {
    try {
        let userRes = yield call(getAllRemittanceRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_REMITTANCE_FAIL, payload: userData })
        } else {
            yield put({ type: ACTIONS.FETCH_ALL_REMITTANCE_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error('There is some error while fetching remittance list!', error);
        showNotification('error', 'There is some error while fetching remittance list!')
    }
}

function* uploadFile(action) {
    try {
        let userRes = yield call(uploadFileRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.UPLOAD_FILE_FAILURE, payload: userData })
        } else {
            yield put({ type: ACTIONS.UPLOAD_FILE_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error('There is some error while uploading a file!', error);
        showNotification('error', 'There is some error while uploading a file!')
    }
}

function* updateStatus(action) {
    try {
        let userRes = yield call(updateStatusRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.UPDATE_STATUS_FAILURE, payload: userData })
        } else {
            yield put({ type: ACTIONS.UPDATE_STATUS_SUCCESS, payload: userData })
        }
    } catch (error) {
        console.error('There is some error while updating an order!', error);
        showNotification('error', 'There is some error while updating an order!')
    }
}

const allUsersBankDetailApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.BANK_DETAIL_URL,
        params: params,
    });
};

function* fetchAllAccountDetail(action) {
    try {
        let response = yield call(allUsersBankDetailApi, action.payload);
        let resData = response?.data;

        resData.filter = Object.assign({}, action.payload);
        delete resData?.filter?.offset;
        delete resData?.filter?.limit;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_ACCOUNTS_FAIL, payload: resData });
        } else {
            resData.isReset = (action?.payload?.offset === 0);
            yield put({ type: ACTIONS.FETCH_ACCOUNTS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("Fetch all bank detail ", error);
    }
}

const verifyBankDetailApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.BANK_DETAIL_URL}/verify/${data._id}`,
        data: data,
    });
};

function* verifyBankDetail(action) {
    try {
        let response = yield call(verifyBankDetailApi, action.payload);
        let resData = response?.data;
        resData.user_id = action?.payload?._id;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.VERIFY_ACCOUNTS_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.VERIFY_ACCOUNTS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("verify bank detail ", error);
    }
}

const updateBankDetailApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.USERS_URL}/${data._id}`,
        data: data,
    });
};

function* updateBankDetail(action) {
    try {
        let response = yield call(updateBankDetailApi, action.payload);
        let resData = response?.data;
        resData.user_id = action?.payload?._id;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.UPDATE_ACCOUNTS_FAIL, payload: resData });
        } else {
            yield put({ type: ACTIONS.UPDATE_ACCOUNTS_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("verify bank detail ", error);
    }
}


// ACTION WATCHER
export default function* remittanceSaga() {
    yield takeLatest(ACTIONS.FETCH_ALL_REMITTANCE_REQUEST, getAllRemittance);
    yield takeLatest(ACTIONS.UPLOAD_FILE_REQUEST, uploadFile);
    yield takeLatest(ACTIONS.UPDATE_STATUS_REQUEST, updateStatus);
    yield takeLatest(ACTIONS.FETCH_ACCOUNTS_REQUEST, fetchAllAccountDetail);
    yield takeLatest(ACTIONS.VERIFY_ACCOUNTS_REQUEST, verifyBankDetail);
    yield takeLatest(ACTIONS.UPDATE_ACCOUNTS_REQUEST, updateBankDetail);
}
