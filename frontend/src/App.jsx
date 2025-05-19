import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Track from './pages/Track';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';

export default function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 space-x-4">
          <Link to="/" className="text-blue-500">Home</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Landing />} />              {/* Landing */}
          <Route path="/submit" element={<Home />} />           {/* Complaint Form */}
          <Route path="/track" element={<Track />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              localStorage.getItem("admin")
                ? <AdminDashboard />
                : <Navigate to="/admin" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}