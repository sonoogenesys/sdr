import { put, takeLatest, call } from 'redux-saga/effects';
import ACTIONS from './WeightDisputeActionTypes';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions';

const getAllWeightDisputeCsvRequest = (params) => {
    return axios({
        method: 'GET',
        url: `${APP_URL.WEIGHT_DISPUTE_URL}/csv`,
        params: params,
    });
}

function* getAllWeightDisputeCsv(action) {
    try {
        let response = yield call(getAllWeightDisputeCsvRequest, action.payload);
        let resData = response.data;

        resData.pathname = action.payload?.pathname;
        delete action?.payload?.pathname;

        resData.filter = Object.assign({}, action.payload);
        delete resData.filter?.limit;
        delete resData.filter?.offset;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_CSV_FAIL, payload: resData });
        } else {
            resData.isReset = (action?.payload?.offset || 0) === 0;
            yield put({ type: ACTIONS.FETCH_ALL_CSV_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.error('There is some error while fetching remittance list!', error);
        showNotification('error', 'There is some error while fetching remittance list!');
    }
}

const uploadFileRequest = (data) => {
    return axios({
        method: 'POST',
        url: `${APP_URL.WEIGHT_DISPUTE_URL}/upload_csv`,
        data,
    });
}

function* uploadFile(action) {
    try {
        let response = yield call(uploadFileRequest, action.payload);
        let resData = response.data;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            resData.logistic_id = action?.logistic_id
            yield put({ type: ACTIONS.UPLOAD_FILE_FAILURE, payload: resData });
            showNotification("error", resData?.meta?.message);
        } else {
            yield put({ type: ACTIONS.UPLOAD_FILE_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.error('There is some error while uploading a file!', error);
        showNotification('error', 'There is some error while uploading a file!');
    }
}

// ACTION WATCHER
export default function* remittanceSaga() {
    yield takeLatest(ACTIONS.FETCH_ALL_CSV, getAllWeightDisputeCsv);
    yield takeLatest(ACTIONS.UPLOAD_FILE, uploadFile);
}
