import React from "react";

const TextInput = ({
    style,
    containerClassName = "form-group",
    labelClassName,
    labelText = "",
    inputClassName = "form-control",
    value = "",
    placeholder = "",
    errorClassName = "invalid-feedback",
    errorText,
    onChange = (e) => e,
    disabled = false,
    disabledStyle,
    isPasswordText = false,
    isRequired = false,
    cols = "",
    autoFocus = false,
    onKeyUp
}) => {
    let inputType = isPasswordText ? "password" : "text";
    let hasError = !!errorText;

    if (!placeholder && labelText) placeholder = `Enter ${labelText}`;

    return (
        <div className={containerClassName} data-title={disabled && value ? value : undefined}>
            {labelText && (
                <label className={labelClassName}>
                    {labelText}{isRequired && !disabled && <span style={{color:'red'}}>*</span>}
                </label>
            )}

            {cols ? (
                <textarea
                    className={`${inputClassName} ${hasError && "is-invalid"}`}
                    style={style}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    cols={cols}
                    autoFocus={autoFocus}
                />
            ) : (
                <input
                    type={inputType}
                    className={`${inputClassName} ${hasError && "is-invalid"}`}
                    style={style}
                    placeholder={placeholder}
                    value={(isPasswordText && disabled) ? '********' : value}
                    onChange={onChange}
                    disabled={disabled}
                    autoFocus={autoFocus}
                    onKeyUp={onKeyUp}
                />
            )}

            {hasError && <div className={errorClassName}>{errorText}</div>}
        </div>
    );
};

export default TextInput;
