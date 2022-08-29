import ACTIONS from "./DepartmentActionsType";

const initialState = {
    departments: {},
    departmentOrder: [],
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

const departmentReducer = (state = initialState, action) => {
    let departmentId;
   
    switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
        case ACTIONS.CREATE_REQUEST:
        case ACTIONS.UPDATE_REQUEST:
          
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });

        case ACTIONS.FETCH_SUCCESS:
            let departments = action?.payload?.data || [];
            let meta = action?.payload?.meta || {};
            let order = action?.payload?.isReset ? [] : state?.departmentOrder;

            order = [...(order || []), ...getArrOrder(departments)];

            return Object.assign({}, state, {
                departments: Object.assign(
                    {},
                    state?.departments || {},
                    arrToObjMap(departments)
                ),
                departmentOrder: [...new Set(order)],
                meta: Object.assign({}, state?.meta || {}, meta),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                departments: Object.assign(
                    {},
                    state?.departments || {},
                    arrToObjMap([action?.department])
                ),
                departmentOrder: [
                    ...new Set([
                        ...(getArrOrder([action?.department]) || []),
                        ...(state?.departmentOrder || []),
                    ]),
                ],
                meta: Object.assign({}, state?.meta || {}, {
                    count: (state?.meta?.count || 0) + 1,
                }),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                departments: Object.assign(
                    {},
                    state?.departments || {},
                    arrToObjMap([action?.department])
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            departmentId = action?.id;
            return Object.assign({}, state, {
                departments: Object.assign({}, state?.departments || {}, {
                    [departmentId]: undefined,
                }),
                departmentOrder: state?.departmentOrder?.filter(
                    (id) => id !== departmentId
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

export default departmentReducer;
