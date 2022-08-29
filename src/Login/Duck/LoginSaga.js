import { put, takeLatest, call, fork } from 'redux-saga/effects';
import ACTIONS from './LoginActionsType';
import APP_URL from '../../Constants/AppUrl'
import axios from 'axios';


    const signInRequest = (data) => {
        console.log('email')
        return axios({
            method: 'post',
            url: APP_URL.SIGN_IN_URL,
            mode: 'cors',
            data: data
        })
    }

    function* signInUser(action) {
        try {
            let userRes = yield call(signInRequest, action.payload);
            let userData = userRes.data;

            if (userData?.meta?.success === false || userData?.meta?.status !== 200) {
                yield put({ type: ACTIONS.SIGN_IN_FAIL, payload: userData })
            } else {
                localStorage.setItem('jwt', userData.data.attributes.value);
                yield put({ type: ACTIONS.SIGN_IN_SUCCESS, payload: userData })
            }
        } catch (error) {
            console.log("sign up user error", error);
        }
    }

    function* clearToken() {
        yield put({ type: ACTIONS.LOGOUT_SUCCESS })
    }

    function* logoutSaga(action) {
        // state will be cleared on logout, so dont need to handle logout in reducer.
        yield call(clearToken);
    }

    function* watchLogIn() {
        put({ type: navigator.onLine ? 'ONLINE' : 'OFFLINE' })
        yield takeLatest(ACTIONS.SIGN_IN_REQUEST, signInUser)
    }

    function* watchLogOut() {
        yield takeLatest(ACTIONS.LOGOUT_REQUEST, logoutSaga)
    }

    // ACTION WATCHER
    export default function* loginSaga() {
        // user can logout without waiting for login action.
        yield fork(watchLogIn);
        yield fork(watchLogOut);

    }
