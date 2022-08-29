import jwtDecode from "jwt-decode";

const CheckUserAuthentication = () => {

    const token = localStorage.getItem('jwt') ;
    if(token){
        let user = jwtDecode(token);
        let dateNow = new Date();
        if (user.exp > dateNow.getTime()/1000) {
            return true;
        }
    }
    return false;
}
export default CheckUserAuthentication