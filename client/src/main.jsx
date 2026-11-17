import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store, persistor } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
// import reportWebVitals from './reportWebVitals';
// import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
// registerLicense('ORg4AjUWIQA/Gnt2UlhhQlVMfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5adEJjUHtddHxWRmBf');


ReactDOM.createRoot(document.getElementById('root')).render(
    <PersistGate persistor={persistor}>
    <Provider store={store}>
        <App />
    </Provider>
  </PersistGate>
);



















