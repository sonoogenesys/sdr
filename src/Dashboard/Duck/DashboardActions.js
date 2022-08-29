import ActionsType from "./DashboardActionsType";

export const fetchDashboardRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_REQUEST,
        payload: params,
    };
};

export const refreshRequest = (params = {}) => {
    return {
        type: ActionsType.REFRESH_COUNTER_REQUEST,
        payload: params,
    };
};
