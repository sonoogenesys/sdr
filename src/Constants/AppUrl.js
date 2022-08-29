let BASE_URL, url;
export let RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
url = window.location.hostname;

BASE_URL = "https://api.yolojet.com"
RAZORPAY_KEY = "rzp_live_NWsAltrWTgsGbG";
console.log("url", url);

// switch (url) {
//     case 'yolojet.penitt.com':
//     case '139.59.2.111':
//         BASE_URL = "https://yolojetapi.penitt.com";
//         RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
//         break;
//     case 'yolojet.com':
//     case '15.207.20.156':
//     case '3.108.65.39':
// 	    // BASE_URL = "https://api.yolojet.com:5788"
//         BASE_URL = "https://api.yolojet.com"
//         RAZORPAY_KEY = "rzp_live_NWsAltrWTgsGbG";
//         break;
//     case 'staging.yolojet.com':
// 	    BASE_URL = "https://api-stage.yolojet.com"
//         RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
//         break;
//     case '20.193.240.250':
//         BASE_URL = "http://20.193.240.250:5788";
//         RAZORPAY_KEY = "rzp_live_NWsAltrWTgsGbG";
//         break;
//     case 'localhost':
//         BASE_URL = "http://localhost:4343";
//         RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
//         break;
//     default:
//         BASE_URL = "https://api-stage.yolojet.com"
//         RAZORPAY_KEY = "rzp_test_i3xrBjjHzvOUMC";
// }

const API_BASE_URL = `${BASE_URL}/api/v1`;

let appUrl = {
    SOCKET_URL: BASE_URL,
    SIGN_UP_URL: API_BASE_URL + "/signup",
    SIGN_IN_URL: API_BASE_URL + "/login",
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
    USERS_USAGE_URL: API_BASE_URL + "/users/usage",
    USERS_PICKUP_ADDRESS: API_BASE_URL + "/users/add_pickup_address",
    USERS_UPDATE_PICKUP_ADDRESS: API_BASE_URL + "/users/update_pickup_address",
    RESET_PASSWORD_URL: API_BASE_URL + "/users/set-forgot-password",
    BANK_DETAIL_URL: API_BASE_URL + "/users/bankdetail",
    INVITE_USER_URL: API_BASE_URL + "/users/invite-user",
    DEPARTMENT_URL: API_BASE_URL + "/department",
    DEPARTMENTS_URL: API_BASE_URL + "/departments",
    PLAN_URL: API_BASE_URL + "/plan",
    PLANS_URL: API_BASE_URL + "/plans",
    ROLE_URL: API_BASE_URL + "/roles",
    CODES_URL: API_BASE_URL + "/codes",
    PLAN_INFO_URL : API_BASE_URL + "/getLogisticsAttachment",
    LOGISTICS_URL: API_BASE_URL + "/logistics",
    ATTACHMENTS_UPLOAD: API_BASE_URL + "/attachments",
    ATTACHMENTS_DOWNLOAD: API_BASE_URL + "/attachments-download",
    ATTACHMENTS_FILE: API_BASE_URL + "/attachments-file",
    WALLET_URL: API_BASE_URL + "/wallets",
    COMMENTS_URL: API_BASE_URL + "/comments",
    REMITTANCE_URL: API_BASE_URL + "/remittance",
    WEIGHT_DISPUTE_URL: API_BASE_URL + "/weightDispute",
    GET_METRIC_URL: API_BASE_URL + "/orders/get_metric",
    FEEDBACKS_URL: API_BASE_URL + "/feedbacks",
    CAREER_APPLY_NOW_URL: API_BASE_URL + "/career/apply-now",
    TRACK_MY_URL: API_BASE_URL + "/track-my-order",
    RESET_GLOBAL_PASSWORD_URL: API_BASE_URL+ "/global/reset-password/"
};

export default appUrl;
