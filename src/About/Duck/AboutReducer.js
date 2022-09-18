import ACTIONS from "./AboutActionsType";

const initialState = {
    about: {},
    loading: false,
    error: null
};


const aboutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
        case ACTIONS.UPDATE_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });


        case ACTIONS.FETCH_SUCCESS:
            let about = action?.payload?.about || [];

            return Object.assign({}, state, {
                about: about,
                loading: false,
            });


        case ACTIONS.UPDATE_SUCCESS:
            return Object.assign({}, state, {
                about: action?.about,
                loading: false,
            });

        case ACTIONS.FETCH_FAIL:
        case ACTIONS.UPDATE_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false,
            });

        default:
            return state;
    }
};

export default aboutReducer;
