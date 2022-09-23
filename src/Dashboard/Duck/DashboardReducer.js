import ACTIONS from "./DashboardActionsType";

const initialState = {
    dashboard: {},
};

const dashboardReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
            return Object.assign({}, state, {
                dashboard: Object.assign({}, state.dashboard),
            });

        case ACTIONS.FETCH_SUCCESS:
            return Object.assign({}, state, {
                dashboard: Object.assign({}, state.dashboard,  payload?.dashboard),
            });

        case ACTIONS.FETCH_FAIL:
            return Object.assign({}, state, {
                dashboard: Object.assign({}, state.dashboard),
            });
        default:
            return state;
    }
};

export default dashboardReducer;
