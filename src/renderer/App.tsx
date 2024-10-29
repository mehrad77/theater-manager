import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './Projector.css';
import './Controller.css';
import { Controller } from './Controller';
import { Projector } from './Projector';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projector" element={<Controller />} />
        <Route path="/" element={<Projector />} />
      </Routes>
    </Router>
  );
}
