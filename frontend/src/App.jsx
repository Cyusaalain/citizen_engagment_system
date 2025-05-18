import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Track from './pages/Track';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-500">Submit</Link>
          <Link to="/track" className="text-blue-500">Track</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/track" element={<Track />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}