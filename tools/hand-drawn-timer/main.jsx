import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '../../style.css'; // or tailwind classes might just be available

const root = createRoot(document.getElementById('root'));
root.render(<App />);
