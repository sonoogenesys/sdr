import { put, takeLatest, call, fork } from 'redux-saga/effects';
import ACTIONS from './SearchActionsType';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';
import { showNotification } from '../../Utils/CommonFunctions'

const searchPartnerApi = (params) => {
    return axios({
        method: 'GET',
        url: APP_URL.GET_METRIC_URL,
        params: params,
    });
}

function* searchPartner(action) {
    try {
        let response = yield call(searchPartnerApi, action.payload);
        let resData = response.data;

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.SEARCH_PARTNER_FAIL, payload: resData })
        } else {
            yield put({ type: ACTIONS.SEARCH_PARTNER_SUCCESS, payload: resData })
        }
    } catch (error) {
        console.log("search partner ", error);
    }
}

function* watchSearch() {
    yield takeLatest(ACTIONS.SEARCH_PARTNER_REQUEST, searchPartner);
}

// ACTION WATCHER
export default function* searchSaga() {
    yield fork(watchSearch);
}
