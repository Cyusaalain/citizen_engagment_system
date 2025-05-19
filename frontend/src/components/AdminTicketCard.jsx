import { useState } from 'react';
import { respondToComplaint } from '../services/api';
import toast from 'react-hot-toast';

export default function AdminTicketCard({ ticket }) {
  const [status, setStatus] = useState(ticket.status);
  const [response, setResponse] = useState(ticket.response || '');

  const handleUpdate = async () => {
    await respondToComplaint(ticket.id, { status, response });
    toast.success('Complaint updated successfully');
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition-all border border-gray-200">
      <div className="mb-2 text-sm text-gray-500">Ticket #{ticket.id}</div>
      <h3 className="text-lg font-semibold text-gray-800">{ticket.category}</h3>
      <p className="mt-1 text-sm text-gray-700">{ticket.description}</p>

      <div className="mt-3 text-sm text-gray-600">
        <strong>Citizen Email:</strong> {ticket.User?.email}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded p-2 text-sm"
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">Response</label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Type your response here..."
          className="w-full border rounded p-2 text-sm"
          rows="3"
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm font-medium"
      >
        Update Complaint
      </button>
    </div>
  );
}