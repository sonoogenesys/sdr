import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./PlanActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createPlanApi = (attributes) => {
    return axios({
        method: "POST",
        url: APP_URL.PLAN_URL,
        data : attributes
    });
};

function* createPlan(action) {
    try {
        let response = yield call(createPlanApi, action.payload);
        let resData = response?.data;
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
       
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                plan: resData.data,
            });
        }
    } catch (error) {
        console.log("Create Department ", error);
    }
}

const fetchPlanApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.PLANS_URL,
        params: params,
    });
};

function* fetchPlans(action) {
    try {
        let response = yield call(fetchPlanApi, action.payload);
        let resData = response?.data;
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
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
        console.log("Fetch Plans ", error);
    }
}

const updatePlanApi = (attributes) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.PLAN_URL}/${attributes?.id}`,
        data: attributes
    });
};

function* updatePlan(action) {
    try {
        let response = yield call(updatePlanApi, action.payload);
        let resData = response?.data;
    
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.UPDATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.UPDATE_SUCCESS,
                plan: resData.data,
            });
        }
    } catch (error) {
        console.log("Update Department ", error);
    }
}

const deletePlanApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.PLAN_URL}/${id}`,
    });
};

function* deletePlan(action) {
    try {
        let response = yield call(deletePlanApi, action.id);
        let resData = response?.data;
        if (resData?.meta?.success === false || resData?.meta?.status !== 200) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.DELETE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.meta?.message);
            yield put({
                type: ACTIONS.DELETE_SUCCESS,
                id: resData?.data?.id,
            });
        }
    } catch (error) {
        console.log("Delete Department ", error);
    }
}

function* watchPlan() { 
    yield takeLatest(ACTIONS.CREATE_REQUEST, createPlan);
    yield takeLatest(ACTIONS.FETCH_REQUEST, fetchPlans);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updatePlan);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deletePlan);
}

// ACTION WATCHER
export default function* planSaga() {
    yield fork(watchPlan);
}
