import ActionsType from "./InvoiceActionsType";

export const createInvoiceRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllInvoiceRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updateInvoiceRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deleteInvoiceRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};
