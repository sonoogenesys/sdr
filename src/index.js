import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import AuthContainer from './Authorization/AuthContainer'
import {Provider} from 'react-redux';
import {Store} from './Config/Store'

ReactDOM.render(
    // <React.StrictMode>
        <Provider store={Store}>
            <BrowserRouter>
                <AuthContainer />
            </BrowserRouter>
        </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
