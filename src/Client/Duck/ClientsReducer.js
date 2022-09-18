import ACTIONS from "./ClientsActionsType";

const initialState = {
    filters: {},
    clients: {},
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


const clientsReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let clientId;
    let mFilter;

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
            let clients = action?.payload?.clients || {};

            return Object.assign({}, state, {
                clients: Object.assign(
                    {},
                    state?.clients || {},
                    arrToObjMap(clients)
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
                clients: Object.assign(
                    {},
                    state?.clients || {},
                    arrToObjMap([action?.client])
                ),
                meta: Object.assign({}, state?.meta || {}, {
                    totalCount: (state?.meta?.totalCount || 0) + 1,
                }),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                clients: Object.assign(
                    {},
                    state?.clients || {},
                    arrToObjMap([action?.client]) || {}
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            clientId = action?.id;
            return Object.assign({}, state, {
                clients: Object.assign({}, state?.clients || {}, {
                    [clientId]: undefined,
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

export default clientsReducer;
