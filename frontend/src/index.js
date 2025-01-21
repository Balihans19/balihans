import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Add this production-specific code
if (process.env.NODE_ENV === 'production') {
  // Prevent WebSocket connections in production
  window.WebSocket = class MockWebSocket {
    constructor(url) {
      console.log('Prevented WebSocket connection to:', url);
    }
    send() {}
    close() {}
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
