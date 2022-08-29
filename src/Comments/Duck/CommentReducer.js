import ACTIONS from './CommentActionTypes'

const initialState = {
    comments: {},
    board: {},
    list: [],
    meta: {},
    loading: false,
    error: null
}

const arrToObjMap = (arr = []) => {
    const obj = arr.reduce((mObj, item) => {
        var key = item?._id || item?.id;
        mObj[key] = item;
        return mObj;
    }, {});

    return Object.assign({}, obj);
};

const getArrOrder = (arr = []) => {
    let order = arr?.map((a) => a?._id || a?.id);
    return order;
};

const commentReducer = (state = initialState, action) => {
    let payload = action?.payload;

    switch(action.type){
        /** fetch all comments start */

        case ACTIONS.FETCH_ALL_REQUEST: {
            return Object.assign({}, state, {
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        error: null,
                        loading: true,
                    }),
                }),
            });
        }

        case ACTIONS.FETCH_ALL_SUCCESS: {
            let comments = payload?.data || [];
            let meta = payload?.meta || {};
            let list = payload?.isReset ? [] : state.board[payload?.model_id].list;
            list = [...(list || []), ...getArrOrder(comments)];

            return Object.assign({}, state, {
                comments: Object.assign({}, state.comments, arrToObjMap(comments)),
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        list: [...new Set(list)],
                        meta: Object.assign({}, state.board[payload?.model_id]?.meta, meta),
                        loading: false,
                    }),
                }),
            });
        }

        case ACTIONS.FETCH_ALL_FAIL: {
            return Object.assign({}, state, {
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        loading: false,
                        error: payload,
                    }),
                }),
            });
        }

        /** fetch all comments end */

        /** create comments start */

        case ACTIONS.CREATE_REQUEST: {
            return Object.assign({}, state, {
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        error: null,
                        loading: true,
                    }),
                }),
            });
        }

        case ACTIONS.CREATE_SUCCESS: {
            let list = state.board[payload?.model_id]?.list || [];

            return Object.assign({}, state, {
                comments: Object.assign({}, state.comments, {
                    [payload?.data?._id]: payload?.data
                }),
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        list: [...new Set([payload?.data?._id, ...list])],
                        meta: Object.assign({}, state.meta, {
                            totalCount: (state.meta?.totalCount || 0) + 1,
                        }),
                        loading: false,
                    })
                }),
            });
        }

        case ACTIONS.CREATE_FAIL: {
            return Object.assign({}, state, {
                board: Object.assign({}, state.board, {
                    [payload?.model_id]: Object.assign({}, state.board[payload?.model_id], {
                        error: payload,
                        loading: false,
                    }),
                }),
            });
        }

        /** create comments end */

        default: return state;
    }
}

export default commentReducer;