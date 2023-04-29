import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AuthContainer from './Authorization/AuthContainer'


ReactDOM.render(
    <BrowserRouter>
                <AuthContainer />
            </BrowserRouter>
      ,
    document.getElementById('root')
);

console.log('run')
reportWebVitals();
