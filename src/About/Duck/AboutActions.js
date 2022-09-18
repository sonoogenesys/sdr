import ActionsType from "./AboutActionsType";


export const fetchAboutRequest = (params) => {
    return {
        type: ActionsType.FETCH_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updateAboutRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

