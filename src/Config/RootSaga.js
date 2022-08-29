import { all } from "redux-saga/effects";
import loginInSaga from "../Login/Duck/LoginSaga";
import profileSaga from "../Profile/Duck/ProfileSaga";
import orderSaga from "../Order/Duck/OrderSaga";
import individualOrderSaga from "../IndividualOrder/Duck/IndividualOrderSaga";
import departmentSaga from "../Department/Duck/DepartmentSaga";
import planSaga from "../plan/Duck/PlanSaga";
import roleSaga from "../Role/Duck/RoleSaga";
import usersSaga from "../Users/Duck/UsersSaga";
import walletSaga from "../Wallet/Duck/WalletSaga";
import commentSaga from "../Comments/Duck/CommentSaga";
import uploadDataSaga from "../UploadData/Duck/UploadDataSaga";
import remittanceSaga from "../Remittance/Duck/RemittanceSaga";
import weightDisputeSaga from "../WeightDispute/Duck/WeightDisputeSaga";
import searchSaga from "../Search/Duck/SearchSaga";
import reportSaga from "../Reports/Duck/ReportsSaga";
import dashboardSaga from "../Dashboard/Duck/DashboardSaga";
import reachUsSaga from "../ReachUs/Duck/ReachUsSaga";

function* RootSaga() {
    yield all([
        loginInSaga(),
        profileSaga(),
        orderSaga(),
        individualOrderSaga(),
        departmentSaga(),
        planSaga(),
        roleSaga(),
        usersSaga(),
        reachUsSaga(),
        walletSaga(),
        commentSaga(),
        uploadDataSaga(),
        remittanceSaga(),
        weightDisputeSaga(),
        searchSaga(),
        reportSaga(),
        dashboardSaga(),
    ]);
}

export { RootSaga };
