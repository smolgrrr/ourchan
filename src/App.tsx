import Home from "./components/Home";
import General from "./components/General";
import Thread from "./components/Thread";
import './style.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

declare global {
  interface Window {
    nostr?: any;
  }
}

function App() {
  return (
    <Router>
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/g" element={<General />} />
          <Route path='/g/thread/:id' element={<Thread />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
