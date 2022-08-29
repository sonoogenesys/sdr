import ACTIONS from './SearchActionsType';

const initialState = {
    data: null,
    loading: false,
    error: false,
}

const searchReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch(action.type){
        case ACTIONS.SEARCH_PARTNER_REQUEST:
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });

        case ACTIONS.SEARCH_PARTNER_SUCCESS:
            return Object.assign({}, state, {
                data: payload?.data,
                loading: false,
            });

        case ACTIONS.SEARCH_PARTNER_FAIL:
            return Object.assign({}, state, {
                error: payload,
                loading: false,
            });

        default: return state;
    }
}

export default searchReducer;
