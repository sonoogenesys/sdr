import React from "react";
import { Modal, Button } from "react-bootstrap";
import BaseTable from "../../Utils/BaseTable";

const ValidationPopUp = ({
    show = false,
    handleClose = () => {},
    error = [],
}) => {
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bulk Upload Validation Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BaseTable
                    className="table table-striped table-bordered dt-responsive nowrap action_icons"
                    headingData={["Row No.", "Source", "Destination", "Reason"]}
                    rowData={error}
                    renderRowItem={(item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item?.row_number}</td>
                            <td>{item?.sourcePin || "-"}</td>
                            <td>{item?.destinationPin || "-"}</td>
                            <td>{item?.message}</td>
                        </tr>
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={"btn btn-secondary ml-2"}
                    onClick={handleClose}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ValidationPopUp;
