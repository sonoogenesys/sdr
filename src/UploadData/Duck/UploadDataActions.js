import ActionsType from './UploadDataActionTypes'

export const fetchLogistics = (params) => {
    return {
        type: ActionsType.FETCH_LOGISTIC_REQUEST,
        payload: params
    }
}

export const fetchLogisticsPlan = (params) => {
    return {
        type: ActionsType.FETCH_LOGISTIC_PLAN_REQUEST,
        payload: params
    }
}