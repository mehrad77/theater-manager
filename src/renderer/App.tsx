import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './Projector.css';
import './Controller.css';
import { Controller } from './Controller';
import { Projector } from './Projector';

export const defaultVideos = [
  {
    id: 'video-1',
    show: false,
    position: { top: '5%', left: '10%' },
    size: { width: '320px', height: '180px' },
  },
  {
    id: 'video-2',
    show: false,
    position: { top: '37%', left: '10%' },
    size: { width: '320px', height: '180px' },
  },
  {
    id: 'video-3',
    show: false,
    position: { top: '70%', left: '10%' },
    size: { width: '320px', height: '180px' },
  },
];

export const defaultCounters = [
  {
    id: 'counter-1',
    count: 0,
    show: false,
    position: { top: '0%', left: '60%' },
  },
  {
    id: 'counter-2',
    count: 0,
    show: false,
    position: { top: '30%', left: '60%' },
  },
  {
    id: 'counter-3',
    count: 0,
    show: false,
    position: { top: '60%', left: '60%' },
  },
];

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Controller />} />
        <Route path="/projector" element={<Projector />} />
      </Routes>
    </Router>
  );
}
