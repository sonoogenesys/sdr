import React from "react";
import Select from 'react-select'

const SelectBox = ({
                       style,
                       containerClassName = "form-group",
                       labelClassName,
                        options = [],
                       labelText = "",
                       inputClassName = "form-control",
                       value = "",
                       placeholder = "",
                       errorClassName = "invalid-feedback",
                       errorText,
                       multiple = false,
                       onChange = (e) => e,
                       disabled = false,
                       isRequired = false,
                       searchable = false
                   }) => {
    let hasError = !!errorText;

    if (!placeholder && labelText) placeholder = `Enter ${labelText}`;

    return (
        <div className={containerClassName} data-title={disabled && value ? value : undefined}>
            {labelText && (
                <label className={labelClassName}>
                    {labelText}{isRequired && !disabled && <span style={{color:'red'}}>*</span>}
                </label>
            )}
            <Select isSearchable={searchable} isMulti={multiple} style={style} value={value} disabled={disabled} onChange={onChange} classname={inputClassName} placeholder={placeholder} options={options}/>

            {hasError && <div className={errorClassName}>{errorText}</div>}
        </div>
    );
};

export default SelectBox;
