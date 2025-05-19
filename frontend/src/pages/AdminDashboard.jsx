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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assigned Complaints</h2>

      {tickets.length === 0 ? (
        <p>No complaints yet.</p>
      ) : (
        tickets.map(ticket => <AdminTicketCard key={ticket.id} ticket={ticket} />)
      )}

      <div className="grid grid-cols-2 gap-4 my-6">
        <div className="bg-blue-100 p-4 rounded">Open: {stats.open}</div>
        <div className="bg-yellow-100 p-4 rounded">In Progress: {stats.inProgress}</div>
        <div className="bg-green-100 p-4 rounded">Closed: {stats.closed}</div>
        <div className="bg-gray-100 p-4 rounded">Total: {stats.total}</div>
      </div>

      <div className="max-w-sm mx-auto">
        <Pie data={pieData} />
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded float-right mt-6"
      >
        Logout
      </button>
    </div>
  );
}