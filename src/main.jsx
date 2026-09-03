import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Global & Component Stylesheets
import './styles/global.css';
import './styles/customer.css';
import './styles/seatmap.css';
import './styles/ticket.css';
import './styles/admin.css';
import './styles/chatbot.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
