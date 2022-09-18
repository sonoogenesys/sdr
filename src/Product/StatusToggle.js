import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import BaseModal from "../Utils/BaseModal";
import { showNotification } from "../Utils/CommonFunctions";
import { updateProductRequest } from "./Duck/ProductsActions";

const UserModal = ({
           userId,
            product,
            user= {},
           show = false,
           updateProduct,
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

    user = product[userId]
    let isActive = user?.active;
    let title = `${isActive ? "Deactive" : "Active"} User`;

    const onDeleteUser = () => {
        setState({ isLoading: true });
        updateProduct({
            _id: userId,
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
            Are you sure to {isActive ? "deactivate" : "activate"} <b>{user?.name || user?.email}</b> ?
        </BaseModal>
    );
}

const mapStateToProps = (state) => {
    return {
        product: state.product.products,
        loading: state.product.loading,
        error: state.product.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (params) => dispatch(updateProductRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
