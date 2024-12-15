import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ControllerPanel } from './pages/ControllerPanel';
import { ProjectorPanel } from './pages/ProjectorPanel';

/**
 * The main application component that sets up the routing for the application.
 *
 * @remarks
 * This component uses React Router to define routes for the application.
 * It is used in `/src/main/main.ts` to render the two pages of application.
 * - The `/controller` route renders the `ControllerPanel` component.
 * - The `/` route renders the `Projector` component.
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Hello Dünya!</h1>} />
        <Route path="/controller" element={<ControllerPanel />} />
        <Route path="/projector" element={<ProjectorPanel />} />
      </Routes>
    </Router>
  );
}
