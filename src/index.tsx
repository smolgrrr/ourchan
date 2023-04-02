import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NostrProvider } from "nostr-react";
import { relayUrls } from './constants/Const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <NostrProvider relayUrls={relayUrls} debug={true}>
    <App />
    </NostrProvider>
  </React.StrictMode>
);
