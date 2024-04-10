import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './redux/store.js'
import App from './App.jsx'
import './index.css'

// Desactivar advertencias de PropTypes
import PropTypes from 'prop-types';
PropTypes.checkPropTypes = () => {};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)