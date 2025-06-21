import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Dashboard } from './ui/Dashboard';
import { Settings } from './ui/Settings';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow mb-8 p-4 flex gap-4">
        <Link to="/" className="font-semibold text-blue-700 hover:underline">Dashboard</Link>
        <Link to="/settings" className="font-semibold text-blue-700 hover:underline">Settings</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
