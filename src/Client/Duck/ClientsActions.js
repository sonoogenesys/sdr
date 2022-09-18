import ActionsType from "./ClientsActionsType";

export const createClientRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllClientsRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updateClientRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deleteClientRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};
