import ACTIONS from "./PurchaseActionsType";

const initialState = {
    purchase: {},
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


const purchaseReducer = (state = initialState, action) => {
    let purchaseId;

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
            let purchase = action?.payload?.purchase || [];

            return Object.assign({}, state, {
                purchase: Object.assign(
                    {},
                    state?.purchase || {},
                    arrToObjMap(purchase)
                ),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                purchase: Object.assign(
                    {},
                    state?.purchase || {},
                    arrToObjMap([action?.purchase])
                ),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                purchase: Object.assign(
                    {},
                    state?.purchase || {},
                    arrToObjMap([action?.purchase]) || {}
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            purchaseId = action?.id;
            return Object.assign({}, state, {
                purchase: Object.assign({}, state?.purchase || {}, {
                    [purchaseId]: undefined,
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

export default purchaseReducer;
