import ACTIONS from './ProfileActionTypes'

const initialState = {
    data: null,
    loading: false,
    error: null
}

const profileReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch(action.type){
        case ACTIONS.CHANGE_PASSWORD_REQUEST:
        case ACTIONS.ADD_ADDRESS_REQUEST:
        case ACTIONS.GET_LOGGEDIN_USER:
        case ACTIONS.UPDATE_USER_REQUEST:
        case ACTIONS.UPDATE_ADDRESS_REQUEST:
            return Object.assign({}, state, {
                error: false,
                loading: true,
            });

        case ACTIONS.GET_LOGGEDIN_USER_SUCCESS:
        case ACTIONS.ADD_ADDRESS_SUCCESS:
        case ACTIONS.UPDATE_USER_SUCCESS:
        case ACTIONS.UPDATE_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                data: Object.assign({}, state.data, payload),
                loading: false
            });

        case ACTIONS.GET_LOGGEDIN_USER_FAIL:
        case ACTIONS.ADD_ADDRESS_FAIL:
        case ACTIONS.UPDATE_USER_FAIL:
        case ACTIONS.UPDATE_ADDRESS_FAIL:
            return Object.assign({}, state, {
                error: payload,
                loading: false
            });

        default: return state;
    }
}

export default profileReducer;