import ActionsType from "./LoginActionsType";


//PARAM IS THE WE ARE SUPPOSED TO SEND TO THE SERVER THEY ALSO CALLED ACTION CREATOR
export const signInRequest = (params) => {
    return {
        type: ActionsType.SIGN_IN_REQUEST,
        payload: params,
    };
}

export const logOut = () => {
    return {
        type: ActionsType.LOGOUT_SUCCESS
    }
}