

import React,{useState} from 'react';
import BreadCrumb from "./Utils/BreadCrumb";
import Switch from "react-switch";

const EditRole = () => {
     
    const [togglestate, setTogglestate] = useState({ checked: false })

    const handleTogglChange = (checked) => {
        setTogglestate({ checked });
      }
    return (
        <>
        <div className="row">
            <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between pb-1">
                    <div className="page-header">
                        <div>
                        <h2 className="main-content-title tx-24 mg-b-5">
                            Edit Role
                        </h2>
                        <BreadCrumb
                            title={[
                                "Role Management",
                                "Edit Role",
                            ]} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="col-md-12">
                        <form action="#">
                            <div className="row">
                                <div className="col-md-6 pt-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-3 pr-0">
                                            <label htmlFor="">Role Name <span style={{color:"red"}}>*</span></label>
                                        </div>
                                        <div className="col-md-6 pl-0">
                                             <input type="text" className="form-control"/>
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-3">
                                        <div className="col-md-3 pr-0">
                                            <label htmlFor="">Permission</label>
                                        </div>
                                        <div className="col-md-6 pl-0 d-flex">
                                        <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                        uncheckedIcon={false}
                                        checkedIcon={false}
                                        onColor="#86d3ff"
                                        onHandleColor="#2693e6"
                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                        height={20}
                                        width={48}                     
                                         />
                                         <span className="pl-2">Allow all</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-12 mb-4">
                        <div className="card">
                            <h4 className="card-title">
                                Permission to roles
                            </h4>
                            <div className="card-body">
                                <table className="table table-striped table-bordered dt-responsive nowrap editrole_tbl">
                                    <thead>
                                        <tr className="th-bg">
                                            <th>
                                                DASHBOARD
                                            </th>
                                            <th>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Allow all</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Allow all</span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                            DASHBOARD
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                        <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onColor="#86d3ff"
                                                        onHandleColor="#2693e6"
                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                        height={20}
                                                        width={48}                     
                                                        /> 
                                                        <span className="pl-2">Allow all</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Can access sensitive data</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr className="th-bg">
                                            <th>
                                                UPLOAD DATA
                                            </th>
                                            <th>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Allow all</span>
                                                </div>
                                            </th>
                                            <th>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Allow all</span>
                                                </div>
                                            </th>
                                        </tr>
                                        <tr>
                                            <td>
                                            MASTER
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                        <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                        uncheckedIcon={false}
                                                        checkedIcon={false}
                                                        onColor="#86d3ff"
                                                        onHandleColor="#2693e6"
                                                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                        height={20}
                                                        width={48}                     
                                                        /> 
                                                        <span className="pl-2">Allow all</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex">
                                                    <Switch onChange={handleTogglChange} checked={togglestate.checked}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    onColor="#86d3ff"
                                                    onHandleColor="#2693e6"
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    height={20}
                                                    width={48}                     
                                                    /> 
                                                    <span className="pl-2">Can access sensitive data</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default EditRole


