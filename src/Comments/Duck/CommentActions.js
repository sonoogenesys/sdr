import ActionsType from './CommentActionTypes'

export const fetchComments = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    }
}

export const postComment = (params = {}) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    }
}