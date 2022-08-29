import ActionsType from "./ReportsActionsType";

export const fetchAllReportsRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_REPORTS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const fetchOneReportRequest = (id) => {
    return {
        type: ActionsType.FETCH_ONE_REPORT_REQUEST,
        payload: id,
    };
};

export const remitOrderRequest = (params = {}) => {
    return {
        type: ActionsType.REMIT_REPORT_ORDERS_REQUEST,
        payload: params,
    };
};