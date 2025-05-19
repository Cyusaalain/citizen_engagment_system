import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import ReactDOM from 'react-dom/client'; 
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster position="top" reverseOrder={false} />
  </React.StrictMode>
); 