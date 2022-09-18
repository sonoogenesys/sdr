import ACTIONS from "./GalleryActionsType";

const initialState = {
    gallery: {},
    loading: false,
    error: null
};

const arrToObjMap = (arr = []) => {
    const obj = arr.reduce((mObj, item) => {
        let key = item?._id || item?.id;
        mObj[key] = item;
        return mObj;
    }, {});

    return Object.assign({}, obj);
};


const galleryReducer = (state = initialState, action) => {
    let galleryId;

    switch (action.type) {
        case ACTIONS.CREATE_REQUEST:
        case ACTIONS.FETCH_ALL_REQUEST:
        case ACTIONS.FETCH_REQUEST:
        case ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });


        case ACTIONS.FETCH_ALL_SUCCESS:
            let gallery = action?.payload?.gallery || [];

            return Object.assign({}, state, {
                gallery: Object.assign(
                    {},
                    state?.gallery || {},
                    arrToObjMap(gallery)
                ),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                gallery: Object.assign(
                    {},
                    state?.gallery || {},
                    arrToObjMap([action?.gallery])
                ),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                gallery: Object.assign(
                    {},
                    state?.gallery || {},
                    arrToObjMap([action?.gallery]) || {}
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            galleryId = action?.id;
            return Object.assign({}, state, {
                gallery: Object.assign({}, state?.gallery || {}, {
                    [galleryId]: undefined,
                })
            });

        case ACTIONS.CREATE_FAIL:
        case ACTIONS.FETCH_FAIL:
        case ACTIONS.UPDATE_FAIL:
        case ACTIONS.DELETE_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false,
            });

        default:
            return state;
    }
};

export default galleryReducer;
