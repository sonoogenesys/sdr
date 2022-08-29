import ACTIONS from "./ReachUsActionsType";

const initialState = {
    users: {},
    filter: null,
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

const reachUsReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter;

    switch (action.type) {
        /** fetch all reach us users start */

        case ACTIONS.FETCH_ALL_REQUEST:
            let _filter = Object.assign({}, payload);

            delete _filter.offset;
            delete _filter.limit;

            mFilter = JSON.stringify(_filter);

            return Object.assign({}, state, {
                filter: _filter,
                [mFilter]: Object.assign({}, state[mFilter], {
                    error: null,
                    loading: true,
                })
            });

        case ACTIONS.FETCH_ALL_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            let users = payload?.data || [];
            let list = payload?.isReset ? [] : (state[mFilter]?.list || []);
            list = [...list, ...getArrOrder(users)];

            return Object.assign({}, state, {
                users: Object.assign({}, state?.users, arrToObjMap(users)),
                [mFilter]: Object.assign({}, state[mFilter], {
                    list: [...new Set(list)],
                    meta: Object.assign({}, state?.meta, action?.payload?.meta),
                    loading: false,
                })
            });

        case ACTIONS.FETCH_ALL_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                [mFilter]: Object.assign({}, state[mFilter], {
                    error: payload,
                    loading: false,
                })
            });

        /** fetch all reach us users end */

        default:
            return state;
    }
};

export default reachUsReducer;
