import ActionsType from "./PlanActionsType";

export const createPlanRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};


export const fetchPlanRequest = (params) => {
    return {
        type: ActionsType.FETCH_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updatePlanRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deletePlanRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};
