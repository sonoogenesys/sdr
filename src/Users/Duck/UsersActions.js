import ActionsType from "./UsersActionsType";

export const createUserRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllCustomersRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_CUSTOMER_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const fetchAllUsersRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updateUserRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deleteUserRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};

export const fetchAllUsersUsageRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_USAGE_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const fetchUserUsageRequest = (id) => {
    return {
        type: ActionsType.FETCH_USER_USAGE_REQUEST,
        payload: {
            user_id: id
        },
    };
};