import { useEffect, useState } from 'react';
import { fetchComplaints, fetchComplaintStats } from '../services/api';
import AdminTicketCard from '../components/AdminTicketCard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AdminDashboard() {
  const [stats, setStats] = useState({ open: 0, closed: 0, inProgress: 0, total: 0 });
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
    toast.success("Logged out");
  };

  useEffect(() => {
    const load = async () => {
      const username = localStorage.getItem("admin");
      const res = await fetchComplaints(username);
      setTickets(res.data);
    };
    load();
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      const username = localStorage.getItem("admin");
      const res = await fetchComplaintStats(username);
      setStats(res.data);
    };
    loadStats();
  }, []);

  const pieData = {
    labels: ['Open', 'In Progress', 'Closed'],
    datasets: [
      {
        label: 'Complaint Status',
        data: [stats.open, stats.inProgress, stats.closed],
        backgroundColor: ['#3B82F6', '#FACC15', '#22C55E'],
      },
    ],
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800"> Assigned Complaints</h2>
        <button
          onClick={handleLogout}
          className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 text-center p-4 rounded-lg shadow">Open<br /><span className="text-xl font-semibold">{stats.open}</span></div>
        <div className="bg-yellow-100 text-center p-4 rounded-lg shadow">In Progress<br /><span className="text-xl font-semibold">{stats.inProgress}</span></div>
        <div className="bg-green-100 text-center p-4 rounded-lg shadow">Closed<br /><span className="text-xl font-semibold">{stats.closed}</span></div>
        <div className="bg-gray-200 text-center p-4 rounded-lg shadow">Total<br /><span className="text-xl font-semibold">{stats.total}</span></div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        {tickets.length === 0 ? (
          <p className="text-gray-600">No complaints yet.</p>
        ) : (
          tickets.map(ticket => (
            <AdminTicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>

      <div className="max-w-md mx-auto">
        <h3 className="text-center text-lg font-semibold mb-4 text-gray-700">Status Overview</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}