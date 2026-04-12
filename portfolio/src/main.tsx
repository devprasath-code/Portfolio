import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root');

if (container) {
  // Use a global variable to store the root to prevent multiple initializations
  // during hot reloads or multiple script executions.
  // @ts-ignore
  let root = window.__reactRoot;

  if (!root) {
    root = createRoot(container);
    // @ts-ignore
    window.__reactRoot = root;
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

