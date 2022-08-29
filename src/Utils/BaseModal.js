import React from "react";
import { Modal } from "react-bootstrap";

const BaseModal = ({
    show = false,
    handleClose,
    title = "",
    footerComponent,
    children,
}) => {
    return (
        <Modal show={show} onHide={handleClose} backdrop={'static'}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>{children}</Modal.Body>

            {!!footerComponent && (
                <Modal.Footer>{footerComponent()}</Modal.Footer>
            )}
        </Modal>
    );
};

export default BaseModal;
