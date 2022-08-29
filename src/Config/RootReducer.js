import { combineReducers } from "redux";
import loginReducer from "../Login/Duck/LoginReducer";
import profileReducer from "../Profile/Duck/ProfileReducer";
import orderReducer from "../Order/Duck/OrderReducer";
import individualOrderReducer from "../IndividualOrder/Duck/IndividualOrderReducer";
import departmentReducer from "../Department/Duck/DepartmentReducer";
import planReducer from "../plan/Duck/PlanReducer";
import roleReducer from "../Role/Duck/RoleReducer";
import usersReducer from "../Users/Duck/UsersReducer";
import walletReducer from "../Wallet/Duck/WalletReducer";
import commentReducer from "../Comments/Duck/CommentReducer";
import uploadDataReducer from "../UploadData/Duck/UploadDataReducer"
import remittanceReducer from "../Remittance/Duck/RemittanceReducer"
import weightDisputeReducer from "../WeightDispute/Duck/WeightDisputeReducer";
import searchReducer from "../Search/Duck/SearchReducer";
import reportsReducer from "../Reports/Duck/ReportsReducer";
import dashboardReducer from "../Dashboard/Duck/DashboardReducer";
import reachUsReducer from "../ReachUs/Duck/ReachUsReducer";

const appReducer = combineReducers({
    token: loginReducer,
    order: orderReducer,
    individualOrder: individualOrderReducer,
    loggedInUser: profileReducer,
    department: departmentReducer,
    plan : planReducer,
    role: roleReducer,
    users: usersReducer,
    reachUs: reachUsReducer,
    wallet: walletReducer,
    comment: commentReducer,
    logistics: uploadDataReducer,
    remittance: remittanceReducer,
    weightDispute: weightDisputeReducer,
    search: searchReducer,
    report: reportsReducer,
    dashboard: dashboardReducer,

});

const RootReducer = (state, action) => {
    // clearing redux state when user logs out
    if (action.type === "LOGOUT_SUCCESS") {
        state = undefined;
    }
    return appReducer(state, action);
};

export default RootReducer;
