import React from 'react'
import Tippy from '@tippyjs/react';

const FilePicker = ({
    label = "",
    file,
    isRequired = false,
    acceptInput = "",
    disabled,
    onChooseFile = (file) => file,
}) => {
    return (
        <div className="form-group">
            {
                !!label &&
                <label htmlFor="">
                    {label} {isRequired && <span style={{color:'red'}}>*</span>}
                </label>
            }

            <div className="upload_remittance position-relative">
                <input
                    type="file"
                    accept={acceptInput}
                    onChange={onChooseFile}
                    disabled={disabled}
                />

                <div className="upload_banner pt-2 pb-2">
                    <span>
                        <i
                            className="fa fa-upload"
                            aria-hidden="true"
                        />
                    </span>

                    <p className="mb-0">
                        Choose file
                    </p>
                </div>

                {
                    file &&
                    <div className='mt-3' style={{ whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                        <Tippy content={file?.name || file?.filename}>
                            <span>
                                <i className="fa fa-file-image" style={{ fontSize:18 }} aria-hidden="true"></i>
                                <span style={{fontSize:16, marginLeft:8}}>{file?.name || file?.filename}</span>
                            </span>
                        </Tippy>
                    </div>
                }
            </div>
        </div>
    );
}

export default FilePicker;