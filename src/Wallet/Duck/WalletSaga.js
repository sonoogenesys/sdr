import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./WalletActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const getWalletApi = (userId) => {
    let url = userId ? `${APP_URL.WALLET_URL}/${userId}` :  APP_URL.WALLET_URL;
    return axios({
        method: "GET",
        url: url,
    });
};

function* fetchWallet(action) {
    try {
        let response = yield call(getWalletApi, action.payload);
        let resData = response?.data;
        resData.filter = action.payload;

        if (resData?.meta?.success !== true || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: resData.filter ? ACTIONS.FETCH_USER_WALLET_FAIL : ACTIONS.FETCH_WALLET_FAIL,
                payload: resData,
            });
        } else {
            yield put({
                type: resData.filter ? ACTIONS.FETCH_USER_WALLET_SUCCESS : ACTIONS.FETCH_WALLET_SUCCESS,
                payload: resData,
            });
        }
    } catch (error) {
        console.log("get wallet ", error);
    }
}

// const allUsersBankDetailApi = (params) => {
//     return axios({
//         method: "GET",
//         url: APP_URL.BANK_DETAIL_URL,
//         params: params,
//     });
// };

// function* fetchAllUsersBankDetail(action) {
//     try {
//         let response = yield call(allUsersBankDetailApi, action.payload);
//         let resData = response?.data;

//         if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
//             showNotification("error", resData?.meta?.message || resData?.message);
//             yield put({ type: ACTIONS.FETCH_ALL_USERS_BANK_DETAIL_FAIL, payload: resData });
//         } else {
//             resData.isReset = action?.payload?.offset === 0;
//             yield put({ type: ACTIONS.FETCH_ALL_USERS_BANK_DETAIL_SUCCESS, payload: resData });
//         }
//     } catch (error) {
//         console.log("Fetch all bank detail ", error);
//     }
// }

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

        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.VERIFY_BANK_DETAIL_FAIL, payload: resData });
        } else {
            showNotification("success", resData?.meta?.message || resData?.message);
            yield put({ type: ACTIONS.VERIFY_BANK_DETAIL_SUCCESS, payload: resData });
        }
    } catch (error) {
        console.log("verify bank detail ", error);
    }
}

function* watchWallet() {
    yield takeLatest(ACTIONS.FETCH_WALLET_REQUEST, fetchWallet);
    // yield takeLatest(ACTIONS.FETCH_ALL_USERS_BANK_DETAIL_REQUEST, fetchAllUsersBankDetail);
    yield takeLatest(ACTIONS.VERIFY_BANK_DETAIL_REQUEST, verifyBankDetail);
}

// ACTION WATCHER
export default function* walletSaga() {
    yield fork(watchWallet);
}
