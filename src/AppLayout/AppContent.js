import AppRouters from "./AppRouters"

const AppContent = (props) => {
    return (
        <div className={props.showSideBar ? "main-content open" : "main-content"}>
            <div className="page-content">
                <div className="container-fluid">
                    <AppRouters loggedInUser={props.loggedInUser} />
                </div>
            </div>
        </div>
    )
}
export default AppContent