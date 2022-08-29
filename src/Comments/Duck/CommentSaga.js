import { put, takeLatest, call, fork } from 'redux-saga/effects';
import ACTIONS from './CommentActionTypes';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions';

const getAllCommentsApi = (params) => {
    return axios({
        method: 'GET',
        url: APP_URL.COMMENTS_URL,
        params: params,
    });
}

function* getAllComments(action) {
    try {
        let response = yield call(getAllCommentsApi, action.payload);
        let resData = response.data;
        resData.model_id = action?.payload?.model_id;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            yield put({ type: ACTIONS.FETCH_ALL_FAIL, payload: resData })
        } else {
            resData.isReset = action.payload?.offset === 0;
            yield put({ type: ACTIONS.FETCH_ALL_SUCCESS, payload: resData })
        }
    } catch (error) {
        console.error("Get all comments ", error);
    }
}

const createCommentApi = (data) => {
    return axios({
        method: 'POST',
        url: APP_URL.COMMENTS_URL,
        data: { data: data },
    });
}

function* createComment(action) {
    try {
        let response = yield call(createCommentApi, action.payload);
        let resData = response.data;
        resData.model_id = action?.payload?.model_id;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.CREATE_FAIL, payload: resData })
        } else {
            yield put({ type: ACTIONS.CREATE_SUCCESS, payload: resData })
        }
    } catch (error) {
        console.error("create comment ", error);
    }
}

function* watchOrder() {
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, getAllComments);
    yield takeLatest(ACTIONS.CREATE_REQUEST, createComment);
}

// ACTION WATCHER
export default function* commentSaga() {
    yield fork(watchOrder);
}
