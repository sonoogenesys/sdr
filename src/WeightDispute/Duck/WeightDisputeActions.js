import ACTIONS from './WeightDisputeActionTypes'

export const fetchAllWeightDisputeCsvRequest = (params = {}) => {
    return {
        type: ACTIONS.FETCH_ALL_CSV,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const uploadFile = (params = {}, logistic_id) => {
    return {
        type: ACTIONS.UPLOAD_FILE,
        payload: params,
        logistic_id: logistic_id,
    }
}