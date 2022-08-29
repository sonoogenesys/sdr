import ActionsType from "./OrderActionsType";

export const createBulkOrderRequest = (params) => {
    return {
        type: ActionsType.CREATE_BULK_ORDER_REQUEST,
        payload: params,
    };
};

export const getAllInvoiceOrdersRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_INVOICE_ORDERS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const downloadInvoiceOrdersRequest = (params = {}) => {
    return {
        type: ActionsType.DOWNLOAD_ALL_INVOICE_ORDERS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const searchAllOrderRequest = (params = {}) => {
    return {
        type: ActionsType.SEARCH_ALL_ORDERS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const fetchAllOrderRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_ORDERS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const fetchOrderRequest = (id) => {
    return {
        type: ActionsType.FETCH_ORDER_REQUEST,
        payload: id,
    };
};

export const fetchAllBulkOrderRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_BULK_ORDERS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const fetchBulkOrderRequest = (id) => {
    return {
        type: ActionsType.FETCH_BULK_ORDER_REQUEST,
        payload: id,
    };
};

export const trackOrderRequest = (params) => {
    return {
        type: ActionsType.TRACK_ORDER_REQUEST,
        payload: params,
    };
};

export const cancelOrderRequest = (params = {}) => {
    return {
        type: ActionsType.CANCEL_ORDER_REQUEST,
        payload: params,
    };
};

export const createRtoOrderRequest = (params = {}) => {
    return {
        type: ActionsType.CREATE_RTO_ORDER_REQUEST,
        payload: params,
    };
};

export const orderPayRequest = (params) => {
    return {
        type: ActionsType.ORDER_PAY_REQUEST,
        payload: params,
    };
};

export const selectCourierPartner = (params) => {
    return {
        type: ActionsType.SELECT_PARTNER,
        payload: params,
    };
};

export const selectOrdersRequest = (ids, isSelected = true) => {
    return {
        type: ActionsType.SELECT_ORDER,
        payload: {
            ids,
            isSelected,
        },
    };
};

export const raiseDisputeRequest = (params = {}) => {
    return {
        type: ActionsType.RAISE_DISPUTE_REQUEST,
        payload: params,
    };
};

export const settleDisputeRequest = (params = {}) => {
    return {
        type: ActionsType.DISPUTE_SETTLE_REQUEST,
        payload: params,
    };
};