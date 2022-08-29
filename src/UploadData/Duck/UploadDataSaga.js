import { put, takeLatest, call, fork } from 'redux-saga/effects';
import ACTIONS from './UploadDataActionTypes';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions';

const getAllLogisticsRequest = () => {
    return axios({
        method: 'GET',
        url: APP_URL.LOGISTICS_URL
    });
}

function* getAllLogistics(action) {
    try {
        let userRes = yield call(getAllLogisticsRequest, action.payload);
        let userData = userRes.data;
        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_LOGISTIC_FAIL, payload: userData })
        } else {
            yield put({ type: ACTIONS.FETCH_LOGISTIC_SUCCESS, payload: userData?.data })
        }
    } catch (error) {
        console.error('There is some error while fetching logistic partner!', error);
        showNotification('error', 'There is some error while fetching logistic partner!')
    }
}

const getAllLogisticsPlanRequest = (params) => {
    return axios({
        method: 'GET',
        url: APP_URL.PLAN_INFO_URL,
        params : params
    });
}


function* getAllLogisticsPlan(action) {
    try {
        let userRes = yield call(getAllLogisticsPlanRequest, action.payload);
        let userData = userRes.data;

        if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_LOGISTIC_PLAN_FAIL, payload: userData })
        }
        else {
            yield put({ 
                type: ACTIONS.FETCH_LOGISTIC_PLAN_SUCCESS, 
                payload: userData.data  
            })
        }
    }
    catch (error) {
        console.error('There is some error while fetching logistic partner plan detail!', error);
        showNotification('error', 'There is some error while fetching logistic partner plan detail!')
    }
}


function* uploadDataSaga() { 
    yield takeLatest(ACTIONS.FETCH_LOGISTIC_REQUEST, getAllLogistics);
    yield takeLatest(ACTIONS.FETCH_LOGISTIC_PLAN_REQUEST, getAllLogisticsPlan);
}

// ACTION WATCHER
export default function* planSaga() {
    yield fork(uploadDataSaga);
}


