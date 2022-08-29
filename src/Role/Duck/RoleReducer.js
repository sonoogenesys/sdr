import ACTIONS from "./RoleActionsType";

const initialState = {
    roles: {},
    boards: {},
    filters: {},
    // roleOrder: [],
    // meta: {},
    // loading: false,
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

const roleReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter;

    switch (action.type) {
        /** create role start */

        case ACTIONS.CREATE_REQUEST:
            mFilter = JSON.stringify({});

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: null,
                        creating: true,
                    }),
                }),
            });

        case ACTIONS.CREATE_SUCCESS:
            mFilter = JSON.stringify({});

            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?.data?._id]: payload?.data
                }),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        list: [...new Set([...(state?.boards[mFilter]?.list || []), payload?.data?._id])],
                        meta: Object.assign({}, state.boards[mFilter]?.meta, {
                            totalCount: (state.boards[mFilter]?.meta?.totalCount || 0) + 1
                        }),
                        creating: false,
                    }),
                }),
            });

        case ACTIONS.CREATE_FAIL:
            mFilter = JSON.stringify({});

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: payload,
                        creating: false,
                    }),
                }),
            });

        /** create role end */

        /** fetch all roles start */

        case ACTIONS.FETCH_All_REQUEST:
            let _filter = Object.assign({}, payload);
            let pathname = _filter?.pathname;

            delete payload?.pathname;
            delete _filter?.pathname;
            delete _filter?.offset;
            delete _filter?.limit;

            mFilter = JSON.stringify(Object.assign({}, _filter));

            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, pathname && { [pathname]: _filter }),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        loading: true,
                        error: null,
                    }),
                }),
            });

        case ACTIONS.FETCH_All_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            let meta = payload?.meta;
            let list = payload?.isReset ? [] : (state?.boards[mFilter]?.list || []);
            list = [...(list || []), ...getArrOrder(payload?.data)];

            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, arrToObjMap(payload?.data)),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        list: [...new Set(list)],
                        meta: Object.assign({}, state.boards[mFilter]?.meta, meta),
                        loading: false,
                    }),
                }),
            });

        case ACTIONS.FETCH_All_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch all roles end */

        /** fetch one role start */

        case ACTIONS.FETCH_REQUEST:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload]: Object.assign({}, state.roles[payload], {
                        error: null,
                        loading: true,
                    }),
                }),
            });

        case ACTIONS.FETCH_SUCCESS:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.FETCH_FAIL:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?.role_id]: Object.assign({}, state.roles[payload?.role_id], {
                        error: payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch one role end */

        /** update role start */

        case ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?._id]: Object.assign({}, state.roles[payload?._id], {
                        error: null,
                        updating: true,
                    }),
                }),
            });

        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.UPDATE_FAIL:
            return Object.assign({}, state, {
                roles: Object.assign({}, state.roles, {
                    [payload?.role_id]: Object.assign({}, state.roles[payload?.role_id], {
                        error: payload,
                        updating: false,
                    }),
                }),
            });

        /** update role end */

        default:
            return state;
    }
};

export default roleReducer;
