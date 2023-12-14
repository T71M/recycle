import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import AppService from './api/appService.ts';
import '@mantine/core/styles.css';

if (!import.meta.env.DEV) {
   console.debug = () => {};
   console.log = () => {};
}
export const api = new AppService();
ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
