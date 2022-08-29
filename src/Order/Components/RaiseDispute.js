import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import FilePicker from '../../Utils/FilePicker';

import { raiseDisputeRequest } from "../Duck/OrderActions";
import { showNotification } from "../../Utils/CommonFunctions";

const RaiseDispute = (props) => {
    const [state, setState] = useState({
        file: null,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (!props?.show) {
            setState({});
        }
    }, [props?.show])

    const onChooseFile = (event) => {
        let file = event?.target?.files?.[0];

        if(file) {
            let extension = file?.name?.split?.('.')?.[file?.name?.split?.('.')?.length - 1];
            extension = extension?.toLowerCase?.();

            if(extension === 'pdf' || extension === 'png' ||  extension === 'jpeg' ||  extension === 'jpg') {
                setState({ file });
            } else {
                showNotification("error", "Upload pdf, png, jpeg or jpg format file only!");
            }
        }
    }

    const onOk = () => {
        if (state.file) {
            let formData = new FormData();
            formData.set("model_id", props?.orderId);
            formData.set("onModel", "RaiseDispute");
            formData.set("files", state?.file);

            let params = {
                _id: props?.orderId,
                data: formData,
            };

            dispatch(raiseDisputeRequest(params));
            props?.onHide?.()
        } else {
            showNotification("warning", "Please choose a file!");
        }
    }

    return (
        <Modal
            show={props?.show}
            onHide={props?.onHide}
            backdrop="static"
            keyboard={true}
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Raise Dispute</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FilePicker
                    label={`References Or Supporting Document`}
                    file={state.file}
                    onChooseFile={onChooseFile}
                    isRequired
                />

                Are you sure to raise weight dispute AWB Number {props?.ewaybill_number} order?
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    variant="secondary"
                    onClick={onOk}
                >Yes</button>

                <button
                    className="btn btn-secondary"
                    variant="secondary"
                    onClick={props?.onHide}
                >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default RaiseDispute
