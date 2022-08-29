import ACTIONS from './UploadDataActionTypes'

const initialState = {
    data: null,
    loading: false,
    error: null,
    attachments : { }
}


const arrToObjMap = (arr = [], customKey = "_id") => {
    const obj = arr.reduce((mObj, item) => {
        var key =  item[customKey] || item?.id;
        mObj[key] = item;
        return mObj;
    }, {});

    return Object.assign({}, obj);
};

const uploadDataReducer = (state = initialState, action) => {
    switch(action.type){

        case ACTIONS.FETCH_LOGISTIC_REQUEST:
            return Object.assign({}, state, {
                loading: true
            });

        case ACTIONS.FETCH_LOGISTIC_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload,
                loading: false
            });

        case ACTIONS.FETCH_LOGISTIC_FAIL:
            return Object.assign({}, state, {
                error: action.payload,
                loading: false
            });

            case ACTIONS.FETCH_LOGISTIC_PLAN_REQUEST:
                return Object.assign({}, state, {
                    loading: true
                });

            case ACTIONS.FETCH_LOGISTIC_PLAN_SUCCESS:
                let attachments = {};
                let objStore =  Object.assign({},arrToObjMap(action.payload));
                Object.keys(objStore).map((logistic_id)=>{
                    attachments = Object.assign({},attachments, {
                        [logistic_id] : arrToObjMap(objStore[logistic_id].attachments,"plan") 
                    })
                });
                return Object.assign({}, state, {
                    attachments: attachments,
                    loading: false
                });
    
            case ACTIONS.FETCH_LOGISTIC_PLAN_FAIL:
                return Object.assign({}, state, {
                    error: action.payload,
                    loading: false
                });
        default: return state;
    }
}

export default uploadDataReducer;