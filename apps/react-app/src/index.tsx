import React from 'react';
import './styles.css';
import App from './App.js';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
