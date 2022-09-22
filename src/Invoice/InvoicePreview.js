import React from 'react';
import BaseModal from "../Utils/BaseModal";
import TableComponent from "./tableComponent";

class InvoicePreview extends React.Component {
    state = {
        isLoading: false
    }

    onClickClose = () => {
        this.handleModal(false, true, null)
        // this.setState({show: false})
    }

    renderFooter = () => {
        let { userId } = this.props;
        let { isLoading } = this.state;

        return (
            <>
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={this.onClickClose}
                >
                    Close
                </button>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.onClickSave}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm"></span>
                            <span className="visually-hidden"> Saving...</span>
                        </>
                    ) : !userId ? (
                        "Generate Invoice"
                    ) : (
                        "Save changes"
                    )}
                </button>
            </>
        );
    };

    render() {
        let {show} = this.state;

        return (
            <BaseModal
                show={true}
                size={"xl"}
                // dialogClassName="modal-90w"
                handleClose={this.onClickClose}
                title={"Invoice Preview"}
                footerComponent={this.renderFooter}
            >

                {/*<TableComponent invoice={this.props.invoice}/>*/}

            </BaseModal>
        )
    }
}

export default InvoicePreview;