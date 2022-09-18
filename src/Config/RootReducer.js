import { combineReducers } from "redux";
import loginReducer from "../Login/Duck/LoginReducer";
import profileReducer from "../Profile/Duck/ProfileReducer";
import dashboardReducer from "../Dashboard/Duck/DashboardReducer";
import clientReducer from "../Client/Duck/ClientsReducer";
import galleryReducer from "../Gallery/Duck/GalleryReducer";
import aboutReducer from "../About/Duck/AboutReducer";
import productReducer from "../Product/Duck/ProductsReducer";
import invoiceReducer from "../Invoice/Duck/InvoiceReducer";

const appReducer = combineReducers({
    token: loginReducer,
    loggedInUser: profileReducer,
    dashboard: dashboardReducer,
    client: clientReducer,
    gallery: galleryReducer,
    about: aboutReducer,
    product: productReducer,
    invoice: invoiceReducer,

});

const RootReducer = (state, action) => {
    // clearing redux state when user logs out
    if (action.type === "LOGOUT_SUCCESS") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default RootReducer;
