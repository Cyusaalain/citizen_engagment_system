import { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api';
import AdminTicketCard from '../components/AdminTicketCard';
import { useNavigate } from 'react-router-dom';


export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("admin");
  navigate("/admin");
};

  useEffect(() => {
    const load = async () => {
      const username = localStorage.getItem("admin");
      const res = await fetchComplaints(username);
      setTickets(res.data);
    };
    load();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Assigned Complaints</h2>
      {tickets.length === 0 ? (
        <p>No complaints yet.</p>
      ) : (
        tickets.map(ticket => <AdminTicketCard key={ticket.id} ticket={ticket} />)
      )}
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded float-right">
  Logout
      </button>
    </div>
  );
}