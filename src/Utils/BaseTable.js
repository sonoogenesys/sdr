import React from "react";

const BaseTable = ({
    id,
    className = "table table-striped table-bordered dt-responsive nowrap action_icons",
    headingData = ["Col 1", "Col 2", "Col 3", "Col 4"],
    rowData = [],
    renderRowItem = (item, index) => <tr></tr>,
    loading = false,
}) => {
    return (
        <>
            <div className="acclist-height-base" style={{overflow:"auto"}}>
                <table id={id} className={className} style={{marginBottom:0}}>
                    <thead>
                        <tr>
                            {headingData.map((heading, index) => (
                                typeof heading?.text === "string"
                                ? (
                                    <th
                                        key={index}
                                        className={`${heading?.className} ${rowData.length > 2 && "stickyTableHead"}`}
                                        style={heading?.style || {textAlign: (index === 0 || index === headingData.length-1) ? 'center' : 'left', whiteSpace: "nowrap"}}
                                    >{heading?.text}</th>
                                ) : (
                                    <th
                                        key={index}
                                        className={` ${rowData.length > 1 && "stickyTableHead"}`}
                                        style={{textAlign: (index === 0 || index === headingData.length-1) ? 'center' : 'left', whiteSpace: "nowrap"}}
                                    >{heading}</th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rowData?.length > 0 && rowData.map((data, index) => renderRowItem(data, index))}
                        {
                            (!rowData || rowData.length === 0) &&
                            <tr>
                                <td colSpan={headingData?.length} style={{textAlign:'center'}}>
                                    {loading ?  <span className="spinner-border m-2" /> : "No data found"}
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default BaseTable;
