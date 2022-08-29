import React from 'react'
import Switch from "react-switch";
import SubsectionItem from './SubsectionItem';

const SectionItem = ({
    section = {},
    handleChange,
}) => {
    const onChange = (name) => (value) => {
        let updatedSection = {...section, [name]: value};

        if (name === "show" && !value) {
            Object.keys(updatedSection).map(s => {
                let mSubsection = updatedSection[s];

                if (typeof updatedSection[s] === "boolean") {
                    updatedSection[s] = false;
                } else if (typeof mSubsection === "object") {
                    Object.keys(mSubsection)
                    .map(mSKey => {
                        if (typeof mSubsection[mSKey] === "boolean") {
                            mSubsection[mSKey] = false;
                        }
                    });
                }
            });
        } else if (
            name === "show" ||
            name === "editable" ||
            name === "download"
        ) {
            Object.keys(updatedSection).map(s => {
                let mSubsection = updatedSection[s]
                if (typeof mSubsection === "object") {
                    mSubsection[name] = value;
                }
            });
        } else {
            let show = true;
            let download = true;
            let editable = true;

            Object.keys(updatedSection).map(s => {
                let mSubsection = updatedSection[s];
                if (typeof mSubsection === "object") {
                    show = show && mSubsection?.show;
                    download = show && download && mSubsection?.download;
                    editable = show && editable && mSubsection?.editable;
                }
            });

            updatedSection = {...updatedSection, show, download, editable}
        }

        handleChange && handleChange(updatedSection);
    }

    return (
        <>
            <thead>
                <tr className="th-bg">
                    <th>{section?.name}</th>

                    <th>
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

                            <span className="pl-2">Show / Hide</span>
                        </div>
                    </th>
                    <th>
                        <div className="d-flex">
                            <Switch
                                onChange={onChange("download")}
                                checked={section?.download && section?.show}
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
                    </th>
                </tr>
            </thead>

            <tbody>
                {
                    Object.keys(section).map(subSection => (
                        subSection && typeof section[subSection] === "object" &&
                        <SubsectionItem
                            key={subSection}
                            section={section[subSection]}
                            handleChange={onChange(subSection)}
                        />
                    ))
                }
            </tbody>
        </>
    );
}

export default SectionItem;