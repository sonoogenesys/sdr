import React, { useEffect, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import BaseTable from "./BaseTable";

const TableContainer = ({
    baseTableClassName,
    title = "",
    entriesOptions = [10, 25, 50, 100],
    showSelectAll,
    headings = ["Col 1", "Col 2", "Col 3"],
    rowData = [],
    renderRow = (item, index) => <></>,
    totalEntries = 0,
    onSearch = (text) => text,
    showSearch = true,
    searchPlaceholder='Search ...',
    loading = false,
    filter = {},
    loadMore = (offset = 0, limit = 100) => {},
    actionBtnText = "Show Preview",
    ThermalactionBtnText = "Thermal Label Preview",
    showActionBtn,
    onClickAction,
    onClickDeselectAction,
    selectedList = [],
    onSelectAll = (data = [], isSelect = false) => {},
    defaultSearchText = "",
}) => {
    const preProps = useRef({});
    const [state, setState] = useState({
        maxRowCount: entriesOptions[0],
        activePage: 1,
        searchText: defaultSearchText,
    });

    const preload = () => {
        if (
            JSON.stringify(preProps.current?.filter) !== JSON.stringify(filter) ||
            preProps.current?.maxRowCount !== state.maxRowCount
        ) {
            setState({
                ...state,
                activePage: 1,
                searchText: defaultSearchText,
            });
        }
    }

    useEffect(() => {
        preload();

        return () => (preProps.current = { filter, maxRowCount: state.maxRowCount });
    }, [filter, state.maxRowCount]);

    let { maxRowCount, activePage, searchText } = state;

    const handleChange = (name, isPageChange = false) => (event) => {
        // let oldState = state;
        let value = event?.target?.value;
        // if (name === "maxRowCount" && oldState.maxRowCount !== value) {
        //     oldState.activePage = 1;
        // }

        setState({
            ...state,
            [name]: isPageChange ? event : value,
        });
    };

    let totalPage = Math.ceil(totalEntries / maxRowCount);
    let startRowIndex = Number.parseInt((activePage - 1) * maxRowCount);
    let endRowIndex = 0;
    let pageRangeDisplayed = totalPage > 6 ? 6 : totalPage;

    let entries = rowData.slice(startRowIndex);
    entries = entries.filter((e, index) => index < maxRowCount);

    if (rowData.length > 0) {
        endRowIndex = startRowIndex + entries.length;
        startRowIndex = startRowIndex + 1;
    }

    if (!loading && entries.length === 0 && totalEntries !== rowData.length) {
        loadMore(rowData.length, Number.parseInt((activePage + 5) * maxRowCount));
    }

    const onPressEnter = (e) => {
        if (
            e.keyCode === 13 ||
            e.which === 13 ||
            e?.target?.value.trim() === ""
        ) {
            onSearch(searchText);
        }
    };

    if (showSelectAll) {
        let isAllSelected = entries.length > 0 && entries.every(id => selectedList.includes(id));

        headings = [
            <input
                type="checkbox"
                checked={isAllSelected}
                onClick={() => onSelectAll(entries, !isAllSelected)}
                disabled={entries.length <= 0}
            />,
            ...headings,
        ];
    }

    return (
        <div className="row">
            <div className="col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className='stickyHeader'>
                            {/* {!!title && <h4 className="card-title">{title}</h4>} */}
                                <div className="row">
                                    <div className="col-xl-4">
                                        <div className="d-flex align-items-center pt-3">
                                            <p className="mb-0">show</p>
                                            <div className="pl-2 pr-2">
                                                <select
                                                    className="custom-select"
                                                    defaultValue={maxRowCount}
                                                    onChange={handleChange(
                                                        "maxRowCount"
                                                    )}
                                                >
                                                    {entriesOptions.map(
                                                        (value, index) => (
                                                            <option
                                                                key={index}
                                                                value={value}
                                                            >
                                                                {value}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <p className="mb-0">entries</p>
                                        </div>
                                    </div>

                                    {
                                        !showSearch && showActionBtn &&
                                        <div className="col-xl-8 text-right shipmentlblBtn">
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary mt-3 mr-2"
                                                onClick={onClickDeselectAction}
                                            >
                                            Deselect All ({selectedList?.length})
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary mt-3 mr-2"
                                                onClick={() => onClickAction('thermarPrint')}
                                            >
                                                <i className="dripicons dripicons-print mr-2" />
                                                {ThermalactionBtnText}
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary mt-3 mr-2"
                                                onClick={() => onClickAction('regularPrint')}
                                            >
                                                <i className="dripicons dripicons-print mr-2" />
                                                {actionBtnText}
                                            </button>
                                        </div>
                                    }

                                    {
                                        showSearch &&
                                        <div className="col-xl-4 offset-md-2">
                                            <div className="app-search d-lg-block">
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder={searchPlaceholder}
                                                        value={searchText}
                                                        onChange={handleChange(
                                                            "searchText"
                                                        )}
                                                        onKeyUp={onPressEnter}
                                                    />
                                                    <span
                                                        className="fe fe-search"
                                                        onClick={() => onSearch(searchText)}
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    }
                            </div>
                        </div>

                        
                            <BaseTable
                                className={baseTableClassName}
                                headingData={headings}
                                rowData={entries}
                                renderRowItem={(item, index) => renderRow(item, (startRowIndex - 1) + index)}
                                loading={loading}
                            />

                    <div className="row" style={{marginTop:15}}>
                            <div className="col-sm-12 col-md-5">
                                <div className="dataTables_info">
                                    {`Showing ${startRowIndex} to ${endRowIndex} of ${totalEntries} entries`}
                                </div>
                            </div>

                            <div className="col-sm-12 col-md-7">
                                <Pagination
                                    innerClass="pagination justify-content-end"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    activePage={activePage}
                                    itemsCountPerPage={maxRowCount}
                                    totalItemsCount={totalEntries}
                                    pageRangeDisplayed={pageRangeDisplayed}
                                    onChange={handleChange("activePage", true)}
                                    prevPageText={"Previous"}
                                    nextPageText={"Next"}
                                    itemClassPrev="paginate_button page-item previous"
                                    itemClassNext="paginate_button page-item next"
                                    hideFirstLastPages={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TableContainer;
