import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a new div element
const appElement = document.createElement('div');

// Optionally, add an ID or class for styling or identification
appElement.id = 'mento-plugin';

// Append the new element to the body
document.body.appendChild(appElement);

// Create a root and render the React app inside the new element
const root = ReactDOM.createRoot(appElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
