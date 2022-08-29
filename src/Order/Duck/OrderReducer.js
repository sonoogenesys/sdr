import ACTIONS from "./OrderActionsType";
import INDIVIDUAL_ACTIONS from "../../IndividualOrder/Duck/IndividualOrderActionsType";
import REPORT_ACTIONS from "../../Reports/Duck/ReportsActionsType";

const initialState = {
    filters: {},
    orders: {},
    boards: {},
    orderList: [],
    meta: {},
    bulk: {
        orders: {},
        list: [],
        meta: {},
        loading: false,
        error: false,
    },
    bulkOrders: {},
    bulkOrderList: [],
    bulkOrderMeta: {},
    loading: false,
    error: false,
    selectedPartners: {},
    selectAll: {},
    codReport: {
        reports: {},
        list: [],
        meta: {},
        loading: false,
        error: null,
    },
    printSelection: [],
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


const orderReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let order_id;
    let mFilter;

    switch (action.type) {
        case ACTIONS.ORDER_PAY_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });

        /** fetch update order start */

        case INDIVIDUAL_ACTIONS.UPDATE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state.orders, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        /** fetch update order end */

        /** remit report orders start */

        case REPORT_ACTIONS.REMIT_REPORT_ORDERS_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state.orders, arrToObjMap(payload?.data)),
            });

        /** remit report orders end */

        /** fetch all order start */

        case ACTIONS.SEARCH_ALL_ORDERS_REQUEST:
        case ACTIONS.FETCH_ALL_ORDERS_REQUEST:
        case ACTIONS.FETCH_ALL_INVOICE_ORDERS_REQUEST:
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

        case ACTIONS.FETCH_ALL_ORDERS_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));
            let orders = payload?.data || [];
            let meta = payload?.meta;
            let order = payload?.isReset ? [] : (state?.boards[mFilter]?.list || []);
            order = [...(order || []), ...getArrOrder(orders)];

            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, arrToObjMap(orders)),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        list: [...new Set(order)],
                        meta: Object.assign({}, state?.boards[mFilter]?.meta, meta),
                        loading: false,
                    }),
                }),
            });

        case ACTIONS.FETCH_ALL_ORDERS_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: action.payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch all order end */

        /** fetch one order start */

        case ACTIONS.FETCH_ORDER_REQUEST:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders, {
                    [payload]: {
                        error: false,
                        loading: true,
                    }
                }),
            });

        case ACTIONS.FETCH_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders, {
                    [payload?._id]: payload?.data,
                }),
            });

        case ACTIONS.FETCH_ORDER_FAIL:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders, {
                    [payload?._id]: {
                        error: payload,
                        loading: false,
                    }
                }),
            });

        /** fetch one order end */

        /** fetch all bulk order start */

        case ACTIONS.FETCH_ALL_BULK_ORDERS_REQUEST:
            return Object.assign({}, state, {
                bulk: Object.assign({}, state.bulk, {
                    loading: true,
                    error: false,
                }),
            });

        case ACTIONS.FETCH_ALL_BULK_ORDERS_SUCCESS:
            let bulkOrders = payload?.data || [];
            let orderList = payload?.isReset ? [] : state.bulk.list;
            orderList = [...(orderList || []), ...getArrOrder(bulkOrders)];

            let mOrders = {};
            bulkOrders.forEach(bo => {
                mOrders = Object.assign({}, mOrders, arrToObjMap(bo?.orders))
            });

            return Object.assign({}, state, {
                orders: Object.assign({}, state.orders, mOrders),
                bulk: Object.assign({}, state.bulk, {
                    orders: Object.assign({}, state.bulk.orders, arrToObjMap(bulkOrders)),
                    list: [...new Set(orderList)],
                    meta: Object.assign({}, state.bulk.meta, payload?.meta),
                    loading: false,
                }),
            });

        case ACTIONS.FETCH_ALL_BULK_ORDERS_FAIL:
            return Object.assign({}, state, {
                bulk: Object.assign({}, state.bulk, {
                    loading: false,
                    error: payload,
                }),
            });

        /** fetch all bulk order end */

        /** fetch one bulk order start */

        case ACTIONS.FETCH_BULK_ORDER_REQUEST:
            return Object.assign({}, state, {
                bulk: Object.assign({}, state.bulk, {
                    orders: Object.assign({}, state.bulk.orders, {
                        [payload]: {
                            error: false,
                            loading: true,
                        }
                    }),
                }),
            });

        case ACTIONS.FETCH_BULK_ORDER_SUCCESS:
            order_id = payload?.data?._id || payload?.data?.id;

            return Object.assign({}, state, {
                orders: Object.assign({}, state.orders, arrToObjMap(payload?.data?.orders || [])),
                bulk: Object.assign({}, state.bulk, {
                    orders: Object.assign({}, state.bulk.orders, {
                        [order_id]: payload?.data,
                    }),
                }),
            });

        case ACTIONS.FETCH_BULK_ORDER_FAIL:
            order_id = payload?._id || payload?.id;
            return Object.assign({}, state, {
                bulk: Object.assign({}, state.bulk, {
                    orders: Object.assign({}, state.bulk.orders, {
                        [order_id]: {
                            error: payload,
                            loading: false,
                        },
                    }),
                }),
            });

        /** fetch one bulk order end */

        /** track order start */

        case ACTIONS.TRACK_ORDER_REQUEST:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: true }),
                }),
            });

        case ACTIONS.TRACK_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.TRACK_ORDER_FAIL:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: false }),
                }),
                error: payload?.meta,
            });

        /** track order end */

        /** cancel order start */

        case ACTIONS.CANCEL_ORDER_REQUEST:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: true }),
                }),
            });

        case ACTIONS.CANCEL_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.CANCEL_ORDER_FAIL:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: false }),
                }),
                error: payload?.meta,
            });

        /** cancel order end */

        /** create rto order start */

        case ACTIONS.CREATE_RTO_ORDER_REQUEST:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: true, isCreateRto: true }),
                }),
            });

        case ACTIONS.CREATE_RTO_ORDER_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state.orders, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.CREATE_RTO_ORDER_FAIL:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: false }),
                }),
                error: payload?.meta,
            });

        /** create rto order end */

        /** fetch all cod reports start */

        // case ACTIONS.FETCH_ALL_COD_REPORTS_REQUEST:
        //     return Object.assign({}, state, {
        //         codReport: Object.assign({}, state.codReport, {
        //             error: null,
        //             loading: true,
        //         }),
        //     });

        // case ACTIONS.FETCH_ALL_COD_REPORTS_SUCCESS:
        //     let reports = payload?.data || [];
        //     let reportList = payload?.isReset ? [] : state.codReport.list;
        //     reportList = [...(reportList || []), ...getArrOrder(reports)];

        //     return Object.assign({}, state, {
        //         codReport: Object.assign({}, state.codReport, {
        //             reports: Object.assign({}, state.codReport.reports || {}, arrToObjMap(reports)),
        //             list: [...new Set(reportList)],
        //             meta: Object.assign({}, state.codReport.meta || {}, payload?.meta || {}),
        //             loading: false,
        //         }),
        //     });

        // case ACTIONS.FETCH_ALL_COD_REPORTS_FAIL:
        //     return Object.assign({}, state, {
        //         codReport: Object.assign({}, state.codReport, {
        //             error: payload?.data,
        //             loading: false,
        //         }),
        //     });

        /** fetch all cod reports end */

        /** select partner start */

        case ACTIONS.SELECT_PARTNER:
            let orderId = action.payload.orderId;
            let selectedPartners = {}
            if (orderId) {
                let partner = action.payload.partner;

                let choosePartner = action.payload.choosePartner;
                if (typeof choosePartner === "undefined") choosePartner = state.selectedPartners[orderId]?.choosePartner;

                selectedPartners = {
                    [orderId]: {
                        partner: partner,
                        choosePartner: choosePartner,
                        isBestPrice: action.payload.isBestPrice,
                        isBestTat: action.payload.isBestTat,
                    },
                }
            }

            let bulkId = action.payload.bulkId;
            let selectAll = {};
            if (bulkId) {
                selectAll = {
                    [bulkId]: action.payload?.selectAll,
                }
            }

            return Object.assign({}, state, {
                selectedPartners: Object.assign({}, state.selectedPartners, selectedPartners),
                selectAll: selectAll,
            });

        /** select partner end */

        /** select order start */

        case ACTIONS.SELECT_ORDER:
            let printSelection = state.printSelection;
            payload.ids = payload?.ids?.filter(id => state.orders[id]?.transaction_id);

            if (payload?.isSelected) {
                printSelection = [...(new Set([...printSelection, ...(payload?.ids || [])]))];
            } else {
                printSelection = printSelection.filter(id => !payload?.ids?.includes(id));
            }

            // if (printSelection.includes(payload)) {
            //     printSelection = printSelection.filter(id => id !== payload);
            // } else {
            //     printSelection = [...(new Set([...printSelection, payload]))];
            // }

            return Object.assign({}, state, {
                printSelection: printSelection,
            });

        /** select order end */

        /** download all invoice orders start */

        /** fetch all order start */

        case ACTIONS.DOWNLOAD_ALL_INVOICE_ORDERS_REQUEST:
            delete payload?.pathname;
            delete payload?.offset;
            delete payload?.limit;

            mFilter = JSON.stringify(Object.assign({}, payload));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        downloading: true,
                    }),
                }),
            });

        case ACTIONS.DOWNLOAD_ALL_INVOICE_ORDERS_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        downloading: false,
                    }),
                }),
            });

        case ACTIONS.FETCH_ALL_ORDERS_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: action.payload,
                        downloading: false,
                    }),
                }),
            });

        /** fetch all order end */

        /** download all invoice orders end */

        /** raise weight dispute start */

        case ACTIONS.RAISE_DISPUTE_REQUEST:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: true }),
                }),
            });

        case ACTIONS.RAISE_DISPUTE_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.RAISE_DISPUTE_FAIL:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: false }),
                }),
                error: payload?.meta,
            });

        /** raise weight dispute end */

        /** weight dispute settle start */

        case ACTIONS.DISPUTE_SETTLE_REQUEST:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: true }),
                }),
            });

        case ACTIONS.DISPUTE_SETTLE_SUCCESS:
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.DISPUTE_SETTLE_FAIL:
            order_id = action?.payload?.order_id;
            return Object.assign({}, state, {
                orders: Object.assign({}, state?.orders || {}, {
                    [order_id]: Object.assign({}, state?.orders[order_id] || {}, { isLoading: false }),
                }),
                error: payload?.meta,
            });

        /** weight dispute settle end */

        default: return state;
    }
};

export default orderReducer;
