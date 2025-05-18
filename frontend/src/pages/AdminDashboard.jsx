import { useEffect, useState } from 'react';
import { fetchComplaints } from '../services/api';
import AdminTicketCard from '../components/AdminTicketCard';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetchComplaints();
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
    </div>
  );
}