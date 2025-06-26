import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Dashboard } from './ui/Dashboard';
import { Settings } from './ui/Settings';

function App() {
  return (
    <Router>
      <nav className="bg-white shadow mb-8 p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-12">
          <Link to="/" className="font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors px-4 py-2 rounded">Dashboard</Link>
          <Link to="/settings" className="font-semibold text-blue-700 hover:text-blue-900 hover:underline transition-colors px-4 py-2 rounded">Settings</Link>
        </div>
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
