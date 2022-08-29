import ACTIONS from "./RoleActionsType";

export const createRoleRequest = (params) => {
    return {
        type: ACTIONS.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllRoleRequest = (params) => {
    return {
        type: ACTIONS.FETCH_All_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const fetchRoleRequest = (id) => {
    return {
        type: ACTIONS.FETCH_REQUEST,
        payload: id,
    };
};

export const updateRoleRequest = (params) => {
    return {
        type: ACTIONS.UPDATE_REQUEST,
        payload: params,
    };
};

export const deleteRoleRequest = (id) => {
    return {
        type: ACTIONS.DELETE_REQUEST,
        id: id,
    };
};
