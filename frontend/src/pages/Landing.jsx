import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
        Welcome to the Citizen Engagement System
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Empowering citizens to speak, and enabling agencies to act.
      </p>
      <div className="space-x-4">
        <Link to="/admin">
          <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Admin Login
          </button>
        </Link>
        <Link to="/submit">
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
            Submit Complaint
        </button>
        </Link>
        <Link to="/track">
          <button className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700">
            Track Complaint
          </button>
        </Link>


      </div>
    </div>
  );
}