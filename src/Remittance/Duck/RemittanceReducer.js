import ACTIONS from './RemittanceActionTypes'

const initialState = {
    remittance: {},
    orderList:[],
    meta: {},
    loading: false,
    error: null,
    accounts: {
        users: {},
        filter: "",
    },
}

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

const remittanceReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter;

    switch(action.type){

        case ACTIONS.UPDATE_STATUS_REQUEST:
        case ACTIONS.UPLOAD_FILE_REQUEST:
        case ACTIONS.FETCH_ALL_REMITTANCE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null
            });

        case ACTIONS.FETCH_ALL_REMITTANCE_SUCCESS:
            let remittance = action?.payload?.data || [];
            let meta = action?.payload?.meta || {};
            let order = action?.payload?.isReset ? [] : state?.orderList;
            order = [...(order || []), ...getArrOrder(remittance)];

            return Object.assign({}, state, {
                remittance: Object.assign(
                    {},
                    state?.remittance || {},
                    arrToObjMap(remittance)
                ),
                orderList: [...new Set(order)],
                meta: Object.assign({}, state?.meta || {}, meta),
                loading: false,
            });

        case ACTIONS.UPLOAD_FILE_SUCCESS:
            return Object.assign({}, state, {
                remittance: Object.assign(
                    {},
                    state?.remittance,
                    {[action?.payload?.data?._id] : action?.payload?.data}
                    // arrToObjMap([action?.payload?.data])
                ),
                orderList: [action?.payload?.data?._id, ...state.orderList],
                meta: Object.assign({}, state?.meta, {totalCount: state?.meta?.totalCount+1}),
                loading: false,
            });

        case ACTIONS.UPDATE_STATUS_SUCCESS:
            return Object.assign({}, state, {
                remittance: Object.assign(
                    {},
                    state?.remittance,
                    {[action?.payload?.data?._id] : action?.payload?.data}
                ),
                loading: false,
            });

        case ACTIONS.UPDATE_STATUS_FAILURE:
        case ACTIONS.UPLOAD_FILE_FAILURE:
        case ACTIONS.FETCH_ALL_REMITTANCE_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false
            });

        // fetch account start

        case ACTIONS.FETCH_ACCOUNTS_REQUEST:
            let _filter = Object.assign({}, payload);

            delete _filter?.offset;
            delete _filter?.limit;

            mFilter = JSON.stringify(Object.assign({}, _filter));

            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    filter: mFilter,
                    [mFilter]: Object.assign({}, state.accounts[mFilter], {
                        loading: true,
                        error: false,
                    }),
                })
            });

        case ACTIONS.FETCH_ACCOUNTS_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            let users = payload?.data || [];
            let list = payload?.isReset ? [] : (state.remittance[mFilter] && state.remittance[mFilter]?.list || []);
            list = [...list, ...getArrOrder(users)];


            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users || {}, arrToObjMap(users)),
                    filter: mFilter,
                    [mFilter]: Object.assign({}, state.accounts[mFilter], {
                        list: [...new Set(list)],
                        meta: Object.assign({}, state.remittance.meta || {}, payload?.meta || {}),
                        loading: false,
                    }),
                })
            });

        case ACTIONS.FETCH_ACCOUNTS_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            delete payload?.filter;

            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    filter: mFilter,
                    [mFilter]: Object.assign({}, state.accounts[mFilter], {
                        error: payload,
                        loading: false,
                    }),
                })
            });

        // fetch account end

        /** verify account start  */

        case ACTIONS.VERIFY_ACCOUNTS_REQUEST:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?._id]: Object.assign({}, state.accounts.users[payload?._id], {
                            error: null,
                            loading: true,
                        }),
                    }),
                }),
            });

        case ACTIONS.VERIFY_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?.data?._id]: payload?.data,
                    }),
                }),
            });

        case ACTIONS.VERIFY_ACCOUNTS_FAIL:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?.user_id]: Object.assign({}, state.accounts.users[payload?.user_id], {
                            error: payload,
                            loading: false,
                        }),
                    }),
                }),
            });

        /** verify account end  */

        /** update account start  */

        case ACTIONS.UPDATE_ACCOUNTS_REQUEST:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?._id]: Object.assign({}, state.accounts.users[payload?._id], {
                            error: null,
                            loading: true,
                        }),
                    }),
                }),
            });

        case ACTIONS.UPDATE_ACCOUNTS_SUCCESS:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?.data?._id]: payload?.data,
                    }),
                }),
            });

        case ACTIONS.UPDATE_ACCOUNTS_FAIL:
            return Object.assign({}, state, {
                accounts: Object.assign({}, state.accounts, {
                    users: Object.assign({}, state.accounts.users, {
                        [payload?.user_id]: Object.assign({}, state.accounts.users[payload?.user_id], {
                            error: payload,
                            loading: false,
                        }),
                    }),
                }),
            });

        /** update account end  */

        default: return state;
    }
}

export default remittanceReducer;