import ActionsType from "./PurchaseActionsType";

export const createPurchaseRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllPurchaseRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updatePurchaseRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deletePurchaseRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};
