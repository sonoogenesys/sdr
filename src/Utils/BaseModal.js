import React from "react";
import { Modal } from "react-bootstrap";

const BaseModal = ({
    show = false,
    handleClose,
    title = "",
    footerComponent,
    children,
                       dialogClassName,
                       size,
                       closeButton = true,
    style={}
}) => {
    console.log(closeButton)
    return (
        <Modal size={size} show={show} onHide={handleClose}>
            <Modal.Header closeButton={closeButton}>
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
