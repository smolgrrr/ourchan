import Home from "./components/Home";
import General from "./components/General";
import Leet from "./components/Leet";
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
          <Route path='/thread/:id' element={<Thread />} />
          <Route path='/1337' element={<Leet />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
