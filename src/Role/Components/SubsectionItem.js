import React from 'react'
import Switch from "react-switch";
import { connect } from 'react-redux';

const SubsectionItem = ({
    section = {},
    handleChange,
}) => {

    const onChange = (name) => (value) => {
        if (name === "show" && !value) {
            Object.keys(section)
            .map(s => {
                if (typeof section[s] === "boolean") {
                    section[s] = false;
                }
            });
        }

        handleChange && handleChange({...section, [name]: value});
    }

    return (
        <>
            <tr>
                <td>{section?.name}</td>
                <td>
                    <div className="d-flex">
                        <Switch
                            onChange={onChange("show")}
                            checked={section?.show}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            height={20}
                            width={48}
                        />

                        <span className="pl-2">Show /Hide</span>
                    </div>
                </td>

                <td>
                    <div className="d-flex">
                        <Switch
                            onChange={onChange("download")}
                            checked={section?.show && section?.download}
                            disabled={!section?.show}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            height={20}
                            width={48}
                        />

                        <span className="pl-2">Download</span>
                    </div>
                </td>
            </tr>
        </>
    );
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SubsectionItem);