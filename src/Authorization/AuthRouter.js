import React from 'react'
import {Route} from 'react-router-dom';
import LoginContainer from '../Login/LoginContainer';
// import ForgetPassword from '../Login/ForgetPassword'
// import ResetPassword from '../Login/ResetPassword';

const AuthRouter = () => {
    return(
        <React.Fragment>
            <Route exact path='/login' component={LoginContainer}/>
            {/* <Route exact path='/forgot-password' component={() => <h1 style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Men are at work...</h1>}/> */}
            {/*<Route exact path='/signup' component={() => <h1 style={{height:'100vh', display:'flex', alignItems:'center', justifyContent:'center'}}>Men are at work...</h1>}/>*/}

			{/*<Route exact path='/ForgetPassword' exact component={ForgetPassword} />*/}
            {/*<Route exact path='/ResetPassword/:token' exact component={ResetPassword} />*/}
        </React.Fragment>
    )
}

export default AuthRouter