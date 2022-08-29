import ACTIONS from './RemittanceActionTypes'

export const fetchAllRemittanceRequest = (params = {}) => {
    return {
        type: ACTIONS.FETCH_ALL_REMITTANCE_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const uploadFile = (params = {}) => {
    return {
        type: ACTIONS.UPLOAD_FILE_REQUEST,
        payload: params
    }
}

export const updateStatus = (params = {}) => {
    return {
        type: ACTIONS.UPDATE_STATUS_REQUEST,
        payload: params
    }
}

export const fetchAllAccountsDetails = (params = {}) => {
    return {
        type: ACTIONS.FETCH_ACCOUNTS_REQUEST,
        payload: {
            ...params,
            offset: params?.offset || 0,
            limit: params?.limit || 100,
        },
    };
};

export const verifyAccountsDetails = (params = {}) => {
    return {
        type: ACTIONS.VERIFY_ACCOUNTS_REQUEST,
        payload: params,
    };
};

export const updateAccountsDetails = (params = {}) => {
    return {
        type: ACTIONS.UPDATE_ACCOUNTS_REQUEST,
        payload: params,
    };
};