import React from 'react';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

const WeightDisputeDetails = (props) => {
    const order = props?.order || {};
    const weight_dispute = order?.weight_dispute;

    const {
        length = 0,
        breadth = 0,
        height = 0,
    } = order?.product_details || {};

    let weight = Number(order?.product_details?.weight || 0);
    const vol_weight = (Number(length) * Number(breadth) * Number(height)) / 5000;
    if (weight < vol_weight) {
        weight = vol_weight;
    }

    const changed_weight = Number(weight_dispute?.changed_weight) || 0;

    return (
        <Modal
            show={props?.show}
            onHide={props?.onHide}
            backdrop="static"
            keyboard={true}
            animation={true}
        >
            <Modal.Header closeButton>
                <Modal.Title>Weight Dispute Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="row">
                    <div className="col-xl-6 form-group">
                        <strong>
                            AWB Number
                        </strong>
                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {order?.ewaybill_number}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Client Name
                        </strong>
                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {order?.created_by?.first_name} {order?.created_by?.last_name}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Client Manifested Weight (KG)
                        </strong>
                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {parseFloat(weight).toFixed(2)}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Measured Weight (KG)
                        </strong>

                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {parseFloat(changed_weight).toFixed(2)}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Charged Date & Time
                        </strong>

                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {weight_dispute?.transaction_id ? moment(weight_dispute?.transaction_id?.created_at).format("D MMM YYYY, h:mm:ss a") : "-"}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Additional Charge Deducted from Wallet
                        </strong>

                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {weight_dispute?.transaction_id ? parseFloat(weight_dispute?.transaction_id?.total).toFixed(2) : "-"}
                        </div>
                    </div>

                    <div className="col-xl-6 form-group">
                        <strong>
                            Delivery Partner
                        </strong>

                        <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {order?.courier_name || "-"}
                        </div>
                    </div>

                    <div className="col-md-12 form-group">
                        <strong>
                            Remark
                        </strong>

                        <div className='mt-1 redColor' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                            {weight_dispute?.remark}
                        </div>
                    </div>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <button
                    className="btn btn-secondary"
                    variant="secondary"
                    onClick={props?.onHide}
                >Close</button>
            </Modal.Footer>
        </Modal>
    )
}

export default WeightDisputeDetails;
