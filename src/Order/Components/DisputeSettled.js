import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import TextInput from '../../Utils/TextInput';

const DisputeSettled = (props) => {
    const [state, setState] = useState({
        remark: "",
        remarkErr: "",
    });

    let { remark, remarkErr } = state;

    return (
        <Modal
            show={props?.show}
            onHide={props?.handleClose}
            backdrop="static"
            keyboard={true}
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props?.accept ? "Accept" : "Reject"} Weight Dispute</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {
                    props?.accept
                    ? `Are you sure to accept weight dispute AWB Number ${props?.ewaybill_number} order?`
                    : (
                        <TextInput
                            style={{ height: 100 }}
                            labelText={`Please add your rejection remarks for the AWB Number ${props?.ewaybill_number}`}
                            placeholder={"Enter your comment..."}
                            value={remark}
                            onChange={(e) => setState(preState => ({ ...preState, remark: e?.target?.value, remarkErr: "" }))}
                            cols={"3"}
                            isRequired={true}
                            errorText={remarkErr}
                        />
                    )
                }

            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-primary"
                    variant="secondary"
                    onClick={() =>  {
                        if (props?.accept || remark?.trim?.()) {
                            props?.settleDispute?.({ remark: remark?.trim?.() });
                            props?.handleClose?.();
                        } else {
                            setState(preState => ({ ...preState, remarkErr: "Please enter reason for reject" }))
                        }
                    }}
                >{props?.accept ? "Yes" : "Save"}</button>

                <button
                    className="btn btn-secondary"
                    variant="secondary"
                    onClick={props?.handleClose}
                >Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default DisputeSettled;
