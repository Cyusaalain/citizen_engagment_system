import { useState } from 'react';
import { respondToComplaint } from '../services/api';

export default function AdminTicketCard({ ticket }) {
  const [status, setStatus] = useState(ticket.status);
  const [response, setResponse] = useState(ticket.response || '');

  const handleUpdate = async () => {
    await respondToComplaint(ticket.id, { status, response });
    alert('Updated');
  };

  return (
    <div className="border p-4 mb-4 bg-gray-50 rounded">
      <p><strong>Ticket ID:</strong> {ticket.id}</p>
      <p><strong>Category:</strong> {ticket.category}</p>
      <p><strong>Citizen Email:</strong> {ticket.User?.email}</p>
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full mt-2">
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Response" className="border p-2 w-full mt-2" />
      <button onClick={handleUpdate} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">Update</button>
    </div>
  );
}