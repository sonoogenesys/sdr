import React, {useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
class AuthContainer extends React.Component {

   render(){
       return (
           <React.Fragment>
               <Switch>
                   <Route exact path="/" component={Home} />
               </Switch>
           </React.Fragment>
       );
   }

}

export default AuthContainer