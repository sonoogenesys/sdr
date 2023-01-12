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

console.log('run')
reportWebVitals();
