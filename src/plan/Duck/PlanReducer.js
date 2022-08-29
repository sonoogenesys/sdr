import ACTIONS from "./PlanActionsType";

const initialState = {
    plans: {},
    planOrder: [],
    meta: {},
    loading: false,
    error: null,
};

const arrToObjMap = (arr = []) => {
    
    const obj = arr.reduce((mObj, item) => {
        var key = item?._id || item?.id;
        mObj[key] = item;
        return mObj;
    }, {});

    return Object.assign({}, obj);
};

const getArrOrder = (arr = []) => {
    let order = arr?.map((a) => a?._id || a?.id);
    return order;
};

const planReducer = (state = initialState, action) => {
    let planId;

    switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
        case ACTIONS.CREATE_REQUEST:
        case ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });
          
        case ACTIONS.FETCH_SUCCESS:
            let plans = action?.payload?.data || [];
            let meta = action?.payload?.meta || {};
            let order = action?.payload?.isReset ? [] : state?.planOrder;
            
            order = [...(order || []), ...getArrOrder(plans)];

            return Object.assign({}, state, {
                plans: Object.assign(
                    {},
                    state?.plans || {},
                    arrToObjMap(plans)
                ),
                planOrder: [...new Set(order)],
                meta: Object.assign({}, state?.meta || {}, meta),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                plans: Object.assign(
                    {},
                    state?.plans || {},
                    arrToObjMap([action?.plan])
                ),
                planOrder: [
                    ...new Set([
                        ...(getArrOrder([action?.plan]) || []),
                        ...(state?.planOrder || []),
                    ]),
                ],
                meta: Object.assign({}, state?.meta || {}, {
                    count: (state?.meta?.count || 0) + 1,
                }),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                plans: Object.assign(
                    {},
                    state?.plans || {},
                    arrToObjMap([action?.plan])
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            planId = action?.id;
            return Object.assign({}, state, {
                plans: Object.assign({}, state?.plans || {}, {
                    [planId]: undefined,
                }),
                planOrder: state?.planOrder?.filter(
                    (id) => id !== planId
                ),
            });

        case ACTIONS.CREATE_FAIL:
        case ACTIONS.FETCH_FAIL:
        case ACTIONS.UPDATE_FAIL:
        case ACTIONS.DELETE_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: action.payload,
            });

        default:
            return state;
    }
};

export default planReducer;
