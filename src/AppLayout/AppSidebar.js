import { Link } from "react-router-dom";

const AppSidebar = (props) => {
    const pathname = window?.location?.pathname;
    let {loggedInUser} = props;
    console.log(loggedInUser)
    const isAdmin = loggedInUser && loggedInUser.role_id === "admin";

    return (
        <div className={props.showSideBar ? "vertical-menu side_menu open" : "vertical-menu side_menu"}>
            <div data-simplebar className="h-100">
                <div id="sidebar-menu">
                    <ul className="metismenu list-unstyled" id="side-menu">
                            <li className={pathname === '/app/dashboard' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                <Link to="/app/dashboard" className="waves-effect">
                                    <i className="ti ti-home"></i>
                                    <span key="t-dashboards"> Dashboard</span>
                                </Link>
                            </li>
                        <li className={pathname === '/app/tally' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                                <Link to="/app/tally" className="waves-effect">
                                    <i className="ti ti-tablet"></i>
                                    <span key="t-tally"> Tally</span>
                                </Link>
                            </li>
                        <li className={pathname === '/app/about' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/about" className="waves-effect">
                                <i className="ti ti-info"></i>
                                <span key="t-about"> About</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/product' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/product" className="waves-effect">
                                <i className="ti ti-bag"></i>
                                <span key="t-product"> Product</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/client' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/client" className="waves-effect">
                                <i className="ti ti-user"></i>
                                <span key="t-client"> Client</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/gallery' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/gallery" className="waves-effect">
                                <i className="ti ti-gallery"></i>
                                <span key="t-gallery"> Gallery</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/invoice' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/invoice" className="waves-effect">
                                <i className="ti ti-printer"></i>
                                <span key="t-invoice"> Invoice</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/gst' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/gst" className="waves-effect">
                                <i className="ti ti-wallet"></i>
                                <span key="t-gst">GST</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/purchase' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/purchase" className="waves-effect">
                                <i className="ti ti-hand-point-right"></i>
                                <span key="t-purchase"> Purchase</span>
                            </Link>
                        </li>
                        <li className={pathname === '/app/quotation' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/quotation" className="waves-effect">
                                <i className="ti ti-file"></i>
                                <span key="t-quotation"> Quotation</span>
                            </Link>
                        </li>

                        <li className={pathname === '/app/query' ? 'mm-active' : undefined} onClick={props.closeSideBar}>
                            <Link to="/app/query" className="waves-effect">
                                <i className="ti ti-cloud"></i>
                                <span key="t-query"> Query</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default AppSidebar;
