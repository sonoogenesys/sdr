import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

toast.configure()

const colors = {};
export const colorArr = [
    '#a67d01',
    'gold',
    'pink',
    'magenta',
    'orange',
    "#3ac48a",
    "#fdcb7e",
    "#ffa16c",
    "#697789",
    "#9eabb9",
    "#c2ccd7",
    "#329aff",
    "#4ed6e7",
    "#ff6378",
    "#893037",
    "#606371",
    "#E55B5B",
    "#2F5090",
    "#196EEF",
    "#5C33D1",
    "#9B51E0"
];
let lastColorIndex = 0;

export function getAvatarColor (id, transparency) {
    if (!id) {
        return colorArr[Math.floor(Math.random()*colorArr.length)];
    }
    if (!colors.hasOwnProperty(id)) {
        colors[id] = colorArr[lastColorIndex];
        lastColorIndex = lastColorIndex + 1;
        lastColorIndex = lastColorIndex % colorArr.length;
    }
    return transparency ? `${colors[id]}${transparency}` : colors[id];
}

export const getNameInitials = (name) => {
    name = name && name.trim()
    if (!name) return;
    let initials = name[0] || '';
    var index = name.indexOf(" ");

    if(index < name.length && index>1 ) {

        initials += (name[index+1]);
    }
    return initials.toUpperCase();
}

export const validateEmail = (email) => {
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email)
}

export const validateMobile = (mobile) => {
    let mobileFormat = /^[1-9]{1}[0-9]{9}$/;
    return mobileFormat.test(mobile)
}

export const validateNumber = (number) => {
    return Number(number) && number > 0;
}

export const validatePanNumber = (number) => {
    let format = /[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return format.test(number);
}

export const escapeRegex = (string) => {
    return string.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export const isValidPassword = (password = "") => {
    return password.length >= 4;
}

export const getCourierPartnerIcon = (name = "") => {
    name = name.toLowerCase().trim();

    if (name.includes("wow express")) {
        return "/images/wow.png";
    } else if (name.includes("delhivery")) {
        return "/images/delhivery_air.png";
    } else if (name.includes("delhivery air")) {
        return "/images/delhivery_air.png";
    } else if (name.includes("delhivery surface")) {
        return "/images/delhiverysurface.jpg";
    } else if (name.includes("xpressbees")) {
        return "/images/xpressbees_air.jpg";
    } else if (name.includes("xpressbees air")) {
        return "/images/xpressbees_air.jpg";
    } else if (name.includes("xpressbees surface")) {
        return "/images/xpressbees_air.jpg";
    } else if (name.includes("spoton")) {
        return "/img/spoton.png";
    } else if (name.includes("shadowfax")) {
        return "/img/shadow.png";
    } else if (name.includes("dtdc")) {
        return "/img/dtdc.png";
    }else if (name.includes("blue dart")) {
        return "/img/bluedart.png";
    }

    return "/img/logo.svg";
}


export const getCourierPartnerBarcode = (name = "") => {
    name = name.toLowerCase().trim();

    if (name.includes("wow express")) {
        return 2.3;
    } else if (name.includes("delhivery")) {
        return 2.3;
    } else if (name.includes("xpressbees")) {
        return 2.3;
    } else if (name.includes("spoton")) {
        return 2.8;
    } else if (name.includes("shadowfax")) {
        return 1.7;
    } else if (name.includes("dtdc")) {
        return 2.8;
    }else if (name.includes("blue dart")) {
        return 2.4;
    }

    return 2;
}

// export const getCourierPartnerBarcode = (name = "") => {
//     name = name.toLowerCase().trim();

//     if (name.includes("wow express")) {
//         return 2.3;
//     } else if (name.includes("delhivery")) {
//         return 2.3;
//     } else if (name.includes("xpressbees")) {
//         return 2.3;
//     } else if (name.includes("spoton")) {
//         return 2.8;
//     } else if (name.includes("shadowfax")) {
//         return 1.7;
//     } else if (name.includes("dtdc")) {
//         return 2.8;
//     }else if (name.includes("blue dart")) {
//         return 2.4;
//     }

//     return 2;
// }

export const showNDRDetails = (name = "") => {
    name = name.toLowerCase().trim();

    if (name.includes("wow express")) return true;
    if (name.includes("xpressbees")) return true;

    if (name.includes("delhivery")) return true;
    if (name.includes("spoton")) return false;
    if (name.includes("shadowfax")) return false;
    if (name.includes("dtdc")) return false;
    if (name.includes("blue dart")) return false;

    return false;
}

export const showNotification = (type, message, autoClose = 6000, onClick = () => {}) => {
    // type can be info, success, warning, error, dark
    let options = {
        position: "top-right",
        autoClose: autoClose,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick: onClick,
    };

    if (type?.toLowerCase() === "default") {
        toast(message, options)
    } else {
        toast[type](message, options)
    }
}

export const getCurrentMonthOfWeek = () => {
    const dateFirst = moment().date(1)
    const dateLast = moment().date(moment().daysInMonth());
    const startWeek = dateFirst.week();
    const endWeek = dateLast.week();

    if (endWeek < startWeek) {
        return dateFirst.weeksInYear() - startWeek + 1 + endWeek;
    } else {
        return endWeek - startWeek + 1
    }
}