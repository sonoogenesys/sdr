import { all } from "redux-saga/effects";
import loginInSaga from "../Login/Duck/LoginSaga";
import profileSaga from "../Profile/Duck/ProfileSaga";
import dashboardSaga from "../Dashboard/Duck/DashboardSaga";
import clientSaga from "../Client/Duck/ClientsSaga";
import gallerySaga from "../Gallery/Duck/GallerySaga";
import aboutSaga from "../About/Duck/AboutSaga";
import productSaga from "../Product/Duck/ProductsSaga";
import invoiceSaga from "../Invoice/Duck/InvoiceSaga";
import quotationSaga from "../Quotation/Duck/QuotationSaga";
import purchaseSaga from "../Purchase/Duck/PurchaseSaga";

function* RootSaga() {
    yield all([
        loginInSaga(),
        profileSaga(),
        dashboardSaga(),
        clientSaga(),
        gallerySaga(),
        aboutSaga(),
        productSaga(),
        invoiceSaga(),
        purchaseSaga(),
        quotationSaga()
    ]);
}

export { RootSaga };
