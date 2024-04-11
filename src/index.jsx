import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <Provider store={store}>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="475812643315-mj8k65sjv8cinpvrt89ioa4gmv0fes0r.apps.googleusercontent.com">
            <App />
            </GoogleOAuthProvider>  
      </BrowserRouter>
    </Provider>
  
);