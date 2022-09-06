import React from 'react'
import {Route} from 'react-router-dom';
import LoginContainer from '../Login/LoginContainer';
// import ForgetPassword from '../Login/ForgetPassword'
// import ResetPassword from '../Login/ResetPassword';

const AuthRouter = () => {
    return(
        <React.Fragment>
            <Route exact path='/login' component={LoginContainer}/>
        </React.Fragment>
    )
}

export default AuthRouter