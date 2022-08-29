const AppFooter = (props) => {
    return(
        <footer className={props.showSideBar ? "footer open" : "footer"}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-12 text-center">
                         Copyright 2021 © Yolojet Internet Services Pvt. Ltd. All Rights Reserved
                    </div>                        
                </div>
            </div>
        </footer>
    )
}
export default AppFooter