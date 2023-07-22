import React from 'react';
import './styles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home.js';
import { createRoot } from 'react-dom/client';
import ErrorPage from './ErrorPage.js';
import Viewer from './Viewer.js';

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route
          path="*"
          element={<ErrorPage errorCode={404} errorMessage="Page Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
