import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import BaseTable from "../../Utils/BaseTable";

const WeightDisputeErrorPopUp = ({
    show = false,
    handleClose = () => {},
    errors = [],
    logistic_id,
}) => {

    const logistics = useSelector(state => state.logistics?.data);
    const logistic = logistics?.find?.(l => l?._id === logistic_id);

    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={show && errors?.length > 0}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bulk Upload Validation Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <BaseTable
                    id="table-to-xls"
                    className="table table-striped table-bordered dt-responsive nowrap action_icons"
                    headingData={[
                        "Row No.",
                        "AWB Number",
                        "Logistic partner",
                        "Reason"
                    ]}
                    rowData={errors || []}
                    renderRowItem={(item, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item?.row_number}</td>
                            <td>{item?.ewaybill_number || "-"}</td>
                            <td>{logistic?.name || "-"}</td>
                            <td>{item?.message}</td>
                        </tr>
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
                <ReactHTMLTableToExcel
                    id="table-xls-button"
                    className="btn btn-primary"
                    table="table-to-xls"
                    filename={`WeightDisputeUploadCsvError-${moment().format("DD-MM-YY")}`}
                    sheet="tablexls"
                    buttonText="Download as XLS"
                />

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

export default WeightDisputeErrorPopUp;
