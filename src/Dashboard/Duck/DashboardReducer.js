import ACTIONS from "./DashboardActionsType";

const initialState = {
    filters: {},
    boards: {},
};

const dashboardReducer = (state = initialState, action) => {
    let payload = action?.payload;
    let mFilter;

    switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
            let _filter = Object.assign({}, payload);
            let pathname = _filter?.pathname;

            delete payload?.pathname;
            delete _filter?.pathname;
            delete _filter?.offset;
            delete _filter?.limit;

            mFilter = JSON.stringify(Object.assign({}, _filter));

            return Object.assign({}, state, {
                filters: Object.assign({}, state.filters, pathname && { [pathname]: _filter }),
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: null,
                        loading: true,
                    }),
                }),
            });

        case ACTIONS.FETCH_SUCCESS:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        data: payload?.data,
                        meta: Object.assign({}, state?.boards[mFilter]?.meta, payload?.meta),
                        loading: false,
                    }),
                }),
            });

        case ACTIONS.FETCH_FAIL:
            mFilter = JSON.stringify(Object.assign({}, payload?.filter));

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, state.boards[mFilter], {
                        error: action.payload,
                        loading: false,
                    }),
                }),
            });

        case ACTIONS.REFRESH_COUNTER_REQUEST: {
            mFilter = JSON.stringify(Object.assign({}));
            const mBoard = state.boards?.[mFilter];

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, mBoard, {
                        data: Object.assign({}, mBoard?.data, {
                            [payload?.counter_key]: Object.assign({}, mBoard?.data?.[payload?.counter_key], {
                                loading: true,
                            }),
                        }),
                    }),
                }),
            });
        }

        case ACTIONS.REFRESH_COUNTER_SUCCESS: {
            mFilter = JSON.stringify(Object.assign({}));
            const mBoard = state.boards?.[mFilter];

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, mBoard, {
                        data: Object.assign({}, mBoard?.data, payload?.data, {
                            [payload?.counter_key]: Object.assign({}, payload?.data?.[payload?.counter_key], {
                                loading: false,
                            }),
                        }),
                    }),
                }),
            });
        }

        case ACTIONS.REFRESH_COUNTER_FAIL: {
            mFilter = JSON.stringify(Object.assign({}));
            const mBoard = state.boards?.[mFilter];

            return Object.assign({}, state, {
                boards: Object.assign({}, state.boards, {
                    [mFilter]: Object.assign({}, mBoard, {
                        data: Object.assign({}, mBoard?.data, {
                            [payload?.counter_key]: Object.assign({}, mBoard?.data?.[payload?.counter_key], {
                                error: payload,
                                loading: false,
                            }),
                        }),
                    }),
                }),
            });
        }

        default:
            return state;
    }
};

export default dashboardReducer;
