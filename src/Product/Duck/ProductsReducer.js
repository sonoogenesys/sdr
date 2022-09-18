import ACTIONS from "./ProductsActionsType";

const initialState = {
    products: {},
    meta: {},
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


const productsReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let productId;

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
            let products = action?.payload?.product || {};

            return Object.assign({}, state, {
                products: Object.assign(
                    {},
                    state?.product || {},
                    arrToObjMap(products)
                ),
                // meta: Object.assign(
                //     {},
                //     state?.meta || {},
                //     action?.payload?.meta || {}
                // ),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                products: Object.assign(
                    {},
                    state?.products || {},
                    arrToObjMap([action?.product])
                ),
                meta: Object.assign({}, state?.meta || {}, {
                    totalCount: (state?.meta?.totalCount || 0) + 1,
                }),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                products: Object.assign(
                    {},
                    state?.products || {},
                    arrToObjMap([action?.product]) || {}
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            productId = action?.id;
            return Object.assign({}, state, {
                products: Object.assign({}, state?.products || {}, {
                    [productId]: undefined,
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

export default productsReducer;
