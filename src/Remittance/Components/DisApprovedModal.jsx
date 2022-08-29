import React, { useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import TextInput from "../../Utils/TextInput";
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
        remark: "",
        remarkErr: "",
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

    let { remark, remarkErr, isLoading } = state;

    const onSubmit = () => {
        if (remark.length > 0) {
            setState({
                ...state,
                isLoading: true,
            });

            verifyBankDetail && verifyBankDetail({ _id: userId, verify: false, verification_reject: remark });
        } else {
            setState({
                remarkErr: "Please enter reason for disapproval",
            });
        }
    }

    const onClose = () => {
        setState({
            isLoading: false,
            remark: "",
            remarkErr: "",
        });

        handleClose && handleClose();
    }

    const handleChange = (name) => (event) => {
        let value = event?.target?.value;

        setState({
            ...state,
            [name]: value,
            remarkErr: "",
        });
    }

    return (
        <Modal show={show} onHide={onClose} backdrop={'static'}>
            <Modal.Header closeButton>
                <Modal.Title>Reason for Disapproval</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="col-md-12">
                    <TextInput
                        labelText={"Verifier's remark"}
                        style={{ height: 100 }}
                        placeholder={"Enter your comment..."}
                        value={remark}
                        onChange={handleChange("remark")}
                        cols={"3"}
                        isRequired={true}
                        errorText={remarkErr}
                        disabled={isLoading}
                    />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={onClose}
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
                            <span className="visually-hidden"> Saving...</span>
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
