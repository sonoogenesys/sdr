import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./ReachUsActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const fetchAllReachUsUsersApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.FEEDBACKS_URL,
        params: params,
    });
};

function* fetchAllReachUsUsers(action) {
    try {
        let response = yield call(fetchAllReachUsUsersApi, action.payload);
        let resData = response?.data;
        resData.filter = Object.assign({}, action?.payload);

        delete resData?.filter?.offset;
        delete resData?.filter?.limit;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.FETCH_ALL_FAIL, payload: resData });
        } else {
            resData.isReset = action?.payload?.offset === 0;
            yield put({type: ACTIONS.FETCH_ALL_SUCCESS, payload: resData,});
        }
    } catch (error) {
        console.log("fetch reach us users ", error);
    }
}

function* watchUsers() {
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllReachUsUsers);
}

// ACTION WATCHER
export default function* reachUsSaga() {
    yield fork(watchUsers);
}
