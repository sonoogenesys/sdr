import ACTIONS from "./IndividualOrderActionsType";

const initialState = {
    data: null,
    loading: false,
    error: false,
};

const individualOrderReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch (action.type) {
        case ACTIONS.CREATE_ORDER_REQUEST:
        case ACTIONS.UPDATE_ORDER_REQUEST:
            return Object.assign({}, state, {
                data: null,
                loading: true,
                error: false,
            });

        case ACTIONS.CREATE_ORDER_SUCCESS:
        case ACTIONS.UPDATE_ORDER_SUCCESS:
            return Object.assign({}, state, {
                data: payload?.data,
                loading: false,
            });

        case ACTIONS.SELECT_COURIER_PARTNER:
            return Object.assign({}, state, {
                selectedCourierPartner: payload,
            });

        case ACTIONS.CREATE_ORDER_FAIL:
        case ACTIONS.UPDATE_ORDER_FAIL:
            return Object.assign({}, state, {
                loading: false,
                error: payload,
            });
    }

    return state;
};

export default individualOrderReducer;
