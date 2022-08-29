import ActionsType from "./WalletActionsType";

export const fetchWalletRequest = (id) => {
    return {
        type: ActionsType.FETCH_WALLET_REQUEST,
        payload: id,
    };
};

export const fetchAllUsersBankDetailRequest = (params = {}) => {
    return {
        type: ActionsType.FETCH_ALL_USERS_BANK_DETAIL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const verifyBankDetailRequest = (params = {}) => {
    return {
        type: ActionsType.VERIFY_BANK_DETAIL_REQUEST,
        payload: params,
    };
};
