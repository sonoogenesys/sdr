import { put, takeLatest, call, fork } from "redux-saga/effects";
import APP_URL from "../../Constants/AppUrl";
import ACTIONS from "./GalleryActionsType";
import axios from "axios";
import { showNotification } from "../../Utils/CommonFunctions";

const createGalleryApi = (data) => {
    return axios({
        method: "POST",
        url: APP_URL.GALLERY_URL,
        data: data,
    });
};

function* createGallery(action) {
    try {
        let response = yield call(createGalleryApi, action.payload);
        let resData = response?.data;
        if (resData?.success === false) {
            showNotification("error", resData?.message || resData?.message);
            yield put({
                type: ACTIONS.CREATE_FAIL,
                payload: resData,
            });
        } else {
            showNotification("success", resData?.message);
            yield put({
                type: ACTIONS.CREATE_SUCCESS,
                gallery: resData.gallery,
            });
        }
    } catch (error) {
        console.log("Create Gallery ", error);
    }
}

const fetchAllGallerysApi = (params) => {
    return axios({
        method: "GET",
        url: APP_URL.GALLERY_URL,
        params: params,
    });
};

function* fetchAllGallerys(action) {
    try {
        let response = yield call(fetchAllGallerysApi, action.payload);
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
        console.log("Fetch Gallerys ", error);
    }
}


const updateGalleryApi = (data) => {
    return axios({
        method: "PUT",
        url: `${APP_URL.GALLERY_URL}/${data?._id}`,
        data: data,
    });
};

function* updateGallery(action) {
    try {
        let response = yield call(updateGalleryApi, action.payload);
        let resData = response?.data;
        console.log(resData, 'GalleryRes')
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
                gallery: resData?.gallery,
            });
        }
    } catch (error) {
        console.log("Update Gallery ", error);
    }
}

const deleteGalleryApi = (id) => {
    return axios({
        method: "DELETE",
        url: `${APP_URL.GALLERY_URL}/${id}`,
    });
};

function* deleteGallery(action) {
    try {
        let response = yield call(deleteGalleryApi, action.id);
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
        console.log("Delete Gallery ", error);
    }
}

function* watchGallerys() {
    yield takeLatest(ACTIONS.CREATE_REQUEST, createGallery);
    yield takeLatest(ACTIONS.FETCH_ALL_REQUEST, fetchAllGallerys);
    yield takeLatest(ACTIONS.UPDATE_REQUEST, updateGallery);
    yield takeLatest(ACTIONS.DELETE_REQUEST, deleteGallery);

}

// ACTION WATCHER
export default function* gallerySaga() {
    yield fork(watchGallerys);
}
