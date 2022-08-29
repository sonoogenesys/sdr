import ACTIONS from "./UsersActionsType";

const initialState = {
    filters: {},
    users: {},
    customerList: [],
    userOrder: [],
    meta: {},
    loading: false,
    error: null,
    usages: {},
    usageBoards: {},
    usagesDetails: {},
    usageDetailsBoards: {},
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

const usersReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let userId;
    let mFilter;

    switch (action.type) {
        case ACTIONS.CREATE_REQUEST:
        case ACTIONS.FETCH_ALL_REQUEST:
        case ACTIONS.FETCH_ALL_CUSTOMER_REQUEST:
        case ACTIONS.FETCH_REQUEST:
        case ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });

        case ACTIONS.FETCH_ALL_CUSTOMER_SUCCESS:
            return Object.assign({}, state, {
                users: Object.assign({}, state.users || {}, arrToObjMap(payload?.data)),
                customerList: [...new Set(getArrOrder(payload?.data))],
                loading: false,
            });

        case ACTIONS.FETCH_ALL_SUCCESS:
            let users = action?.payload?.data || [];
            let order = action?.payload?.isReset ? [] : state?.userOrder;
            order = [...order, ...getArrOrder(users)];

            return Object.assign({}, state, {
                users: Object.assign(
                    {},
                    state?.users || {},
                    arrToObjMap(users)
                ),
                userOrder: [...new Set(order)],
                meta: Object.assign(
                    {},
                    state?.meta || {},
                    action?.payload?.meta || {}
                ),
                loading: false,
            });

        case ACTIONS.CREATE_SUCCESS:
            return Object.assign({}, state, {
                users: Object.assign(
                    {},
                    state?.users || {},
                    arrToObjMap([action?.user])
                ),
                userOrder: [
                    ...new Set([
                        ...(getArrOrder([action?.user]) || []),
                        ...(state?.userOrder || []),
                    ]),
                ],
                meta: Object.assign({}, state?.meta || {}, {
                    totalCount: (state?.meta?.totalCount || 0) + 1,
                }),
                loading: false,
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                users: Object.assign(
                    {},
                    state?.users || {},
                    arrToObjMap([action?.user]) || {}
                ),
                loading: false,
            });

        case ACTIONS.DELETE_REQUEST:
        case ACTIONS.DELETE_SUCCESS:
            userId = action?.id;
            return Object.assign({}, state, {
                users: Object.assign({}, state?.users || {}, {
                    [userId]: undefined,
                }),
                userOrder: state?.userOrder?.filter((id) => id !== userId),
            });

        case ACTIONS.CREATE_FAIL:
        case ACTIONS.FETCH_FAIL:
        case ACTIONS.FETCH_ALL_CUSTOMER_FAIL:
        case ACTIONS.UPDATE_FAIL:
        case ACTIONS.DELETE_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false,
            });

        /** fetch user usage start */

        case ACTIONS.FETCH_ALL_USAGE_REQUEST:
            let _filter = Object.assign({}, payload);
            let pathname = _filter?.pathname;

            delete payload?.pathname;
            delete _filter?.pathname;
            delete _filter?.offset;
            delete _filter?.limit;

            mFilter = JSON.stringify(Object.assign({}, _filter));

            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, pathname && { [pathname]: _filter }),
                usageBoards: Object.assign({}, state.usageBoards, {
                    [mFilter]: Object.assign({}, state.usageBoards[mFilter], {
                        loading: true,
                        error: null,
                    }),
                }),
            });

        case ACTIONS.FETCH_ALL_USAGE_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));
            let usages = payload?.data || [];
            let meta = payload?.meta;
            let list = payload?.isReset ? [] : (state.usageBoards[mFilter]?.list || []);
            list = [...(list || []), ...getArrOrder(usages)];

            return Object.assign({}, state, {
                usages: Object.assign({}, state.usages, arrToObjMap(usages)),
                usageBoards: Object.assign({}, state.usageBoards, {
                    [mFilter]: Object.assign({}, state.usageBoards[mFilter], {
                        list: [...new Set(list)],
                        meta: Object.assign({}, state.usageBoards[mFilter]?.meta, meta),
                        loading: false,
                    }),
                }),
            });

        case ACTIONS.FETCH_ALL_USAGE_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                usageBoards: Object.assign({}, state.usageBoards, {
                    [mFilter]: Object.assign({}, state.usageBoards[mFilter], {
                        error: action.payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch user usage end */

        /** fetch user usage details start */

        case ACTIONS.FETCH_USER_USAGE_REQUEST:
            return Object.assign({}, state, {
                usages: Object.assign({}, state.usages, {
                    [payload?.user_id]: Object.assign({}, state.usages[payload?.user_id], {
                        loading: true,
                        error: null,
                    }),
                }),
            });

        case ACTIONS.FETCH_USER_USAGE_SUCCESS:
            return Object.assign({}, state, {
                usages: Object.assign({}, state.usages, arrToObjMap(payload?.data)),
            });

        case ACTIONS.FETCH_USER_USAGE_FAIL:
            return Object.assign({}, state, {
                usageBoards: Object.assign({}, state.usageBoards, {
                    [payload?.user_id]: Object.assign({}, state.usageBoards[payload?.user_id], {
                        error: action.payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch user usage details end */

        default:
            return state;
    }
};

export default usersReducer;
