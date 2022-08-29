import ActionsType from './ProfileActionTypes'

export const getLoggedInUser = (params) => {
    return {
        type: ActionsType.GET_LOGGEDIN_USER,
        payload: params
    }
}

export const updateUser = (params) => {
    return {
        type: ActionsType.UPDATE_USER_REQUEST,
        payload: params
    }
}

export const changePasswordRequest = (params) => {
    return {
        type: ActionsType.CHANGE_PASSWORD_REQUEST,
        payload: params
    }
}


export const AddAddress = (params) => {
    return {
        type: ActionsType.ADD_ADDRESS_REQUEST,
        payload: params
    }
}


export const UpdatePickAddress = (params) => {
    return {
        type: ActionsType.UPDATE_ADDRESS_REQUEST,
        payload: params
    }
}
