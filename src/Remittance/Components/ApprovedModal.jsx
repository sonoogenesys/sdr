import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { verifyAccountsDetails } from "../Duck/RemittanceActions";

const DisApprovedModal = ({
    show = false,
    loading = false,
    error = null,
    handleClose = () => {},
    userId,
    verifyBankDetail = (params) => {},
}) => {
    const preProps = useRef(loading);

    const [state, setState] = useState({
        isLoading: false,
    });

    const preload = () => {
        if (state.isLoading && preProps.current?.loading && !loading) {
            if (!error) {
                handleClose && handleClose();
            }

            setState({ isLoading: false });
        }
    }

    useEffect(() => {
        preload();

        return () => (preProps.current = { loading });
    }, [loading]);

    let { isLoading } = state;

    const onSubmit = () => {
        setState({
            ...state,
            isLoading: true,
        });

        verifyBankDetail && verifyBankDetail({ _id: userId, verify: true });
    }

    const onClose = () => {
        setState({
            isLoading: false,
        });

        handleClose && handleClose();
    }

    return (
        <Modal show={show} onHide={onClose} backdrop={'static'}>
            <Modal.Header closeButton>
                <Modal.Title>Account Approval</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col-md-12">
                        <span style={{fontSize:'15px'}}>
                            Are you sure to approve this account detail?
                        </span>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={onClose}
                    disabled={isLoading}
                >Close</button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={onSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span className="visually-hidden"> Submitting...</span>
                        </>
                    ) : "Submit"}
                </button>
            </Modal.Footer>
        </Modal>

    );
};

const mapStateToProps = (state, ownProps) => {
    let { userId } = ownProps;
    let users = state.remittance?.accounts?.users;
    let user = userId && users && users[userId];

    let loading = user?.loading;
    let error = user?.error;

    return {
        loading: loading,
        error: error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyBankDetail: (params) => dispatch(verifyAccountsDetails(params)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(DisApprovedModal);
