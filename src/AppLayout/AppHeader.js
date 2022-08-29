import { getAvatarColor, getNameInitials } from '../Utils/CommonFunctions'
import {Link} from 'react-router-dom'
import {Badge, Dropdown} from 'react-bootstrap'
import Tippy from '@tippyjs/react';

const AppHeader = (props) => {
    let permissions = props.loggedInUser?.role?._id?.permissions || {};
    let {
        global_password = {},
    } = permissions;

    return(
        <header id="page-topbar">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div className="d-flex col-lg-3">
                        <div className="navbar-brand-box">
                            <Link to="/app/dashboard" className="logo logo-dark d-inline-block">
                                <span className="logo-sm">
                                    <img src="/images/logo2.svg" alt="" height="52" />
                                </span>
                                <span className="logo-lg">
                                    <img src="/images/logo.svg" alt="" height="65" />
                                </span>
                            </Link>
                        </div>
                        <button type="button" className="btn btn-sm px-3 font-size-16 header-item" id="vertical-menu-btn" onClick={props.toggleSideBar}>
                            <span>
                            <Tippy content={props.showSideBar ? 'Hide sidebar' : 'Show sidebar'}>
                                <i className="fa fa-fw fa-bars"></i>
                            </Tippy>
                            </span>
                        </button>
                        {/* <div className="app-search d-none d-lg-block">
                            <div className="position-relative">
                                <input type="text" className="form-control" placeholder="AWB Search ..." />
                                <span className="fe fe-search"></span>
                            </div>
                        </div> */}
                    </div>

                    <div className="d-flex col-lg-4 justify-content-end">
                        <div className="dropdown d-inline-block d-lg-none ml-2">
                            <button type="button" className="btn header-item noti-icon" id="page-header-search-dropdown"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="mdi mdi-magnify"></i>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-search-dropdown">
                                <form className="p-3">
                                    <div className="form-group m-0">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                            <div className="input-group-append">
                                                <button className="btn btn-primary" type="submit">
                                                    <i className="mdi mdi-magnify"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        {/* <div className="dropdown d-none d-lg-inline-block ml-1">
                                <button type="button" className="btn header-item noti-icon" data-toggle="fullscreen">
                                    <i className="bx bx-fullscreen"></i>
                                </button>
                            </div> */}
                        {/* <div className="dropdown d-none d-lg-inline-block ml-1">
                            <button type="button" className="btn header-item noti-icon">
                                <i className="fe fe-tag"></i>
                                <span className="badge badge-danger badge-pill">3</span>
                            </button>
                        </div> */}
                        {/* <div className="dropdown d-none d-lg-inline-block ml-1">
                            <button type="button" className="btn header-item noti-icon">
                                <i className="fe fe-bar-chart"></i>
                                <span className="badge badge-danger badge-pill">3</span>
                            </button>
                        </div> */}
                        {/* <div className="dropdown d-inline-block">
                            <button type="button" className="btn header-item noti-icon" id="page-header-notifications-dropdown"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="bx bx-bell"></i>
                                <span className="badge badge-danger badge-pill">3</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right p-0" aria-labelledby="page-header-notifications-dropdown">
                                <div className="p-3">
                                    <div className="row align-items-center">
                                        <div className="col">
                                            <h6 className="m-0" key="t-notifications"> Notifications </h6>
                                        </div>
                                        <div className="col-auto">
                                            <a href="#!" className="small" key="t-view-all"> View All</a>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style={{maxHeight: 230}}>
                                    <a href="" className="text-reset notification-item">
                                        <div className="media">
                                            <div className="avatar-xs mr-3">
                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i className="bx bx-cart"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="mt-0 mb-1" key="t-your-order">Your order is placed</h6>
                                                <div className="font-size-12 text-muted">
                                                    <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="" className="text-reset notification-item">
                                        <div className="media">
                                            <div className="avatar-xs mr-3">
                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                    <i className="bx bx-badge-check"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="mt-0 mb-1" key="t-shipped">Your item is shipped</h6>
                                                <div className="font-size-12 text-muted">
                                                    <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="" className="text-reset notification-item">
                                        <div className="media">
                                            <div className="avatar-xs mr-3">
                                                <span className="avatar-title bg-primary rounded-circle font-size-16">
                                                    <i className="bx bx-cart"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="mt-0 mb-1" key="t-your-order">Your order is placed</h6>
                                                <div className="font-size-12 text-muted">
                                                    <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="" className="text-reset notification-item">
                                        <div className="media">
                                            <div className="avatar-xs mr-3">
                                                <span className="avatar-title bg-success rounded-circle font-size-16">
                                                    <i className="bx bx-badge-check"></i>
                                                </span>
                                            </div>
                                            <div className="media-body">
                                                <h6 className="mt-0 mb-1" key="t-shipped">Your item is shipped</h6>
                                                <div className="font-size-12 text-muted">
                                                    <p className="mb-1" key="t-grammer">If several languages coalesce the grammar</p>
                                                    <p className="mb-0"><i className="mdi mdi-clock-outline"></i> <span key="t-min-ago">3 min ago</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="p-2 border-top">
                                    <a className="btn btn-sm btn-link font-size-14 btn-block text-center" href="javascript:void(0)">
                                        <i className="mdi mdi-arrow-right-circle mr-1"></i> <span key="t-view-more">View More..</span>
                                    </a>
                                </div>
                            </div>
                        </div> */}
                        {
                            global_password?.show &&
                            <div className="dropdown d-none d-lg-inline-block ml-1">
                                <button
                                    type="button"
                                    className="btn header-item noti-icon"
                                    onClick={() => props.handleChangePasswordModal(true)}
                                >
                                    <Tippy content="Global Password">
                                        <i className="fas fa-key"></i>
                                    </Tippy>
                                </button>
                            </div>
                        }
                        <div className="dropdown d-none d-lg-inline-block ml-1">
                            <button type="button" className="btn header-item noti-icon">
                                <i className="ti ti-headphone-alt"></i>
                            </button>
                        </div>
                        <div className="dropdown d-inline-block">
                            <Dropdown>
                                <Dropdown.Toggle className="btn header-item d-flex align-items-center" style={{backgroundColor : "#fff", color: "#555b6d"}}>
                                    <span style={{background: getAvatarColor(props?.loggedInUser?._id), fontSize: 14, display:'inline-block', width:32, height:32, lineHeight: '32px', borderRadius:'50%', color:'white'}} className="mr-2">
                                        {getNameInitials(props?.loggedInUser?.first_name || props?.loggedInUser?.email)}
                                    </span>
                                    <div className="text-left">
                                        <p className="mb-0" key="t-henry">
                                            {
                                                (props?.loggedInUser?.first_name && props?.loggedInUser?.last_name) ? `${props?.loggedInUser?.first_name} ${props?.loggedInUser?.last_name || ""}` : (props?.loggedInUser?.first_name || props?.loggedInUser?.email)
                                            }
                                            <i className="mdi mdi-chevron-down d-xl-inline-block ml-1"></i>
                                        
                                        </p>
                                        <p data-title={`Role`} style={{color: '#2f54eb',background: '#f0f5ff',borderColor: '#adc6ff',borderRadius:'3px',fontSize: '11px', paddingTop: '2px', paddingBottom: '2px',}}
                                        className="w-auto pl-2 pr-2 d-inline-block mb-0">
                                           {props?.loggedInUser?.role?._id?.name}
                                        </p>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                    {/* <a className="dropdown-item" href="#">
                                        <i className="bx bx-user font-size-18 align-middle mr-1"></i>
                                        <span key="t-profile">Profile</span>
                                    </a> */}
                                    <Dropdown.Item className="dropdown-item d-block" onClick={() => props.history.push('/app/editProfile')}>
                                        {/* <Link className="dropdown-item d-block" to="/app/editProfile"> */}
                                            <i className="fe fe-edit font-size-18 align-middle mr-1"></i>
                                            <span key="t-settings">Edit Profile</span>
                                        {/* </Link> */}
                                    </Dropdown.Item>
                                    {/* <a className="dropdown-item d-block" href="#">
                                        <i className="fe fe-settings font-size-18 align-middle mr-1"></i>
                                        <span key="t-settings">Account Settings</span>
                                    </a> */}
                                    <Dropdown.Item className="dropdown-item d-block" onClick={() => props.history.push('/app/AccountCreation')}>
                                        {/* <Link className="dropdown-item d-block" to='/app/AccountCreation'> */}
                                            <i className="fe fe-settings font-size-18 align-middle mr-1"></i>
                                            <span key="t-settings">Account Details</span>
                                        {/* </Link> */}
                                    </Dropdown.Item>
                                    <Dropdown.Item className="dropdown-item d-block pointer" onClick={props.logOut}>
                                        <i className="fe fe-power font-size-18 align-middle mr-1"></i>
                                        <span key="t-settings">Log Out</span>
                                        {/* <Link className="dropdown-item d-block pointer" onClick={props.logOut}>
                                        </Link> */}
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* </button> */}
                            <div className="dropdown-menu dropdown-menu-right">
                                {/* <a className="dropdown-item" href="#">
                                    <i className="bx bx-user font-size-18 align-middle mr-1"></i>
                                    <span key="t-profile">Profile</span>
                                </a> */}
                                <Link className="dropdown-item d-block" to="/app/editProfile">
                                    <i className="fe fe-edit font-size-18 align-middle mr-1"></i>
                                    <span key="t-settings">Edit Profile</span>
                                </Link>
                                <Link className="dropdown-item d-block" to="/app/AccountCreation">
                                    <i className="fe fe-settings font-size-18 align-middle mr-1"></i>
                                    <span key="t-settings">Account Settings</span>
                                </Link>
                                <Link className="dropdown-item d-block" onClick={props.logOut}>
                                    <i className="fe fe-power font-size-18 align-middle mr-1"></i>
                                    <span key="t-settings">Log Out</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default AppHeader