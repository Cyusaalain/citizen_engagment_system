import TrackStatus from '../components/TrackStatus';
import { useState } from 'react';
import { trackComplaint } from '../services/api';

export default function Track() {
  const [ticketId, setTicketId] = useState('');
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState('');
  const [lastStatus, setLastStatus] = useState('');

  const handleTrack = async () => {
    try {
      const res = await trackComplaint(ticketId);
      setTicket(res.data);

      if (lastStatus && res.data.status !== lastStatus) {
        setMessage(`Status changed to "${res.data.status}"`);
        setTimeout(() => setMessage(''), 5000);
      }

      setLastStatus(res.data.status);
    } catch (err) {
      setTicket(null);
      setMessage('Ticket not found');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold">Track Complaint</h2>
      <input
        className="border p-2 w-full"
        placeholder="Enter ticket ID"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button onClick={handleTrack} className="bg-blue-600 text-white px-4 py-2 rounded">Track</button>

      {message && <p className="text-green-600">{message}</p>}

      {ticket && (
        <div className="border p-4 mt-4 rounded bg-white">
          <p><strong>Category:</strong> {ticket.category}</p>
          <p><strong>Status:</strong> {ticket.status}</p>
          <p><strong>Description:</strong> {ticket.description}</p>
          <p><strong>Response:</strong> {ticket.response || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}