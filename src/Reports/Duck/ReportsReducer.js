import ACTIONS from "./ReportsActionsType";

const initialState = {
    reports: {},
    dashboard: {},
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


const reportsReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let filter = JSON.stringify(payload?.type || {});
    let order_ids;

    switch (action.type) {
        /** fetch all reports start */

        case ACTIONS.FETCH_ALL_REPORTS_REQUEST:
            return Object.assign({}, state, {
                dashboard: Object.assign({}, state.dashboard, {
                    [filter]: Object.assign({}, state.dashboard && state.dashboard[filter], {
                        error: null,
                        loading: true,
                    }),
                }),
            });

        case ACTIONS.FETCH_ALL_REPORTS_SUCCESS:
            let reports = payload?.data || [];
            let reportList = payload?.isReset ? [] : state.dashboard && state.dashboard[filter]?.list;
            reportList = [...(reportList || []), ...getArrOrder(reports)];

            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, arrToObjMap(reports)),
                dashboard: Object.assign({}, state.dashboard, {
                    [filter]: {
                        list: [...new Set(reportList)],
                        meta: Object.assign({}, state.dashboard && state.dashboard[filter]?.meta, payload?.meta),
                        loading: false,
                    }
                }),
            });

        case ACTIONS.FETCH_ALL_REPORTS_FAIL:
            return Object.assign({}, state, {
                dashboard: Object.assign({}, state.dashboard, {
                    [filter]: Object.assign({}, state.dashboard && state.dashboard[filter], {
                        error: payload?.data,
                        loading: false,
                    }),
                }),
            });

        /** fetch all reports end */

        /** fetch one report start */
        case ACTIONS.FETCH_ONE_REPORT_REQUEST:
            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, {
                    [payload]: Object.assign({}, state.reports[payload], {
                        error: null,
                        loading: true,
                    })
                }),
            });

        case ACTIONS.FETCH_ONE_REPORT_SUCCESS:
            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, {
                    [payload?.data?._id]: payload?.data,
                }),
            });

        case ACTIONS.FETCH_ONE_REPORT_FAIL:
            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, {
                    [payload]: Object.assign({}, state.reports[payload], {
                        error: payload,
                        loading: false,
                    }),
                }),
            });

        /** fetch one report end */

        /** remit report orders start */
        case ACTIONS.REMIT_REPORT_ORDERS_REQUEST:
            order_ids = payload?.report_id && state.reports[payload?.report_id]?.order_ids || [];
            order_ids = order_ids?.map(order =>
                payload?.awb_numbers?.includes(order?.ewaybill_number)
                ? ({
                    ...order,
                    loading: true,
                }) : order
            );

            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, {
                    [payload?.report_id]: Object.assign({}, state.reports[payload?.report_id], {
                        order_ids: order_ids,
                    }),
                }),
            });

        case ACTIONS.REMIT_REPORT_ORDERS_FAIL:
            order_ids = payload?.report_id && state.reports[payload?.report_id]?.order_ids || [];
            order_ids = order_ids?.map(order =>
                payload?.awb_numbers?.includes(order?.ewaybill_number)
                ? ({
                    ...order,
                    loading: false,
                }) : order
            );

            return Object.assign({}, state, {
                reports: Object.assign({}, state.reports, {
                    [payload?.report_id]: Object.assign({}, state.reports[payload?._id], {
                        order_ids: order_ids,
                    }),
                }),
            });

        /** remit report orders end */

        default: return state;
    }
};

export default reportsReducer;
