import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import configureStore from './redux/store.js';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


render((
    <Provider store={configureStore}>
        <BrowserRouter>
            <App  />
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));