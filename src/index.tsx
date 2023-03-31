import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NostrProvider } from "nostr-react";

const relayUrls = [
  "wss://relay.snort.social",
  "wss://nos.lol",
  "wss://relay.damus.io",
];

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
