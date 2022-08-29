import ActionsType from "./IndividualOrderActionsType";

export const getOrderIdRequest = () => {
    return {
        type: ActionsType.GET_ORDER_ID_REQUEST,
    };
};

export const createOrderRequest = (params) => {
    return {
        type: ActionsType.CREATE_ORDER_REQUEST,
        payload: params,
    };
};

export const updateOrderRequest = (params) => {
    return {
        type: ActionsType.UPDATE_ORDER_REQUEST,
        payload: params,
    };
};

export const selectCourierPartner = (params) => {
    return {
        type: ActionsType.SELECTED_COURIER_PARTNER,
        payload: params,
    };
};
