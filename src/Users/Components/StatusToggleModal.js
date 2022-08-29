import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import BaseModal from "../../Utils/BaseModal";
import { showNotification } from "../../Utils/CommonFunctions";
import { updateUserRequest } from "../Duck/UsersActions";

const UserModal = ({
    userId,
    user = {},
    show = false,
    updateUser,
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

    let isActive = user?.active;
    let title = `${isActive ? "Deactive" : "Active"} User`;

    const onDeleteUser = () => {
        setState({ isLoading: true });
        updateUser({
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
            Are you sure to {isActive ? "deactivate" : "activate"} <b>{user?.first_name || user?.email}</b> ?
        </BaseModal>
    );
}

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps;
    let usersObjMap = state.users.users;
    let user =  userId && usersObjMap && usersObjMap[userId];

    return {
        user: user,
        loading: state.users.loading,
        error: state.users.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: (params) => dispatch(updateUserRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
