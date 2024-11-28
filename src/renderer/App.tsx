import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Projector.css';
import './Controller.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { ControllerPanel } from './ControllerPanel';
import { Projector } from './Projector';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/projector" element={<ControllerPanel />} />
        <Route path="/" element={<Projector />} />
      </Routes>
    </Router>
  );
}
