import Home from "./components/Home";
import BoardView from "./components/Board/BoardView";
import Thread from "./components/Thread/Thread";
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
          <Route path="/:boardParam" element={<BoardView />} />
          <Route path='/thread/:id' element={<Thread />} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
