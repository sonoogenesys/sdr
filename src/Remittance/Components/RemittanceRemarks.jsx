import React from 'react';
import BaseModal from '../../Utils/BaseModal';
import moment from 'moment'

const RemittanceRemarks = ({
    show = false,
    handleClose = () => {},
    ...props
}) => {
    return (
            <BaseModal
                show={show}
                title={'Remarks'}
                handleClose={handleClose}
            >
                <div className="row">
                    <div className="col-md-12">
                        <form
                            className="needs-validation"
                            noValidate
                        >
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12 form-group">
                                    <div className='row'>
                                        <div className="col-xl-6">
                                            <strong>
                                                AWB Number
                                            </strong>
                                            <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                                                {props.activeOrder?.awb_number}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <strong>Amount Remitted</strong>
                                            <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                                                {parseFloat(props?.activeOrder?.remittance_amount).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className='row'>
                                        <div className="col-xl-6">
                                            <strong>
                                                COD Amount
                                            </strong>
                                            <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                                                {parseFloat(props?.activeOrder?.cod_amount).toFixed(2)}
                                            </div>
                                        </div>
                                        <div className="col-xl-6">
                                            <strong>Delivery Date</strong>
                                            <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                                                {moment(props?.activeOrder?.delivery_date).format('DD MMM YYYY')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className='row'>
                                        <div className="col-xl-6">
                                            <strong>
                                                Case
                                            </strong>
                                            <div className='mt-1' style={{color: '#a06e0f',fontWeight: 500,fontSize: '14px'}}>
                                                {props?.activeOrder?.status === 'completed' && <span className='greenColor'>Match</span>}
                                                {props?.activeOrder?.status !== 'completed' && <span className='redColor'>Mismatch</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                props?.activeOrder?.status !== 'completed' &&
                                    <div className="col-md-12 form-group">
                                        <div className="col-md-12 form-group">
                                            <div className='row'>
                                                <div className='col-xl-12'>
                                                    <strong>Add Remarks</strong>
                                                    <div className='mt-2'>
                                                        <textarea className={`form-control ${!!props?.remarksErr && "is-invalid"}`} onChange={props.handleRemarks} value={props.remarks} placeholder="Enter remarks here" rows="3"></textarea>
                                                        {
                                                            !!props?.remarksErr && <div className="invalid-feedback">{props?.remarksErr}</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            }
                            {
                                props?.activeOrder?.status === 'completed' && props?.activeOrder?.reason &&
                                <div className="col-md-12 form-group">
                                    <div className="col-md-12 form-group">
                                        <div className='row'>
                                            <div className='col-xl-12'>
                                                <strong>Added Remarks</strong>
                                                <div className='mt-2 redColor font-weight-bold' style={{fontSize:'15px'}}>
                                                    {props?.activeOrder?.reason}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="col-md-12 form-group text-center">
                                {
                                    props?.activeOrder?.status !== 'completed' && props?.activeOrder?.remittance_amount !== props?.activeOrder?.cod_amount &&
                                        <button type="button" className="btn btn-primary" onClick={props.handleSubmit}>
                                            Submit
                                        </button>
                                }
                                <button type="button" className="btn btn-secondary ml-2" onClick={handleClose}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </BaseModal>

    )
}

export default RemittanceRemarks
