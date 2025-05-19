import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100 text-center p-4">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Citizen Engagement System
      </h1>
      <p className="text-md md:text-lg text-gray-600 mb-8">
        Empowering citizens to report issues and connect with public services.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/admin">
          <button className="w-60 sm:w-auto px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all shadow">
             Admin Login
          </button>
        </Link>
        <Link to="/submit">
          <button className="w-60 sm:w-auto px-6 py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all shadow">
            📝 Submit Complaint
          </button>
        </Link>
        <Link to="/track">
          <button className="w-60 sm:w-auto px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-800 transition-all shadow">
            🔍 Track Complaint
          </button>
        </Link>
      </div>
    </div>
  );
}