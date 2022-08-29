import ACTIONS from "./WalletActionsType";

const initialState = {
    wallets: {},
    data: null,
    transactions: {},
    transactionList: [],
    chart: {
        credit: [],
        debit: [],
    },
    meta: null,
    loading: false,
    error: null,
    remittance: {
        users: {},
        list: [],
        meta: {},
    },
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
    return order ;
};

const filterChartData = (chart = [], filterType) => {
    return [...new Array(12)].map((_, i) => {
        let monthData = {
            total_amount: 0,
            type: filterType,
        };
        let data = chart.find((c) => (filterType === c?.type && (parseInt(c?.month) - 1) === i));
        if (data) monthData = Object.assign({}, monthData, data);

        return monthData;
    });
}

const walletReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter;

    switch (action.type) {
        // case ACTIONS.FETCH_WALLET_REQUEST:
        case ACTIONS.VERIFY_BANK_DETAIL_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });

        case ACTIONS.FETCH_WALLET_SUCCESS:
            return Object.assign({}, state, {
                data: Object.assign({}, state?.data || {}, payload?.data),
                transactions: Object.assign({}, state?.transactions || {}, arrToObjMap(payload?.data?.transactions)),
                transactionList: [...(new Set(getArrOrder(payload?.data?.transactions)))],
                chart: {
                    credit: filterChartData(payload?.data?.chart, "credit"),
                    debit: filterChartData(payload?.data?.chart, "debit"),
                },
                meta: Object.assign({}, state?.meta || {}, payload?.data?.meta || {}),
                loading: false,
            });

        // fetch user wallet start

        case ACTIONS.FETCH_WALLET_REQUEST:
            return Object.assign({}, state,
                payload ? {
                    wallets: Object.assign({}, state.wallets, {
                        [payload]: Object.assign({}, state.wallets[payload], {
                            error: null,
                            loading: true,
                        }),
                    })
                } : {
                    loading: true,
                    error: null,
                }
            );

        case ACTIONS.FETCH_USER_WALLET_SUCCESS:
            mFilter = payload?.filter;

            return Object.assign({}, state, {
                wallets: Object.assign({}, state.wallets, {
                    [mFilter]: Object.assign({}, state.wallets[mFilter], {
                        data: Object.assign({}, state.wallets[mFilter]?.data, payload?.data),
                        transactions: Object.assign({}, state.wallets[mFilter]?.transactions, arrToObjMap(payload?.data?.transactions)),
                        transactionList: [...(new Set(getArrOrder(payload?.data?.transactions)))],
                        chart: {
                            credit: filterChartData(payload?.data?.chart, "credit"),
                            debit: filterChartData(payload?.data?.chart, "debit"),
                        },
                        meta: Object.assign({}, state.wallets[mFilter]?.meta, payload?.data?.meta),
                        loading: false,
                    }),
                })
            });

        case ACTIONS.FETCH_USER_WALLET_FAIL:
            mFilter = payload?.filter;

            return Object.assign({}, state, {
                wallets: Object.assign({}, state.wallets, {
                    [mFilter]: Object.assign({}, state.wallets[mFilter], {
                        error: payload,
                        loading: false,
                    }),
                })
            });

        // fetch user wallet start

        case ACTIONS.VERIFY_BANK_DETAIL_SUCCESS:
            let user = payload?.data || [];

            return Object.assign({}, state, {
                remittance: Object.assign({}, state.remittance, {
                    users: Object.assign({}, state.remittance.users || {}, arrToObjMap([user])),
                }),
                loading: false,
            });

        case ACTIONS.FETCH_WALLET_FAIL:
        case ACTIONS.VERIFY_BANK_DETAIL_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false,
            });

        default:
            return state;
    }
};

export default walletReducer;
