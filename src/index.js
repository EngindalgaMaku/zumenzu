import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // Genel stilleri buraya taşıyabiliriz veya App.css içinde tutabiliriz

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 