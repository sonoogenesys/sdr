import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import { showNotification } from "../Utils/CommonFunctions";
import { updateGalleryRequest } from "./Duck/GalleryActions";

const UserModal = ({
                       imageId,
                        gallery,
                        user= {},
                       show = false,
                       updateGallery,
                       handleModal = () => {},
                       loading = false,
                       error = null,
                   }) => {
    const preProps = useRef(loading);
    const [state, setState] = useState({
        isLoading: false,
    });

    useEffect(() => {
        if (state.isLoading && preProps.current?.loading && !loading) {
            if (error) {
                showNotification("error", error?.message);
            } else {
                handleModal();
            }
            setState({ isLoading: false });
        }
        return () => (preProps.current = { loading });
    }, [loading])

    user = gallery[imageId]
    let isActive = user?.active;
    let title = `${isActive ? "Hide" : "Show"} Images`;

    const onDeleteUser = () => {
        setState({ isLoading: true });
        updateGallery({
            _id: imageId,
            active: !isActive,
        });
    };

    const renderFooter = () => {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={() => handleModal()}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onDeleteUser}
                    disabled={state.isLoading}
                >
                    {
                        state.isLoading
                            ? (
                                <>
                                    <span className="spinner-border spinner-border-sm"></span>
                                    <span className="visually-hidden"> Updating...</span>
                                </>
                            )
                            : "Yes"
                    }
                </button>
            </>
        );
    };

    return (
        <BaseModal
            show={show}
            handleClose={handleModal}
            title={title}
            footerComponent={renderFooter}
        >
            Are you sure to {isActive ? "hide" : "show"} this image?
        </BaseModal>
    );
}

const mapStateToProps = (state) => {
    return {
        gallery: state.gallery.gallery,
        loading: state.gallery.loading,
        error: state.gallery.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateGallery: (params) => dispatch(updateGalleryRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
