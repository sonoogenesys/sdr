

import React from 'react';
import BaseModal from '../../Utils/BaseModal';

const RemittanceUpload = ({
    show = false,
    handleClose = () => {},
    logistics = [],
    ...props
}) => {
    return (
        <BaseModal
            show={show}
            title={'Upload a file'}
            handleClose={handleClose}
        >
            <div className="row">
                <div className="col-md-12">
                    <form
                        className="needs-validation"
                        noValidate
                    >
                        <div className="row">
                            {/* <div className="col-md-12 form-group">
                                <label htmlFor="courierPartner">
                                    Select courier partner
                                    <span style={{color:'red'}}>*</span>
                                </label>
                                <select
                                    name=""
                                    id="courierPartner"
                                    className={`form-control ${!!props?.courierErr && "is-invalid"}`}
                                    value={props.selectedCourierPartner}
                                    onChange={props.selectCourierPartner}
                                    disabled={props.onLoad}
                                >
                                    <option value={""}>Select Courier Partner</option>
                                    {
                                        logistics && logistics.map((cp, index) => (
                                            <option key={index} value={cp?._id}>{cp?.name}</option>
                                        ))
                                    }
                                </select>
                                {
                                    !!props?.courierErr &&
                                    <div className="invalid-feedback">{props?.courierErr}</div>
                                }
                            </div> */}

                            <div className="col-md-12">
                                <div className="upload_img">
                                    <div className="file_upload">
                                        <input
                                            type="file"
                                            className="fileupload"
                                            name="fileupload"
                                            accept=".xls, .xlsx, .csv"
                                            onChange={props.fileUpload}
                                            disabled={props.onLoad}
                                        />
                                    </div>
                                    <div className={`upload_banner m-auto ${!!props?.fileErr && "is-invalid"}`}>
                                        <span>
                                            <i
                                                className="fa fa-upload"
                                                aria-hidden="true"
                                            ></i>
                                        </span>
                                        <p>Choose file</p>
                                    </div>
                                    {
                                        !!props?.fileErr &&
                                        <div className="invalid-feedback" style={{textAlign:'center'}}>{props?.fileErr}</div>
                                    }
                                    {
                                        props?.file &&
                                        <div className='mt-2' style={{textAlign:'center'}}>
                                            <span>
                                                <i className="fa fa-file-excel" style={{fontSize:18}} aria-hidden="true"></i>
                                                <span style={{fontSize:16, marginLeft:8}}>{props?.file?.name}</span>
                                            </span>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12 text-center mt-2">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={props.handleSubmit}
                                    disabled={props.onLoad}
                                >
                                    {
                                        props.onLoad
                                        ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm"></span>
                                                <span className="visually-hidden">  Uploading...</span>
                                            </>
                                        ) : "Submit"
                                    }
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary ml-2"
                                    onClick={handleClose}
                                    disabled={props.onLoad}
                                >
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

export default RemittanceUpload
