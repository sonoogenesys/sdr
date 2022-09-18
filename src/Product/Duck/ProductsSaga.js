import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./ProductsActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createProductApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.PRODUCT_URL,
        data: data,
    });
};

function* createProduct(action) {
    try {
        let response = yield call(createProductApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.meta?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                product: resData.product,
            });
        }
    } catch (error) {
        console.log("Create Product ", error);
    }
}

const fetchAllProductsApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.PRODUCT_URL,
        params: params,
    });
};

function* fetchAllProducts(action) {
    try {
        let response = yield call(fetchAllProductsApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.message);
            yield put({
                type: ACTIONS.FETCH_ALL_FAIL,
                payload: resData,
            });
        } else {
            let payload = resData || {};
            payload.isReset = action?.payload?.offset === 0;
            yield put({
                type: ACTIONS.FETCH_ALL_SUCCESS,
                payload: payload,
            });
        }
    } catch (error) {
        console.log("Fetch Products ", error);
    }
}


const updateProductApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.PRODUCT_URL}/${data?._id}`,
        data: data,
    });
};

function* updateProduct(action) {
    try {
        let response = yield call(updateProductApi, action.payload);
        let resData = response?.data;
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
                product: resData?.product,
            });
        }
    } catch (error) {
        console.log("Update Product ", error);
    }
}

const deleteProductApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.PRODUCT_URL}/${id}`,
    });
};

function* deleteProduct(action) {
    try {
        let response = yield call(deleteProductApi, action.id);
        let resData = response?.data;

        if (resData?.success === false) {
            yield put({
                type: ACTIONS.DELETE_FAIL,
                payload: resData,
            });
        } else {
            yield put({
                type: ACTIONS.UPDATE_SUCCESS,
                id: action.id,
            });
        }
    } catch (error) {
        console.log("Delete Product ", error);
    }
}

function* watchProducts() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createProduct);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllProducts);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateProduct);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteProduct);

}

// ACTION WATCHER
export default function* productsSaga() {
    yield fork(watchProducts);
}
