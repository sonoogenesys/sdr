import ActionsType from "./SearchActionsType";

export const searchPartnerRequest = (params) => {
    return {
        type: ActionsType.SEARCH_PARTNER_REQUEST,
        payload: params,
    };
};
