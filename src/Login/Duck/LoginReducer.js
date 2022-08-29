import ACTIONS from './LoginActionsType';

const initialState = {
    data:   null,
    loading:false,
    error:  false,
}

const loginReducer = (state = initialState, action) => {
    switch(action.type){
        case ACTIONS.SIGN_IN_REQUEST: return {...state, loading:true, error:null};

        case ACTIONS.SIGN_IN_SUCCESS: 
        //STATE WHICH IS CURRENTLY WE ARE HAVING, action.payload IS SOMETHING THAT NEWLY CAME DATA
        return {...state, data:action.payload, loading:false};


        case ACTIONS.SIGN_IN_FAIL: return {...state, loading:false, error:action.payload};
        default: return state;
    }
}

export default loginReducer;
