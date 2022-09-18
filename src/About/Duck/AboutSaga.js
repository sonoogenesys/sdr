import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./AboutActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const fetchAboutsApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.ABOUT_URL,
        params: params,
    });
};

function* fetchAbouts(action) {
    try {
        let response = yield call(fetchAboutsApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.message);
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
        console.log("Fetch abouts ", error);
    }
}


const updateAboutApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.ABOUT_URL}/${data?._id}`,
        data: data,
    });
};

function* updateAbout(action) {
    try {
        let response = yield call(updateAboutApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'aboutRes')
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
                about: resData?.about,
            });
        }
    } catch (error) {
        console.log("Update about ", error);
    }
}

function* watchabouts() {
    yield takeLatest(ACTIONS.FETCH_REQUEST, fetchAbouts);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateAbout);

}

// ACTION WATCHER
export default function* aboutSaga() {
    yield fork(watchabouts);
}
