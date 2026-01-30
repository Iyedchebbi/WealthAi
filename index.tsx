
// Safely polyfill process.env for browser environments without overwriting existing globals
if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
} else if (typeof (window as any).process.env === 'undefined') {
  (window as any).process.env = {};
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
