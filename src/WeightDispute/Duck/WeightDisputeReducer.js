import ACTIONS from './WeightDisputeActionTypes'

const initialState = {
    files: {},
    boards: {},
    filters: {},
    loading: false,
    error: null,
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

const weightDisputeReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter = JSON.stringify({});

    switch(action.type){

        /** fetch all weight dispute csv start */

        case ACTIONS.FETCH_ALL_CSV: {
            let _filter = Object.assign({}, payload);
            const pathname = _filter?.pathname;

            delete payload?.pathname;
            delete _filter?.pathname;
            delete _filter?.offset;
            delete _filter?.limit;

            mFilter = JSON.stringify(Object.assign({}, _filter));

            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, pathname && { [pathname]: _filter }),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        loading: true,
                        error: null,
                    }),
                }),
            });
        }

        case ACTIONS.FETCH_ALL_CSV_SUCCESS: {
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));
            let files = payload?.data || [];
            let meta = payload?.meta;
            let order = payload?.isReset ? [] : (state?.boards[mFilter]?.list || []);
            order = [...(order || []), ...getArrOrder(files)];

            return Object.assign({}, state, {
                files: Object.assign({}, state?.files || {}, arrToObjMap(files)),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        list: [...new Set(order)],
                        meta: Object.assign({}, state?.boards[mFilter]?.meta, meta),
                        loading: false,
                    }),
                }),
            });
        }

        case ACTIONS.FETCH_ALL_CSV_FAIL: {
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: action.payload,
                        loading: false,
                    }),
                }),
            });
        }

        /** fetch all weight dispute csv end */

        /** upload weight dispute csv start */

        case ACTIONS.UPLOAD_FILE: {
            return Object.assign({}, state, {
                loading: true,
                error: null,
            });
        }

        case ACTIONS.UPLOAD_FILE_SUCCESS: {
            const file = payload?.data || {};

            let order = state?.boards?.[mFilter]?.list || [];
            order = [file?._id, ...(order || [])];

            return Object.assign({}, state, {
                files: Object.assign({}, state?.files, {
                    [file?._id]: file,
                }),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state?.boards?.[mFilter], {
                        list: [...new Set(order)],
                        meta: Object.assign({}, state?.boards?.[mFilter]?.meta, {
                            total_count: ((state?.boards?.[mFilter]?.meta?.total_count || 0)  + 1),
                        }),
                    }),
                }),
                error: payload,
                loading: false,
            });
        }

        case ACTIONS.UPLOAD_FILE_FAILURE: {
            return Object.assign({}, state, {
                loading: false,
                error: payload,
            });
        }

        /** upload weight dispute csv end */

        default: return state;
    }
}

export default weightDisputeReducer;