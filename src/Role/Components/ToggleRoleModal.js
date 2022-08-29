import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import { updateRoleRequest } from "../Duck/RoleActions";

const ToggleRoleModal = ({
    id,
    role = {},
    show = false,
    updateRole,
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
            if (!error) {
                handleModal();
            }

            setState({ isLoading: false });
        }
        return () => (preProps.current = { loading });
    }, [loading])

    let isActive = role?.active;
    let title = `${isActive ? "Deactive" : "Active"} Role`;

    const onToggleRole = () => {
        setState({ isLoading: true });

        updateRole({
            _id: id,
            active: !isActive,
        });
    };

    return (
        <Modal
            show={show}
            onHide={handleModal}
            backdrop={'static'}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure to {isActive ? "deactivate" : "activate"} <b>{role?.name}</b> ?
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={handleModal}
                >Close</button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onToggleRole}
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
            </Modal.Footer>
        </Modal>
    );
}

const mapStateToProps = (state, ownProps) => {
    let { id } = ownProps;
    let role = id && state.role.roles[id];

    return {
        role: role,
        loading: role?.updating,
        error: role?.error,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        updateRole: (params) => dispatch(updateRoleRequest(params)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ToggleRoleModal);
