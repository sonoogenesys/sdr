import React, { useEffect, useRef, useState } from 'react';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

import FilePicker from '../../Utils/FilePicker';

import { showNotification } from '../../Utils/CommonFunctions';
import { uploadFile } from '../Duck/WeightDisputeActions';

const WeightDisputeUpload = ({
    show = false,
    handleClose = () => {},
    ...props
}) => {

    const [state, setState] = useState({
        file: null,
        logistic_id: null,
    });
    const [error, setError] = useState({});

    const preProps = useRef();
    const dispatch = useDispatch();

    const weightDispute = useSelector(state => state?.weightDispute);
    const { loading } = weightDispute || {};

    const loggedInUser = useSelector(state => state.loggedInUser?.data?.data);
    const permissions = loggedInUser?.role?._id?.permissions || {};

    let logistics = useSelector(state => state.logistics?.data);
    const selected_partners = loggedInUser?.selected_partners || [];
    if (!permissions?.showAllOrders && selected_partners?.length > 0) {
        logistics = logistics?.filter(logistic => selected_partners.includes(logistic?._id));
    } else if (loggedInUser?.user_type) {
        const user_type = loggedInUser?.user_type;
        logistics = logistics?.filter(logistic => user_type?._id === logistic?._id);
    }

    const preload = () => {
        if (!show) {
            setState({});
            setError({});
        }

        if (show && preProps.current?.loading && !loading) {
            handleClose && handleClose();
        }
    }

    useEffect(() => {
        preload();

        return () => (preProps.current = { loading });
    }, [show, loading]);

    const onChooseFile = (e) => {
        let file = e?.target?.files[0]
        if(file) {
            let extension = file?.name?.split?.('.')?.[file?.name?.split?.('.')?.length - 1]
            if(extension === 'xls' || extension === 'xlsx') {
                setState(preState => ({ ...preState, file: file }));
            }else{
                showNotification("error", "Upload xls or xlsx format file only!");
            }
        }
    }

    const hasError = () => {
        let logistic_id = "";
        let isErrorHit = false;

        if(!state.logistic_id) {
            logistic_id = "Please select logistic partner";
            isErrorHit = true;
        }

        if(!state.file) {
            showNotification("warning", "Please choose a file!");
            isErrorHit = true;
        }

        setError({
            logistic_id,
        });

        return isErrorHit;
    }

    const onSubmit = () => {
        if (loading) return;
        if (hasError()) return;

        let formData = new FormData();
        formData.set("model_id", 123456789);
        formData.set("onModel", "Order");
        state?.file && formData.set("files", state?.file);
        state?.logistic_id && formData.set("logistic_ids", JSON.stringify([state?.logistic_id]));
        dispatch(uploadFile(formData, state?.logistic_id));
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={true}
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Upload a file</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="courierPartner">
                        Select Logistic Partner
                        <span style={{color:'red'}}>*</span>
                    </label>
                    <select
                        name=""
                        id="courierPartner"
                        className={`form-control ${!!error?.logistic_id && "is-invalid"}`}
                        value={state.logistic_id}
                        onChange={e => {
                            setError({});
                            setState(preState => ({ ...preState, logistic_id: e?.target?.value }));
                        }}
                        disabled={loading}
                    >
                        <option value={""}>Select Logistic Partner</option>
                        {
                            logistics && logistics.map((cp, index) => (
                                <option key={index} value={cp?._id}>{cp?.name}</option>
                            ))
                        }
                    </select>
                    {
                        !!error?.logistic_id &&
                        <div className="invalid-feedback">{error?.logistic_id}</div>
                    }
                </div>

                {
                    show &&
                    <FilePicker
                        file={state.file}
                        onChooseFile={onChooseFile}
                        disabled={loading}
                        acceptInput=".xls, .xlsx"
                    />
                }
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    variant="secondary"
                    onClick={onSubmit}
                    disabled={loading}
                >
                    {
                        loading
                        ? (
                            <>
                                <span className="spinner-border spinner-border-sm"></span>
                                <span className="visually-hidden">  Uploading...</span>
                            </>
                        ) : "Submit"
                    }
                </button>

                <button
                    className="btn btn-secondary"
                    variant="secondary"
                    onClick={handleClose}
                    disabled={loading}
                >Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default WeightDisputeUpload;
