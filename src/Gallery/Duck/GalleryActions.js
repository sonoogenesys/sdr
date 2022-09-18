import ActionsType from "./GalleryActionsType";

export const createGalleryRequest = (params) => {
    return {
        type: ActionsType.CREATE_REQUEST,
        payload: params,
    };
};

export const fetchAllGallerysRequest = (params) => {
    return {
        type: ActionsType.FETCH_ALL_REQUEST,
        payload: {
            ...(params || {}),
            offset: params?.offset || 0,
            limit: params?.limit || 30,
        },
    };
};

export const updateGalleryRequest = (params) => {
    return {
        type: ActionsType.UPDATE_REQUEST,
        payload: params,
    };
};

export const deleteGalleryRequest = (id) => {
    return {
        type: ActionsType.DELETE_REQUEST,
        id: id,
    };
};
