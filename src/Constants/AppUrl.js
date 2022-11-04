let BASE_URL, url;
export let RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
url = window.location.hostname;

BASE_URL = "https://www.kcs-electrical.com"
// BASE_URL = "http://localhost:4343"
RAZORPAY_KEY = "rzp_live_NWsAltrWTgsGbG";
console.log("url", url);

const API_BASE_URL = `${BASE_URL}/api/v1`;

let appUrl = {
    SOCKET_URL: BASE_URL,
    SIGN_UP_URL: API_BASE_URL + "/signup",
    SIGN_IN_URL: API_BASE_URL + "/signin",
    FORGOT_PASSWORD_URL: API_BASE_URL + "/forgot-password",
    ORDER_URL: API_BASE_URL + "/order",
    ORDERS_URL: API_BASE_URL + "/orders",
    RAISE_WEIGHT_DISPUTE_URL: API_BASE_URL + "/orders/weight-dispute-raised",
    SETTLE_WEIGHT_DISPUTE_URL: API_BASE_URL + "/orders/weight-dispute-settled",
    ORDER_INVOICE_DOWNLOAD: API_BASE_URL + "/orders/invoice-download",
    RTO_ORDER_URL: API_BASE_URL + "/orders/rto-order",
    BULK_URL: API_BASE_URL + "/bulk",
    BULKS_URL: API_BASE_URL + "/bulks",
    REPORTS_URL: API_BASE_URL + "/reports",
    GLOBAL_DASHBOARD_URL: API_BASE_URL + "/global/dashboard",
    DASHBOARD_URL: API_BASE_URL + "/reports/fetch/dashboard",
    DASHBOARD_DOWNLOAD: API_BASE_URL + "/reports/fetch/dashboard-download",
    USERS_URL: API_BASE_URL + "/users",
    CLIENT_URL: API_BASE_URL + "/client",
    GALLERY_URL: API_BASE_URL + "/gallery",
    ABOUT_URL: API_BASE_URL + "/about",
    PRODUCT_URL: API_BASE_URL + "/product",
    INVOICE_URL: API_BASE_URL + "/invoice",
    QUOTATION_URL: API_BASE_URL + "/quotation",
    PURCHASE_URL: API_BASE_URL + "/purchase",
    USERS_USAGE_URL: API_BASE_URL + "/users/usage",
    USERS_PICKUP_ADDRESS: API_BASE_URL + "/users/add_pickup_address",
    USERS_UPDATE_PICKUP_ADDRESS: API_BASE_URL + "/users/update_pickup_address",
    RESET_PASSWORD_URL: API_BASE_URL + "/users/set-forgot-password",
    // BANK_DETAIL_URL: API_BASE_URL + "/users/bankdetail",
    // INVITE_USER_URL: API_BASE_URL + "/users/invite-user",
    // DEPARTMENT_URL: API_BASE_URL + "/department",
    // DEPARTMENTS_URL: API_BASE_URL + "/departments",
    // PLAN_URL: API_BASE_URL + "/plan",
    // PLANS_URL: API_BASE_URL + "/plans",
    // ROLE_URL: API_BASE_URL + "/roles",
    // CODES_URL: API_BASE_URL + "/codes",
    // PLAN_INFO_URL : API_BASE_URL + "/getLogisticsAttachment",
    // LOGISTICS_URL: API_BASE_URL + "/logistics",
    // ATTACHMENTS_UPLOAD: API_BASE_URL + "/attachments",
    // ATTACHMENTS_DOWNLOAD: API_BASE_URL + "/attachments-download",
    // ATTACHMENTS_FILE: API_BASE_URL + "/attachments-file",
    // WALLET_URL: API_BASE_URL + "/wallets",
    // COMMENTS_URL: API_BASE_URL + "/comments",
    // REMITTANCE_URL: API_BASE_URL + "/remittance",
    // WEIGHT_DISPUTE_URL: API_BASE_URL + "/weightDispute",
    // GET_METRIC_URL: API_BASE_URL + "/orders/get_metric",
    // FEEDBACKS_URL: API_BASE_URL + "/feedbacks",
    // CAREER_APPLY_NOW_URL: API_BASE_URL + "/career/apply-now",
    // TRACK_MY_URL: API_BASE_URL + "/track-my-order",
    // RESET_GLOBAL_PASSWORD_URL: API_BASE_URL+ "/global/reset-password/"
};

export default appUrl;
